import { useState, useRef, useEffect } from 'react'
import './Window.css'

/**
 * Window Component - Reusable Windows 95 style window
 *
 * This component creates a draggable, resizable window.
 * It's a wrapper - you pass children to render inside.
 *
 * Props:
 * @param {string} id - Unique window identifier
 * @param {string} title - Window title text
 * @param {string} icon - Path to title bar icon
 * @param {object} initialPosition - Starting position {x, y}
 * @param {object} initialSize - Starting size {width, height}
 * @param {function} onClose - Callback when close button clicked
 * @param {function} onFocus - Callback when window is clicked (brings to front)
 * @param {function} onMinimize - Callback when minimize button clicked
 * @param {boolean} isMinimized - Whether window is currently minimized
 * @param {number} zIndex - Z-index for stacking order
 * @param {ReactNode} children - Content to render inside window
 *
 * React Concepts:
 * - children prop: Special prop for nested content
 * - useRef: Track drag/resize without re-renders
 * - Controlled positioning via state
 */
function Window({
  id,
  title,
  icon,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 1000, height: 600},
  onClose,
  onFocus,
  onMinimize,
  isMinimized = false,
  zIndex = 10,
  children
}) {
  // STATE: Window position
  const [position, setPosition] = useState(initialPosition)

  // STATE: Window size
  const [size, setSize] = useState(initialSize)

  // STATE: Is window maximized?
  const [isMaximized, setIsMaximized] = useState(false)

  // REF: Track drag state
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startPosX: 0,
    startPosY: 0
  })

  // REF: Track resize state
  const resizeState = useRef({
    isResizing: false,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0
  })

  // REF: Store pre-maximize state
  const preMaximizeState = useRef(null)

  // === VIEWPORT RESIZE HANDLING ===
  useEffect(() => {
    const handleViewportResize = () => {
      // Skip if maximized (handled by CSS)
      if (isMaximized) {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight - 40
        })
        return
      }

      // Check if window is now outside viewport bounds
      const maxX = window.innerWidth - size.width
      const maxY = window.innerHeight - size.height - 40

      // Adjust position if needed
      let newX = position.x
      let newY = position.y
      let needsUpdate = false

      if (position.x > maxX) {
        newX = Math.max(0, maxX)
        needsUpdate = true
      }

      if (position.y > maxY) {
        newY = Math.max(0, maxY)
        needsUpdate = true
      }

      if (needsUpdate) {
        setPosition({ x: newX, y: newY })
      }

      // Adjust size if window is now too large
      let newWidth = size.width
      let newHeight = size.height
      let sizeNeedsUpdate = false

      if (size.width > window.innerWidth) {
        newWidth = Math.max(400, window.innerWidth)
        sizeNeedsUpdate = true
      }

      if (size.height > window.innerHeight - 40) {
        newHeight = Math.max(300, window.innerHeight - 40)
        sizeNeedsUpdate = true
      }

      if (sizeNeedsUpdate) {
        setSize({ width: newWidth, height: newHeight })
      }
    }

    window.addEventListener('resize', handleViewportResize)
    return () => window.removeEventListener('resize', handleViewportResize)
  }, [position, size, isMaximized])

  // === DRAGGING ===
  const handleTitleBarMouseDown = (e) => {
    // Don't drag if clicking buttons
    if (e.target.tagName === 'BUTTON') return

    // Don't drag if maximized
    if (isMaximized) return

    dragState.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y
    }

    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('mouseup', handleDragEnd)
  }

  const handleDragMove = (e) => {
    if (!dragState.current.isDragging) return

    const dx = e.clientX - dragState.current.startX
    const dy = e.clientY - dragState.current.startY

    // Calculate new position
    let newX = dragState.current.startPosX + dx
    let newY = dragState.current.startPosY + dy

    // Get window dimensions
    const maxX = window.innerWidth - size.width
    const maxY = window.innerHeight - size.height - 40 // Account for taskbar

    // Constrain to viewport bounds
    newX = Math.max(0, Math.min(newX, maxX))
    newY = Math.max(0, Math.min(newY, maxY))

    setPosition({
      x: newX,
      y: newY
    })
  }

  const handleDragEnd = () => {
    dragState.current.isDragging = false
    document.removeEventListener('mousemove', handleDragMove)
    document.removeEventListener('mouseup', handleDragEnd)
  }

  // === RESIZING ===
  const handleResizerMouseDown = (e) => {
    e.stopPropagation()

    resizeState.current = {
      isResizing: true,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height
    }

    document.addEventListener('mousemove', handleResizeMove)
    document.addEventListener('mouseup', handleResizeEnd)
  }

  const handleResizeMove = (e) => {
    if (!resizeState.current.isResizing) return

    const dx = e.clientX - resizeState.current.startX
    const dy = e.clientY - resizeState.current.startY

    // Calculate new size with constraints
    const newWidth = Math.max(400, resizeState.current.startWidth + dx)
    const newHeight = Math.max(300, resizeState.current.startHeight + dy)

    // Constrain to viewport (don't resize beyond screen edge)
    const maxWidth = window.innerWidth - position.x
    const maxHeight = window.innerHeight - position.y - 40 // Account for taskbar

    setSize({
      width: Math.min(newWidth, maxWidth),
      height: Math.min(newHeight, maxHeight)
    })
  }

  const handleResizeEnd = () => {
    resizeState.current.isResizing = false
    document.removeEventListener('mousemove', handleResizeMove)
    document.removeEventListener('mouseup', handleResizeEnd)
  }

  // === WINDOW CONTROLS ===
  const handleMaximize = () => {
    if (isMaximized) {
      // Restore
      setPosition(preMaximizeState.current.position)
      setSize(preMaximizeState.current.size)
      setIsMaximized(false)
    } else {
      // Maximize
      preMaximizeState.current = { position, size }
      setPosition({ x: 0, y: 0 })
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - 40 // Account for taskbar
      })
      setIsMaximized(true)
    }
  }

  const handleMinimize = (e) => {
    e.stopPropagation()
    if (onMinimize) {
      onMinimize()
    }
  }

  const handleClose = (e) => {
    e.stopPropagation()
    if (onClose) {
      onClose()
    }
  }

  const handleMaximizeClick = (e) => {
    e.stopPropagation()
    handleMaximize()
  }

  // Don't render window if minimized
  if (isMinimized) {
    return null
  }

  return (
    <div
      className={`window active ${isMaximized ? 'maximized' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: zIndex
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="title-bar"
        onMouseDown={handleTitleBarMouseDown}
      >
        <div className="title-bar-text">
          {icon && <img src={icon} alt="" width="16" height="16" />}
          {title}
        </div>
        <div className="title-bar-controls">
          <button onClick={handleMinimize} aria-label="Minimize">_</button>
          <button onClick={handleMaximizeClick} aria-label="Maximize">□</button>
          <button onClick={handleClose} aria-label="Close">×</button>
        </div>
      </div>

      {/* Window Body (children go here) */}
      <div className="window-body">
        {children}
      </div>

      {/* Bottom Status Bar */}
      <div className="window-bottom">
        <span>Ready</span>
      </div>

      {/* Resize Handle (hidden when maximized) */}
      {!isMaximized && (
        <div
          className="resizer"
          onMouseDown={handleResizerMouseDown}
        />
      )}
    </div>
  )
}

export default Window