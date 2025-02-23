import { getDB } from "./db.config.js";
const db = getDB();
export const userCollection = db.collection("userCollection");
export const taskCollection = db.collection("taskCollection");
