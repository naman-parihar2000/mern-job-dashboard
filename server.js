import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";

//  CUSTOM IMPORT
import jobRouter from "./routes/jobRouter.js";

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

app.use("/api/v1/jobs", jobRouter);

// //GET ALL JOBS
// app.get("/api/v1/jobs");

// //CREATE A JOB
// app.post("/api/v1/jobs");

// //GET A JOB BY ID
// app.get("/api/v1/jobs/:id");

// //EDIT JOB BY ID
// app.patch("/api/v1/jobs/:id");

// //DELETE A JOB BY ID
// app.delete("/api/v1/jobs/:id");

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found!" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "somthing went wrong!" });
});

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log(`DATABASE CONNECTED`);
  app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
