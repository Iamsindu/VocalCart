require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const connectDatabase = require("./config/db");
require("dotenv").config();
//const productRoutes = require("./routes/productRoutes");
const searchRoutes = require("./routes/searchRoutes");

console.log(
  "OpenAI API Key:",
  process.env.OPENAI_API_KEY ? "Loaded" : "Not Found"
);

//app.use("/api/products", productRoutes);
app.use("/", searchRoutes);

//connecting to the database
connectDatabase();

app.get("/", (req, res) => {
  res.send("API is successfully running ... ");
});

//starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
