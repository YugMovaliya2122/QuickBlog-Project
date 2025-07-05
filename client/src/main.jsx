/**
 * Imports the StrictMode component from React to help highlight potential problems in an application.
 */
 
/**
 * Imports the createRoot function from react-dom/client to enable the new root API for rendering React components.
 */
 
/**
 * Imports the global CSS styles for the application.
 */
 
/**
 * Imports the main App component which serves as the root component of the application.
 */
 
/**
 * Imports BrowserRouter from react-router-dom to enable client-side routing in the application.
 */
 
/**
 * Creates a root for rendering the React application at the DOM element with the id 'root'.
 * Renders the App component wrapped in StrictMode for highlighting potential problems.
 */

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './component/context/AppContext.jsx'
//this is for routing 
//like js 
//to shift one page to another


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppProvider>
     <App />
  </AppProvider>
   
  </BrowserRouter>,
)
