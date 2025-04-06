import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MealPlan from './pages/MealPlan'
import WeeklyView from './pages/WeeklyView'
import Layout from './Layout'
import { MealPlanProvider } from './components/contexts/MealplanContext'
import { DateProvider } from './components/contexts/DateContext'

function App() {
  return (
    <DateProvider>
      <MealPlanProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/Plan-Your-Meals" element={<MealPlan />} />
            <Route path="/View-Weekly-Plan" element={<WeeklyView />} />
          </Route>
        </Routes>
      </MealPlanProvider>
    </DateProvider>
  )
}

export default App
