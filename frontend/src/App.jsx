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
import AdminRoute from './components/AdminRoute'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import UserOnlyRoute from "./components/UserOnlyRoute";
import EditUser from './pages/EditUser'
import AddUser from './pages/AddUser'
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
            <Route path='/admin' element={<AdminLogin/>} />
          </Route>

          <Route path='' element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile/>}  />
          </Route>

          <Route path='' element={<AdminRoute/>}>
            <Route path='/admin/dashboard' element={<AdminDashboard/>} />
            <Route path='/admin/edit_user/:id' element={<EditUser/>} />
            <Route path='/admin/add_user' element={<AddUser/>} />
          </Route>

          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
