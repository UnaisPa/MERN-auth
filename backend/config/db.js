import mongoose from "mongoose";

const connectDB = async () =>{  
    try{
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected :${con.connection.host}`)
    }catch(err){
        console.error(`MongoDB Error :${err.message}`);
        process.exit(1)
    }
}

export default connectDB