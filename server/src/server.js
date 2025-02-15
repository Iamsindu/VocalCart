const express = require("express");
const connectDatabase = require("./config/db");
require("dotenv").config();

const app = express();
app.use(express.json());

//connecting to the database
connectDatabase();

app.get("/", (req, res) => {
  res.send("API is successfully running ... ");
});

//starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
