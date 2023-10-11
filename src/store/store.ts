import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './toast'
import usersReducer from './users'
import userReducer from './user'

export default configureStore({
  reducer: {
    toast: toastReducer,
    users: usersReducer,
    user: userReducer,
  },
})
