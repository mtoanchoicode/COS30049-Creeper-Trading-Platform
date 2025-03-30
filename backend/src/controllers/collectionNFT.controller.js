const { pinFileToIPFS } = require("../config/pinata");


const createNFTCollectionControll = async (req, res) => {
  try {
    const { name, description = "" } = req.body; 
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload image to IPFS
    const imageHash = await pinFileToIPFS(req.file.buffer, req.file.originalname);
    const imageURI = `https://gateway.pinata.cloud/ipfs/${imageHash}`;
    
    // Create metadata JSON
    const metadata = { name, description, image: imageURI };
    const metadataHash = await pinFileToIPFS(Buffer.from(JSON.stringify(metadata)), `${name}`, `${description}`);
    const metadataURI = `https://gateway.pinata.cloud/ipfs/${metadataHash}`;

  // Send back the response with all URIs
  res.status(200).json({
    success: true,
    data: {
      metadataURI,
      imageURI,
      metadata  
    }
  });
    
  } catch (error) {
    res.status(500).json({error: error.message });
  }
};

module.exports = { createNFTCollectionControll };