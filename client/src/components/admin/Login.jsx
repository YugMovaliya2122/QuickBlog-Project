import React from 'react'
import { useAppcontext } from '../../context/AppContext';

const login = () => {
    const {axios,setToken}=useAppcontext();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
const {data}= await axios.post('/api/admin/login',{email,password});
if(data.success){
    setToken(data.token)
    localStorage.setItem('token',data.token)
    axios.defaults.headers.common['Authorization']=data.token
}else{
    toast.error(data.message);
}
        }
        catch(e){
            toast.error(e.message);
        }
        
    }
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-primary-100 border '>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 
      rounded-lg '>
        <div className='flex flex-col items-center justify-center gap-4 mb-6 text-center'>
    <h1 className='font-bold text-3xl'><span className='text-primary'>Admin</span> Login</h1>
    <p className='font-light'>Enter your credentials to access the admin panel</p>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-1 mx-8 mt-2 ' >
           <label className='font-medium'  >Email:</label>
           <input type="email" placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} className='border-b-1 border-gray-1 p-2 outline-none mb-6' />
           <label className='font-medium' >Password:</label>
           <input  value={password} onChange={(e)=>setPassword(e.target.value)} type="password"placeholder='Enter your password' className='border-b-1 border-gray-1 p-2 outline-none mb-6'/>
           <button className='w-full border bg-primary rounded py-2'>Submit</button>
        </form>
        
      </div>
      
    </div>
  )
}

export default login
