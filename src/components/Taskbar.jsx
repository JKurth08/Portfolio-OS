import { useState, useEffect } from 'react'
import './Taskbar.css'

// Helper to get correct asset path for GitHub Pages
const getAssetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/**
 * Taskbar Component - Windows 95 style taskbar
 *
 * Props:
 * @param {Array} minimizedWindows - Array of minimized window IDs
 * @param {string} activeWindow - Currently active window ID
 * @param {function} onWindowClick - Callback when window button is clicked
 */
function Taskbar({ minimizedWindows = [], activeWindow, onWindowClick }) {
  // STATE: Current time
  const [time, setTime] = useState(new Date())

  // STATE: Start menu open/closed
  const [startMenuOpen, setStartMenuOpen] = useState(false)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format time as HH:MM AM/PM
  const formatTime = (date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // 0 should be 12
    const minutesStr = minutes < 10 ? '0' + minutes : minutes
    return `${hours}:${minutesStr} ${ampm}`
  }

  // Window titles mapping
  const windowTitles = {
    about: 'About Me',
    projects: 'Projects',
    contact: 'Contact',
    terminal: 'Command Prompt'
  }

  // Window icons mapping
  const windowIcons = {
    about: getAssetPath('icons/folder.png'),
    projects: getAssetPath('icons/folder_2.png'),
    contact: getAssetPath('icons/editor.png'),
    terminal: getAssetPath('icons/terminal.png')
  }

  // Handle reboot
  const handleReboot = () => {
    window.location.reload()
  }

  return (
    <div className="taskbar">
      {/* Start Menu */}
      {startMenuOpen && (
        <div className="start-menu">
          <div className="start-menu-content">
            {/* Empty content area */}
          </div>
          <div className="start-menu-bottom">
            <button className="start-menu-item" onClick={handleReboot}>
              <img src={getAssetPath('icons/computer.png')} alt="Reboot" className="start-menu-icon-img" />
              <span>Reboot</span>
            </button>
          </div>
        </div>
      )}

      {/* Start Button */}
      <button
        className={`start-button ${startMenuOpen ? 'active' : ''}`}
        onClick={() => setStartMenuOpen(!startMenuOpen)}
      >
        <img src={getAssetPath('icons/windows-icon.webp')} alt="Start" className="start-icon" />
        <span>Start</span>
      </button>

      {/* Divider */}
      <div className="taskbar-divider"></div>

      {/* Minimized Window Buttons */}
      <div className="taskbar-windows">
        {minimizedWindows.map((windowId) => (
          <button
            key={windowId}
            className={`taskbar-window-btn ${activeWindow === windowId ? 'active' : ''}`}
            onClick={() => onWindowClick(windowId)}
          >
            {windowIcons[windowId] && (
              <img src={windowIcons[windowId]} alt="" className="taskbar-window-icon" />
            )}
            <span className="taskbar-window-title">{windowTitles[windowId]}</span>
          </button>
        ))}
      </div>

      {/* System Tray / Clock */}
      <div className="taskbar-tray">
        <div className="taskbar-clock">
          {formatTime(time)}
        </div>
      </div>
    </div>
  )
}

export default Taskbar