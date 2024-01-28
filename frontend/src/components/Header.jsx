import Model from './Model';
import React from 'react'

function Header() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
        <header className='w-full text-white p-4  sm:px-5 md:px-12 lg: flex justify-between'>
            <h1 className='text-2xl  font-semibold'>React.</h1>
            <button onClick={handleOpen} className="rounded-md bg-slate-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >About</button> 
        </header>
        <Model handleClose={handleClose} open={open} setOpen={setOpen} />
    </>
  )
}

export default Header