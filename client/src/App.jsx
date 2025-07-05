import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import Header from './components/Header.jsx'
import BlogList from './components/BlogList.jsx'
import Card from './components/Card.jsx'  
import Layout from './pages/admin/Layout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Addblog from './pages/admin/Addblog.jsx'
import Listblog from './pages/admin/Listblog.jsx'
import Comments from './pages/admin/Comments.jsx'
import Login from './components/admin/Login.jsx'
import 'quill/dist/quill.snow.css' 
import  {Toaster} from 'react-hot-toast'
import { useAppcontext } from '../context/AppContext.jsx'





const App = () => {
  const {token}=useAppcontext()
  return ( // Return the JSX to render the component
    <div> 
      {/* Container div for the app */}
      <Toaster/>
      <Routes> {/* Define the routing structure */}
        <Route path='/' element={<Home/>} /> {/* Route for the Home page */}
        <Route path='/blog/:id' element={<Blog/>} /> {/* Route for the Blog page */}
        <Route path='/admin' element={token?<Layout/>:<Login/>}> {/* Route for the Admin layout */}
        <Route index element={<Dashboard/>} /> {/* Default route for the Admin layout */}
        {/* This is a parent route.

When the URL starts with /admin, it renders the <Layout /> component.

Inside this layout, nested routes will be displayed using an <Outlet />.

2. <Route index element={<Dashboard/>} />
This is the default child route (i.e., /admin with no extra path).

index means: "render this when no additional path is provided."

So when user visits /admin, React will:

Show the <Layout />

Inside it, render <Dashboard /> */}
        <Route path='addBlog' element={<Addblog/>} /> 
        <Route path='listBlog' element={<Listblog/>} /> 
        <Route path='comments' element={<Comments/>} /> 

        </Route>
      </Routes>
    
      
      
      {/* Render the Card component with sample data */}
    </div>
  )
}

export default App
