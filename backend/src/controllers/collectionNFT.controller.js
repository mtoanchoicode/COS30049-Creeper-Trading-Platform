const {createCollection} = require("../models/nft.model");
const { pinFileToIPFS } = require("../config/pinata");

const createNFTCollectionControll = async (req, res) => {
  try {
    const { name, symbol } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload image to IPFS
    const imageHash = await pinFileToIPFS(req.file.buffer, req.file.originalname);
    const imageURI = `https://gateway.pinata.cloud/ipfs/${imageHash}`;
    
    // Create metadata JSON
    const metadata = { name, description, image: imageURI };
    const metadataHash = await pinFileToIPFS(Buffer.from(JSON.stringify(metadata)), `${name}.json`);
    const metadataURI = `https://gateway.pinata.cloud/ipfs/${metadataHash}`;

    // // Save to DB
    // const newNFT = new createCollection({  });
    // await newNFT.save();

    res.status(201).json({ message: "NFT Collection Created", nft: newNFT });
  } catch (error) {
    res.status(500).json({ message: "Error creating NFT", error });
  }
};

module.exports = { createNFTCollectionControll };