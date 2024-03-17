import express from "express";
import { signup, signin, getCurrent, signout } from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/current", authenticate, getCurrent);
authRouter.post("/signout", authenticate, signout);

export default authRouter;
