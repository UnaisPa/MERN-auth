import React from 'react'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <>
    <div className="">
      <div className=" w-full mt-6 text-white mx-auto h-[420px] sm:w-[450px]">
        <h1 className="text-center  text-2xl font-semibold py-6">
          Create new account
        </h1>
        <form>
        <div className="text-white mx-5 mt-4" >
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required
                placeholder="Enter your Name"
                class="w-full bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="text-white mx-5 mt-6" >
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                placeholder="Enter your email"
                class="w-full bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="text-white mx-5 mt-6" >
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="password"
                required
                placeholder="Enter your Password"
                class="w-full bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none  focus:ring-1 focus:border-blue-500"
              />
            </div>
            <button className="my-6 w-full rounded-md bg-indigo-700 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">SIGN UP</button>
            <p className="text-center text-sm text-slate-400">Already have an account? <Link className="text-slate-300" to='/login'>Login now</Link></p>
          </div>
          
        </form>
      </div>
    </div>
  </>
  )
}

export default Register