import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check localStorage and system preference on mount
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark

    setIsDark(shouldBeDark)
    applyTheme(shouldBeDark)
  }, [])

  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    applyTheme(newTheme)
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50 cursor-pointer sm:bottom-2.5 sm:right-2.5"
      onClick={toggleTheme}
    >
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        className="hidden"
      />
      {/* Moon Icon */}
      <div
        className={`absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-lg sm:text-xl transition-all duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94) ${
          isDark
            ? 'scale-0 rotate-360 opacity-0'
            : 'scale-100 rotate-0 opacity-100'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          filter: isDark ? 'drop-shadow(0 0 0px rgba(99, 102, 241, 0))' : 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))',
        }}
      >
        <i className="fas fa-moon"></i>
      </div>

      {/* Sun Icon */}
      <div
        className={`absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-lg sm:text-xl transition-all duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94) ${
          isDark
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-0 rotate-360 opacity-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          filter: isDark ? 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))' : 'drop-shadow(0 0 0px rgba(250, 204, 21, 0))',
        }}
      >
        <i className="fas fa-sun"></i>
      </div>

      {/* Hover effect background */}
      <style>{`
        .group:hover > div {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  )
}
