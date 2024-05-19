const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    seller: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
    shop: { type: mongoose.Schema.Types.ObjectID, ref: "Shop" },
    price: { type: SchemaTypes.Double },
    stock: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
