import express from "express";
import {signup} from "../controllers/authControllers.js";
import { userSignupSchema, userSigninSchema } from "../schemas/userSchemas.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);

export default authRouter;

