import React, { useEffect } from 'react'
import { Link,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'; 
import { signInFailure, signInStart, signInSuccess,signOut } from "../redux/userSlice";

function Header() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch()
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <>
        <header className='w-full text-white p-4  sm:px-5 md:px-12 lg: flex justify-between'>
            <Link to="/" ><h1 className='text-2xl  font-semibold'>React.</h1></Link>
           {currentUser?(currentUser.profilePhoto?(<Link to='/profile'><img className='rounded-full w-8 h-8 object-cover' src={`/images/${currentUser.profilePhoto}`} /></Link>):(<div className='rounded-full bg-slate-50 w-8 h-8 object-cover' ></div>)):(<button onClick={handleOpen} className="rounded-md bg-slate-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >About</button>)}
        </header>
    </>
  )
}

export default Header