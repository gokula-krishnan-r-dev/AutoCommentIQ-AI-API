const { MongoClient } = require("mongodb");

async function connectToMongoDB() {
  const client = new MongoClient("mongodb://localhost:27017");

  try {
    await client.connect();
    console.log("Connected Successfully");
    return client; // Return the connected client
  } catch (error) {
    console.log("Failed to connect", error);
    throw error;
  }
}

module.exports = connectToMongoDB; // Export the function
