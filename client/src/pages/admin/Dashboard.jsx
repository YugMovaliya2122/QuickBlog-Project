import React, { useEffect } from 'react'
import { assets ,dashboard_data} from '../../assets/assets'
import Tabledata from '../../components/admin/Tabledata'
import { useAppcontext } from '../../../context/AppContext'


const Dashboard = () => {
    const[dashboardData, setDashboardData] = React.useState({
        blogs: 0,comments:0,drafts:0,recentBlogs:[]})
        const {axios}=useAppcontext()

        const fetchDashboardData = async () => {
                 try{
             const {data}=await axios.get('/api/admin/dashboard')
             data.success?setDashboardData(data.dashboardData):toast.error(data.message)
                 }
                 catch(e){
                  toast.error(e.message);
                 }
        }
        useEffect(() => {
            fetchDashboardData()
          },[])
      
         


  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50 overflow-y-auto scrollbar-hide'>
        {/* flex-1 :indside flex box it takes remaining width or height */}
        <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-5 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105
            transition-all ease-in-out hover:shadow-primary/30'>

                <img src={assets.dashboard_icon_1} alt="" />
                <div>
              <p className='text-xl fonr-semibold text-gray-600'>{dashboardData.blogs}</p>
              <p className='text-gray-400 font-light'>Blogs</p>
                </div>
                
            </div>
               <div className='flex items-center gap-5 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105
            transition-all ease-in-out hover:shadow-primary/30'>

                <img src={assets.dashboard_icon_2} alt="" />
                <div>
              <p className='text-xl fonr-semibold text-gray-600'>{dashboardData.comments}</p>
              <p className='text-gray-400 font-light'>Comments</p>
                </div>
                
            </div>
               <div className='flex items-center gap-5 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105
            transition-all ease-in-out hover:shadow-primary/30'>

                <img src={assets.dashboard_icon_3} alt="" />
                <div>
              <p className='text-xl fonr-semibold text-gray-600'>{dashboardData.drafts}</p>
              <p className='text-gray-400 font-light'>Drafts</p>
                </div>
                
            </div>
        </div>
        <div>
              <div className='flex items-center  mt-8 mb-6 text-gray-600 gap-3'>
                <img src={assets.dashboard_icon_4} alt="" />
                <p>Latest blog</p>
              </div>
              {/* table of blogs */}
              <div className='max-w-4xl overflow-auto overflow-y-auto shadow rounded-lg scrollbar-hide bg-white '>
                    <table className='w-full text-sm tsect-gray-500'>
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
                            {/* septate component for table data */}
                            {dashboardData.recentBlogs.map((blog, index) => (
                                <Tabledata key={blog.id} blog={blog} index={index + 1} fetchBlogs={fetchDashboardData}
                                // why we use fetchblogs here

                                 />
                            ))}
                        </tbody>
                    </table>
              </div>
        </div>
      
    </div>
  )
}

export default Dashboard
