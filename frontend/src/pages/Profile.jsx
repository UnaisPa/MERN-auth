import React, { useState,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { updateCurrentUser} from "../redux/userSlice";

import axios from "../axios";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [loading,setLoading] = useState(false);
  const [profile,setProfile] = useState(currentUser.profilePhoto);
  const fileRef = useRef();
  const handleChange = async(e) =>{
    const selectedFile = e.target.files[0];
    setProfile(selectedFile);

    if(selectedFile){
      const formData = new FormData();
      formData.append('image', selectedFile);

      try{
        const response = await axios.post('/users/upload',formData,{params:{id:currentUser._id}});
        console.log(response.data);
        dispatch(updateCurrentUser(response.data));
      }catch(err){
        console.log('Error occured when uploading image :',err);
      }
    }
  }
  return (
    <>
      <div className="mx-4 md:mx-12 text-white">
        <h1 className="text-center font-semibold mt-5 text-slate-400">
          Profile
        </h1>
        
        <div className="my-8">
          <input ref={fileRef} onChange={handleChange} type="file" hidden  />
          {currentUser.profilePhoto?(<img
            className="rounded-full object-cover w-20 h-20 mx-auto md:w-32 md:h-32 cursor-pointer "
            src={`/images/${currentUser.profilePhoto}`}
            alt="helooo"
            onClick={()=>fileRef.current.click()}
          />):(<div onClick={()=>fileRef.current.click()} className="rounded-full object-cover bg-slate-50 h-20 w-20 mx-auto md:w-32 md:h-32 cursor-pointer ">

          </div>)}
          <div className="w-full md:w-2/5 mx-auto mt-5">
            <div className="my-4">
              <input
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
              <button className="my-3 w-full rounded-md bg-indigo-700 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {" "}
                Update
              </button>
            )}
            <p className="p-1 text-sm ml-auto bg-orange-700 w-32 hover:bg-opacity-85 rounded-md text-center" >Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
