import React, { useEffect } from 'react'
import { Link,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'; 
import { signInFailure, signInStart, signInSuccess,signOut } from "../redux/userSlice";
import PersonIcon from '@mui/icons-material/Person';
import Badge from './Badge';

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
            <Link to="/" ><h1 className='text-2xl  font-semibold'>React.{currentUser?.isAdmin?<Badge value={'Admin'} />:''}</h1></Link>
            <div className='flex justify-center'>
              {
                currentUser?.isAdmin?(
                  <>
                    <Link to='/admin/add_user' ><h1 className='mx-5 mt-1 sm:mx-9 sm:font-semibold' >Add User</h1></Link>
                  </>
                ):""
              }
            {currentUser?(currentUser.profilePhoto!=="" && !currentUser.isAdmin?(<Link to='/profile'><img className='rounded-full w-8 h-8 object-cover' src={`/images/${currentUser.profilePhoto}`} /></Link>):(<Link to='/profile' ><div className='rounded-full bg-slate-50 w-8 h-8 object-cover px-1 py-0.5' ><PersonIcon color='primary' className='mx-auto' /></div></Link>)):(<button onClick={handleOpen} className="rounded-md bg-slate-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >About</button>)}
            </div>
        </header>
    </>
  )
}

export default Header