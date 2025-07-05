import React, { use } from 'react'
import {assets} from '../assets/assets'
import { useNavigate  } from 'react-router-dom'
import { useAppcontext } from './context/AppContext'

const Navbar = () => {
    const {navigate,token}=useAppcontext()
  return (
    <div className='flex justify-between items-center  py-5 mx-8 sm:mx-20 xl:mx-32 ' >
        {/* Navbar component container with flex layout, spacing, and pointer cursor */}
        {/* Logo image, navigates to home on click */}
        {/* Login button, navigates to /admin on click, styled with primary color and icon */}
      <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer'  />
      <button onClick={()=>navigate('/admin') } className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>
        {/* Button for login, navigates to /admin on click */}
        {/* Button text for login */}
        {/* gap is used for gap between item */}
        {token?'Dashboard':'Login'}
        {/* Button for login, styled with primary color and icon */}
        {/* Arrow icon inside the button */}
        <img src={assets.arrow} alt="arrow"  className='w-3'/>
        {/* Arrow icon for visual indication */}
        {/* Arrow icon inside the button */}
        {/* <img src={assets.arrow} alt="arrow"  className='w-3'/> */}
        {/* Arrow icon for visual indication */}
      </button>
    </div>
  )
}

export default Navbar
