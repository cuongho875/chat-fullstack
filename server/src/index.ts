import app from "./app";
import connectMongoDB from "./config/db";
import { connection } from "mongoose";
import morgan from "morgan"
const port = process.env.PORT || 5000;


connectMongoDB();
app.use(morgan('dev'))
connection.once("open",()=>{
    console.log("Connected to Mongo DB");
    app.listen(port,()=>{
        console.log(`Server is running at http://localhost:${port}`)
    })
})