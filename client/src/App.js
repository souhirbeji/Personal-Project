import React from 'react'
import {BrowserRouter,Routes,Route }from 'react-router-dom'
import  Login  from './pages/Login';
import  Register  from './pages/Register';
import Secret from './pages/Secret';
import CreateIdeas from './pages/CreateIdeas';
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <BrowserRouter> 
    <Routes>
    <Route path="/bright_ideas" element= {<CreateIdeas/>} />
      <Route path="/register" element= {<Register/>}/>
      <Route path="/login" element= {<Login/>} />
      <Route path="/" element= {<Secret/>} />
    </Routes>
    </BrowserRouter>
   
  );
}
export default App