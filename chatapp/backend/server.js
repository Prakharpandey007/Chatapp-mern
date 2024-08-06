import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/authroutes.js";
import messageroutes from './routes/messageroutes.js';
import connectToMongoDB from "./db/mongodb.js";
import cookieParser from 'cookie-parser';
const app=express();
dotenv.config();
const PORT=process.env.PORT || 8002;


//middlewares
app.use(express.json()); // to parse the incoming request with json payloads from  req.body
app.use(cookieParser());// token from cookie parser 
app.use('/api/auth',authroutes);
app.use('/api/message',messageroutes);
app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running succesfully on port ${PORT}`);
})