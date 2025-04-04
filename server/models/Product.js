const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  imageUrl: String,
  vector: { type: [Number], required: true }, // Embeddings
});

module.exports = mongoose.model("Product", ProductSchema);
