import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation() // Get the current page
  const [isOpen, setIsOpen] = useState(false)

  //toggling menu icon
  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
    console.log('is open after', !isOpen)
  }

  //closing menu when a link is cliked
  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className={`relative ${isOpen ? 'bg-gray-600 bg-opacity-5' : ''}`}>
      <nav className="flex items-center justify-between w-full max-w-6xl mx-auto px-6 py-3 bg-slate-50 border-b border-gray-600 border-opacity-20 ">
        {/*logo */}
        <h1 className=" text-fontcolor font-semibold  text-[1.5rem] md:text-[1.7rem] font-poppins p-2 shadow-sm">
          Berita
        </h1>
        {/*menu button on smaller screens */}
        <button
          className="block md:hidden text-gray-500 hover:text-gray-700 transition-all duration-300 p-2 rounded-md"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 256 256"
            fill="currentColor"
            className="w-6 h-6 transition-all duration-300"
          >
            <g transform="scale(10.66667,10.66667)">
              <path d="M2,5v2h20v-2zM2,11v2h20v-2zM2,17v2h20v-2z"></path>
            </g>
          </svg>
        </button>
        {/** Overlay when sidebar is open */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-5 z-40 transition-all duration-300"
            onClick={closeMenu}
          ></div>
        )}
        {/**sidebar navigation*/}
        <div
          className={`fixed top-0 right-0 h-full w-[250px] bg-slate-50 shadow-lg transform transition-transform duration-300 ease-in-out p-6 z-50 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/**sidebarlinks */}
          <ul className="mt-16 space-y-4">
            {[
              { name: 'Home', path: '/Home' },
              { name: 'Plan Your Meals', path: '/Plan-Your-Meals' },
              { name: 'View Weekly Plan', path: '/View-Weekly-Plan' },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeMenu}
                  className={`block px-4 py-2 rounded-md transition-all duration-300 font-po 
        ${
          location.pathname === item.path
            ? 'bg-gray-300 text-black shadow-md scale-105' // Selected state
            : 'bg-gray-300 text-gray-800 hover:bg-gray-200 hover:scale-105'
        }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/** normal navbar linkks on larger screens */}
        <ul className="hidden md:flex space-x-6">
          {[
            { name: 'Home', path: '/' },
            { name: 'Plan Your Meals', path: '/Plan-Your-Meals' },
            { name: 'View Weekly Plan', path: '/View-Weekly-Plan' },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`px-3 py-2 transition-all duration-300 border-b-2 font-poppins${
                  location.pathname === item.path
                    ? 'text-fontcolor border-[#fc595c] font-semibold' // Active page (Berita text color + red underline)
                    : 'text-fontcolor border-transparent hover:border-[#fc595c]' // Inactive (Berita color, underline on hover)
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
