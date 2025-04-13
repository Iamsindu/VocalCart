const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    description: { type: String },
    stockStatus: { type: String, enum: ['out_of_stock', 'in_stock'], default: 'In Stock' },
    discount: { type: Number, default: 0 },
    offerPrice: { type: Number },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
