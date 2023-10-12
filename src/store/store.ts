import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './toast'
import usersReducer from './users'
import userReducer from './user'
import profileReducer from './profile'

export default configureStore({
  reducer: {
    toast: toastReducer,
    users: usersReducer,
    user: userReducer,
    profile: profileReducer,
  },
})
