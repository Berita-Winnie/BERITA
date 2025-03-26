import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MealPlan from './pages/MealPlan'
import WeeklyView from './pages/WeeklyView'
import Layout from './Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/Plan-Your-Meals" element={<MealPlan />} />
        <Route path="/View-Weekly-Plan" element={<WeeklyView />} />
      </Route>
    </Routes>
  )
}

export default App
