import app from "./app"
import { config } from "./config"
import { initDB } from "./db"

const main = async()=>{

    // initialize db schema
    await initDB()

    // listening on app
    app.listen(config.port, ()=>{
        console.log(`Server is listening on port ${config.port}`);
    })
}


//todo -> node_env -> production
//todo -> cookie settings in authController ->true in production


main();