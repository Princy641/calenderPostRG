"use client"
import { useState, useRef, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { clearDateFilter } from "../../../redux/slices/eventSlice"
import "./Events.css"

const Events = () => {
  const dispatch = useDispatch()
  const {
    eventsData,
    filteredEvents,
    loading,
    error,
    selectedMonth,
    selectedYear,
    selectedDate,
  } = useSelector((state) => state.eventData)

  //converting numeric month to string
  const formattedMonth = selectedMonth
  ? new Date(2000, parseInt(selectedMonth, 10) - 1).toLocaleString('en-US', { month: 'long' })
  : '';

  const events = useMemo(() => filteredEvents.length ? filteredEvents : eventsData || [], [filteredEvents, eventsData])

  const [activeTooltip, setActiveTooltip] = useState(null)
  //const [showPopup, setShowPopup] = useState(false)
  //const [selectedEvents, setSelectedEvents] = useState([])
 // const [tempSelected, setTempSelected] = useState([])
  const [isTooltipHovered, setIsTooltipHovered] = useState(false)
  const tooltipTimeoutRef = useRef(null)

  // useEffect(() => {
  //   const initial = events.slice(0, 5).map((_, idx) => idx)
  //   //setSelectedEvents(initial)
  //   //setTempSelected(initial)
  // }, [events])

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString)
  //   const hours = date.getHours()
  //   const minutes = date.getMinutes().toString().padStart(2, "0")
  //   const ampm = hours >= 12 ? "PM" : "AM"

  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
  //   const year = date.getFullYear();
  //    return `${day}/${month}/${year}, ${(hours % 12) || 12}:${minutes} ${ampm}`;
  //   // return `${date.toLocaleDateString()}, ${(hours % 12) || 12}:${minutes} ${ampm}`
  // }

  // const handleCheckboxChange = (index) => {
  //   setTempSelected((prev) =>
  //     prev.includes(index) ? prev.filter((i) => i !== index)
  //       : prev.length < 5 ? [...prev, index]
  //         : prev
  //   )
  // }

  const handleMouseEnter = (index) => {
    clearTimeout(tooltipTimeoutRef.current)
    setActiveTooltip(index)
  }

  const handleMouseLeave = () => {
    if (!isTooltipHovered) {
      tooltipTimeoutRef.current = setTimeout(() => setActiveTooltip(null), 100)
    }
  }

  const handleTooltipMouseEnter = () => {
    setIsTooltipHovered(true)
    clearTimeout(tooltipTimeoutRef.current)
  }

  const handleTooltipMouseLeave = () => {
    setIsTooltipHovered(false)
    tooltipTimeoutRef.current = setTimeout(() => setActiveTooltip(null), 100)
  }

  useEffect(() => {
    return () => clearTimeout(tooltipTimeoutRef.current)
  }, [])

  // const displayedEvents = useMemo(() =>
  //   selectedEvents
  //     .sort((a, b) => a - b)
  //     .map((index) => events[index])
  //     .filter(Boolean)
  //   , [selectedEvents, events])

  // const handleApply = () => {
  //   if (!tempSelected.length) {
  //     alert("Please select at least one event.")
  //     return
  //   }
  //   setSelectedEvents(tempSelected)
  //   //setShowPopup(false)
  // }

 // const handleClear = () => setTempSelected([])

  //const handleClearDateFilter = () => dispatch(clearDateFilter())

  if (loading) return <div className="event-container">Loading events...</div>
  if (error) return <div className="event-container">Error: {error}</div>

  return (
    <div className="event-container">
      <h2 className="events-heading">
        Events/Holidays
        {formattedMonth && selectedYear && (
          <span className="events-date-info"> - {formattedMonth} {selectedYear}</span>
        )}
        {/* {selectedDate && <span className="events-selected-date"> (Date: {selectedDate})</span>} */}
      </h2>

      <div className="events-box">
        <div className="event-list-container">
          <div className="event-names">
            {events.length === 0 ? (
              <div className="no-events">
                {selectedDate ? `No events found for ${selectedDate}.` : "No events found for the selected period."}
              </div>
            ) : (
              <ul className="event-list">
                {events.map((event, index) => {
                  const originalIndex = events.findIndex((e) => e.eventName === event.eventName)
                  return (
                    <li
                      key={originalIndex}
                      className={`event-item ${activeTooltip === originalIndex ? "active" : ""}`}
                      onMouseEnter={() => handleMouseEnter(originalIndex)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {event.eventName}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {activeTooltip !== null && events[activeTooltip] && (
            <div
              className="event-tooltip"
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            >
              <div><strong> {events[activeTooltip].eventName}</strong></div>
              <div><strong> {events[activeTooltip].eventType}</strong></div>
              {/* <div><strong>Start:</strong> {formatDate(events[activeTooltip].eventStartDateTime)}</div> */}
              <div><strong>Start:</strong> { moment(events[activeTooltip].eventStartDateTime).format("MMMM D, YYYY [at] h:mm A")}</div> 
              <div><strong>End:</strong> {moment(events[activeTooltip].eventEndDateTime).format("MMMM D, YYYY [at] h:mm A")}</div>
              {
               (events[activeTooltip].address)?<div ><strong>Address:</strong> {events[activeTooltip].address}</div>:''
              }
            </div>
          )}
        </div>

        {/* {events.length > 0 && (
          <div className="show-more" onClick={() => {
            setTempSelected([...selectedEvents])
          //  setShowPopup(true)
          }}>
            showmore
          </div>
        )} */}

        {/* {showPopup && (
          <div className="event-popup-overlay">
            <div className="event-popup">
              <div className="event-popup-header">
                <h3>Select Events (max 5)</h3>
                <button className="event-popup-close" onClick={() => setShowPopup(false)}>×</button>
              </div>
              <div className="event-popup-content">
                <p className="event-popup-info">{tempSelected.length}/5 events selected</p>
                <div className="event-popup-header-row">
                  <span className="event-popup-header-col"></span>
                  <span className="event-popup-header-col">Event Name</span>
                  <span className="event-popup-header-col">Event Date</span>
                  <span className="event-popup-header-col">Event Type</span>
                </div>
                <ul className="event-popup-list">
                  {events.map((event, index) => (
                    <li key={index} className="event-popup-item">
                      <label className="event-checkbox-label">
                        <input
                          type="checkbox"
                          checked={tempSelected.includes(index)}
                          onChange={() => handleCheckboxChange(index)}
                          disabled={!tempSelected.includes(index) && tempSelected.length >= 5}
                        />
                        <span className="event-popup-col">{event.eventName}</span>
                        <span className="event-popup-col">{new Date(event.eventStartDateTime).toLocaleDateString()}</span>
                        <span className="event-popup-col">{event.eventType}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="event-popup-footer">
                <button className="event-popup-button" onClick={handleApply}>Apply</button>
                <button className="event-popup-button clear-button" onClick={handleClear}>Clear</button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default Events
