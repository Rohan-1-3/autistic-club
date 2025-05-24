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
        return userId;
    }catch(err){
        console.log(err);
        return err;
    }
}

const getUser = async(userId)=>{
    try{
        const { rows } = await pool.query(`SELECT * FROM auth_users WHERE id = $1`,[userId])
        return rows[0];
    }catch(err){
        console.log(err)
    }
}

const updateUser = async(updatedUser)=>{
    const { userId, firstname, lastname, username, password, isMember, isAdmin } = updatedUser;
    try{
        await pool.query(`
            UPDATE auth_users
            SET firstname = $1, lastname = $2, username = $3,
                password = $3, isMember = $5, isAdmin = $6
            WHERE id = $7
            `,[firstname, lastname, username, password, isMember, isAdmin, userId])
    }catch(err){
        console.log(err)
    }
}

const deleteUser = async(userId)=>{
    try{
        await pool.query(`DELETE FROM auth_users WHERE id = $1`, [userId]);
    }catch(err){
        console.log(err)
    }
}

const addAMessage = async(userId, messageDetails)=>{
    const messageId = uuid();
    const { message, date } = messageDetails;
    try{
        await pool.query(`INSERT INTO messages (userId, id, message, date, isEdited)
                          VALUES ($1, $2, $3, $4, $5)`,[userId, messageId, message, date, false])
        return messageId
    }catch(err){
        console.log(err);
    }
}

const getAMessage = async(messageId)=>{
    try{
        const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1",[messageId]);
        return rows;
    }catch(err){
        console.log(err)
    }
}

const getAllMessages = async()=>{
    try{
        const { rows } = await pool.query(`
            SELECT username, date, message, isEdited FROM messages m
            JOIN auth_users au ON au.id = m.userId
            `)
        return rows;
    }catch(err){
        console.log(err);
    }
}

const getMessagesByUser = async(userId)=>{
    try{
        const { rows } = await pool.query(`SELECT * FROM messages WHERE userId = $1`,[userId])
        return rows[0];
    }catch(err){
        console.log(err)
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
    }catch(err){
        console.log(err)
    }
}

const deleteMessage = async(messageId)=>{
    try{
        await pool.query("DELETE FROM messages WHERE id = $1",[messageId])
    }catch(err){
        console.log(err);
    }
}

export { addAUser, getUser, updateUser, deleteUser,
         addAMessage, getAMessage, updateMessage, deleteMessage,
         getAllMessages, getMessagesByUser };