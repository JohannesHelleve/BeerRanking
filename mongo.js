import ean from './ean.mjs';
import fetch from 'node-fetch';
import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();
//må lage ny bruker pågrunn av at den er eksponert på github
const uri = process.env.MONGO_URI
console.log(uri);

if(process.env.test == undefined) {
  console.log("test is undefined");
} else {
  console.log("test is defined");
}


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function run(ean) {
    const data = await matchEanToProduct(ean);
    let dbData = [];
    try {
      await client.connect()
      const collection = client.db("okayletsgo").collection("kjøh");
      for (const item of data) {
        await collection.updateOne(
          { _id: data.indexOf(item) }, // Use a unique identifier field here
          { $set: item },
          { upsert: true } // This option will insert if not found, update if found
        );
      }

      dbData = await collection.find({}, function(err, result) {
        if (err) throw err;
      }).toArray();
    } catch (error) {
      console.error("Error: " + error.message);
    }   finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
    return dbData;
  }

async function matchEanToProduct(products) {
    const data = [];
    for(let i = 0; i < products.length; i++) {
        const product = await getProducts(products[i].ean);
        const sortedProduct = sortByPriceProduct(product);
        data.push(sortedProduct);
    }
    return data;
}

//Hansa EAN: 7030019532615

async function getProducts(product) {
    try {
        const search = 'https://kassal.app/api/v1/products/ean/'+ product 
        const response = await fetch(search, {
            headers: {
                //New token because of github
                Authorization: 'Bearer ' + `${process.env.KASSAL_BEARER}`
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

function sortByPriceProduct(productData) {
    const listProducts = []
    for(let i = 0; i < productData.products.length; i++) {
        if(productData.products[i].current_price != null) {
            listProducts.push([productData.products[i].current_price.price, productData.products[i].store.name])
        }
    }
    let byPrice = listProducts.slice(0);
    byPrice.sort(function(a, b) {  
        return a[0] - b[0];
    });
    const byPriceInfo = {list : byPrice, name : productData.products[0].name}
    return byPriceInfo;
}




const data = await run(ean);
export default data;