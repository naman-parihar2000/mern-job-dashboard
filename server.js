import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to heaven...");
});

app.post("/", (req, res) => {
  //   console.log(req);
  res.json({ data: req.body });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}...`);
});
