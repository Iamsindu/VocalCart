const express = require("express");
const { OpenAI } = require("openai");
require("dotenv").config();
//const Product = require("../models/Product");
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/search", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.json({ error: "Query is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant helping users to find products. Provide necessary items needed for the given query.",
        },
        {
          role: "user",
          content: `What are the essential items required for "${query}"`,
        },
      ],
      max_tokens: 100,
    });

    if (!response.choices || response.choices.length === 0) {
      return res.json({ error: "No results from OpenAI" });
    }

    const AIresponse = response.choices[0].message.content.trim();
    console.log("Response: ", AIresponse);

    const correctedResponse = AIresponse.split("\n").filter(
      (item) => item.trim() !== ""
    );
    res.json({ results: correctedResponse });
  } catch (error) {
    console.error("Error in search:", error.message);
    // Check if it's a rate limit error
    if (error.response) {
      // Log OpenAI error details
      console.error("OpenAI Error:", error.response.data);
      res.status(error.response.status).json({
        error: error.response.data.error.message || "OpenAI API Error",
      });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
