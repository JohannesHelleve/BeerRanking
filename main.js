import express from 'express';
import beerData from './beerData.mjs';

const app = express();
const port = 1000;
console.log(beerData.data);
app.use(express.static("static"));
app.get("/data", (_req, res) => {
  let test = {test : "test"};
  run
  res.json(test);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

