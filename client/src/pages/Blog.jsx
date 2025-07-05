import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import { assets } from '../assets/assets' 
import moment from 'moment'
import Loader from '../components/Loader'
import { useAppcontext } from '../components/context/AppContext'
import toast from 'react-hot-toast'
import DOMPurify from 'dompurify'

const Blog = () => {
    const { id } = useParams()
    const { axios } = useAppcontext()
    const [data, setData] = useState(null)
    const [comments, setComments] = useState([])
    const [name, setName] = useState('')
    const [content, setcontent] = useState('')

    // Assuming blog_data is an array of blog objects imported from a data file
   const fetchBlogData = async () => { 
    console.log("🔍 Fetching blog with ID:", id);
    try {
        const { data } = await axios.get(`/api/blog/${id}`);
        console.log("✅ Blog response:", data);
        if (data.success) {
            setData(data.blog);
        } else {
            toast.error(data.message);
        }
    } catch (e) {
        console.error("❌ Blog fetch error:", e);
        toast.error(e.message);
    }
}


    const fetchComments = async () => {
    console.log("🔍 Fetching comments for blog:", id);
    try {
        const { data } = await axios.post('/api/blog/comments', { blogId: id });
        console.log("✅ Comments response:", data);
        if (data.success) {
            setComments(data.comments);
        } else {
            toast.error(data.message);
        }
    } catch (e) {
        console.error("❌ Comments fetch error:", e);
        toast.error(e.message);
    }
}

    const addComment = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/blog/add-comment', {
                blog: id,
                name,
                content
            })
            if (data.success) {
                toast.success(data.message)
                setName('')
                setcontent('')
                fetchComments() // fetch updated comments
            } else {
                toast.error(data.message)
            }
        } catch (e) {
            console.error(e)
            toast.error(e.message)
        }
    }

    useEffect(() => {   
        fetchBlogData()
        fetchComments()
    }, [])

    // Render the blog data if available, otherwise show "Loading..."
    return data ? (
        <div>
            {/* Render the Navbar component */}
            <Navbar />
            <div className='flex flex-col justify-center items-center mt-20 text-grey-600'>
                {/* Background gradient image */}
                <img src={assets.gradientBackground} alt="" className='absolute -top-50 opacity-50 -z-1' />
                {/* Display the published date using moment.js */}
                <p className='text-primary py-4 font-medium'>
                    Published On {moment(data.createdAt).format('MMMM Do YYYY')}
                </p>
                {/* Blog title */}
                <h1 className='text-2xl sm:text-5xl font-semibold text-center max-w-2xl text-gray-800'>
                    {data.title}
                </h1>
                {/* Blog subtitle, rendered as HTML */}
                <h2
                    className='my-5 max-w-lg truncate max-auto'
                    dangerouslySetInnerHTML={{ "__html": DOMPurify.sanitize(data.subTitle) }}
                ></h2>
                {/* Author name */}
                <p className='text-primary bg-primary/20 px-4 py-1 rounded-full mb-6 border text-sm'>
                    Yug Movaliya
                </p>
            </div>

            <div className='max-w-5xl mx-5  md:mx-auto my-10 mt-6'>
                {/* Blog main image */}
                <img src={data.image} alt="" className='rounded-3xl mb-5' />
                {/* Blog description, rendered as HTML */}
                <div
                    className='rich-text max-w-3xl max-auto'
                    dangerouslySetInnerHTML={{ "__html": DOMPurify.sanitize(data.description) }}
                ></div>

                {/* Comments section */}
                <div className='mt-14 max-w-3xl mx-auto mb-10'>
                    {/* Display number of comments */}
                    <p className='font-semibold mb-4'>Comment ({comments.length})</p>
                    <div className='flex flex-col gap-4'>
                        {/* Map through comments and render each */}
                        {comments.map((comment, index) => (
                            <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                                <div className='flex items-center gap-2 mb-2'>
                                    {/* User icon */}
                                    <img src={assets.user_icon} alt="" className='w-6' />
                                    {/* Commenter's name */}
                                    <p className='font-medium'>{comment.name}</p>
                                </div>
                                <div className='flex justify-between '>
                                    {/* Comment content */}
                                    <p className='text-sm max-w-md ml-8'>{comment.content}</p>
                                    {/* Time since comment was posted */}
                                    <div>{moment(comment.createdAt).fromNow()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comment form */}
                <div className='max-w-3xl mx-auto'>
                    <p className='mb-4 font-semibold'>Add your Comment</p>
                    <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
                        <input 
                            type="text" 
                            placeholder='enter your name' 
                            required 
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            className='w-full p-2 border border-gray-300 rounded outline-none' 
                        />
                        <textarea 
                            placeholder='Comment'  
                            required
                            value={content} 
                            onChange={(e) => setcontent(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded outline-none h-48'
                        ></textarea>
                        <button className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>
                            Submit
                        </button>
                    </form>
                </div>

                <div className='my-24 max-w-3xl mx-auto'>
                    {/* social media icon */}
                    <p className='font-semibold my-4'>Share this article on social media</p>
                    <div className='flex'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.googleplus_icon} alt="" />
                    </div>
                </div>
            </div>
            {/* Render the Footer component */}
            <Footer />
        </div>
    ) : (
        // Show loading message while data is being fetched
        <Loader />
    )
}

export default Blog
