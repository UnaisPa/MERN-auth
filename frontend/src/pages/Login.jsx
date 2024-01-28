import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios.js";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { ClipLoader } from "react-spinners";
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [validateErrors, setValidateErrors] = useState({});

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formErrors = validate(formData);
    if (Object.keys(formErrors).length == 0) {
      try {
        dispatch(signInStart());
        const response = await axios.post("/users/auth", {
          formData,
        });
        dispatch(signInSuccess(response.data));
      } catch (error) {
        console.error("Login error:", error);
        dispatch(signInFailure(error.response ? error.response.data : error.message));
        setTimeout(()=>{
          dispatch(signInFailure(''))
        },1000 * 10)
      }
    }
  };

  const validate = (formDatas) => {
    const formErrors = {};
    if (formDatas.email.trim() == "") {
      formErrors.email = "Enter your Email address";
    }

    if (formDatas.password.trim() == "") {
      formErrors.password = "Please enter your Password";
    }
    setValidateErrors(formErrors);
    return formErrors;
  };
  return (
    <>
      <div className=" my-auto">
        <div className="my-auto w-full mt-10 text-white mx-auto h-[420px] sm:w-[450px]">
          <h1 className="text-center  text-2xl font-semibold py-6">
            Sign in to your account
          </h1>
          {error&&<p className="text-center text-orange-700 my-2" >{error} <ReportProblemRoundedIcon fontSize="small" /> </p>}
          <form onSubmit={handleSubmit}>
            <div className="text-white mx-5 mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
                style={validateErrors.email && { color: "rgb(194 65 12)" }}
              >
                {validateErrors.email ? validateErrors.email : "Email address"}
              </label>
              {/* {validateErrors.email?<p>{validateErrors.email}</p>:''} */}
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  style={validateErrors.email && { borderColor: "rgb(194 65 12)" }}
                  placeholder="Enter your email"
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
                {validateErrors.password ? validateErrors.password : "Password"}
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  style={validateErrors.password && { borderColor: "rgb(194 65 12)" }}
                  placeholder="Enter your Password"
                  className="w-full bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none  focus:ring-1 focus:border-blue-500"
                />
              </div>
              {loading ? (
                <button
                  disabled
                  type=""
                  className="my-6 w-full rounded-md bg-indigo-700 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {" "}
                  <ClipLoader color="white" size={13} className="mx-1" />{" "}
                  Loading...
                </button>
              ) : (
                <button
                  
                  type="submit"
                  className="my-6 w-full rounded-md bg-indigo-700 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >SIGN IN</button>
              )}

              <p className="text-center text-sm text-slate-400">
                Don't have an account?{" "}
                <Link className="text-slate-300" to="/register">
                  Register now
                </Link>
              </p>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
