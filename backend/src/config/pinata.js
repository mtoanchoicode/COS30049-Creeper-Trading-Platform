require("dotenv").config();
const axios = require("axios");
const FormData = require("form-data");

const PINATA_API_JWT = process.env.PINATA_JWT;
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

const pinFileToIPFS = async (fileBuffer, fileName, description = "No description provided") => {
  try {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    
    let data = new FormData();
    data.append("file", fileBuffer, fileName);

    // Ensure metadata includes the name and description correctly
    const metadata = JSON.stringify({
      name: fileName,
      description: description || "No description provided", // Default description if null or empty
    });
    data.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0, // Ensures CIDv0 for compatibility
    });
    data.append("pinataOptions", options);

    const res = await axios.post(url, data, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
        Authorization: `Bearer ${PINATA_API_JWT}`,
      },
    });

    return res.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error.response?.data || error.message);
    throw new Error("Failed to upload file to Pinata IPFS");
  }
};

module.exports = { pinFileToIPFS };