const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const fileSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        size:{
            type: Number,
            required: true
        },
        mimetype:{
            type: String,
            required: true
        },
        ext:{
            type: String,
            trim: true,
        },
        parent: { type: ObjectId, ref: "Folder", }
    },
    { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);