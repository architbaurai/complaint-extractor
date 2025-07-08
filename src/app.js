import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import { Complaint } from "./models/complaint.model.js";
import { twitterCronJob } from "./cronJobs.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: "true",
    limit: "16kb",
  })
);

app.use(express.static("public"));

//cron job

twitterCronJob();

//routes

import complaintRouter from './routes/complaint.routes.js';
app.use("/api/v1/complaint", complaintRouter);

export { app };
