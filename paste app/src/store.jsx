import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pastSlice'
export default configureStore({
  reducer: {
    paste: pasteReducer,
  },
})