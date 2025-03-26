import { Outlet } from 'react-router-dom'
import NavBar from './components/LayoutComponents/NavBar'
import FloatingButton from './components/LayoutComponents/FloatingButton'

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet /> {/**this is where the pages will be rendered */}
      <FloatingButton />
    </>
  )
}

export default Layout
