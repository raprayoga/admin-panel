import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProfileResponse, ProfileSliceState } from '@/interface/profile'
import { profile } from '@/services/authService'
import { autoSignOut } from '@/utils'

const initialState: ProfileSliceState = {
  loading: false,
  data: null,
  error: null,
}

export const profileAsync = createAsyncThunk<ProfileResponse>(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    return await profile()
      .then((response) => response)
      .catch((error) => {
        if (error.response.status === 401) {
          autoSignOut()
        }
        return rejectWithValue(error.response.data)
      })
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(profileAsync.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
      })
      .addCase(profileAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as ProfileResponse
      })
  },
})

export const {} = profileSlice.actions

export default profileSlice.reducer
