import React, { use } from 'react'
import { comments_data } from '../../assets/assets';
import { useEffect } from 'react';
import Commenttable from './Commenttable'
import { useAppcontext } from '../../../context/AppContext';

const Comments = () => {
    const [comments, setComments] = React.useState([]);
    const[filter, setFilter] = React.useState('Not Approved');
     const {axios}=useAppcontext()
    const fetchComments = async () => {
      try{
        const {data}=await axios.get('/api/admin/comments')
        data.success?setComments(data.comments):toast.error(data.message)
      }
      catch(e){
        toast.error(e.message)
      }
    }
    useEffect(() => {
        fetchComments();
    },[]);
        
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 overflow-y-auto scrollbar-hide'>
      <div className='flex  items-center justify-between  max-w-3xl  mb-6'>
        <h1 className='text-1xl font-medium mb-4'>All Comments</h1>
        <div className='flex items-center gap-3'>
        <button onClick={()=>setFilter('Approved')}className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs
            ${filter === 'Approved' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-primary/10'}`}>
            Approved
        </button>
        <button onClick={()=>setFilter('Not Approved')}className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs
            ${filter === 'Not Approved' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-primary/10'}`}>
             Not Approved
        </button>
        </div>
          
          
      </div>
      <div className='relative h-4/5 max-w-3xl overflow-x-auto overflow-y-auto bg-white shadow rounded-lg scrollbar-hide'>
           <table className='w-full text-sm text-gray-500'>
                <thead className='text-xs text-gray-600 text-left uppercase'>
                        <tr>
                            <th scope='col' className='px-2 py-4 xl:px-6'> Blog Title & Comments </th>
                            <th scope='col' className='px-2 py-4 xl:px-6'> Date </th>
                            <th scope='col' className='px-2 py-4 xl:px-6'> Action </th>
                            
{/* scope:col is symantic  */}
                            
                        </tr>
                </thead>
                <tbody>
                    {comments.filter((comment) => filter === 'Approved' ? comment.isApproved : !comment.isApproved).map((comment, index) => 
                       <Commenttable key={comment._id} comment={comment} index={index+1} fetchComments={fetchComments}/>)}
                </tbody>
           </table>
      </div>
    </div>
  )
}

export default Comments
