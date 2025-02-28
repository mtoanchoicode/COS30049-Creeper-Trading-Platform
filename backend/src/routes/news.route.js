const express = require("express");
const newsRouter = express.Router();
const News = require("../models/news.model");

// Get all news
newsRouter.get("/", async (req, res) => {
    try {
        // const news = await News.find().sort({ date: -1 }); // Get latest news first
        const news = await News.find()
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// find news by id
newsRouter.get("/:id", async (req, res) => {
    try {
        const news = await News.findOne({ id: Number(req.params.id) }); // Convert to number
        if (!news) return res.status(404).json({ message: "News not found!" });

        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// // Add a news item
// newsRouter.post("/", async (req, res) => {
//     try {
//         const { title, summary, content, category, image } = req.body;
//         const newNews = new News({ title, summary, content, category, image });
//         await newNews.save();
//         res.status(201).json(newNews);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Delete a news item
// newsRouter.delete("/:id", async (req, res) => {
//     try {
//         await News.findByIdAndDelete(req.params.id);
//         res.json({ message: "News deleted successfully" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

module.exports = newsRouter;
