import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './toast'
import usersReducer from './users'
import userReducer from './user'
import profileReducer from './profile'
import rolesReducer from './roles'
import categoriesSlice from './categories'
import articlesSlice from './articles'

export default configureStore({
  reducer: {
    toast: toastReducer,
    users: usersReducer,
    user: userReducer,
    profile: profileReducer,
    roles: rolesReducer,
    categories: categoriesSlice,
    articles: articlesSlice,
  },
})
