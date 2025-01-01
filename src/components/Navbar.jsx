import React from 'react'
import {NavLink} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex  border w-[700px] h-[40px]  bg-green-200 text- text-shadow-lg font-semibold '>
      <NavLink
        to={"/"} className='hover:underline hover:bg-green-500 h-full w-[85px] border-r flex justify-center items-center active:bg-green-500 rounded'
      >
        Home
      </NavLink>
      <NavLink
        to={"/pastes"} className='rounded hover:underline hover:bg-green-500 h-full w-[85px] border-r flex justify-center items-center active:bg-green-500'
      >
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
