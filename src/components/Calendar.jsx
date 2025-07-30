"use client"

import { useState } from "react"
import PricingPlans from "./PricingPlans"
//import CreatePostSlider from "./CreatePostSlider"

import "./Calendar.css"
// You'll need to install these icons
// npm install lucide-react
import { ChevronLeft, ChevronRight, Download, CalendarIcon, Plus } from "lucide-react"

const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
]

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const SAMPLE_EVENTS = [
  { id: 1, name: "Fashion Show", date: new Date(2025, 0, 8), color: "#66CDAA" },
  { id: 2, name: "Ideas Conclave", date: new Date(2025, 0, 14), color: "#66CDAA" },
  { id: 3, name: "Fashion Show", date: new Date(2025, 0, 22), color: "#66CDAA" },
  { id: 4, name: "Event name", date: new Date(2025, 0, 24), color: "#66CDAA" },
  { id: 5, name: "Holi", date: new Date(2025, 0, 28), color: "#FFA500" },
  { id: 6, name: "Holiday", date: new Date(2025, 0, 28), color: "#FFA500" },
  { id: 7, name: "Event name", date: new Date(2025, 0, 28), color: "#66CDAA" },
  { id: 8, name: "National Mountain Climbing Day", date: new Date(2025, 0, 31), color: "#66CDAA", duration: 3 },
]

// Sample suggested events
const SUGGESTED_EVENTS = [
  {
    id: 1,
    title: "London School District - Spring Break Concert",
    date: "Fri, 24 Jan 2025",
    location: "Olympia London, London",
  },
  {
    id: 2,
    title: "Spring Festival",
    dateRange: "Mon, 03 Feb - Wed, 05 Feb 2025",
    location: "Piccadilly Circus",
  },
  {
    id: 3,
    title: "Leadership Conference",
    date: "Fri, 07 Mar 2025",
    location: "Taj St. James Court, London",
  },
]

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events] = useState(SAMPLE_EVENTS)
  const [suggestedEvents] = useState(SUGGESTED_EVENTS)

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

    // Adjust for Monday as first day of week (0 = Monday in our display)
    const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

    const days = []

    // Previous month days
    const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1)
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        currentMonth: false,
        date: new Date(currentYear, currentMonth - 1, prevMonthDays - i),
      })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        currentMonth: true,
        date: new Date(currentYear, currentMonth, i),
      })
    }

    // Next month days
    const remainingDays = 42 - days.length // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        currentMonth: false,
        date: new Date(currentYear, currentMonth + 1, i),
      })
    }

    return days
  }

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)

      // For multi-day events
      if (event.duration) {
        const endDate = new Date(eventDate)
        endDate.setDate(endDate.getDate() + (event.duration - 1))

        return date >= eventDate && date <= endDate
      }

      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  // Format date as two-digit number
  const formatDay = (day) => {
    return day.toString().padStart(2, "0")
  }

  const calendarDays = generateCalendarDays()

  // Handle adding a suggested event to the calendar
  const handleAddSuggestedEvent = (eventId) => {
    console.log(`Adding suggested event with ID: ${eventId}`)
    // Here you would implement the logic to add the event to your calendar
  }
  const [showSlider, setShowSlider] = useState(false);


  return (
    <>
      <PricingPlans></PricingPlans>
      <div className="clander-Container">
      <div className="calendar-header">
              <h1>Calendar</h1>
              <div className="calendar-powered">
                Powered by <span className="predict-logo">Predict</span>
              </div>
              <div className="header-actions">
                <span className="event-holiday">Event & Holiday: </span>
                <button className="add-link">Add</button>
                <span className="separator">|</span>
                <button className="bookmark-link">Bookmark</button>
                <button className="new-post-button">+ New Post</button>
                {/* <button onClick={() => setShowSlider(true)}>New Post</button>
                <CreatePostSlider isOpen={showSlider} onClose={() => setShowSlider(false)} /> */}

              </div>
            </div>

        <div className="calendar-layout">
          <div className="calendar-main">
            <div className="calendar-controls">
              <div className="month-navigation">
                <button onClick={prevMonth} className="nav-button">
                  <ChevronLeft size={20} />
                </button>
                <h2>{MONTHS[currentMonth]}</h2>
                <button onClick={nextMonth} className="nav-button">
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="calendar-actions">
                <div className="event-filters">
                  <div className="filter-item">
                    <CalendarIcon size={16} />
                    <span>Event</span>
                  </div>
                  <div className="filter-item">
                    <span className="holiday-indicator"></span>
                    <span>Holiday</span>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="download-button">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="calendar-grid">
              <div className="calendar-days-header">
                {DAYS.map((day) => (
                  <div key={day} className="day-header">
                    {day}
                  </div>
                ))}
              </div>

              <div className="calendar-days">
                {calendarDays.map((day, index) => (
                  <div key={index} className={`calendar-day ${!day.currentMonth ? "other-month" : ""}`}>
                    <div className="day-number">{formatDay(day.day)}</div>
                    <div className="day-events">
                      {getEventsForDate(day.date).map((event) => (
                        <div key={event.id} className="event-item" style={{ backgroundColor: event.color }}>
                          {event.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="suggested-events-sidebar">
            <div className="suggested-events-header">
              <div className="suggested-events-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z"
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12 7.5V6" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M16.5 12H18"
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16.5V18"
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M7.5 12H6" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M15.4395 8.56055L16.5 7.5"
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.4395 15.4395L16.5 16.5"
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.56055 15.4395L7.5 16.5"
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.56055 8.56055L7.5 7.5"
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Suggested events, create posts</h3>
            </div>

            <div className="suggested-events-list">
              {suggestedEvents.map((event) => (
                <div key={event.id} className="suggested-event-card">
                  <div className="suggested-event-content">
                    <h4>{event.title}</h4>
                    <p className="event-date">{event.date || event.dateRange}</p>
                    <p className="event-location">{event.location}</p>
                  </div>
                  <button className="add-event-button" onClick={() => handleAddSuggestedEvent(event.id)}>
                    <Plus size={20} color="#fff" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Calendar
