(async () => {
  const fetch = await import("node-fetch");

  globalThis.fetch = fetch.default;
  globalThis.Headers = fetch.Headers;
  globalThis.Request = fetch.Request;
  globalThis.Response = fetch.Response;

  const express = require("express");
  const cors = require("cors");
  const path = require("path");
  const connectDB = require("./db");
  const productRoutes = require("./routes/productRoutes");
  require("dotenv").config();

  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  connectDB();

  app.use("/api/search", require("./routes/search"));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use('/api/products', productRoutes);
  // app.use("/api/products", require("./routes/products"));

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  app.get("/", (req, res) => {
    res.send("Vocal Cart Server is up and running!");
  });
})();
