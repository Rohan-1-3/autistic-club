import { Router } from "express";
import { addMessage, editMesssage, getAllMessages, getAllMessagesByUser, removeMessage } from "../controllers/messageController.js";
import checkAuthentication from "../configs/authUser.js";

export const messageRouter = new Router();

messageRouter.get("/all", checkAuthentication, getAllMessages);

messageRouter.get("/:user_id", checkAuthentication, getAllMessagesByUser);

messageRouter.post("/add", checkAuthentication, addMessage);

messageRouter.delete("/delete/:message_id", checkAuthentication, removeMessage);

messageRouter.put("/update/:message_id", checkAuthentication, editMesssage);