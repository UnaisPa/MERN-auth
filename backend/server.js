import  Express  from "express";
import dotenv from "dotenv"
import cors from "cors";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js"

connectDB();

const app = Express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // If your frontend sends credentials (like cookies)
}));
  
app.use(Express.json());
app.use(Express.urlencoded({extended:true}));
app.use(cookieParser())

app.use('/api/users',userRouter);
app.use('/api/admin',adminRouter);

app.get('/',(req,res)=>{
    res.send('server started');
})
app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server started on port :${port}`);
})