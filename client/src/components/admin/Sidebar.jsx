import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from "react-router-dom";



const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
    <NavLink end={true} to='/admin' className={({ isActive }) =>  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}` }>
        <img src={assets.home_icon} alt="home"  className='min-w-4 w-5'/>
        <p className='hidden sm:block'>Dashboard</p>
        {/* hidden in <640px */}
        
    </NavLink>
    <NavLink  to='/admin/addBlog' className={({ isActive }) =>  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}` }>
        <img src={assets.add_icon} alt="home"  className='min-w-4 w-5'/>
        <p className='hidden sm:block'>Add blogs</p>
        {/* hidden in <640px */}
        
    </NavLink>
    <NavLink  to='/admin/listBlog' className={({ isActive }) =>  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}` }>
        <img src={assets.list_icon} alt="home"  className='min-w-4 w-5'/>
        <p className='hidden sm:block'>Blog List</p>
        {/* hidden in <640px */}
        
    </NavLink>
    <NavLink to='/admin/comments' className={({ isActive }) =>  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}` }>
        <img src={assets.comment_icon} alt="home"  className='min-w-4 w-5'/>
        <p className='hidden sm:block'>Comments</p>
        {/* hidden in <640px */}
        
    </NavLink>
    {/* This already points to a specific sub-route. It doesn't need end={true} because:

There are unlikely to be deeper nested routes like /admin/addBlog/something

Even if there are, you typically want it to remain active as long as you're inside that section.

So it's optional — you can add end={true} if you only want the link to be active on exact /admin/addBlog, not /admin/addBlog/edit. */}
    </div>
  )
}

export default Sidebar
