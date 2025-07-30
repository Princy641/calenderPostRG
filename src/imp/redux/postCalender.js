import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from "../../utils/request"
import { handleApiError } from "../../utils/errorHandling"
import { startLoading, stopLoading } from "./loadingSlice"

export const fetchCalendersData = createAsyncThunk(
  "calendar/fetchAll",
  async (payload,{dispatch}) => {
    try {
      dispatch(startLoading());
       const data = await request.get("/api/Calendar", payload)
      return data
    } catch (error) {
      return handleApiError(error);
    }
     finally {
          dispatch(stopLoading());
        }
  }
)

const postCalenderSlice = createSlice({
  name: "calenderSlice",
  initialState: {
    calendersData: [],
    selectedCalender: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCalenderData(state, action) {
      state.selectedCalender = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalendersData.fulfilled, (state, action) => {
        state.loading = false;
        state.calendersData = action.payload.response;
      })
      .addCase(fetchCalendersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { setSelectedCalenderData } = postCalenderSlice.actions;
export default postCalenderSlice.reducer;