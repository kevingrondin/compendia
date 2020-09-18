import mongoose, { Schema } from "mongoose";

export const ComicsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    spec: {
        type: String,
        required: true,
    },
});

export default mongoose.models.comics || mongoose.model("comics", ComicsSchema);
