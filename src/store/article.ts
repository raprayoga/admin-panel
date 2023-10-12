import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { autoSignOut } from '@/utils'
import {
  ArticleSliceState,
  ArticleResponse,
  ArticleInputForm,
} from '@/interface/article'
import { article, editRoles } from '@/services/articlesService'

const initialState: ArticleSliceState = {
  successFetch: false,
  loading: false,
  data: null,
  error: null,
}

export const articleAsync = createAsyncThunk<ArticleResponse, string>(
  'article/fetchArticle',
  async (payload, { rejectWithValue }) => {
    return await article(payload)
      .then((response) => response)
      .catch((error) => {
        if (error.response.status === 401) {
          autoSignOut()
        }
        return rejectWithValue(error.response.data)
      })
  }
)

export const articleEditAsync = createAsyncThunk<
  ArticleResponse,
  ArticleInputForm
>('article/fetchEditArticle', async (payload, { rejectWithValue }) => {
  return await editRoles(payload)
    .then((response) => response)
    .catch((error) => {
      if (error.response.status === 401) {
        autoSignOut()
      }
      return rejectWithValue(error.response.data)
    })
})

export const articleSliec = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(articleAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(articleAsync.fulfilled, (state, action) => {
        state.loading = false
        state.successFetch = false
        state.data = action.payload.data
      })
      .addCase(articleAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as ArticleResponse
      })

      .addCase(articleEditAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(articleEditAsync.fulfilled, (state, action) => {
        state.loading = false
        state.successFetch = true
        state.data = action.payload.data
      })
      .addCase(articleEditAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as ArticleResponse
      })
  },
})

export const {} = articleSliec.actions

export default articleSliec.reducer
