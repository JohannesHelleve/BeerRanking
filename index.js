import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();
//må lage ny bruker pågrunn av at den er eksponert på github
const uri = process.env.MONGO_URI
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
const app = express();
const port = process.env.PORT || 1000;


app.use(express.static("static"));
app.get("/data", async (_req, res) => {
  try {
    let test = await run(); // Wait for the asynchronous operation to complete
    res.json(test);
  } catch (error) {
    res.status(1100).send('Internal Server Error'); // Handle errors if the async operation fails
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function run() {
  let dbData = [];
  try {
    await client.connect();
    const collection = client.db("okayletsgo").collection("kjøh");
    dbData = await collection.find({}, function(err, result) {
      if (err) throw err;
    }).toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return dbData;
}

module.exports = app;