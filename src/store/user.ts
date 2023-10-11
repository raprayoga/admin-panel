import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserResponse, UserSliceState, DataResponse } from '@/interface/user'
import { user } from '@/services/usersService'

const initialState: UserSliceState = {
  loading: false,
  data: null,
  error: null,
}

export const userAsync = createAsyncThunk<DataResponse, string>(
  'user/fetchUser',
  async (payload, { rejectWithValue }) => {
    return await user(payload)
      .then((response) => response)
      .catch((error) => {
        // if (error.response.status === 401) Router.push('/login')
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
        state.data = action.payload.data
      })
      .addCase(userAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as UserResponse
      })
  },
})

export const {} = userSlice.actions

export default userSlice.reducer
