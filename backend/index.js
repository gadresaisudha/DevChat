//import from dependencies
import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

//import from the files
import connectDB from "./config/db.js";
import user from "./routes/userRoute.js";
import post from "./routes/postRoute.js";


//connecting to my database
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

//creation of server and routes
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/user',user);
app.use('/api/post',post);


app.listen(port,()=>console.log('server up'));
