import React, { useState, useEffect } from 'react'
import { format, addDays, startOfWeek, isToday } from 'date-fns'

const WeekSelector = ({ setSelectedDate }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date())
  )
  const [selectedDate, setSelectedDateState] = useState(() => {
    const storedDate = localStorage.getItem('selectedDate')
    return storedDate ? new Date(storedDate) : new Date()
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date()
      const newWeekStart = startOfWeek(today)

      if (!isToday(currentWeekStart) && today > currentWeekStart) {
        setCurrentWeekStart(newWeekStart)
      }
    }, 86400000)

    return () => clearInterval(interval)
  }, [currentWeekStart])

  const handleDateSelect = (day) => {
    setSelectedDateState(day)
    setSelectedDate(day)
    localStorage.setItem('selectedDate', day.toISOString())
  }

  return (
    <div className="w-full justify-center mx-auto md:max-w-lg lg:max-w-4xl">
      <div className="flex items-center justify-center bg-white p-2 rounded-lg">
        <span className="text-sm font-pacifico font-medium md:text-lg text-fontcolor p-2 border-b-2 border-active">
          {format(currentWeekStart, 'MMM dd')} -{' '}
          {format(addDays(currentWeekStart, 6), 'MMM dd, yyyy')}
        </span>
      </div>

      <div className="p-4 grid grid-cols-7 gap-2 mt-4 w-full md:px-2">
        {[...Array(7)].map((_, i) => {
          const day = addDays(currentWeekStart, i)
          return (
            <button
              key={i}
              onClick={() => handleDateSelect(day)}
              className={`px-2 md:px-4 text-sm font-medium rounded-full transition py-2
                ${
                  selectedDate.toDateString() === day.toDateString()
                    ? 'bg-[#017371] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
            >
              {format(day, 'EEE dd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default WeekSelector
