require("dotenv").config();
const axios = require("axios");
const FormData = require("form-data");

const PINATA_API_JWT = process.env.PINATA_JWT;
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

const pinFileToIPFS = async (fileBuffer, fileName) => {
try {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  
  let data = new FormData();
  data.append("file", fileBuffer, fileName);

  const metadata = JSON.stringify({
    name: "File name",
  });
  data.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
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
  };
}

module.exports = { pinFileToIPFS };



