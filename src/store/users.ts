import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UsersResponse, UsersSliceState } from '@/interface/users'
import { sliceState } from '@/interface/state'
import { users } from '@/services/usersService'

const initialState: UsersSliceState = {
  loading: false,
  data: [],
  error: null,
  page: 1,
  totalPage: 5,
  form: {
    name: '',
    email: '',
    roleId: '',
    page: '1',
    limit: '10',
  },
}

export const usersAsync = createAsyncThunk<UsersResponse>(
  'users/fetchUsers',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as sliceState
    return await users(state.users.form)
      .then((response: any) => response)
      .catch((error: { response: { data: unknown } }) => {
        // if (error.response.status === 401) Router.push('/login')
        return rejectWithValue(error.response.data)
      })
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    search(state, action) {
      const search = action.payload.form
      state.form = { ...state.form, ...search, page: '1' }
    },
    changePage(state, action) {
      const page = action.payload
      state.form = { ...state.form, page: page }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(usersAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(usersAsync.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data.docs
        state.page = action.payload.data.page
        state.totalPage = action.payload.data.totalPages
      })
      .addCase(usersAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as UsersResponse
      })
  },
})

export const { search, changePage } = usersSlice.actions

export default usersSlice.reducer
