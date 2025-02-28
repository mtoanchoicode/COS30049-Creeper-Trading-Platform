const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    id: Number,
    Title: {
        type: String,
        require: true,
    },
    Summary: {
        type: String,
        require: true,
    },
    Category: {
        type: String,
        require: true,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    Image: {
        type: String,
        require: true,
    },
    Content: {
        type: String,
        require: true,
    }
});

const News = mongoose.model("news", newsSchema);

module.exports = News;
