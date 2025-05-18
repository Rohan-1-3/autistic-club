import expressAsyncHandler from "express-async-handler"
import { addAMessage, deleteMessage, getAllMessages as getAllMessagesQuery, getMessagesByUser, updateMessage } from "../db/queries"
import { body } from "express-validator"
import { validateRequest } from "../configs/validateRequest.js"

const validateMessage = [
    body("messageText").trim().notEmpty().withMessage("Message must not be empty.")
    .isLength({min: 8}).withMessage("Message must be longer than 8 letters.")
]

const getAllMessages = expressAsyncHandler(async(req, res)=>{
    const messages = await getAllMessagesQuery()
    if(messages){
        return res.status(200).json({messages: messages})
    }
    return res.status(200).json({ messages: [] });
})

const getAllMessagesByUser = expressAsyncHandler(async(req, res)=>{
    const messages = await getMessagesByUser(req.params.user_id);
    if(messages){
        return res.status(200).json({messages: messages})
    }
    return res.status(200).json({ messages: [] });
})

const addMessage = [
    validateMessage, validateRequest,
    expressAsyncHandler(async(req, res)=>{
        const messageId= await addAMessage(req.body.userId, req.body.messageDetails)
        return res.status(201).json({
            message: "Message successfully added.",
            messageId: messageId
        })
    })
]

const removeMessage = expressAsyncHandler(async(req, res)=>{
    await deleteMessage(req.params.message_id)
    return res.status(200).json({message: "Message successfully deleted."})
})

const editMesssage = [
    validateMessage, validateRequest,
    expressAsyncHandler(async(req, res)=>{
        await updateMessage(req.params.message_id, req.body.messageDetails);
        return res.status(200).json({message: "Message successfully updated."})
    })
]

export { getAllMessages, getAllMessagesByUser, addMessage, removeMessage, editMesssage };