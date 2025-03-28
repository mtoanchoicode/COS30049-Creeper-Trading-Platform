// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721, Ownable {
    struct NFT {
        uint256 tokenId;
        bool isListed;
        string metadataURI;
    }

    mapping(uint256 => NFT) private _nfts;
    mapping(uint256 => string) private _tokenURIs;
    uint256 private _nextTokenId;

    constructor(
        string memory _collectionName,
        string memory _symbol
    ) ERC721(_collectionName, _symbol) Ownable(msg.sender) {}

    function mint(
        string memory metadataURI
    ) public onlyOwner returns (uint256) {
        uint256 newTokenId = _nextTokenId++;
        _mint(msg.sender, newTokenId);
        _nfts[newTokenId] = NFT(newTokenId, false, metadataURI);
        _tokenURIs[newTokenId] = metadataURI;
        return newTokenId;
    }

    function batchMint(
        uint256 amount,
        string[] memory metadataURIs
    ) public onlyOwner returns (uint256[] memory) {
        require(amount > 0, "Must mint at least one NFT");
        require(
            metadataURIs.length == amount,
            "MetadataURIs array must match amount"
        );

        uint256[] memory tokenIds = new uint256[](amount);

        for (uint256 i = 0; i < amount; i++) {
            uint256 newTokenId = _nextTokenId++;
            _mint(msg.sender, newTokenId);
            _nfts[newTokenId] = NFT(newTokenId, false, metadataURIs[i]);
            _tokenURIs[newTokenId] = metadataURIs[i];
            tokenIds[i] = newTokenId;
        }

        return tokenIds;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function listNFT(uint256 tokenId) public onlyOwner {
        _nfts[tokenId].isListed = true;
    }

    function unlistNFT(uint256 tokenId) public onlyOwner {
        _nfts[tokenId].isListed = false;
    }

    function getListedNFTs() public view returns (uint256[] memory) {
        uint256 count;
        for (uint256 i = 0; i < _nextTokenId; i++) {
            if (_nfts[i].isListed) {
                count++;
            }
        }

        uint256[] memory listedNFTs = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < _nextTokenId; i++) {
            if (_nfts[i].isListed) {
                listedNFTs[index++] = i;
            }
        }
        return listedNFTs;
    }

    function getAllMintedTokens() public view returns (uint256[] memory) {
        uint256 totalMinted = _nextTokenId;
        uint256[] memory tokens = new uint256[](totalMinted);

        for (uint256 i = 0; i < totalMinted; i++) {
            tokens[i] = i;
        }

        return tokens;
    }
}
