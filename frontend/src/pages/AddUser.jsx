import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../axios.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddUser = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    image:null
  };
  const [formData, setFormData] = useState(initialState);
  const [validateErrors, setValidateErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const [profile,setProfile] = useState('')
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
      console.log(e.target.files[0]);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

//   const handleProfilePhoto = (e) =>{
//     const selectedFile = e.target.files[0];
//     if (!selectedFile.type.startsWith('image/')) {
//       toast.error('Please select only image files.');
//       return;
//     }
//     setProfile(selectedFile);
//     console.log(selectedFile)
//     if(selectedFile){
//       const formData = new FormData();
//       formData.append('image', selectedFile);
//     }
//   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate(formData);

    //console.log(formData.image)

    if (Object.keys(formErrors).length == 0) {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('image', formData.image);

        
        axios.post('/admin/add_user',data,{headers: {
            'Content-Type': 'multipart/form-data',
          },withCredentials:true}).then((res)=>{
            toast.success(res.data)
        }).catch((err)=>{
            toast.error(err.response?err.response.data: err.message);
        })
    }
  };

  const validate = (formDatas) => {
    const formErrors = {};
    if (formDatas.email.trim() == "") {
      formErrors.email = "Enter your Email address";
    }
    if (formDatas.name.trim() == "") {
      formErrors.name = "Enter your Name";
    }

    if (formDatas.password.trim() == "") {
      formErrors.password = "Please enter your Password";
    }
    setValidateErrors(formErrors);
    return formErrors;
  };

  return (
    <>
      <div className=" w-full mt-6 text-white mx-auto h-[420px] sm:w-[450px]">
        <h1 className="text-center  text-2xl font-semibold my-6">Add User</h1>

        <form onSubmit={handleSubmit}>
          <div className="text-white mx-5 mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
              style={validateErrors.name && { color: "rgb(194 65 12)" }}
            >
              {validateErrors.name ? validateErrors.name : "Name"}
            </label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                style={validateErrors.name && { borderColor: "rgb(194 65 12)" }}
                placeholder="Enter User Name"
                className="w-full bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="text-white mx-5 mt-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
              style={validateErrors.email && { color: "rgb(194 65 12)" }}
            >
              {validateErrors.email ? validateErrors.email : "Email address"}
            </label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                style={
                  validateErrors.email && { borderColor: "rgb(194 65 12)" }
                }
                placeholder="Enter email"
                className="w-full bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="text-white mx-5 mt-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
              style={validateErrors.password && { color: "rgb(194 65 12)" }}
            >
              {validateErrors?.password ? validateErrors.password : "Password"}
            </label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                style={
                  validateErrors.password && { borderColor: "rgb(194 65 12)" }
                }
                placeholder="Enter Password"
                className="w-full bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none  focus:ring-1 focus:border-blue-500"
              />
            </div>
            <label
              htmlFor="email"
              className="block mt-2 text-sm font-medium leading-6"
            >
              User Profile Photo
            </label>
            <input
              ref={fileRef}
              accept="image/*"
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              hidden
            />
            <button
              onClick={() => fileRef.current.click()}
              type="button"
              className="mt-2 w-full rounded-md bg-slate-700 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            >
              Tap to add Profile Photo
            </button>
            {loading ? (
              <button
                disabled
                className="my-6 w-full rounded-md bg-indigo-700 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ClipLoader color="white" size={13} className="mx-1" /> SIGN UP
              </button>
            ) : (
              <button className="my-6 w-full rounded-md bg-indigo-700 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {" "}
                SIGN UP
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
