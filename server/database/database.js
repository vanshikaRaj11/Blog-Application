const mongoose = require("mongoose");
require("dotenv").config();

 const connection = async() => {
  try {
      await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
      console.log("Database connected successfully")
  } catch (error) {
      console.log("Error while connecting with the database", error)
    process.exit(1);

  }
};
module.exports = connection
