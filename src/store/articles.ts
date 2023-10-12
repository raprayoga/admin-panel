import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { sliceState } from '@/interface/state'
import { autoSignOut } from '@/utils'
import { ArticlesResponse, ArticlesSliceState } from '@/interface/articles'
import { articles } from '@/services/articlesService'

const initialState: ArticlesSliceState = {
  loading: false,
  data: [],
  error: null,
  page: 1,
  totalPage: 5,
  form: {
    title: '',
    status: '',
    page: '1',
    limit: '10',
  },
}

export const articlesAsync = createAsyncThunk<ArticlesResponse>(
  'articles/fetchArticles',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as sliceState
    return await articles(state.articles.form)
      .then((response: any) => response)
      .catch((error) => {
        if (error.response.status === 401) {
          autoSignOut()
        }
        return rejectWithValue(error.response.data)
      })
  }
)

export const articlesSlice = createSlice({
  name: 'articles',
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
      .addCase(articlesAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(articlesAsync.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data.docs
        state.page = action.payload.data.page
        state.totalPage = action.payload.data.totalPages
      })
      .addCase(articlesAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as ArticlesResponse
      })
  },
})

export const { search, changePage } = articlesSlice.actions

export default articlesSlice.reducer
