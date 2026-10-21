import { Router } from "express";
import { registerController}from "../controllers/auth/register.controller.js";
import { loginController } from "../controllers/auth/login.controller.js";
import { meController } from "../controllers/auth/me.controller.js";

const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.get("/me", meController);

export default authRoutes;