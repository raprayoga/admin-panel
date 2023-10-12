import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { sliceState } from '@/interface/state'
import { autoSignOut } from '@/utils'
import {
  CategoriesResponse,
  CategoriesSliceState,
} from '@/interface/categories'
import { categories } from '@/services/categoriesService'

const initialState: CategoriesSliceState = {
  loading: false,
  data: [],
  error: null,
  page: 1,
  totalPage: 5,
  form: {
    name: '',
    slug: '',
    page: '1',
    limit: '10',
  },
}

export const categoriesAsync = createAsyncThunk<CategoriesResponse>(
  'categories/fetchCategories',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as sliceState
    return await categories(state.categories.form)
      .then((response: any) => response)
      .catch((error) => {
        if (error.response.status === 401) {
          autoSignOut()
        }
        return rejectWithValue(error.response.data)
      })
  }
)

export const categoriesSlice = createSlice({
  name: 'categories',
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
      .addCase(categoriesAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(categoriesAsync.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data.docs
        state.page = action.payload.data.page
        state.totalPage = action.payload.data.totalPages
      })
      .addCase(categoriesAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as CategoriesResponse
      })
  },
})

export const { search, changePage } = categoriesSlice.actions

export default categoriesSlice.reducer
