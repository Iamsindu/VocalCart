const express = require("express");
const Product = require("../models/Product");
const generateEmbedding = require("../utils/embeddings");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query is required" });

    // Generate query vector embedding
    const queryVector = await generateEmbedding(query);

    // Perform vector search using MongoDB aggregation
    const products = await Product.aggregate([
      {
        $vectorSearch: {
          queryVector: queryVector,
          path: "vector",
          index: "default", // Make sure this matches the created index in MongoDB
          numCandidates: 10,
          limit: 10,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Error processing search query" });
  }
});

module.exports = router;
