import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';


const HideRoutes = () => {
    const { currentUser } = useSelector((state) => state.user);
    if(!currentUser){
        <Outlet/>
    }else if(currentUser.isAdmin==false){
        <Outlet/>
    }else{
        <Navigate to='/admin/dashboard'/>
    }
  
}

export default HideRoutes