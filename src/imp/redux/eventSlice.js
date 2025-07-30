import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from "../../utils/request"
import { handleApiError } from "../../utils/errorHandling"
 
// Async thunk to fetch events - now accepts month and year parameters
export const fetchEventsData = createAsyncThunk(
  "event/fetchEventsData",
  async ({ month, year ,selectedHotelId} = {}, { rejectWithValue }) => {
    try {
      // Use provided month/year or default to current month/year
      const now = new Date()
      const targetMonth = month || String(now.getMonth() + 1).padStart(2, "0")
      const targetYear = year || now.getFullYear()
 
      const response = await request.get("/api/Event/top", {
        hotelId: selectedHotelId,
        month: targetMonth,
        year: targetYear,
      }) 
      return response
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  },
)
 
// Event slice
const eventSlice = createSlice({
  name: "event",
  initialState: {
    eventsData: [], // All events for the month
    filteredEvents: [], // Events filtered by selected date
    topEvents: [],
    loading: false,
    error: null,
    selectedMonth: null,
    selectedYear: null,
    selectedDate: null, // Selected specific date
  },
  reducers: {
    // Add action to update selected month/year
    setSelectedMonthYear: (state, action) => {
      state.selectedMonth = action.payload.month
      state.selectedYear = action.payload.year
    },
 
    // Add action to filter events by selected date
    filterEventsByDate: (state, action) => {
        const selectedDate = action.payload
        state.selectedDate = selectedDate
      
        if (!selectedDate) {
          state.filteredEvents = state.eventsData
        } else {

          //state.filteredEvents =state.eventsData.filter(f=>new Date(f.eventStartDateTime).toISOString().slice(0, -1)===new Date(selectedDate).toISOString().slice(0, -1));
          state.filteredEvents = state.eventsData.filter((event) => {
            const eventStartDate = new Date(event.eventStartDateTime)
            
            // Use local date formatting for both dates to avoid timezone issues
            const eventYear = eventStartDate.getFullYear()
            const eventMonth = String(eventStartDate.getMonth() + 1).padStart(2, "0")
            const eventDay = String(eventStartDate.getDate()).padStart(2, "0")
            const eventDateString = `${eventYear}-${eventMonth}-${eventDay}`
      
            return eventDateString === selectedDate
          })
        }
    },
 
    // Clear date filter
    clearDateFilter: (state) => {
      state.selectedDate = null
      state.filteredEvents = state.eventsData
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEventsData.fulfilled, (state, action) => {
        state.loading = false
        state.topEvents = action.payload.response?.top || []
        state.eventsData = action.payload.response?.events || []
 
        // If there's a selected date, filter the new data using CONSISTENT logic
        if (state.selectedDate) {
          state.filteredEvents = state.eventsData.filter((event) => {
            const eventStartDate = new Date(event.eventStartDateTime)
            
            // Use the SAME local date formatting as filterEventsByDate
            const eventYear = eventStartDate.getFullYear()
            const eventMonth = String(eventStartDate.getMonth() + 1).padStart(2, "0")
            const eventDay = String(eventStartDate.getDate()).padStart(2, "0")
            const eventDateString = `${eventYear}-${eventMonth}-${eventDay}`
 
            return eventDateString === state.selectedDate
          })
        } else {
          // Otherwise show all events
          state.filteredEvents = state.eventsData
        }
      })
      .addCase(fetchEventsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to fetch events"
      })
  },
})
 
export const { setSelectedMonthYear, filterEventsByDate, clearDateFilter } = eventSlice.actions
export default eventSlice.reducer
 