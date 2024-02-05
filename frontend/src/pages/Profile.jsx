import React, { useState,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { updateCurrentUser,signOut} from "../redux/userSlice";
import {toast} from "react-toastify"
import axios from "../axios";
import {useNavigate} from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [loading,setLoading] = useState(false);
  const [profile,setProfile] = useState(currentUser.profilePhoto);
  const [isBtnDisabled,setIsBtnDisabled] = useState(true);
  const [formData,setFormData] = useState({});
  const fileRef = useRef();


  //Updation of Profile Photo
  const handleChange = async(e) =>{
    const selectedFile = e.target.files[0];
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select only image files.');
      return;
    }
    setProfile(selectedFile);

    if(selectedFile){
      const formData = new FormData();
      formData.append('image', selectedFile);

      try{
        const response = await axios.post('/users/upload',formData,{params:{id:currentUser._id}});
        console.log(response.data);
        dispatch(updateCurrentUser(response.data));
        toast.success('Profile Picture updated successfully!')
      }catch(err){
        toast.error(err.response?err.response.data:err.message);
        console.log('Error occured when uploading image :',err);
      }
    }
  }


  //Logout api handling
  const handleLogout =async(e) =>{
    e.preventDefault();
    try{
      const res = await axios.post('/users/logout',{},{withCredentials:true});
      console.log(res.data);
      dispatch(signOut())
      toast.success('Logged Out');
      navigate('/');
    }catch(err){
      toast.error(err.message);
    }
  }


  //Profile form inputs handle change
  const formHandleChange = (e) =>{
    setIsBtnDisabled(false)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  //Profile form handle submit
  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);
    // console.log(formData);
    try{
      const response = await axios.put('/users/profile',formData,{
        withCredentials:true
      })
      console.log(response.data);
      dispatch(updateCurrentUser(response.data));
      setTimeout(()=>{
        toast.success('Profile updated successfully!')
        setLoading(false)
      },1500);

    }catch(err){
      toast.error(err.response? err.response.data:err.message);
    }
  }


  return (
    <>
      <div className="mx-4 md:mx-12 text-white">
        <h1 className="text-center font-semibold mt-5 text-slate-400">
          Profile
        </h1>
        
        <div className="my-8">
          <input ref={fileRef} accept="image/*" onChange={handleChange} type="file" hidden  />
          {currentUser.profilePhoto?(<img
            className="rounded-full object-cover w-20 h-20 mx-auto md:w-32 md:h-32 cursor-pointer "
            src={`/images/${currentUser.profilePhoto}`}
            alt="helooo"
            onClick={()=>fileRef.current.click()}
          />):(<div onClick={()=>fileRef.current.click()} className="flex justify-center py-6 rounded-full object-cover bg-slate-50 h-20 w-20 mx-auto md:w-32 md:h-32 cursor-pointer ">
              <PersonIcon color="primary" />
          </div>)}
          <div className="w-full md:w-2/5 mx-auto mt-5">
            <form onSubmit={handleSubmit} >
            <div className="my-4">
              <input
                onChange={formHandleChange}
                id="name"
                name="name"
                type="text"
                defaultValue={currentUser.name}
                autoComplete="name"
                placeholder="Enter your email"
                className="w-full bg-[#ffffff0f] text-center px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
              />
            </div>
            <div className="my-4">
              <input
                id="email"
                onChange={formHandleChange}
                name="email"
                type="email"
                defaultValue={currentUser.email}
                autoComplete="email"
                placeholder="Enter your email"
                className="w-full bg-[#ffffff0f] text-center  px-4 py-2  rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
              />
            </div>
            <div className="my-4">
              <input
                id="password"
                onChange={formHandleChange}
                name="password"
                type="password"
                autoComplete="password"
                placeholder="Password"
                className="w-full bg-[#ffffff0f] text-center  px-4 py-2  rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
              />
            </div>
            {loading ? (
              <button
                disabled
                className="my-3 w-full rounded-md bg-indigo-700 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ClipLoader color="white" size={13} className="mx-1" /> Update
              </button>
            ) : (
              <button disabled={isBtnDisabled?true:false} className={`disabled:bg-opacity-55 disabled:cursor-not-allowed  my-3 w-full rounded-md bg-indigo-700 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                {" "}
                Update
              </button>
            )}
            <p onClick={handleLogout} className="cursor-pointer p-1 text-sm ml-auto bg-orange-700 w-32 hover:bg-opacity-85 rounded-md text-center" >Logout</p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
