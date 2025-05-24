import { Router } from "express";
import { authenticateUser, loginUser, logoutUser, registerUser, removeUser } from "../controllers/authController.js";

export const authRouter = new Router();

authRouter.post("/register", registerUser)

authRouter.post("/login", loginUser)

authRouter.post("/logout", logoutUser)

authRouter.delete("/delete/:user_id", removeUser)

authRouter.get("/authenticate_user", authenticateUser)