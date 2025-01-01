import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'
import Home from './components/Home'
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
      <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path: "/pastes",
      element:
      <div>
        <Navbar/>
        <Paste/>
      </div>
    },
    {
      path: "/pastes/:id",
      element:
      <div>
        <Navbar/>
        <ViewPaste/>
      </div>
    },
  ]
)
function App() {
  const [count, setCount] = useState(0)

  return (
   
     <div className='flex justify-center px-4 '>
        <div className='border-2 shadow-md rounded-md'>
          <RouterProvider router={router}/>
          <Toaster/>
        </div>
     </div>
        
    
  )
}

export default App
