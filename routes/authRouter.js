import express from "express";
import {signup, signin} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

export default authRouter;

