import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios.js";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { ClipLoader } from "react-spinners";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [validateErrors, setValidateErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate(formData);

    if (Object.keys(formErrors).length == 0) {
      setLoading(true);
      try {
        const response = await axios.post("/users", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        console.log(response.data);
        if (response.data.message == "success") {
          toast.success('Sign Up success!')
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          }, 2000);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data);
      }
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
      <div className="">
        <div className=" w-full mt-6 text-white mx-auto h-[420px] sm:w-[450px]">
          <h1 className="text-center  text-2xl font-semibold py-6">
            Create new account
          </h1>
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
                  style={
                    validateErrors.name && { borderColor: "rgb(194 65 12)" }
                  }
                  placeholder="Enter your Name"
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
                {validateErrors?.password
                  ? validateErrors.password
                  : "Password"}
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
                  placeholder="Enter your Password"
                  className="w-full bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none  focus:ring-1 focus:border-blue-500"
                />
              </div>
              {loading ? (
                <button disabled className="my-6 w-full rounded-md bg-indigo-700 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  <ClipLoader color="white" size={13} className="mx-1" /> SIGN
                  UP
                </button>
              ) : (
                <button className="my-6 w-full rounded-md bg-indigo-700 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {" "}
                  SIGN UP
                </button>
              )}
              <p className="text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link className="text-slate-300" to="/login">
                  Login now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
