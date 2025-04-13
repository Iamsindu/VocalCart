const { Knearestn } = require("../utils/knn");
const embeddingsGeneration = require("../utils/embeddings");
const Product = require("../models/Product");

//This function handles semantic search
exports.semanticSearch = async (req, res) => {
  try {
    //extracti the search query from the request body
    const query = req.body.query;

    //converting the search query into embedding that is vector representation
    const queryV = await embeddingsGeneration(query);

    //fetching products from the database with necessary field which will be displayed
    const everyProducts = await Product.find(
      {},
      {
        name: 1,
        description: 1,
        vector: 1,
        imageUrl: 1,
        category: 1,
        price: 1,
      }
    );

    //using knn algorithm to find top 10 items from database whose vector is closest to the search query vector
    const result = Knearestn(queryV, everyProducts, 10);
    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
};
