import { Router } from "express";
import AuthController from "../../controllers/administracao/auth_controller";
import auth_middleware from "../../middlewares/auth_middleware";

const authRouter = Router();

authRouter.post("/", AuthController.login);
authRouter.get("/verify", auth_middleware, AuthController.verify);
authRouter.get("/decode", auth_middleware, AuthController.decode);
authRouter.post("/refresh", AuthController.refreshToken);

export default authRouter;