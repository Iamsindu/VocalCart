function cosineSimilarity(vector1, vector2) {
  let dotProduct = 0;
  let normalize1 = 0;
  let normalize2 = 0;

  for (let i = 0; i < vector1.length; i++) {
    dotProduct = dotProduct + vector1[i] * vector2[i];
    normalize1 = normalize1 + vector1[i] ** 2;
    normalize2 = normalize2 + vector2[i] ** 2;
  }

  //cosine similarity = dot(A,B) / (||A|| * ||B||)
  return dotProduct / (Math.sqrt(normalize1) * Math.sqrt(normalize2));
}

function Knearestn(queryV, data, k = 10) {
  //check the input vector
  if (!Array.isArray(queryV) || queryV.length === 0) {
    throw new Error("The vectorized query must be non-empty array");
  }

  //mapping over each item and calculating similarity with the input query vector
  const scoredItems = items.map((item) => {
    if (!Array.isArray(item.vector)) {
      throw new Error("Every item should have a vector array");
    }

    const similarity = cosineSimilarity(queryV, item.vector);

    return {
      ...item, //includingn original products data
      similarity, //adding similarity score for sorting
    };
  });

  //sorting items in descending order of similarity and returning top k=10
  return scoredItems.sort((a, b) => b.similarity - a.similarity).slice(0, k);
}

module.exports = { cosineSimilarity, Knearestn };
