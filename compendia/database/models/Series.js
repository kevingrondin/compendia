const mongoose = require("mongoose")

const Schema = mongoose.Schema

delete mongoose.connection.models["Series"]

const SeriesSchema = new Schema({
    name: { type: String, required: true },
    altId: { type: String },
    publisher: { type: mongoose.Types.ObjectId, ref: "Publisher", required: true },
    imprint: { type: mongoose.Types.ObjectId, ref: "Imprint" },
    isOneShot: { type: Boolean },
    isMiniSeries: { type: Boolean },
    miniSeriesLimit: { type: Number },
})

module.exports = mongoose.model("Series", SeriesSchema)
