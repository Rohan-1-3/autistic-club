import prisma from "./prismaClient.js"
import { v4 as uuid} from "uuid"

const addAUser = async (user)=>{
    const userId = uuid()
    const { firstname, lastname, username, password, isMember, isAdmin } = user;
    try{
        await prisma.user.create({
            data: {
                id: userId,
                firstname,
                lastname,
                username,
                password,
                ismember: isMember,
                isadmin: isAdmin
            }
        });
        return {
            success: true,
            data: userId
        };
    }catch(err){
        return {
            success: false,
            error: err
        };
    }
}

const getUser = async(userId)=>{
    try{
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        return {
            success: true,
            data: user
        };
    }catch(err){
        return {
            success: false,
            error: err
        }
    }
}

const getUserByUsername = async(username)=>{
    try{
        const user = await prisma.user.findUnique({
            where: { username }
        });
        return {
            success: true,
            data: user
        };
    }catch(err){
        return {
            success: false,
            error: err
        }
    }
}

const updateUser = async(updatedUser)=>{
    const { id, firstname, lastname, username, password, ismember, isadmin } = updatedUser;
    try{
        await prisma.user.update({
            where: { id },
            data: {
                firstname,
                lastname,
                username,
                password,
                ismember,
                isadmin
            }
        });
        return {
            success: true
        }
    }catch(err){
        return {
            success: false,
            error: err
        }
    }
}

const deleteUser = async(userId)=>{
    try{
        await prisma.user.delete({
            where: { id: userId }
        });
        return { success: true }
    }catch(err){
        return {
            success: false,
            error: err
        }
    }
}

const addAMessage = async(userId, message)=>{
    const messageId = uuid();
    try{
        const result = await prisma.message.create({
            data: {
                id: messageId,
                userid: userId,
                message
            }
        });
        return { 
            success: true,
            data: result
         }
    }catch(err){
        return {
            success: false,
            error: err
        }
    }
}

const getAMessage = async(messageId)=>{
    try{
        const message = await prisma.message.findUnique({
            where: { id: messageId }
        });
        return {
            success: true,
            data: message
        };
    }catch(err){
        return {
            success: false,
            error: err
        }
    }
}

const getAllMessages = async()=>{
    try{
        const messages = await prisma.message.findMany({
            include: {
                auth_users: {
                    select: {
                        username: true
                    }
                }
            },
            orderBy: {
                date: 'asc'
            }
        });
        
        // Transform the data to match the original format
        const transformedMessages = messages.map(msg => ({
            id: msg.id,
            username: msg.auth_users?.username,
            date: msg.date,
            message: msg.message,
            isedited: msg.isedited
        }));
        
        return {
            success: true,
            data: transformedMessages
        };
    }catch(err){
        return {
            success: false,
            error: err
        }
    }
}

const getMessagesByUser = async(userId)=>{
    try{
        const messages = await prisma.message.findMany({
            where: { userid: userId }
        });
        return {
            success: true,
            data: messages
        };
    }catch(err){
        return {
            success: false,
            error: err
        }
    }
}

const updateMessage = async(messageId, updatedMessageDetail)=>{
    const { message } = updatedMessageDetail;
    try{
        await prisma.message.update({
            where: { id: messageId },
            data: {
                message,
                isedited: true
            }
        });
        return { success: true }
    }catch(err){
        return {
            success: false,
            error: err
        }
    }
}

const deleteMessage = async(messageId)=>{
    try{
        await prisma.message.delete({
            where: { id: messageId }
        });
        return { success: true }
    }catch(err){
        return {
            success: false,
            error: err
        }
    }
}

export { addAUser, getUser, getUserByUsername, updateUser, deleteUser,
         addAMessage, getAMessage, updateMessage, deleteMessage,
         getAllMessages, getMessagesByUser };