import React from 'react'
import { blogCategories ,blog_data} from '../assets/assets'
import Card from './Card';
import { useAppcontext } from '../../context/AppContext';

const BlogList = () => {
    const {blogs,input}=useAppcontext()
    const[menu,setMenu]= React.useState('All');
    const filteredBlogs=()=>{
        if(input==='') {return blogs}
        return blogs.filter((blog)=>blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().
    includes(input.toLowerCase()))
    }
  return (
    <div>
       <div className='flex justify-center gap-4 sm:gap-8 my-10 '>
           {blogCategories.map((item)=>(
            // <div key={item} className='relative'>
                <button onClick={()=>setMenu(item)}
                 key={item} className={`cursor-pointer px-3 py-1 rounded-full text-sm transition-all duration-300 ease-in-out
              ${menu === item ? 'bg-primary text-white' : 'bg-transparent text-grey-500 hover:bg-primary/10'}
            `}>{item}  </button>
                //  </div>  
           ))}
           {/* to add animation we use npm i motion pakage */}
           {/* //display the blog categories in a flex container with gap and margin
           //map through the blogCategories array and render each item */}
     </div>
       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-24'>
      
        
        {filteredBlogs().filter((blog)=> menu === 'All' ? true : blog.category === menu).map((blog)=> <Card blog={blog} key={blog._id} />)}
        {/* //filter the blog_data based on the selected menu category
        //if menu is 'All', show all blogs, otherwise show blogs that match the selected category
        //map through the filtered blogs and render a Card component for each blog */}
       </div>
    </div>
  )
}

export default BlogList
