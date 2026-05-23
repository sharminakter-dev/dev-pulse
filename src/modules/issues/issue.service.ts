import { pool } from "../../db";
import { AppError } from "../../utils/AppError";
import { type CreateIssuePayload, type UpadteIssuePayload } from "./issue.type"


const createIssueIntoDB = async(payload: CreateIssuePayload, reporter_id: string)=>{
    const {title, description, type} = payload;

    const result = await pool.query(`
        INSERT INTO issues
        (title, description, type, reporter_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [title, description, type, reporter_id]);

    if(result.rowCount === 0){
        throw new AppError("Failed to create issue", 400)
    }
    
    return result.rows[0];
}

const getALLIssuesFromDB = async(query: any)=>{
    const { sort="newest", type, status } = query;
    const values= [];

    let dbQuery = `SELECT * FROM issues
       WHERE 1=1`;

    if(type){
        values.push(type)
        dbQuery += ` AND type = $${values.length}`; 
    }

    if(status){
        values.push(status);
        dbQuery += ` AND status = $${values.length}`;
    }

    if(sort === "oldest"){
        dbQuery += ` ORDER BY created_at ASC`;
    }else{
        dbQuery += ` ORDER BY created_at DESC`;
    }

    const result = await pool.query(dbQuery, values);


    if(result.rowCount === 0){
        throw new AppError("Issue not found", 404);
    }

    return result.rows;
}

const getSingleIssueFromDB = async (id: string)=>{

    const result = await pool.query(`
        SELECT * FROM issues 
        WHERE id = $1
    `, [id]);
    
    if(result.rowCount === 0){
        throw new AppError("Issue Not Found", 404);
    }
    return result.rows[0];
}

const updateIssueIntoDB = async(payload: UpadteIssuePayload, id: string)=>{
    const {title, description, type} = payload;
    const fields = [];
    const values = [];

    if(title){
        values.push(title);
        fields.push(`title = $${values.length}`)
    }
    if(description){
        values.push(description);
        fields.push(`description = $${values.length}`)
    }
    if(type){
        values.push(type);
        fields.push(`type = $${values.length}`)
    }

    values.push(id);

    const query = `
        UPDATE issues
        SET ${fields.join(', ')}\
        WHERE id = $${values.length}
    `
    const result = await pool.query(query, values);

    if(result.rowCount === 0){
        throw new AppError("Issue Not Found", 404);
    }

    return result.rows[0];
}

const deleteIssueFromDB = async(id: string)=>{
    const result = await pool.query(`
       DELETE FROM issues
       WHERE id = $1
       RETURNING *; 
    `, [id]);

    if(result.rowCount === 0){
        throw new AppError("Issue Not Found", 404);
    }
    return
}

export const issueService = {
    createIssueIntoDB,
    getALLIssuesFromDB,
    getSingleIssueFromDB,
    updateIssueIntoDB,
    deleteIssueFromDB
}