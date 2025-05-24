import { Router } from "express";
import { authenticateUser, loginUser, updateUser, logoutUser, registerUser, removeUser, getUser } from "../controllers/authController.js";

export const authRouter = new Router();

authRouter.post("/register", registerUser)

authRouter.post("/login", loginUser)

authRouter.post("/logout", logoutUser)

authRouter.delete("/delete/:user_id", removeUser)

authRouter.put("/update/:user_id", updateUser);

authRouter.get("/authenticate_user", authenticateUser)

authRouter.get("/get/:user_id", getUser)