import React, { useRef } from 'react'                  // Import React and useRef hook
import { assets } from '../assets/assets'              // Import assets
import { useAppcontext } from '../../context/AppContext'; // Import your context

const Header = () => {
    const { setInput, input } = useAppcontext();       // Destructure context values
    const inputRef = useRef();                         // Reference to the input element

    const onSubmitHandler = async (e) => {
        e.preventDefault();                            // Prevent page reload
        setInput(inputRef.current.value);              // Set input state to current input value
    }

    return (
        <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
            <div className='mt-20 mb-8 text-center'>
                <div className='inline-flex border items-center justify-center gap-4 px-6 py-1.5
                mb-4 border-primary/40 rounded-full text-sm text-primary bg-primary/15 '>
                    <p>New: Ai features integrated</p>
                    <img src={assets.star_icon} alt="" />
                </div>

                <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700 mt-5'>
                    Your Own <span className='text-primary'>blogging</span> <br />platform
                </h1>

                <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-grey-500'>
                    a space for fresh ideas, insights, and inspiration.
                    We share bite-sized thoughts on tech, AI, creativity, and life — simplified, honest, and real.
                </p>

                <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 py-2 mx-auto border border-gray-300 bg-white rounded px-4 shadow-sm gap-2'>
                    <input ref={inputRef} type="text" placeholder='Search for blogs' className='w-full pl-3 outline-none ' required />
                    <button type='submit' className='bg-primary text-white px-8 py-1.5  rounded hover:scale-105 transition-all cursor-pointer'>Search</button>
                    {/* // Input field for search functionality
                        // Button to submit the search query */}
                </form>
            </div>

            {/* text-center: All inline or inline-block child elements inside that parent will have their text horizontally centered. */}
            {/* ✅ All text and inline/inline-block content inside the children will be centered horizontally. */}

            <div className='text-center'>
                {input && (
                    <button
                        onClick={() => {setInput("");
                            inputRef.current.value="";
                        }}
                        className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>
                        Clear Search
                    </button>
                )}
            </div>

            <img src={assets.gradientBackground} alt="" className='absolute -top-40 -z-1 opacity-50' />
        </div>
    )
}

export default Header

// | Feature                          | Behavior                                                                |
// | -------------------------------- | ----------------------------------------------------------------------- |
// | **Element stays in normal flow** | Unlike `absolute`, it doesn't remove itself from layout.                |
// | **Becomes a reference box**      | Any child with `absolute` position will use this element as the anchor. |
// | **Can be shifted**               | You can still use `top-4`, `left-4`, etc., to slightly move it.         |
