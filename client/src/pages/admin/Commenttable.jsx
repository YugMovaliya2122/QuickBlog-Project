import React from 'react'
import { assets } from '../../assets/assets';
import { useAppcontext } from '../../../context/AppContext';

const Commenttable = ({comment,fetchComments}) => {
    const {blog,createdAt,_id}=comment;
    const date = new Date(createdAt);
    const {axios}=useAppcontext()
    const approveComment=async()=>{
        try{
            const {data}=await axios.post('/api/admin/approve-comment',{id:_id})
            if(data.success){
                toast.success(data.message)
                fetchComments()
            }else{
                toast.error(data.message)
            }
        }
        catch(e){
            toast.error(e.message)
        }
    }
    const deleteComment=async()=>{
        try{
            const confirm=window.confirm('Are you sure you want to delete this comments?')
            if(!confirm) return
            const {data}=await axios.post('/api/admin/delete-comment',{id:_id})
            
            if(data.success){
                toast.success(data.message)
                fetchComments()
            }else{
                toast.error(data.message)
            }
        }
        catch(e){
            toast.error(e.message)
        }
    }
  return (
    <tr className='border-b border-gray-300 hover:bg-gray-50 transition-all'>
    <td className='px-6 py-4 '>
          <b className='font-medium text-gray-600'>Blog</b>:{blog.title} <br /><br />
          <b  className='font-medium text-gray-600'>Name</b>: {comment.name} <br />
          <b  className='font-medium text-gray-600'>Comment</b>: {comment.content} <br />

    </td>
    <td className='px-6 py-4 max-sm:hidden'>
        {date.toLocaleDateString()}

    </td>
    <td>
        <div className='flex items-center gap-4 pr-6'>
            {
                !comment.isApproved ?
                <img src={assets.tick_icon} onClick={approveComment} className='w-5 hover:scale-110 transition-all cursor-pointer' />:
                <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>
                    Approved
                </p>
            } 
            <img src={assets.bin_icon} onClick={deleteComment}className='w-5 hover:scale-110 transition-all cursor-pointer' />
        </div>
    </td>
    </tr>
  )
}

export default Commenttable
