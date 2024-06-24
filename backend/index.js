import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import user from "./routes/userRoute.js";

//connecting to my database
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

//creation of server and routes
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use('/user',user);

app.listen(port,()=>console.log('server up'));
