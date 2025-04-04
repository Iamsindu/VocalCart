const { pipeline } = require("@xenova/transformers");

let embedder = null;

async function generateEmbedding(text) {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  const output = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(output.data); // Convert tensor to array
}

module.exports = generateEmbedding;
