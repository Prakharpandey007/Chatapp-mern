import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/authroutes.js";
import connectToMongoDB from "./db/mongodb.js";
const app=express();
dotenv.config();
const PORT=process.env.PORT || 8002;


//middlewares
app.use(express.json()); // to parse the incoming request with json payloads from  req.body
app.use('/api/auth',authroutes);
app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running succesfully on port ${PORT}`);
})