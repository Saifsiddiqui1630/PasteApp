import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pastSlice';
import toast from 'react-hot-toast';

const ViewPaste = () => {
    const { id } = useParams();

   
    const allPastes = useSelector((state) => state.paste.pastes || []);
  
  
    const paste = allPastes.length > 0 
      ? allPastes.filter((p) => p._id === id)[0]
      : [];

  return (
    <div className=''>
      <div className='mt-5 '>
      
      <div className='w-full flex justify-evenly '>
        <input className='cursor-not-allowed border-2 border-black rounded px-2 py-1 w-[68%]' 
            type="text"
        placeholder='Enter Your Title'
        value={paste.title}
        disabled
        onChange={(e)=>{setTitle(e.target.value)}}
        />

        <button  className='border-2  p-1 rounded ' onClick={()=>{
            navigator.clipboard.writeText(paste?.content);
            toast.success("Copied!")
            }}>
        <svg class="h-8 w-8 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
        </button>
      </div>
        <div className='place-content-center pb-6 px-1'>
            <textarea
                className='cursor-not-allowed border-2 border-black mt-5 w-[90%] rounded p-3 h-[450px] md:w-[84%] lg:w-[84%]'
                value={paste.content}
                disabled
                placeholder='Enter Content'
                onChange={(e)=>{setValue(e.target.value)}}
            />
        </div>
    </div>
    </div>
  )
}

export default ViewPaste
