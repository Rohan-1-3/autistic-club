import expressAsyncHandler from "express-async-handler"
import { addAMessage, deleteMessage, getAllMessages as getAllMessagesQuery, getMessagesByUser, getUser, updateMessage } from "../db/queries.js"
import { body } from "express-validator"
import { validateRequest } from "../configs/validateRequest.js"

const validateMessage = [
    body("message").trim().notEmpty().withMessage("Message must not be empty.")
    .isLength({min: 8}).withMessage("Message must be longer than 8 letters.")
]

const getAllMessages = expressAsyncHandler(async(req, res)=>{
    const response = await getAllMessagesQuery();
    if(!response.success){
        return res.status(400).json({err: response.error})
    }
    const messages = response.data;
    if(messages){
        return res.status(200).json(messages)
    }
    return res.status(200).json({ messages: [] });
})

const getAllMessagesByUser = expressAsyncHandler(async(req, res)=>{
    const response = await getMessagesByUser(req.params.user_id);
    if(!response.success){
        return res.status(400).json({err: response.error})
    }
    const messages = response.data;
    if(messages && messages.length > 0){
        return res.status(200).json({messages: messages})
    }
    return res.status(200).json({ messages: [] });
})

const addMessage = [
    validateMessage, validateRequest,
    expressAsyncHandler(async(req, res)=>{
        const response = await addAMessage(req.body.userId, req.body.message)
        if(!response.success){
            return res.status(400).json({err: response.error})
        }
        const data = response.data;
        const userResponse = await getUser(data.userid);
        const username = userResponse.data.username;
        const message = {
            username,
            id: data.id,
            message: data.message,
            date: data.date,
            isedited: data.isedited
        }
        return res.status(201).json(message)
    })
]

const removeMessage = expressAsyncHandler(async(req, res)=>{
    const response = await deleteMessage(req.params.message_id)
    if(!response.success){
        return res.status(400).json({err: response.error})
    }
    return res.status(200).json({message: "Message successfully deleted."})
})

const editMesssage = [
    validateMessage, validateRequest,
    expressAsyncHandler(async(req, res)=>{
        const response = await updateMessage(req.params.message_id, req.body);
        if(!response.success){
            return res.status(400).json({err: response.error})
        }
        return res.status(200).json({message: "Message successfully updated."})
    })
]

export { getAllMessages, getAllMessagesByUser, addMessage, removeMessage, editMesssage };