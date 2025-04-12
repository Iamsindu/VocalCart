(async () => {
  const fetch = await import("node-fetch");

  //adding fetch and its components to the global scope so that it can be accessed in browsers
  globalThis.fetch = fetch.default;
  globalThis.Headers = fetch.Headers;
  globalThis.Request = fetch.Request;
  globalThis.Response = fetch.Response;

  const express = require("express");
  const cors = require("cors");
  const connectDB = require("./db");
  require("dotenv").config();

  const app = express();
  app.use(express.json());
  app.use(cors());

  connectDB();

  app.use("/api/search", require("./routes/search"));

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
