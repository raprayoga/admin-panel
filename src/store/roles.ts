import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { autoSignOut } from '@/utils'
import { roles } from '@/services/rolesService'
import { RolesResponse, RolesSliceState } from '@/interface/roles'

const initialState: RolesSliceState = {
  loading: false,
  data: [],
  error: null,
}

export const rolesAsync = createAsyncThunk<RolesResponse>(
  'roles/fetchRoles',
  async (_, { rejectWithValue }) => {
    return await roles()
      .then((response: any) => response)
      .catch((error) => {
        if (error.response.status === 401) {
          autoSignOut()
        }
        return rejectWithValue(error.response.data)
      })
  }
)

export const rolesSlie = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(rolesAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(rolesAsync.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
      })
      .addCase(rolesAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as RolesResponse
      })
  },
})

export const {} = rolesSlie.actions

export default rolesSlie.reducer
