import { Router } from "express";
import AuthController from "../controllers/auth_controller";
import auth_middleware from "../middlewares/auth_middleware";

const authRouter = Router();

authRouter.post("/", AuthController.login);
authRouter.get("/verify", auth_middleware, AuthController.verify);

export default authRouter;