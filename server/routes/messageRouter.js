import { Router } from "express";
import { addMessage, editMesssage, getAllMessages, getAllMessagesByUser, removeMessage } from "../controllers/messageController.js";

export const messageRouter = new Router();

messageRouter.get("/all", getAllMessages);

messageRouter.get("/:user_id", getAllMessagesByUser)

messageRouter.post("/add", addMessage);

messageRouter.delete("/delete/:message_id", removeMessage)

messageRouter.put("/update/:message_id", editMesssage);