import {Pool} from "pg"
import { config } from "../config"

const pool = new Pool({
    connectionString: config.connectionString
});

export const initDB = async()=>{
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(20) NOT NULL,
                email VARCHAR(30) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(20) NOT NULL DEFAULT 'contributor',

                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            )    
        `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS issues(
                id SERIAL PRIMARY KEY,
                title VARCHAR(150) NOT NULL,
                description TEXT NOT NULL CHECK(char_length(description) >=20 ),
                type VARCHAR(20) NOT NULL CHECK(type IN ('bug', 'feature_request')),
                status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK(status IN ('open', 'in_progress', 'resolved')),
                reporter_id INT NOT NULL REFERENCES users(id),

                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            )    
        `)

        console.log("DB connection successful.")
    }catch(err){
        console.log(err);
    }
}