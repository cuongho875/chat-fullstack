import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT";
import { sendMessage } from "../controllers/messageControllers";

const messageRoutes = Router();

messageRoutes.use(verifyJWT);

messageRoutes.post("/send/:chatId",sendMessage)

export default messageRoutes