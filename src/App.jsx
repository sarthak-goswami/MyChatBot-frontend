import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import React, { useState } from "react";
import './App.css'
import Signup from "./components/Signup";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import Conversations from "./components/Converstaions";
import Profile from "./components/Profile";
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/conversations" element={<Conversations/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  )
};

export default App;
