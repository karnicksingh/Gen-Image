import { useState } from 'react'
import {  Route, Routes } from 'react-router-dom';

import Register  from "./Register.jsx"
import Login  from "./Login.jsx"
import AiGenerator  from "./AiGenerator.jsx"
import Profile from './Profile.jsx';

function App() {

  return (
    <>
  <Routes>    
        <Route path="/register" element={<Register/>} />
        <Route path="/"  element={<Login/>} />
        <Route path="/generate" element={<AiGenerator/>} />
        <Route path="/profile" element={<Profile/>} />
    </Routes>
    </>
  )
};

export default App
