import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    pastes:localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
  },
  reducers: {
    addToPastes: (state,action) => {
     const paste = action.payload;
     state.pastes.push(paste);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Created Successfully")
    },
    updateToPastes: (state,action) => {
     const paste = action.payload;
     
     state.pastes = state.pastes.filter((item) => item);

  // Find the index of the paste to update
  const index = state.pastes.findIndex((item) => item._id === paste._id);

  if (index >= 0) {
    // Update the paste
    state.pastes[index] = paste;
    localStorage.setItem("pastes", JSON.stringify(state.pastes));
    toast.success("Paste Updated!");
  } else {
    toast.error("Paste not found!");
  }
    },
    resetAllPastes: (state, action) => {
      state.pastes=[];
      localStorage.removeItem("pastes")
    },
    removeFromPastes: (state, action) => {
        const pasteId = action.payload;
      
        // Ensure `state.pastes` is filtered to exclude null or undefined elements
        state.pastes = state.pastes.filter((item) => item); 
      
        const index = state.pastes.findIndex((item) => item._id === pasteId);
      
        if (index >= 0) {
          state.pastes.splice(index, 1);
          localStorage.setItem("pastes", JSON.stringify(state.pastes));
          toast.success("Paste Deleted!");
        } else {
          toast.error("Paste not found!");
        }
    }
}
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes,removeFromPastes  } = pasteSlice.actions

export default pasteSlice.reducer