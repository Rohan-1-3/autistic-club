import { pool } from "./pool.js"
import { v4 as uuid} from "uuid"

const addAUser = async (user)=>{
    const userId = uuid()
    const { firstname, lastname, username, password, isMember, isAdmin } = user;
    try{
        await pool.query(`
            INSERT INTO auth_users ( id, firstname, lastname, username, password, isMember, isAdmin)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, [userId, firstname, lastname, username, password, isMember, isAdmin]);
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
        const { rows } = await pool.query(`SELECT * FROM auth_users WHERE id = $1`,[userId])
        return {
            success: true,
            data: rows[0]
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
        await pool.query(`
            UPDATE auth_users
            SET firstname = $1, lastname = $2, username = $3,
                password = $4, ismember = $5, isadmin = $6
            WHERE id = $7
            `,[firstname, lastname, username, password, ismember, isadmin, id])
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
        await pool.query(`DELETE FROM auth_users WHERE id = $1`, [userId]);
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
        const result = await pool.query(`INSERT INTO messages (userId, id, message)
                          VALUES ($1, $2, $3)
                          RETURNING *`,[userId, messageId, message])
        return { 
            success: true,
            data: result.rows[0]
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
        const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1",[messageId]);
        return {
            success: true,
            data: rows[0]
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
        const { rows } = await pool.query(`
            SELECT username, date, message, isEdited FROM messages m
            JOIN auth_users au ON au.id = m.userId
            `)
        return {
            success: true,
            data: rows
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
        const { rows } = await pool.query(`SELECT * FROM messages WHERE userId = $1`,[userId])
        return {
            success: true,
            data: rows[0]
        };
    }catch(err){
        return {
            success: false,
            error: err
        }
    }
}

const updateMessage = async(messageId, updatedMessageDetail)=>{
    const { message, date, isEdited } = updatedMessageDetail;
    try{
        await pool.query(`
            UPDATE messages 
            SET message = $1, date = $2, isEdited = $3
            WHERE id = $4
            `,[message, date, isEdited, messageId])
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
        await pool.query("DELETE FROM messages WHERE id = $1",[messageId])
        return { success: true }
    }catch(err){
        return {
            success: false,
            error: err
        }
    }
}

export { addAUser, getUser, updateUser, deleteUser,
         addAMessage, getAMessage, updateMessage, deleteMessage,
         getAllMessages, getMessagesByUser };