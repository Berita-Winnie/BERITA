import React, { useState, useEffect } from 'react'
import { useMealPlan } from '../contexts/MealplanContext'
import { useDate } from '../contexts/DateContext'
import { motion } from 'framer-motion'

const MealInputForm = () => {
  const { saveMealPlan } = useMealPlan()
  const { selectedDate } = useDate()

  const [inputs, setInputs] = useState({
    breakfast: '',
    lunch: '',
    supper: '',
  })

  const [savedMessage, setSavedMessage] = useState({
    breakfast: false,
    lunch: false,
    supper: false,
  })

  const [alreadySavedMessage, setAlreadySavedMessage] = useState({
    breakfast: '',
    lunch: '',
    supper: '',
  })

  const [emptyInputMessage, setEmptyInputMessage] = useState({
    breakfast: '',
    lunch: '',
    supper: '',
  })

  // Helper function to check if the meal is already saved for that day
  const checkIfMealExists = (mealType) => {
    const formattedDate = selectedDate.toISOString().split('T')[0]
    const savedPlans = JSON.parse(localStorage.getItem('mealPlans')) || {}
    return savedPlans[formattedDate] && savedPlans[formattedDate][mealType]
  }

  const handleInputChange = (mealType, value) => {
    setInputs({ ...inputs, [mealType]: value })
    setSavedMessage({ ...savedMessage, [mealType]: false }) // Hide save message while typing
    setEmptyInputMessage({ ...emptyInputMessage, [mealType]: '' }) // Hide empty message while typing
  }

  const handleSave = (mealType) => {
    if (inputs[mealType].trim() === '') {
      setEmptyInputMessage({
        ...emptyInputMessage,
        [mealType]: `Please enter a meal for ${mealType}`,
      })
      setTimeout(() => {
        setEmptyInputMessage({ ...emptyInputMessage, [mealType]: '' })
      }, 3000)
      return
    }

    const formattedDate = selectedDate.toISOString().split('T')[0]

    // Check if the meal is already saved
    if (checkIfMealExists(mealType)) {
      setAlreadySavedMessage({
        ...alreadySavedMessage,
        [mealType]: `Meal for ${mealType} on ${formattedDate} is already saved!`,
      })
      // Clear the already saved message after 3 seconds
      setTimeout(() => {
        setAlreadySavedMessage({ ...alreadySavedMessage, [mealType]: '' })
      }, 3000)
      return
    }

    saveMealPlan(mealType, inputs[mealType])
    setSavedMessage({ ...savedMessage, [mealType]: true })

    // Clear input after save
    setInputs({ ...inputs, [mealType]: '' })

    // Auto-hide saved message after 2 seconds
    setTimeout(() => {
      setSavedMessage((prev) => ({ ...prev, [mealType]: false }))
    }, 2000)
  }

  return (
    <div className="w-full mt-2 p-6 flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8">
      {['breakfast', 'lunch', 'supper'].map((mealType, index) => (
        <motion.div
          key={mealType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-slate-50 w-full md:w-[300px] min-h-[260px] p-4 rounded-lg drop-shadow-lg flex flex-col justify-between"
        >
          <div className="flex flex-row justify-between p-2">
            <label className="uppercase block text-fontcolor font-medium mb-2 border-b-gray-300">
              {mealType}
            </label>
            <button
              onClick={() => handleSave(mealType)}
              className="w-8 flex items-center justify-center text-gray-400 h-8 rounded-full bg-slate-50 border border-active hover:bg-active hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <textarea
            className="w-full sm:w-[260px] h-[200px] p-2 mb-2 border resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9fd5ca]"
            placeholder={`Enter ${mealType} here`}
            value={inputs[mealType]}
            onChange={(e) => handleInputChange(mealType, e.target.value)}
          />

          {savedMessage[mealType] && (
            <p className="text-green-600 text-sm mt-2 animate-slideInUp">
              Meal plan for {mealType} is saved!
            </p>
          )}

          {alreadySavedMessage[mealType] && (
            <p className="text-red-600 text-sm mt-2 animate-slideInUp">
              {alreadySavedMessage[mealType]}
            </p>
          )}

          {emptyInputMessage[mealType] && (
            <p className="text-red-600 text-sm mt-2 animate-slideInUp">
              {emptyInputMessage[mealType]}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default MealInputForm
