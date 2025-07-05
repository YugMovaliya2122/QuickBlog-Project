import React, { useEffect } from 'react'
import { blog_data } from '../../assets/assets';
import Tabledata from '../../components/admin/Tabledata'
import { useAppcontext } from '../../components/context/AppContext';

const Listblog = () => {
    const [blogs,setBlogs] = React.useState([]);
    const {axios}=useAppcontext()
    const fetchBlog =async()=>{
        try{
            const{data}=await axios.get('/api/admin/blogs')
            if(data.success){
                setBlogs(data.blogs)
            }
            else{
                toast.error(data.message);
            }
        }
        catch(e){
            toast.error(e.message)
        }
    }
    useEffect(()=>{
        fetchBlog();
    }, [])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 overflow-y-auto scrollbar-hide'>
          <h1 className='text-2xl font-medium mb-4'>All blogs</h1>
          <div className='max-w-4xl overflow-auto overflow-y-auto shadow rounded-lg scrollbar-hide bg-white '>
                    <table className='w-full text-sm text-gray-500'>
                        <thead className='text-xs text-gray-600 text-left uppercase'>
                             <tr>
                                <th className='px-2 py-4 xl:px-6'>#</th>
                                <th className='px-2 py-4'>Blog Title</th>
                                <th className='px-2 py-4'>Date</th>
                                <th className='px-2 py-4 max-sm:hidden'>Status</th>
                                <th className='px-2 py-4'>Action</th>

                             </tr>
                        </thead>
                        <tbody>
                            {/* septate componen for table data */}
                            {blogs.map((blog, index) => {
                                return <Tabledata key={blog.id} blog={blog} index={index + 1} fetchBlogs={fetchBlog} />
                                // why we use fetchblogs here

                                
                            })}

                        </tbody>
                    </table>
              </div>
    </div>
  )
}

export default Listblog
