// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/types/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CreeperMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _items;
    Counters.Counter private _soldItems;

    address payable owner;

    uint256 listingPrice = 0.001 ether; // minimum price, change for what you want

    struct MarketplaceItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketplaceItem) private idToMarketplaceItem;
    mapping(address => mapping(uint256 => uint256)) private nftToItemId;

    event MarketplaceItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() {
        owner = payable(msg.sender);
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function getNFTListingPrice(address nftContract, uint256 tokenId) public view returns (uint256) {
        uint256 itemId = nftToItemId[nftContract][tokenId];
        require(itemId > 0, "NFT not listed");
        return idToMarketplaceItem[itemId].price;
    }

    function createMarketplaceItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        _items.increment();
        uint256 itemId = _items.current();

        idToMarketplaceItem[itemId] = MarketplaceItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        // Update the mapping to easily find the itemId
        nftToItemId[nftContract][tokenId] = itemId;

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketplaceItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    function createMarketplaceSale(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = idToMarketplaceItem[itemId].price;
        uint256 tokenId = idToMarketplaceItem[itemId].tokenId;
        require(idToMarketplaceItem[itemId].sold == false, "Item already sold");
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        idToMarketplaceItem[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketplaceItem[itemId].owner = payable(msg.sender);
        idToMarketplaceItem[itemId].sold = true;

        _soldItems.increment();

        payable(owner).transfer(listingPrice);
    }
    // New function to directly buy NFT with listing price
    function buyNFT(address nftContract, uint256 tokenId)
        public
        payable
        nonReentrant
    {
        uint256 itemId = nftToItemId[nftContract][tokenId];
        require(itemId > 0, "NFT not listed");
        require(idToMarketplaceItem[itemId].sold == false, "Item already sold");
        uint256 price = idToMarketplaceItem[itemId].price;
        require(msg.value == price, "Please submit the exact asking price");

        idToMarketplaceItem[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketplaceItem[itemId].owner = payable(msg.sender);
        idToMarketplaceItem[itemId].sold = true;

        _soldItems.increment();

        payable(owner).transfer(listingPrice);
    }

    // Get all unsold marketplace items
    function fetchMarketplaceItems() public view returns (MarketplaceItem[] memory) {
        uint256 itemCount = _items.current();
        uint256 unsoldItemCount = _items.current() - _soldItems.current();
        uint256 currentIndex = 0;

        MarketplaceItem[] memory items = new MarketplaceItem[](unsoldItemCount);
        for (uint256 i = 1; i <= itemCount; i++) {
            if (idToMarketplaceItem[i].owner == address(0)) {
                MarketplaceItem storage currentItem = idToMarketplaceItem[i];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    // returns only items that a user has purchased
    function fetchMyNFTs() public view returns (MarketplaceItem[] memory) {
        uint256 totalItemCount = _items.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketplaceItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketplaceItem[] memory items = new MarketplaceItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketplaceItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketplaceItem storage currentItem = idToMarketplaceItem[
                    currentId
                ];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // returns only items a user has created
    function fetchItemsCreated()
        public
        view
        returns (MarketplaceItem[] memory)
    {
        uint256 totalItemCount = _items.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketplaceItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketplaceItem[] memory items = new MarketplaceItem[](itemCount);

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketplaceItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketplaceItem storage currentItem = idToMarketplaceItem[
                    currentId
                ];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    // Function for the owner to withdraw accumulated fees
    function withdrawFees() public {
        require(msg.sender == owner, "Only the marketplace owner can withdraw fees");
        payable(owner).transfer(address(this).balance);
    }
}
