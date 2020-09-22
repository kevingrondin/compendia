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
});

export const SeriesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    altID: {
        type: String,
        required: false,
    },
});

export const ComicsSchema = new Schema({
    // diamondID: {
    //     type: String,
    //     required: false,
    // },
    title: {
        type: String,
        required: true,
    },
    // releaseDate: {
    //     type: Date,
    //     required: true,
    // },
    // coverPrice: {
    //     type: Number,
    //     required: true,
    // },
    // cover: {
    //     type: String,
    //     required: true,
    // },
    // description: {
    //     type: String,
    //     required: true,
    // },
    // printing: {
    //     type: String,
    //     required: true,
    // },
    // formatType: {
    //     type: String,
    //     required: true,
    // },
    // isMature: {
    //     type: Boolean,
    //     required: true,
    //     default: false,
    // },
    // variantCode: {
    //     type: String,
    //     required: false,
    // },
    // totalWanted: {
    //     type: Number,
    //     required: false,
    //     default: 0,
    // },
    // totalFavorited: {
    //     type: Number,
    //     required: false,
    //     default: 0,
    // },
    // totalOwned: {
    //     type: Number,
    //     required: false,
    //     default: 0,
    // },
    // totalRead: {
    //     type: Number,
    //     required: false,
    //     default: 0,
    // },
});

export default mongoose.models.comics || mongoose.model("comics", ComicsSchema);
