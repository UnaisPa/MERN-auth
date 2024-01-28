import React from 'react'
import Home from './pages/Home'
import {Route,BrowserRouter as Router,Routes} from "react-router-dom"
import Header from './components/Header'
import NotFound from './components/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
const App = () => {
  return (
    <div className=''>
      <Header/>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>}/>
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
