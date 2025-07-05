import { Children, createContext ,useContext, useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
const AppContext=createContext();
export const AppProvider=({children})=>{
    const navigate=useNavigate()
     const[token,setToken]=useState(null)
     const[blogs,setBlogs]=useState([])
     const[input,setInput]=useState("")
     const value={axios,navigate,token,setToken,blogs,setBlogs,input,setInput}
     
     const fetchBlog=async()=>{
        try{
            const{data}=await axios.get('/api/blog/all');
            data.success?setBlogs(data.blogs):toast.error(data.message)//notification error we use package react-hot-toast
        }
        catch(e){
            toast.error(e.message)
        }
       
     }
      useEffect(()=>{
            fetchBlog();
            const token=localStorage.getItem('token');
            if(token){
                setToken(token);
                axios.defaults.headers.common['Authorization']=`${token}`;
                
                //if we close a tab and then reopen app if we alredy login so no need for agin login
                // This runs only once when app loads:

//                 This value is passed to all components using useAppcontext().

// When any state variable inside it (token, blog, input, etc.) changes, React only re-renders:
// ✅ Components using that specific state from context
// 🚫 Not your entire app

// Blogs are fetched.

// Token is retrieved from localStorage (if user is already logged in).

// Token is added to axios headers so protected routes can be accessed.
            }
        },[]);
    return(
       
        <AppContext.Provider value={value}> 
        {children} 
        </AppContext.Provider>
    )
}
export const useAppcontext=()=>{
    return useContext(AppContext)
};
//to make a api call we are using package axious