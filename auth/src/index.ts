import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
const PORT = 3000;

// App Settings

// trust ingress nginx proxy traffic
app.set('trust proxy', true); 

// Middlewares
app.use(express.json());
app.use(cookieSession({
  signed: false, // disable encryption
  //secure: true, // HTTPS connections only
}));

// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// 404 Not Found
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// Error Handling Middleware
app.use(errorHandler);

// Main
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT must be defined");
    
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log('Connected to mongodb');
    
  } catch (err) {
    console.error(err);
  }
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
};


start();