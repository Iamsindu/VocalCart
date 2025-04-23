const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const path = require("path");
const fs = require("fs");
const generateEmbedding = require("../utils/embeddings");

const productRoutes = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, name);
  },
});
const upload = multer({ storage });

// POST product
productRoutes.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      subCategory,
      description,
      stockStatus,
      discount,
      offerPrice,
    } = req.body;

    //This will create a combined text string for the embedding process
    const texttoembedding = `${name}. ${description}. Category: ${category} ${subCategory}`;

    //generate the embedding vector
    const vector = await generateEmbedding(texttoembedding);

    const newProduct = new Product({
      name,
      price,
      category,
      subCategory,
      description,
      stockStatus,
      discount,
      offerPrice,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
      vector,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error while creating product." });
  }
});

// GET all products
productRoutes.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error while fetching products." });
  }
});


// GET product by ID
productRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Server error while fetching product." });
  }
});

module.exports = productRoutes;
