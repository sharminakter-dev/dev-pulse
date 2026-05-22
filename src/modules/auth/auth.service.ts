import type { Request, Response } from "express";
import type { User } from "../../types";
import { pool } from "../../db";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError";
import jwt from "jsonwebtoken";
import { config } from "../../config";


const createUserIntoDB = async(payload: User)=>{
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

    const {password:pass, ...safeUser} = result.rows[0]
    return safeUser;
}

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

    const jwtPayload = {
        id: safeUser.id,
        name: safeUser.name,
        role: safeUser.role,
    }

    const token = jwt.sign(jwtPayload, config.secret as string ,{
        expiresIn:'10h'
    });

    const refreshToken = jwt.sign(jwtPayload, config.refresh_secret as string, {
        expiresIn:'10d'

    })


    return {token:token, user:safeUser, refreshToken:refreshToken};

}

export const authService = {
    createUserIntoDB,
    loginUserFromDB,
}