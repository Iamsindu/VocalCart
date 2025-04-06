let embedder = null;

async function generateEmbedding(text) {
  if (!embedder) {
    const { pipeline } = await import("@xenova/transformers");

    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  const output = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

module.exports = generateEmbedding;
