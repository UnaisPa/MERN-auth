import  jwt  from "jsonwebtoken";
import  ObjectId  from "mongoose";
export const generateToken = async (res, userId) =>{
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
            expiresIn:'30d'
        })
        //console.log('Token generated successfully',token);

        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure:true,
            maxAge:30 * 24 * 60 *1000
        });

        //console.log('kiu')
    } catch (error) {
        console.error('Error generating token:', error);
    }
} 

