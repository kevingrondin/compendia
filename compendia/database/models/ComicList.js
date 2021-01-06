const mongoose = require("mongoose")

const Schema = mongoose.Schema

delete mongoose.connection.models["ComicList"]

const ComicListSchema = new Schema({
    name: { type: String, required: true },
    user: { type: String, ref: "User", required: true },
    comics: [{ type: mongoose.Types.ObjectId, ref: "Comic" }],
})

module.exports = mongoose.model("ComicList", ComicListSchema)
