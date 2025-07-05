import React from 'react'
import { assets } from '../../assets/assets';
import { useAppcontext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Tabledata = ({blog,fetchBlogs,index}) => {
    const{title,createdAt}=blog;
    const date = new Date(createdAt);
    const {axios} =useAppcontext()
    const deleteBlog=async()=>{
  const confirm=window.confirm('Are you sure you want to delete this Blog?')
  if(!confirm) return;
  try{
    const{data}=await axios.post('/api/blog/delete',{id:blog._id})
    if(data.success){
    toast.success(data.message)
    await fetchBlogs()
  }else{
toast.error(data.message)    
  }
  }
  catch(e){
    toast.error(e.message);
  }
 
    }
    const togglePublish=async()=>{
      try{
          const{data}=await axios.post('/api/blog/toggle-publish' , {id:blog._id})
      if(data.success){
        toast.success(data.message)
        await fetchBlogs()
      }
      else{
        toast.error(data.message)
      }
      }
      catch(e){
        toast.error(e.message)
      }
      
    }
  return (
    <tr className='border-y border-gray-300'>
    <td className='px-2 py-4'>{index}</td>
    <td className='px-2 py-4'>{title}</td>
    <td className='px-2 py-4'>{date.toDateString()}</td>
    <td className='px-2 py-4 max:sm:hidden'>
        <p className={`${blog.isPublished ? 'text-green-500' : 'text-orange-500'} font-semibold`}>
            {blog.isPublished ? 'Published' : 'Draft'}
        </p>
    </td>
    <td className='px-2 py-4 flex text-xs gap-3'>
      <button onClick={togglePublish}
      className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>
        {blog.isPublished ? 'Unpublish' : 'Publish'}
      </button >
      <img onClick={deleteBlog} src={assets.cross_icon} className='w-8 hover:scale-110 transition-all cursor-pointer' />
    </td>
    </tr>
  )
}

export default Tabledata
