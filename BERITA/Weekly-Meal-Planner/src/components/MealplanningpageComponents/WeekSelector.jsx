import React, { useState } from 'react'
import { format, addWeeks, subWeeks, addDays } from 'date-fns'

const WeekSelector = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleWeekChange = (direction) => {
    setCurrentWeekStart((prev) =>
      direction === 'next' ? addWeeks(prev, 1) : subWeeks(prev, 1)
    )
  }

  return (
    <div className="w-full justify-center mx-auto md:max-w-lg lg:max-w-4xl">
      <div className="flex items-center justify-between bg-white p-2 rounded-lg">
        <button
          onClick={() => handleWeekChange('prev')}
          className=" text-sm hover:text-fontcolor px-4 text-gray-600 italic transition"
        >
          {' '}
          &lt;&lt;Prev
        </button>
        <span className=" text-sm font-pacifico font-medium md:text-lg text-fontcolor">
          {format(currentWeekStart, 'MMM dd')} -{' '}
          {format(addDays(currentWeekStart, 6), 'MMM dd, yyyy')}
        </span>
        <button
          onClick={() => handleWeekChange('next')}
          className="text-sm hover:text-fontcolor px-4 text-gray-600 italic transition "
        >
          Next &gt;&gt;
        </button>
      </div>

      <div className=" p-2  grid grid-cols-7 gap-2 mt-4 w-full  md:px-2">
        {[...Array(7)].map((_, i) => {
          const day = addDays(currentWeekStart, i)
          return (
            <button
              key={i}
              onClick={() => setSelectedDate(day)}
              className={`px-1 md:px-4 text-sm font-medium rounded-full transition py-2
                ${
                  selectedDate.getTime() === day.getTime()
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
