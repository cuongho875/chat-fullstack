import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT";

const chatRoutes = Router();

chatRoutes.use(verifyJWT);
chatRoutes.get('/',(req,res)=>{
    res.send("hello")
})  

export default chatRoutes