import { Router } from "express";
import { login, logout, refresh, register } from "../controllers/authControllers";

const userRoutes = Router();

userRoutes.post("/register",register)
userRoutes.post("/login",login)
userRoutes.get("/refresh",refresh)
userRoutes.post("/logout",logout)
export default userRoutes;