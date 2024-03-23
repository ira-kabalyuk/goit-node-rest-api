import express from "express";
import { signup, signin, getCurrent, signout, uploadAvatar} from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", upload.single("avatar"), signup);
authRouter.post("/login", signin);
authRouter.get("/current", authenticate, getCurrent);
authRouter.post("/logout", authenticate, signout);
authRouter.patch("/avatars", upload.single("avatar"), authenticate, uploadAvatar);

export default authRouter;