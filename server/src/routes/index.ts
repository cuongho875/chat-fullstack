import { Router } from "express";
import userRoutes from "./auth";
import chatRoutes from "./chat";


const appRoute = Router();

// api/vi/user
appRoute.use("/auth",userRoutes)
appRoute.use("/chat",chatRoutes)
export default appRoute;