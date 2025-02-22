const Product = require("../models/Product");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Product.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { name, category, description, price, brand, imageUrl } = req.body;
    const item = new Product({
      name,
      category,
      description,
      price,
      brand,
      imageUrl,
    });
    await item.save();
    res.status(201).json({ message: "item added successfully", item });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
