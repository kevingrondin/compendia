const mongoose = require("mongoose")

const Schema = mongoose.Schema

delete mongoose.connection.models["Comic"]

const ComicSchema = new Schema({
    title: { type: String, required: true },
    series: { type: mongoose.Types.ObjectId, ref: "Series", required: true },
    cover: String,
    releaseDate: Date,
    coverPrice: String,
    description: String,
    rating: String,
    format: String,
    printing: Number,
    versionOf: { type: mongoose.Types.ObjectId, ref: "Comic" },
    altId: { type: String },
    diamondId: String,
})

module.exports = mongoose.model("Comic", ComicSchema)
