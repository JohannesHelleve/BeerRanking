import express from "express";
const app = express();
const port = process.env.port || 1000;

//add mongo

app.use(express.static("static"));
app.get("/data", async (_req, res) => {
  try {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end("<p>Hello World</p>");
  } catch (error) {
    res.status(1100).send('Internal Server Error'); // Handle errors if the async operation fails
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



export default app;