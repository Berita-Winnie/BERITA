import React, { createContext, useState, useContext } from 'react'
import { useDate } from './DateContext'
const MealPlanContext = createContext()

export const MealPlanProvider = ({ children }) => {
  const { selectedDate } = useDate()

  const [mealPlans, setMealPlans] = useState({
    breakfast: '',
    lunch: '',
    supper: '',
  })

  const saveMealPlan = (mealType, value) => {
    const formattedDate = selectedDate.toISOString().split('T')[0]

    const updatedPlans = {
      ...mealPlans,
      [mealType]: value,
    }

    setMealPlans(updatedPlans)

    // Save to localStorage
    const savedPlans = JSON.parse(localStorage.getItem('mealPlans')) || {}
    savedPlans[formattedDate] = updatedPlans
    localStorage.setItem('mealPlans', JSON.stringify(savedPlans))
  }

  return (
    <MealPlanContext.Provider value={{ mealPlans, saveMealPlan }}>
      {children}
    </MealPlanContext.Provider>
  )
}

// Custom hook to access Meal Plan Context
export const useMealPlan = () => useContext(MealPlanContext)
