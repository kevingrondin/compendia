const mongoose = require("mongoose")

const Schema = mongoose.Schema

delete mongoose.connection.models["CollectedComic"]

const CollectedComicSchema = new Schema({
    user: { type: String, ref: "User", required: true },
    comic: { type: mongoose.Types.ObjectId, ref: "Comic", required: true },
    dateCollected: Date,
    purchasePrice: String,
    purchaseLocation: String,
    condition: String,
    grade: Number,
    quantity: Number,
    notes: String,
})

module.exports = mongoose.model("CollectedComic", CollectedComicSchema)
