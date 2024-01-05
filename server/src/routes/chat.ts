import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT";
import { accessChats, fetchAllChats } from "../controllers/chatControllers";

const chatRoutes = Router();

chatRoutes.use(verifyJWT);
//fetch All Chats
chatRoutes.get('/fetchAllChats',fetchAllChats)  
chatRoutes.post('/accessChats',accessChats)

export default chatRoutes