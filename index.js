import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

const port = 3000;
// middleware
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
