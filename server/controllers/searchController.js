const { Knearestn } = require("../utils/knn");
const embeddingsGeneration = require("../utils/embeddings");
const Product = require("../models/Product");

exports.semanticSearch = async (req, res) => {
  try {
    const query = req.body.query;
    const queryV = await embeddingsGeneration(query);

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

    const result = Knearestn(queryV, everyProducts, 10);
    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
};
