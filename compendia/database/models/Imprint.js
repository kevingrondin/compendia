const mongoose = require("mongoose")

const Schema = mongoose.Schema

delete mongoose.connection.models["Imprint"]

const ImprintSchema = new Schema({
    name: { type: String, required: true },
    altId: { type: String },
    publisher: { type: mongoose.Types.ObjectId, ref: "Publisher", required: true },
})

module.exports = mongoose.model("Imprint", ImprintSchema)
