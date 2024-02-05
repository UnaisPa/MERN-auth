import React, { useEffect, useState,useRef } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "../axios";
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ClipLoader } from "react-spinners";

const EditUser = () => {
    const fileRef = useRef();
    const userId = useParams();
    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState({});
    const [isBtnDisabled,setIsBtnDisabled] = useState(true);

    const [formData,setFormData] = useState({});

    const handleChange =(e) =>{
      setIsBtnDisabled(false)
      setFormData({...formData,[e.target.name]:e.target.value})
    }

    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`/admin/user/${userId.id}`,{withCredentials:true}).then((res)=>{
            setUser(res.data);
        }).catch((err)=>{
            toast.error(err.response.data || err.message);
        })
    },[])

    const handleSubmit = (e) =>{
      setLoading(true);
      e.preventDefault();
      //console.log(user._id);
      axios.put(`/admin/edit_user/${userId.id}`,formData,{withCredentials:true}).then((res)=>{
        setTimeout(()=>{
          setLoading(false);
          setUser(res.data);
          toast.success('Updated successfully');
        },1000).catch((err)=>{
          toast.error(err.response.data || err.message);
        })
      })
    }

  return (
    <div className="m-4 sm:mx-5  md:mx-12 mt-12 text-white">
      <Button onClick={()=>navigate('/admin/dashboard')} variant="text" color="info" startIcon={<ArrowBackIcon />}>
        Dashboard
      </Button>
      <div className=" w-full sm:w-full md:w-full  mt-10">
        <div className="flex  flex-wrap justify-center">
          <div className="h-60 m-2 w-full sm:w-60 ">
            {
                user.profilePhoto? (
                    <img className="object-cover h-60 min-w-60 mx-auto rounded-md" src={`/images/${user.profilePhoto}`} alt="" />
                ) :(<div className="h-60 min-w-60 border rounded-md border-slate-600 " >
                  <img className="object-cover h-40 min-w-40 mx-auto rounded-md  my-8" src="/localImages/user.png" >
                  
                  </img>
                </div>)
            }
          </div>
          <div className="h-60 m-2  w-full sm:w-96 ">
            <form onSubmit={handleSubmit} >
            <div className="">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
              />
            </div>
            <div className="my-2">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={user.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
              />
            </div>
            <div className="my-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
              />
            </div>
            {loading ? (
                <button
                  disabled
                  type=""
                  className="my-6 w-full rounded-md  bg-indigo-700 px-11 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {" "}
                  <ClipLoader color="white" size={13} className="mx-1" />{" "}
                  Loading...
                </button>
              ) : (
                <button
                disabled={isBtnDisabled?true:false}
                  type="submit"
                  className="my-6 disabled:bg-opacity-55 disabled:cursor-not-allowed  mb-4 w-full rounded-md bg-indigo-700 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Update Profile</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
