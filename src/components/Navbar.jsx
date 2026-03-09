import React from 'react'
import { NavLink ,Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex justify-evenly bg-gray-950 text-2xl text-white h-10'>
      <NavLink to='/' className={({isActive})=> isActive?"bg-blue-300 px-3 rounded-2xl text-blue-900":"bg-black"}>Signup</NavLink>
      <NavLink to='/login' className={({isActive})=> isActive?"bg-blue-300 px-3 rounded-2xl text-blue-900":"bg-black"}>Login</NavLink>
      <NavLink to='/conversations' className={({isActive})=> isActive?"bg-blue-300 px-3 rounded-2xl text-blue-900":"bg-black"}>Conversations</NavLink>
      <NavLink to='/profile' className={({isActive})=> isActive?"bg-blue-300 px-3 rounded-2xl text-blue-900":"bg-black"}>Profile</NavLink>
    </div>
  )
}

export default Navbar
