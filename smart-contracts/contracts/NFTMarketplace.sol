// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/types/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        uint256 price;
        bool isActive;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    event NFTListed(address indexed nft, uint256 indexed tokenId, address seller, uint256 price);
    event NFTSold(address indexed nft, uint256 indexed tokenId, address buyer, uint256 price);
    event ListingCancelled(address indexed nft, uint256 indexed tokenId, address seller);

    function listNFT(address nftAddress, uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be greater than zero");

        // ✅ Ensure marketplace is approved, but do NOT transfer ownership yet
        require(
            IERC721(nftAddress).getApproved(tokenId) == address(this),
            "Marketplace is not approved"
        );

        listings[nftAddress][tokenId] = Listing(msg.sender, price, true);

        // ✅ Corrected emit statement
        emit NFTListed(nftAddress, tokenId, msg.sender, price);
    }

    function buyNFT(address nft, uint256 tokenId) external payable nonReentrant {
        Listing memory item = listings[nft][tokenId];
        require(msg.value == item.price, "Incorrect ETH amount");
        require(item.seller != address(0), "NFT not listed");

        delete listings[nft][tokenId];

        // ✅ Transfer NFT directly from seller instead of contract
        IERC721(nft).transferFrom(item.seller, msg.sender, tokenId);
        payable(item.seller).transfer(msg.value);

        emit NFTSold(nft, tokenId, msg.sender, msg.value);
    }

    function cancelListing(address nft, uint256 tokenId) external {
        Listing memory item = listings[nft][tokenId];
        require(msg.sender == item.seller, "Not the seller");

        delete listings[nft][tokenId];

        emit ListingCancelled(nft, tokenId, msg.sender);
    }
}
