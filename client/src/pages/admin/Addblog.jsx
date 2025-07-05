import React, { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // ✅ Required for Quill to work
import { useAppcontext } from '../../../context/AppContext';
import toast, { Toaster } from 'react-hot-toast'; // ✅ Needed for toast notifications
import {parse } from 'marked';

const Addblog = () => {
    const { axios } = useAppcontext()
    const [isAdding, setIsAdding] = useState(false);
    const[loading,setLoading]=useState(false)
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    // for text editor
    const [image, setImage] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [subTitle, setSubTitle] = React.useState('');
    const [category, setCategory] = React.useState('Startup');
    const [isPublished, setIsPublished] = React.useState(false);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsAdding(true);
            const blog = {
                title,
                subTitle,
                description: quillRef.current.root.innerHTML,
                category,
                isPublished
            }
            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog))
            formData.append('image', image)
            const { data } = await axios.post('/api/blog/add', formData);
            if (data.success) {
                toast.success(data.message);
                setImage(null) // ✅ null instead of false
                setTitle('')
                setSubTitle('')
                quillRef.current.root.innerHTML = ''
                setCategory('Startup')
            }
            else{
                toast.error(data.message);
            }

        }
        catch (e) {
            toast.error(e.message)
        }
        finally {
            setIsAdding(false)
        }

        // Handle form submission logic here

    }

    const generateContent = async () => {
        if(!title) return toast.error('please enter a title')
            try{
        setLoading(true)
         const {data}=await axios.post('api/blog/generate',{prompt:title})
        if(data.success){
            quillRef.current.root.innerHTML=parse(data.content);//to parse we need to install marked pacakge
        }
        else{
            toast.error(data.message)
        }
        }
        catch(e){
       toast.error(e.message)
        }
        finally{
            setLoading(false)
        }
           
    }

    useEffect(() => {
        // initiate quill only once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
    }, [])

    return (
        <form className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll' onSubmit={onSubmitHandler}>
            <div className='relative bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 mx-auto shadow rounded'>
                <p>Upload Thumbnail</p>
                <label htmlFor="image" >
                    <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className='mt-2 h-16 rounded cursor-pointer' />
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </label>
                {/* 
                | Part                           | What it does                                            |
                | ------------------------------ | ------------------------------------------------------- |
                | `<label htmlFor="image">`      | Clicking the label triggers the input with id `"image"` |
                | `<img ... />`                  | Displays a custom image as the clickable area           |
                | `<input type="file" hidden />` | File input is hidden but still functional               |
                | `required`                     | Makes file upload required before form submission       |
                */}

                <p className='mt-4'>Blog Title</p>
                <input type="text" placeholder='Type here' onChange={e => setTitle(e.target.value)} value={title} required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' />

                <p className='mt-4'>Sub Title</p>
                <input type="text" placeholder='Type here' onChange={e => setSubTitle(e.target.value)} value={subTitle} required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' />

                <p className='mt-4'>Blog Description</p>
                <div className='relative max-w-lg h-74 pb-16 sm:pb-10 pt-2 '>
                    {/* we need package for text area for adding functionality like bold and etc..*/}
                    {/* quill     */}
                    <div ref={editorRef} className='h-40'></div>
                    <button type='button' disabled={loading} onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-primary px-4 py-1.5 rounded hover:underline cursor pointer'>
                        Generate with AI
                    </button>
                </div>

                <p className='mt-4'>Blog category</p>
                <select onChange={e => setCategory(e.target.value)} value={category} name="category" id="" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
                    <option value="">Select category</option>
                    {blogCategories.map((item, index) => {
                        return <option key={index} value={item}> {item}</option>
                    })}
                </select>

                <div className='flex gap-2 mt-4'>
                    <p>Publish Now</p>
                    <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer'
                        onChange={e => setIsPublished(e.target.checked)} />
                </div>

                <button disabled={isAdding} type="submit" className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
                    {isAdding ? 'Adding..' : 'Add Blog'}
                </button>
            </div>
        </form>
    )
}

export default Addblog;
