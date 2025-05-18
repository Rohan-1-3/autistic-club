import { Router } from "express";
import { loginUser, logoutUser, registerUser, removeUser } from "../controllers/authController";

export const authRouter = new Router();

authRouter.post("/register", registerUser)

authRouter.post("/login", loginUser)

authRouter.get("/log-out", logoutUser)

authRouter.delete("/delete/:user_id", removeUser)