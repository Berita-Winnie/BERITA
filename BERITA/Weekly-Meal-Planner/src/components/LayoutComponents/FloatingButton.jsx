import { useState, useEffect } from 'react'

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  //showing button when the user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  //Scrolling back to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 ">
      <button
        onClick={scrollToTop}
        className={`w-11 h-11 rounded-full bg-active flex items-center justify-center shadow-lg transition-all duration-200 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        } hover:bg-red-500 active:scale-90`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="18"
          height="18"
        >
          <path d="M12 4l-8 8h6v8h4v-8h6z" />
        </svg>
      </button>
    </div>
  )
}

export default FloatingButton
