import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import { rateLimit } from 'express-rate-limit'
connectDB();
let app = express();

//middleware stack
app.use(express.json());

const limiter = rateLimit({
	windowMs: 60 * 1000, 
	limit: 5,
	standardHeaders: 'draft-8',
	legacyHeaders: false, 
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  let err = new Error("Page not found");
  err.statusCode = 404;
  next(err);
});

//global error handler
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

export default app;