const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        image: { type: String, required: true },
        facebook: { type: String },
        instagram: { type: String },
        mail: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Shop", ShopSchema);
