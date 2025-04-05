import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

const MealInputForm = () => {
  const [meals, setMeals] = useState({
    breakfast: '',
    lunch: '',
    supper: '',
  })

  const [selectedDate, setSelectedDate] = useState(null)
  const [saveMessages, setSaveMessages] = useState({
    breakfast: '',
    lunch: '',
    supper: '',
  })

  useEffect(() => {
    const storedDate = localStorage.getItem('selectedDate')
    if (!storedDate) return

    const parsedDate = new Date(storedDate)
    setSelectedDate(parsedDate)

    const formattedDate = format(parsedDate, 'yyy-MM-dd')
    const savedMeals = JSON.parse(localStorage.getItem('mealPlans'))

    setMeals(
      savedMeals[formattedDate] || { breakfast: '', lunch: '', supper: '' }
    )
  }, [])

  const handleChange = (mealType, value) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: value,
    }))
  }

  const handleSave = (mealType) => {
    if (!selectedDate) return

    const formattedDate = format(selectedDate, 'yyyy-MM-dd')
    const savedMeals = JSON.parse(localStorage.getItem('mealPlans') || '{}')

    savedMeals[formattedDate] = {
      ...savedMeals[formattedDate],
      [mealType]: meals[mealType],
    }

    localStorage.setItem('mealPlans', JSON.stringify(savedMeals))

    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: '',
    }))

    setSaveMessages((prevMessages) => ({
      ...prevMessages,
      [mealType]: `${
        mealType.charAt(0).toUpperCase() + mealType.slice(1)
      } for ${formattedDate} saved succesfully!`,
    }))

    setTimeout(() => {
      setSaveMessages((prevMessages) => ({
        ...prevMessages,
        [mealType]: '',
      }))
    }, 3000)
  }

  return (
    <div className=" w-full mt-2 p-6 flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8">
      {['breakfast', 'lunch', 'supper'].map((mealType, index) => (
        <motion.div
          key={mealType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className=" bg-slate-50 w-full md:w-[300px] min-h-[260px] p-4 rounded-lg drop-shadow-lg flex flex-col justify-between"
        >
          <div className="flex flex-row justify-between p-2 ">
            <label className="uppercase block text-fontcolor font-medium mb-2 border-b-gray-300">
              {mealType}
            </label>
            <button
              onClick={() => handleSave(mealType)}
              className="w-8 flex items-center justify-center text-gray-400  h-8 rounded-full  bg-slate-50 border border-active  hover:bg-active hover:text-white"
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
            className=" w-full sm:w-[260px]  h-[200px] p-2 mb-2 border resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9fd5ca] "
            placeholder=""
            value={meals[mealType] || ''}
            onChange={(e) => handleChange(mealType, e.target.value)}
          />

          {saveMessages[mealType] && (
            <p className="text-fontcolor text-sm mt-2 animate-slideInUp">
              {saveMessages[mealType]}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default MealInputForm
