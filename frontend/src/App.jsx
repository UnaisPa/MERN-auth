import React from 'react'
import Home from './pages/Home'
import {Route,BrowserRouter as Router,Routes} from "react-router-dom"
import Header from './components/Header'
import NotFound from './components/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/privateRoute'
import Profile from './pages/Profile'
import HideRoutes from './components/HideRoutes'

const App = () => {
  return (
    <div className=''>
      
      <Router>
      <Header/>
        <ToastContainer/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='' element={<HideRoutes/>}>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>}/>
          </Route>
          <Route path='' element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile/>}  />
          </Route>
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
