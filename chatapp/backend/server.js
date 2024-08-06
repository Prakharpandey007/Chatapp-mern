import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/authroutes.js";
const app=express();
dotenv.config();
const PORT=process.env.PORT|| 8002;
app.get("/",(req,res)=>{
    //root route https://localhost:8000/
    res.send("hello world ");
})

app.use('/api/auth',authroutes);
app.listen(PORT,()=>{
    console.log(`server running succesfully on port ${PORT}`);
})