let embedder = null;

//converting given input search query into a vector embedding using transformer model
async function generateEmbedding(text) {
  if (!embedder) {
    const { pipeline } = await import("@xenova/transformers");

    //using 'all-MiniLM-L6-v2' model for transforming text into numerical vectors
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }

  //convert all embeddings into single vector by taking mean
  const output = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

module.exports = generateEmbedding;
