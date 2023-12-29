// const { MongoClient } = require("mongodb");

// async function connectToMongoDB() {
//   const client = new MongoClient(
//     "mongodb+srv://gokula:vtEmjsXnqZrqf2rv@cluster0.klfb9oe.mongodb.net/?retryWrites=true&w=majority"
//   );

//   try {
//     await client.connect();
//     console.log("Connected Successfully");
//     return client; // Return the connected client
//   } catch (error) {
//     console.log("Failed to connect", error);
//     throw error;
//   }
// }

// module.exports = connectToMongoDB; // Export the function
import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://gokula:vtEmjsXnqZrqf2rv@cluster0.klfb9oe.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const connectToMongoDB = mongoose.connection;

connectToMongoDB.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
connectToMongoDB.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = connectToMongoDB;
