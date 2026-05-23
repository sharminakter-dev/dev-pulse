import type { Request, Response } from "express";
import type { IUser } from "./auth.Interface";
import { pool } from "../../db";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError";
import jwt from "jsonwebtoken";
import { config } from "../../config";


//* create new user
const createUserIntoDB = async(payload: IUser)=>{
    const {name, email, password, role} = payload;
    console.log(password);
    const hashPassword = await bcrypt.hash(password, 1);
    console.log("bcrypt: ",password);
    const result = await pool.query(`
       INSERT INTO users 
       (name, email, password, role) 
       VALUES ($1, $2, $3, COALESCE($4, 'contributor'))
       RETURNING *;
    `, [name, email, hashPassword, role]);

    if(result.rowCount === 0 ){
        throw new AppError("Failed to create user", 400);
    }
    
    const {password:pass, ...safeUser} = result.rows[0];
    return safeUser;
}

// *login
const loginUserFromDB = async(payload: {
    email: string; 
    password: string
})=>{
    const {email, password} = payload;

    const result = await pool.query(`
       SELECT * FROM users 
       WHERE email = $1
    `, [email]);

    if(result.rowCount === 0){
        throw new AppError('user not found', 404);
    }

    const matchedPass = await bcrypt.compare(password, result.rows[0].password);
    if(!matchedPass){
        throw new AppError("Invalid Credentials!", 401);
    }

    const {password:pass, ...safeUser} = result.rows[0];

    return safeUser;
}

const getUserById = async(id: string)=>{
    const result = await pool.query(`
        SELECT id, name, email, role, created_at, updated_at 
        FROM users
        WHERE id = $1
    `, [id]);
    
    if(result.rowCount === 0){
        throw new AppError("user not found", 404);
    }

    return result.rows[0];
}

export const authService = {
    createUserIntoDB,
    loginUserFromDB,
    getUserById
}