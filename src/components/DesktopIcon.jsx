import { useState, useRef } from 'react'
import './DesktopIcon.css'

/**
 * DesktopIcon Component
 *
 * A draggable, selectable desktop icon.
 *
 * Props explained:
 * @param {string} id - Unique identifier for the icon
 * @param {string} label - Text displayed under the icon
 * @param {string} icon - Path to the icon image
 * @param {object} position - Initial position {top, left}
 * @param {boolean} isSelected - Is this icon currently selected?
 * @param {function} onSelect - Callback when icon is clicked
 * @param {function} onOpen - Callback when icon is double-clicked
 *
 * React Concepts:
 * - Props: Receiving data from parent component
 * - useState: Managing position for dragging
 * - useRef: Tracking drag state without causing re-renders
 * - Event handlers: Mouse events for dragging
 */
function DesktopIcon({ id, label, icon, position, isSelected, onSelect, onOpen }) {
  // STATE: Track icon position
  const [pos, setPos] = useState(position)

  // REF: Track drag state (doesn't cause re-render when changed)
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0
  })

  // HANDLER: Mouse down - start potential drag
  const handleMouseDown = (e) => {
    // Only left click
    if (e.button !== 0) return

    // Prevent text selection while dragging
    e.preventDefault()

    // Store starting position
    dragState.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startLeft: pos.left,
      startTop: pos.top
    }

    // Add global listeners for dragging
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // HANDLER: Mouse move - drag icon
  const handleMouseMove = (e) => {
    if (!dragState.current.isDragging) return

    // Desktop is already inset by bezel
    const desktopWidth = window.innerWidth - 32
    const desktopHeight = window.innerHeight - 40 - 32

    // Icon dimensions (approximate)
    const ICON_WIDTH = 80
    const ICON_HEIGHT = 100

    // Calculate how far mouse has moved
    const dx = e.clientX - dragState.current.startX
    const dy = e.clientY - dragState.current.startY

    // Calculate new position
    let newLeft = dragState.current.startLeft + dx
    let newTop = dragState.current.startTop + dy

    // Constrain to desktop bounds
    const maxLeft = desktopWidth - ICON_WIDTH
    const maxTop = desktopHeight - ICON_HEIGHT

    newLeft = Math.max(0, Math.min(newLeft, maxLeft))
    newTop = Math.max(0, Math.min(newTop, maxTop))

    // Update position
    setPos({
      left: newLeft,
      top: newTop
    })
  }

  // HANDLER: Mouse up - end drag
  const handleMouseUp = () => {
    dragState.current.isDragging = false

    // Remove global listeners
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  // HANDLER: Single click selects the icon
  const handleClick = (e) => {
    e.stopPropagation() // Prevent desktop from deselecting
    onSelect()
  }

  // HANDLER: Double click opens the window
  const handleDoubleClick = (e) => {
    e.stopPropagation()
    onOpen()
  }

  return (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      style={{
        position: 'absolute',
        top: `${pos.top}px`,
        left: `${pos.left}px`
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
    >
      <img
        src={icon}
        alt={label}
        draggable={false} // Prevent default browser drag
      />
      <span>{label}</span>
    </div>
  )
}

export default DesktopIcon