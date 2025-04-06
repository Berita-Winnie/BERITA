import React, { createContext, useState, useContext } from 'react'

// Create the Date Context
const DateContext = createContext()

// Date Provider Component
export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const changeDate = (newDate) => {
    setSelectedDate(newDate)
  }

  return (
    <DateContext.Provider value={{ selectedDate, changeDate }}>
      {children}
    </DateContext.Provider>
  )
}

// Custom hook to access Date Context
export const useDate = () => useContext(DateContext)
