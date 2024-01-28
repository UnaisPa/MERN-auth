import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
const Hero = () => {
  const navigate = useNavigate()
  return (
    <>
        <div className=' text-white text-center h-full pt-20'>
            <div className=' md:w-4/6 lg:w-3/5 sm:w-5/6 w-5/6  mx-auto'>
                <h1 className='px-auto text-3xl lg:text-5xl md:text-5xl font-semibold sm:text-3xl'>Secure MERN Authentication: Your Trusted Gateway</h1>
            </div>
            <div className='w-5/6 md:w-3/5 lg:w-3/5 sm:w-4/5  mx-auto mt-3'>
                <p className='text-slate-400'>Discover the power of SecureSphere—a seamless MERN authentication platform. Immerse yourself in a trusted and secure gateway, designed to empower your digital journey with confidence and reliability.</p>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to='/login'>
              <button
                className="rounded-md bg-indigo-700 px-11 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button></Link>
              <Link to='/register'>
              <button className=" rounded-md p-2 text-sm text-white font-semibold leading-6">
                 Register now <span aria-hidden="true">→</span>
              </button>
              </Link>
            </div>
        </div>
    </>
  )
}

export default Hero