const mongoose = require("mongoose")

const Schema = mongoose.Schema

delete mongoose.connection.models["Publisher"]

const PublisherSchema = new Schema({
    name: { type: String, required: true, unique: true },
    altId: { type: String },
})

module.exports = mongoose.model("Publisher", PublisherSchema)
