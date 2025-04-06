import React, { useEffect, useState } from 'react'
import { useMealPlan } from '../contexts/MealplanContext'
import { useDate } from '../contexts/DateContext'
import { format } from 'date-fns'
import WeekSelector from '../MealplanningpageComponents/WeekSelector'
import breakfast from '../../assets/images/breakfast.png'
import Lunch from '../../assets/images/Lunch.png'
import dinner from '../../assets/images/dinner.png'
import { motion } from 'framer-motion'

const MealList = () => {
  const { selectedDate } = useDate() // Get the selected date from context
  const { mealPlans } = useMealPlan() // Get the meal plans from context

  const [selectedDatePlans, setSelectedDatePlans] = useState({
    breakfast: '',
    lunch: '',
    supper: '',
  })

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split('T')[0]
    const savedPlans = JSON.parse(localStorage.getItem('mealPlans')) || {}

    if (savedPlans[formattedDate]) {
      setSelectedDatePlans(savedPlans[formattedDate])
    }
  }, [selectedDate])

  // Define images for each meal type
  const mealImages = {
    breakfast,
    lunch: Lunch,
    supper: dinner,
  }

  return (
    <div className="w-full  p-2 flex flex-col items-center">
      {/* Week Selector */}
      <WeekSelector className="" />

      <h2 className="text-xl font-bold mt-4 mb-6 text-fontcolor">
        Meals for {format(selectedDate, 'MMMM dd, yyyy')}
      </h2>

      {/* Meal Plan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[56px]">
        {['breakfast', 'lunch', 'supper'].map((mealType, i) => (
          <motion.div
            key={mealType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
            className="overflow-visible relative rounded-lg drop-shadow-lg flex flex-col items-center p-8 min-h-[220px] w-full"
            style={{
              background:
                'linear-gradient(to bottom, rgba(255, 255, 255, 0.75) 70%, #017371 100%)',
            }}
          >
            {/* Meal Title and Description */}
            <div className="flex flex-col justify-start w-full">
              <h3 className="text-sm font-semibold uppercase font-poppins text-fontcolor">
                {mealType}
              </h3>
              <hr className="border-t border-gray-400 pt-2" />
              <p className="text-sm text-gray-500">
                {selectedDatePlans[mealType] ||
                  'No meal planned for this time.'}
              </p>
            </div>

            {/* Meal Image */}
            <div className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[190px]">
              <img
                src={mealImages[mealType]}
                alt={`${mealType} image`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MealList
