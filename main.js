const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 1000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://johanshelleve:lkiI5s9NC0YhPUAX@okayletsgo.fzrvoiq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(express.static("static"));
app.get("/data", (_req, res) => {
  let test = {test : "test"};
  res.json(test);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    let data = await client.db("okayletsgo").collection("kjøh").find({}).toArray();
    console.log(data);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

//Hansa EAN: 7030019532615

async function getProducts(product) {
    try {
        const search = 'https://kassal.app/api/v1/products/ean/'+ product 
        const response = await fetch(search, {
            headers: {
                Authorization: 'Bearer Xeii429PZ59IwlikFPzMDxQbI8sYzSjq4J5PiqHp'
            }
        })
        if (response.ok) {
            const object = await response.json()
            return object.data;
        } else {
            throw new Error('Response not ok')
        }
    } catch (error) {
        console.log(error)
    }  
}

async function pushToDatabase(product) {
    try {
        await client.connect();
        const data = getProducts(product);
        await client.db("okayletsgo").collection("kjøh").insertOne(data);
        console.log(data);
    } finally {
        await client.close();
    }
}
pushToDatabase("7030019532615");

async function getDatabase(product) {
    try {
        await client.connect();
        const data = await client.db("okayletsgo").collection("kjøh").find({}).toArray();
        console.log(data);
    } finally {
        await client.close();
    }
}
getDatabase("7030019532615");