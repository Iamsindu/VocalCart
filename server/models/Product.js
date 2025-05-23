const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    description: { type: String },
    stockStatus: {
      type: String,
      enum: ["out_of_stock", "in_stock"],
      default: "in_stock",
    },
    discount: { type: Number, default: 0 },
    offerPrice: { type: Number },
    imageUrl: { type: String },
    vector: {
      type: [Number],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema, "products");
