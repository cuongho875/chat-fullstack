import { Router } from "express";
import userRoutes from "./auth";
import chatRoutes from "./chat";
import messageRoutes from "./message";


const appRoute = Router();

// api/v1/
appRoute.use("/auth",userRoutes)
appRoute.use("/chat",chatRoutes)
appRoute.use("/message",messageRoutes)
export default appRoute;