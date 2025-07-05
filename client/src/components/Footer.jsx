 import React from 'react'
import { assets } from '../assets/assets'
import { footer_data } from '../assets/assets'
 
 const Footer = () => {
   return (
     <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/4 border  '>
       <div className='flex flex-col md:flex-row items-start justify-between py-10 gap-10 border-b border-gray-500/30
       text-gray-500'>
        <div>
            <img src={assets.logo} alt="logo" className='w-32 sm:w-44' />
            <p className='max-w-[410px] mt-6'>QuickBlog is your space to share ideas, explore trends, and express yourself. Powered by AI, it makes blogging fast, simple, and meaningful — anytime, anywhere.</p>
        </div>
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
{/* in flex box w-full means take remaning width */}
        {footer_data.map((item,index)=>(
          <div key={index}>
            <h3 className='font-semibold text-base text-grey-900 md:mb-5 mb-2'>{item.title}</h3>
            <ul className='text-sm space-y-1'>
            {/* gap is used in flex and grid */}
            {/* in place of gap we use space -y-1 */}
                {/* what about key */}
                {item.links.map((link,i)=>(
                  <li key={i}>
                    <a href="#" className='hover:underline transition-all'>{link}</a>
                  </li>
                ))}
            </ul>


          </div>
        )
        )
        }
            
        </div>
       </div>
       <p className='text-center py-4 text-sm md:text-base text-gray-500'>Copyright 2025 © QuickBlog - All Right Reserved </p>
     </div>
   )
 }
 
 export default Footer
 