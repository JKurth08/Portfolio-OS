import { useState } from 'react'
import DesktopIcon from './DesktopIcon'
import Window from './Window'
import AboutWindow from './AboutWindow'
import ProjectsWindow from './ProjectsWindow'
import ContactWindow from './ContactWindow'
import TerminalWindow from './TerminalWindow'
import Taskbar from './Taskbar'
import './Desktop.css'

// Helper to get correct asset path for GitHub Pages
const getAssetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/**
 * Desktop Component
 *
 * This is the main desktop area where icons are displayed.
 *
 * React Concepts:
 * - Component composition: Desktop contains multiple DesktopIcon components
 * - Array mapping: We'll map over an array of icons to render them
 * - Props: We pass data down to DesktopIcon components
 */
function Desktop() {
  // STATE: Track which icon is currently selected (null = none)
  const [selectedIcon, setSelectedIcon] = useState(null)

  // STATE: Track which windows are open (array maintains order, last = top)
  const [openWindows, setOpenWindows] = useState([])

  // STATE: Track the active (focused) window
  const [activeWindow, setActiveWindow] = useState(null)

  // STATE: Track which windows are minimized
  const [minimizedWindows, setMinimizedWindows] = useState([])

  // Define the desktop icons data
  // Each icon has: id, label, icon path, position, and what window it opens
  const icons = [
    {
      id: 'about',
      label: 'About Me',
      icon: getAssetPath('icons/folder.png'),
      position: { top: 20, left: 20 },
      windowId: 'about'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: getAssetPath('icons/folder_2.png'),
      position: { top: 140, left: 20 },
      windowId: 'projects'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: getAssetPath('icons/editor.png'),
      position: { top: 260, left: 20 },
      windowId: 'contact'
    },
    {
      id: 'terminal',
      label: 'Terminal',
      icon: getAssetPath('icons/terminal.png'),
      position: { top: 380, left: 20 },
      windowId: 'terminal'
    },
    {
      id: 'bin',
      label: 'Trash',
      icon: getAssetPath('icons/bin.png'),
      position: { top: 500, left: 20 },
      windowId: null
    }
  ]

  // HANDLER: Clicking desktop deselects all icons
  const handleDesktopClick = () => {
    setSelectedIcon(null)
  }

  // HANDLER: Open a window
  const openWindow = (windowId) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId])
      setActiveWindow(windowId)
    } else {
      // If already open, bring to front
      focusWindow(windowId)
    }
  }

  // HANDLER: Close a window
  const closeWindow = (windowId) => {
    setOpenWindows(openWindows.filter(id => id !== windowId))
    if (activeWindow === windowId) {
      setActiveWindow(null)
    }
  }

  // HANDLER: Focus a window (bring to front)
  const focusWindow = (windowId) => {
    // If minimized, restore it first
    if (minimizedWindows.includes(windowId)) {
      setMinimizedWindows(prev => prev.filter(id => id !== windowId))
    }

    // Move window to end of array (renders last = on top)
    setOpenWindows(prev => {
      const filtered = prev.filter(id => id !== windowId)
      return [...filtered, windowId]
    })
    setActiveWindow(windowId)
  }

  // HANDLER: Minimize a window
  const minimizeWindow = (windowId) => {
    if (!minimizedWindows.includes(windowId)) {
      setMinimizedWindows([...minimizedWindows, windowId])
    }
  }

  // HELPER: Get z-index for a window based on its position in the array
  const getZIndex = (windowId) => {
    const index = openWindows.indexOf(windowId)
    return index === -1 ? 1 : 10 + index
  }

  return (
    <div className="desktop" onClick={handleDesktopClick}>
      {/* Map over icons array and render a DesktopIcon for each */}
      {icons.map(icon => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          label={icon.label}
          icon={icon.icon}
          position={icon.position}
          isSelected={selectedIcon === icon.id}  // Is this icon selected?
          onSelect={() => setSelectedIcon(icon.id)}  // Select this icon
          onOpen={() => openWindow(icon.windowId)}
        />
      ))}

      {/* Render open windows */}
      {openWindows.includes('about') && (
        <Window
          id="about"
          title="About Me"
          icon={getAssetPath('icons/folder.png')}
          initialPosition={{ x: 450, y: 75 }}
          initialSize={{ width: 900, height: 600 }}
          onClose={() => closeWindow('about')}
          onFocus={() => focusWindow('about')}
          onMinimize={() => minimizeWindow('about')}
          isMinimized={minimizedWindows.includes('about')}
          zIndex={getZIndex('about')}
        >
          <AboutWindow onOpenContact={() => openWindow('contact')} />
        </Window>
      )}

      {openWindows.includes('projects') && (
        <Window
          id="projects"
          title="Projects"
          icon={getAssetPath('icons/folder_2.png')}
          initialPosition={{ x: 325, y: 110 }}
          initialSize={{ width: 1000, height: 700 }}
          onClose={() => closeWindow('projects')}
          onFocus={() => focusWindow('projects')}
          onMinimize={() => minimizeWindow('projects')}
          isMinimized={minimizedWindows.includes('projects')}
          zIndex={getZIndex('projects')}
        >
          <ProjectsWindow />
        </Window>
      )}

      {openWindows.includes('contact') && (
        <Window
          id="contact"
          title="Contact"
          icon={getAssetPath('icons/editor.png')}
          initialPosition={{ x: 1350, y: 75 }}
          initialSize={{ width: 300, height: 825 }}
          onClose={() => closeWindow('contact')}
          onFocus={() => focusWindow('contact')}
          onMinimize={() => minimizeWindow('contact')}
          isMinimized={minimizedWindows.includes('contact')}
          zIndex={getZIndex('contact')}
        >
          <ContactWindow />
        </Window>
      )}

      {openWindows.includes('terminal') && (
        <Window
          id="terminal"
          title="Command Prompt"
          icon={getAssetPath('icons/terminal.png')}
          initialPosition={{ x: 200, y: 200 }}
          initialSize={{ width: 700, height: 500 }}
          onClose={() => closeWindow('terminal')}
          onFocus={() => focusWindow('terminal')}
          onMinimize={() => minimizeWindow('terminal')}
          isMinimized={minimizedWindows.includes('terminal')}
          zIndex={getZIndex('terminal')}
        >
          <TerminalWindow />
        </Window>
      )}

      {/* Taskbar */}
      <Taskbar
        minimizedWindows={minimizedWindows}
        activeWindow={activeWindow}
        onWindowClick={focusWindow}
      />
    </div>
  )
}

export default Desktop