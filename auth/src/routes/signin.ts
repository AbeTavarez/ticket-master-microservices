import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../utilities/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // find user in db by email
    const dbUser = await User.findOne({ email });

    if (!dbUser) {
      throw new BadRequestError("Check credentials");
    }

    // check password
    const passwordMatch = await Password.compare(dbUser.password, password);

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials!");
    }

    // Create JWT
    const userJWT = jwt.sign(
      {
        id: dbUser.id,
        email: dbUser.email,
      },
      process.env.JWT_KEY!,
    );
    // Store JWT in the session object
    req.session = {
      jwt: userJWT,
    };

    res.status(200).send(dbUser);
  },
);

export { router as signinRouter };
