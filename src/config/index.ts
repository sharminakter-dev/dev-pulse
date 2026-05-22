import { configDotenv } from "dotenv";
import path from "node:path";
import { env } from "node:process";

configDotenv({path: path.resolve(process.cwd(), ".env"), quiet: true});

export const config = {
    port: env.PORT,
    connectionString:env.COONECTION_STRING,
    node_env: env.NODE_ENV,
}