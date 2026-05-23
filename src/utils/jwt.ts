import { config } from "../config";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { RUser } from "../modules/auth/auth.Interface";
import { AppError } from "./AppError";

export const verifyToken = (token: string, type: "access" | "refresh")=>{
    const secret = type === "access"? config.secret : config.refresh_secret;

    const decoded = jwt.verify(
        token, 
        secret as string
    ) as JwtPayload;

    if(!decoded){
        throw new AppError("Forbidden access", 403)
    }
    
    return decoded;
}


export const loginToken = (user: RUser & {id:string})=>{
        
        const jwtPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }

        const token = jwt.sign(jwtPayload, config.secret as string ,{
        expiresIn:'10h'
    });

    const refreshToken = jwt.sign(jwtPayload, config.refresh_secret as string, {
        expiresIn:'10d'

    });

    return {token, refreshToken};

}