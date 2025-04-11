const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  _id: String,
  title: String,
  product_description: String,
  category: String,
  final_price: String,
  images: Array,
  vector: { type: [Number], required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
