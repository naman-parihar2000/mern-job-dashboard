import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

//ROUTER IMPORT
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routers/userRouter.js";

//  CUSTOM IMPORT
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WELCOME TO HEAVEN...");
});

app.post("/", (req, res) => {
  //   console.log(req);
  res.json({ data: req.body });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

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
  res.status(404).json({ msg: "NOT FOUND!" });
});

app.use(errorHandlerMiddleware);

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
