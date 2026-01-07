import { useState, useEffect } from 'react'
import './BootScreen.css'

/**
 * BootScreen Component
 *
 * This component displays a retro boot animation when the app loads.
 *
 * React Concepts Used:
 * 1. useState - manages whether the boot screen is visible
 * 2. useEffect - runs side effects (the fade-out timer)
 * 3. Conditional rendering - only shows if visible is true
 */
function BootScreen() {
  // STATE: Track if boot screen should be visible
  // useState returns [currentValue, functionToUpdateValue]
  const [visible, setVisible] = useState(true)

  // EFFECT: Run code after component mounts
  useEffect(() => {
    // Set a timer to hide the boot screen after 1.5 seconds
    const timer = setTimeout(() => {
      setVisible(false) // This updates state and triggers re-render
    }, 1500)

    // CLEANUP: Clear timer when component unmounts
    // This prevents memory leaks
    return () => clearTimeout(timer)
  }, []) // Empty array = run only once when component mounts

  // CONDITIONAL RENDER: Don't render anything if not visible
  if (!visible) return null

  return (
    <div className="boot-screen">
      <div className="boot-text">
        PortfolioOS v1.0
        <br />
        Copyright (C) 2025
        <br />
        <br />
        Initializing system...
        <br />
        Loading desktop environment...
        <br />
        Mounting user profile...
        <br />
        <span className="blink">_</span>
      </div>
    </div>
  )
}

export default BootScreen