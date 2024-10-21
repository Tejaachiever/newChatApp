import React from 'react'
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'



function App() {
  return (
    <div>
      <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<Navigate to="/login" />} />
        <Route  path='/register' element={<Register/>} />
        <Route  path='/login' element={<Login/>} />
        <Route  path='/chat' element={<Chat />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App