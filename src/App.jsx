import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'
import './App.css'

/**
 * App Component - The main application container
 *
 * This is the root component that holds our entire PortfolioOS.
 * Now includes:
 * - BootScreen (fades out after 1.5s)
 * - Desktop (with draggable icons)
 */
function App() {
  return (
    <>
      {/* Boot screen shows first, then fades out */}
      <BootScreen />

      {/* Desktop with icons */}
      <Desktop />

      {/* TODO: Add Windows and Taskbar components next */}
    </>
  )
}

export default App