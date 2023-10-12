import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  UserResponse,
  UserSliceState,
  UserEditInputForm,
} from '@/interface/user'
import { editUsers, user } from '@/services/usersService'
import { autoSignOut } from '@/utils'

const initialState: UserSliceState = {
  successFetch: false,
  loading: false,
  data: null,
  error: null,
}

export const userAsync = createAsyncThunk<UserResponse, string>(
  'user/fetchUser',
  async (payload, { rejectWithValue }) => {
    return await user(payload)
      .then((response) => response)
      .catch((error) => {
        if (error.response.status === 401) {
          autoSignOut()
        }
        return rejectWithValue(error.response.data)
      })
  }
)

export const userEditAsync = createAsyncThunk<UserResponse, UserEditInputForm>(
  'user/fetchEditUser',
  async (payload, { rejectWithValue }) => {
    return await editUsers(payload)
      .then((response) => response)
      .catch((error) => {
        if (error.response.status === 401) {
          autoSignOut()
        }
        return rejectWithValue(error.response.data)
      })
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(userAsync.fulfilled, (state, action) => {
        state.loading = false
        state.successFetch = false
        state.data = action.payload.data
      })
      .addCase(userAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as UserResponse
      })

      .addCase(userEditAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(userEditAsync.fulfilled, (state, action) => {
        state.loading = false
        state.successFetch = true
        state.data = action.payload.data
      })
      .addCase(userEditAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as UserResponse
      })
  },
})

export const {} = userSlice.actions

export default userSlice.reducer
