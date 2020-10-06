import mongoose, { Schema } from "mongoose";

export const PublishersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    altID: {
        type: String,
        required: false,
    },
    series: [
        {
            type: Schema.Types.ObjectId,
            ref: "series",
        },
    ],
});

export default mongoose.models.publishers || mongoose.model("publishers", PublishersSchema);
