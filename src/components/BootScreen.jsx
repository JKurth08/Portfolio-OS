import { useState, useEffect } from 'react'
import './BootScreen.css'

/**
 * BootScreen Component
 */
function BootScreen() {

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false) // This updates state and triggers re-render
    }, 1500)

    return () => clearTimeout(timer)
  }, []) // Empty array = run only once when component mounts

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