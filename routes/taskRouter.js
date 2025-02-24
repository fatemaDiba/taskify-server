import express from "express";
import { ObjectId } from "mongodb";
import { taskCollection } from "../db/dbCollection.js";

const taskRouter = express.Router();

taskRouter.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    const result = await taskCollection.find({ userID }).toArray();
    return res.send(result);
  } catch (err) {
    console.log("Error Fetching Tasks");
    return res.status(500).send("Error Fetching Tasks");
  }
});

taskRouter.post("/", async (req, res) => {
  const data = req.body;
  try {
    const result = await taskCollection.insertOne(data);
    return res.send(result);
  } catch (err) {
    console.log("Error Adding Tasks");
    return res.status(500).send("Error Adding Tasks");
  }
});

taskRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: { ...data },
    };

    const options = { upsert: true };

    const result = await taskCollection.updateOne(filter, updateDoc, options);
    return res.send(result);
  } catch (err) {
    console.log("Error Updating Tasks");
    return res.status(500).send("Error Updating Tasks");
  }
});

taskRouter.patch("/update-state/:id", async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  if (!state) {
    return res.status(400).send("State field is required");
  }

  try {
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: { state },
    };

    const options = { upsert: false };

    const result = await taskCollection.updateOne(filter, updateDoc, options);

    if (result.matchedCount === 0) {
      return res.status(404).send("Task not found");
    }

    return res.send({ message: "Task updated successfully", result });
  } catch (err) {
    console.log("Error updating task:", err);
    return res.status(500).send("Error updating task");
  }
});

taskRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  try {
    const result = await taskCollection.deleteOne(query);
    return res.send(result);
  } catch (err) {
    console.log("Error Deleting Tasks");
    return res.status(500).send({ error: true }, "Error Deleting Tasks");
  }
});

export default taskRouter;
