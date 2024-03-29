import express from "express";
import { config } from "dotenv";
import appRoute from "./routes";
import cookiesParser from "cookie-parser"
import cors from "cors"
import corsOptions from "./config/corsOptions";

const app =  express();
config();

app.use(cookiesParser())
// parse application/json
app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}))

app.use(cors(corsOptions));


app.use("/api/v1",appRoute);

export default app;