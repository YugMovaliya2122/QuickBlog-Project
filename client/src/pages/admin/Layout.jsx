import React from 'react'
import { assets } from '../../assets/assets';
import { Outlet,useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { useAppcontext } from '../../context/AppContext';

const Layout = () => {
    const {axios,setToken,navigate}=useAppcontext()
    const logout=()=>{
      localStorage.removeItem('token')
      axios.defaults.headers.common['Authorization']=null;
      setToken(null)
      navigate('/')

    }
  return (
    <>
<div className='flex justify-between items-center bg-white p-4 shadow-md sm:px-12 border-b border-gray-300'>
    <img src={assets.logo} alt="logo"  className='w-32 sm:w-40 cursor-pointer' onClick={()=>navigate('/')}/>
    <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
</div>
<div className='flex h-[calc(100vh-64px)] '>
    <Sidebar/>
    <Outlet/>
    {/* layout page is diffrent for wvet route */}
    {/* outlet is a dashboard,listblog etc. */}

</div>
  
    </>
      
   
  )
}

export default Layout
