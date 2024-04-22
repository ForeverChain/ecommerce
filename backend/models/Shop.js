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
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        seller: { type: mongoose.Schema.Types.ObjectID, ref: "User", required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Shop", ShopSchema);
