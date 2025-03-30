const express = require("express");
const multer = require("multer");
const NFTRouter = express.Router();
const { createNFTCollectionControll } = require("../controllers/collectionNFT.controller");

// 1. Multer configuration with additional options
const upload = multer({ 
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// 2. Routes with error handling
NFTRouter.post("/deploy", upload.single("file"), (req, res, next) => {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        next();
    },
    createNFTCollectionControll
);

// 3. Error handling middleware for multer errors
NFTRouter.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            error: "File upload error",
            message: error.message
        });
    }
    next(error);
});

// 4. GET route
NFTRouter.get("/", (req, res) => {
    return res.status(200).json("Success Get NFT Collection");
});

module.exports = NFTRouter;


