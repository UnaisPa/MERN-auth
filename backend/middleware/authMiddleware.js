import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    token = req.cookies.jwt;

    if(token){
        //console.log(token);
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        }catch(err){
            res.status(401);
            console.log('error')
            throw new Error('Not authorized , Invalid token')
        }
    }else{
        res.status(401);
        console.log('no token')

        throw new Error('Not authorized , Not token')
    }
})

export {protect}