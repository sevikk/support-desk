const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.set('strictQuery', false).connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
