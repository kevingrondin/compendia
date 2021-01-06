const mongoose = require("mongoose")

const Schema = mongoose.Schema

delete mongoose.connection.models["User"]

const UserSchema = new Schema({
    _id: { type: String, required: true },
    email: { type: String, required: true },
})

module.exports = mongoose.model("User", UserSchema)
