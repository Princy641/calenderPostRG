import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from "../../utils/request"
import { handleApiError } from "../../utils/errorHandling"
import { startLoading, stopLoading } from "./loadingSlice"

export const fetchPostsListData = createAsyncThunk("postListSlice/fetchAll", async (payload, { dispatch }) => {
  try {
    dispatch(startLoading())

    // Ensure payload has required fields
    const { clientId, hotelId, date } = payload

    if (!clientId || !hotelId || !date) {
      throw new Error("Missing required parameters: clientId, hotelId, or date")
    }

    // Construct proper query string
    const queryParams = new URLSearchParams({
      clientId: clientId.toString(),
      hotelId: hotelId.toString(),
      date: date,
    })

    const response = await request.get(`/api/Post-List?${queryParams.toString()}`)
    return response
  } catch (error) {
    console.error("fetchPostsListData error:", error)
    return handleApiError(error)
  } finally {
    dispatch(stopLoading())
  }
})

const postListSlice = createSlice({
  name: "postListSlice",
  initialState: {
    postListCalendersData: [],
    loading: false,
    error: null,
    selectedDate: new Date().toISOString().split("T")[0]
  },
  reducers: {
    setSelectedDate: (state, action) => {
    state.selectedDate = action.payload
  },
    clearPostList: (state) => {
      state.postListCalendersData = []
    },
    setPostList: (state, action) => {
      state.postListCalendersData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsListData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPostsListData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload && action.payload.response) {
          state.postListCalendersData = action.payload.response
        } else {
          state.postListCalendersData = []
        }
      })
      .addCase(fetchPostsListData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.postListCalendersData = []
      })
  },
})

export const { clearPostList, setPostList,setSelectedDate } = postListSlice.actions
export default postListSlice.reducer
