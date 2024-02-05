import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user);
  useEffect(()=>{
    if(currentUser?.isAdmin){
      navigate('/admin/dashboard');
    }
  },[])
  return (
    <div>
      <Hero/>
    </div> 
  )
}

export default Home