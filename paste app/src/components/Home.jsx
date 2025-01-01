import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pastSlice';
import toast from "react-hot-toast";


const Home = () => {
    const allPastes = useSelector((state)=>state.paste.pastes);
    const [title,setTitle]=useState("");
    const [value,setValue]= useState("");
    const [searchParams, setPearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const pasteId= searchParams.get("pasteId");
    
    useEffect(() => {
        if(pasteId){
            const paste = allPastes.find((p)=>p._id===pasteId);
            console.log("Page Found")
            setTitle(paste.title);
            setValue(paste.content)
        }
    }, [pasteId])
    
    
    function createPaste(){
        if (!title.trim() || !value.trim()) {
            // Optionally show an alert or message to the user
            toast.error('Title and content CANNOT BE EMPTY');
            return; // Stop execution if validation fails
        }
        const options = { day: 'numeric', month: 'long', year: 'numeric' }; //Date Options
        const currentDate = new Date();
        const paste = {
            title : title,
            content : value,
            _id : pasteId || Date.now().toString(36),
            createdAt : currentDate.toLocaleDateString('en-US', options), // Format the date    
        }
        if(pasteId){
            //Update 
            dispatch(updateToPastes(paste));
        }else{
            //Create
            dispatch(addToPastes(paste));
        }
        setTitle('');
        setValue('');
        setPearchParams({});
    }
  return (
    <div className=' '>
      
      <div className='p-6 bg-gray-100 shadow-lg rounded-lg w-full mx-auto flex '>
        <input className='w-full p-3  border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400' 
            type="text"
        placeholder='Enter Your Title'
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
        />

        <button onClick={createPaste} className='w-[150px] font-semibold  bg-green-400 text-white text-shadow-lg mx-3  px-3 rounded-md shadow-md hover:bg-green-600 h-[50px]'>
            {
                pasteId ? "Update " : "Create "
            }
                My Paste
        </button>
      </div>
        <div className='place-content-center bg-gray-100 pb-8'>
            <textarea
                className='border w-[93%] focus:outline-none focus:ring-2 focus:ring-green-400 rounded p-3 min-h-[400px]'
                value={value}
                placeholder='Enter Content'
                onChange={(e)=>{setValue(e.target.value)}}
            />
        </div>
    </div>
  )
}

export default Home
