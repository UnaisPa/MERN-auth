import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import {GoogleAuthProvider,signInWithPopup,getAuth} from "@firebase/auth"
import { app } from '../firebase';
import axios from "../axios.js";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from '../redux/userSlice.js';

const GoogleBtn = () => {
    const dispatch = useDispatch();
    const handleGoogleBtn = async(e) =>{
        e.preventDefault();
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider)
            console.log(result);
            const response = await axios.post('/users/auth-google',{
                name:result.user.displayName,
                email:result.user.email,
                photo:result.user.photoURL
            },{withCredentials:true})
            console.log(response.data);
            dispatch(signInSuccess(response.data))
        }catch(err){
            console.log('Problem with google btn :'+ err)
        }
    }
  return (
    <button onClick={handleGoogleBtn} type='button' className=' w-full my-3 rounded-md bg-red-500 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' >
        <GoogleIcon className='' fontSize='medium' /> Continue with Google
    </button>
  )
}

export default GoogleBtn