"use client"

import { useEffect, useState } from "react"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"
import "flatpickr/dist/flatpickr.min.css"
import "./Calendar.css"
import icon from "../../../assets/images/calendar.png"
import { fetchCalendersData, setSelectedCalenderData } from "../../../redux/slices/postCalender"
import { fetchEventsData, setSelectedMonthYear, filterEventsByDate } from "../../../redux/slices/eventSlice"
import { useDispatch, useSelector } from "react-redux"
import { fetchPostsListData,setSelectedDate } from "../../../redux/slices/postListSlice"
import { fetchPostAnalyticsData } from "../../../redux/slices/postAnalytics"

const Calendar = () => {
  const [date, setDate] = useState(new Date())
  const [trigger, setTrigger] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector((store) => store.login)
  const selectedHotelId = user?.selectedDropdown 
  const clientId = user?.clientId 

  // Initial fetch for current month
  useEffect(() => {
      if (trigger) return;
    dispatch(fetchCalendersData())

    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const year = now.getFullYear()

    dispatch(setSelectedMonthYear({ month, year }))
    dispatch(fetchEventsData({ month, year, selectedHotelId }))

    const payload = {
      clientId,
      hotelId: selectedHotelId,
      postId: "",
      year: year,
      month: month,
      date: "",
    }
      setTrigger(true);

    dispatch(fetchPostAnalyticsData(payload))
  }, [dispatch, selectedHotelId, trigger,clientId])

  const calendarDataList = useSelector((store) => store.calender)
  
 const typeMap = {}

calendarDataList?.calendersData.forEach(item => {
  const date = item.date.split("T")[0]
  if (!typeMap[date]) typeMap[date] = new Set()
  typeMap[date].add(item.type)
})


  const iconMap =
    calendarDataList?.calendersData
      ?.map((cale) => cale.date)
      .reduce((acc, dateStr) => {
        const formattedDate = String(dateStr).split("T")[0]
        acc[formattedDate] = icon
        return acc
      }, {}) || {}

  const today = new Date()
  const lastYear = new Date(today)
  lastYear.setMonth(lastYear.getMonth() - 12)

  const nextThreeMonths = new Date(today)
  nextThreeMonths.setMonth(nextThreeMonths.getMonth() + 3)

  return (
    <Flatpickr
      value={date}
      options={{
        dateFormat: "Y-m-d",
        defaultDate: date,
        inline: true,
        minDate: lastYear,
        maxDate: nextThreeMonths,
        // onDayCreate: (dObj, dStr, fp, dayElem) => {
        //   const isoDate = dayElem.dateObj.toISOString().split("T")[0]
        //   const iconValue = iconMap[isoDate]

        //   if (!iconValue) return

        //   const iconContainer = document.createElement("div")
        //   iconContainer.style.position = "absolute"
        //   iconContainer.style.top = "13px"
        //   iconContainer.style.right = "18px"
        //   iconContainer.style.width = "16px"
        //   iconContainer.style.height = "16px"
        //   iconContainer.style.pointerEvents = "none"

        //   if (iconValue.endsWith(".png") || iconValue.startsWith("http")) {
        //     const img = document.createElement("img")
        //     img.src = iconValue
        //     img.alt = "icon"
        //     img.style.width = "100%"
        //     img.style.height = "100%"
        //     img.style.maxWidth = "10px"
        //     img.style.maxHeight = "10px"
        //     img.style.display = "none"
        //     iconContainer.appendChild(img)
        //   } else {
        //     iconContainer.textContent = iconValue
        //     iconContainer.style.fontSize = "14px"
        //   }

        //   dayElem.style.position = "relative"
        //   dayElem.appendChild(iconContainer)
        // },

        
onDayCreate: (dObj, dStr, fp, dayElem) => {
  const isoDate = dayElem.dateObj.toISOString().split("T")[0]
  const matchedItem = calendarDataList?.calendersData?.find(item => item.date.startsWith(isoDate))

  if (!matchedItem) return

  const dot = document.createElement("span")
  dot.classList.add("calendar-dot")

  if (matchedItem.type === "Holiday") {
    dot.classList.add("dot-holiday")
  } else if (matchedItem.type === "Post") {
    dot.classList.add("dot-post")
  } else if (matchedItem.type === "Event") {
    dot.classList.add("dot-event")
  }

  dayElem.style.position = "relative"
  dayElem.appendChild(dot)
},
        onMonthChange: (selectedDates, dateStr, instance) => {
          const month = String(instance.currentMonth + 1).padStart(2, "0")
          const year = instance.currentYear

          const payload = {
            clientId,
            hotelId: selectedHotelId,
            postId: "",
            year: year,
            month: month,
            date: "",
          }

          dispatch(fetchPostAnalyticsData(payload))
          dispatch(setSelectedMonthYear({ month, year }))
          dispatch(fetchEventsData({ month, year, selectedHotelId }))
        },
      }}
      onChange={(selectedDates) => {
        const selectedDate = new Date(selectedDates[0])

        const year = selectedDate.getFullYear()
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
        const day = String(selectedDate.getDate()).padStart(2, "0")
        const selectedDateString = `${year}-${month}-${day}`

        // Analytics payload
        const analyticsPayload = {
          clientId,
          hotelId: selectedHotelId,
          postId: "",
          year: year,
          month: month,
          date: selectedDateString,
        }

        // Post list payload
        const postListPayload = {
          clientId,
          hotelId: selectedHotelId,
          date: selectedDateString,
        }

        dispatch(fetchPostAnalyticsData(analyticsPayload))
        dispatch(fetchPostsListData(postListPayload))
        dispatch(setSelectedDate(selectedDateString))
        dispatch(setSelectedCalenderData(selectedDateString))
        dispatch(filterEventsByDate(selectedDateString))
        setDate(selectedDates[0])
      }}
    />
  )
}

export default Calendar
