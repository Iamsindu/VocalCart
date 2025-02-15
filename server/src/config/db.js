const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected sucessfully.");
  } catch (error) {
    console.error("MongoDB Connection Failed.", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
