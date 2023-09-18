import express from "express";
const app = express();
const port = process.env.PORT || 1000;


app.use(express.static("static"));
app.get("/", async (_req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    res.status(1100).send('Internal Server Error'); // Handle errors if the async operation fails
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



module.exports = app;