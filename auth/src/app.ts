import express from "express";
import "express-async-errors";

import cookieSession from "cookie-session";
// import morgan from "morgan";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

// App Settings

// trust ingress nginx proxy traffic
app.set("trust proxy", true);

// Middlewares
// app.use(morgan("dev"));
app.use(express.json());
app.use(
  cookieSession({
    signed: false, // disable encryption
    secure: process.env.NODE_ENV !== 'test', // HTTPS connections only
  }),
);

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

export { app };
