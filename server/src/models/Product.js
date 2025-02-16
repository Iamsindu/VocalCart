import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: String,
  description: String,
  embedding: { type: [Number], default: [] },
});

const Product = mongoose.model("Product", Schema);
export default Product;
