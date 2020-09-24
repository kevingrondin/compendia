import mongoose, { Schema } from "mongoose";

export const SeriesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    altID: {
        type: String,
        required: false,
    },
    comics: [
        {
            type: Schema.Types.ObjectId,
            ref: "comics",
        },
    ],
});

export default mongoose.models.series || mongoose.model("series", SeriesSchema);
