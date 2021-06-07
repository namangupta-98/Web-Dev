const mongoose = require("mongoose");


const fSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        parent: {
            type: String,
            trim: true,
            required: true,
        },
        children: {
            type: [String],
        }
    },
    { timestamps: true }
);

const folderSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            max: 32,
            unique: true,
            index: true,
        },
        folders: {
            type: [fSchema],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Folder", folderSchema);
