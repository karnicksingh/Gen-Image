const mongoose = require("mongoose");


imageSchema = new mongoose.Schema(
    {

        prompt: {
            type: String,
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }


    },
    { timestamps: true });

module.exports = mongoose.model("Image", imageSchema);