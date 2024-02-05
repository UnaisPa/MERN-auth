import React, { useEffect, useState } from 'react'
import CardComponent from '../components/Card'
import axios from "../axios";
import {toast} from "react-toastify"
const AdminDashboard = () => {

  const [data,setData] = useState([]);
  const [searchName,setSearchName] = useState('');
  const [deleteUser,setDeleteUser] = useState(false)

  useEffect(()=>{
      getUsers()

  },[searchName,deleteUser])

  const getUsers = () =>{
    axios.get(`/admin/users_data?search=${searchName}`,{withCredentials:true}).then((res)=>{
      setData(res.data);
    }).catch((err)=>{
      toast.error(err.response?err.response.data:err.message);
    })
  }

  return (
    <>
    <div className='m-4 sm:mx-5  md:mx-12 mt-12 text-white'>
        <div className=' text-center md:flex justify-between' >
            <h1 className='text-3xl font-semibold opacity-85' >User Management</h1>
            <div className="mt-8 md:mt-0">
                <input
                  id="searchName"
                  name="searchName"
                  type="searchName"
                  onChange={(e)=>setSearchName(e.target.value)}
                  placeholder="Search user"
                  className="w-full bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                />
              </div>
        </div>
        <div className='flex justify-center flex-wrap ' >
          {data.length?
            data.map((user,index)=>{
              return(
                <CardComponent setDeleteUser={setDeleteUser} key={index} user={user} />
              )
            }):<div className='text-center my-24'>
              <h1>User Not found!</h1>
            </div>
          }
        </div>
    </div>
    </>

  )
}

export default AdminDashboard