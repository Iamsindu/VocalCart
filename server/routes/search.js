const express = require("express");
const Product = require("../models/Product");
const generateEmbedding = require("../utils/embeddings");

const router = express.Router();

//this route handles semantic serch based on user input query
router.get("/", async (req, res) => {
  try {
    const { query } = req.query;

    //message displayed if query is not provided
    if (!query) return res.status(400).json({ message: "Query is required" });

    // convert text search query into numerical embedding
    const queryVector = await generateEmbedding(query);

    // connecting to mongodb to search and find semantically similar products
    const products = await Product.aggregate([
      {
        $vectorSearch: {
          queryVector: queryVector, //user input search
          path: "vector",
          index: "default", // vector index in mongoDB
          numCandidates: 10,
          limit: 10,
        },
      },
    ]);

    //returning similar product from the database
    res.json(products);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Error processing search query" });
  }
});

module.exports = router;
