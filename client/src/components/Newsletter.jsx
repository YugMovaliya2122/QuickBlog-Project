import React from 'react'

const Newsletter = () => {
  return (
    <div className=' mb-20 gap-10 flex flex-col items-center justify-center'>
        {/* items center se content ki hi space lege strech nahi hoga */}
      <h1 className='md:text-4xl text-2xl font-semibold '>Never Miss a Blog!</h1>
      <p className='md:text-lg text-gray-500/60'>Subscribe to get latest blog, new tech and exclusive news</p>
      <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
        <input type="text" placeholder='enter your email id ' required  className='border border-grey-300
        rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500'/>
        <button type='submit' className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary 
        transition-all cursor-pointer rounde-md rounded-l-none'>Subscribe</button>
      </form>
    </div>
  )
}

export default Newsletter
