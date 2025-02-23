import express from "express";
import "dotenv/config";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";
import { connectDB } from "./db/db.config.js";

const app = express();

const port = process.env.PORT || 3001;
// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/user", userRouter);
app.use("/task", taskRouter);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(console.dir);
