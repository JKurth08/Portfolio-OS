import { useMemo, useState } from 'react'
import './ProjectsWindow.css'

// Helper to get correct asset path for GitHub Pages
const getAssetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

// ============================================
// Project template (edit here, UI updates auto)
// ============================================
const PROJECTS = [
  {
    id: 'ascii-draw',
    title: 'Ascii-Draw',
    subtitle: 'Text → ASCII art renderer',
    icon: 'icons/c.png',
    stack: ['C', 'Java', 'File I/O', 'Algorithm Design'],
    summary:
      'A dual-implementation ASCII art generator that converts text-based brightness maps into visual art. The C version prioritizes performance with direct file I/O and memory-efficient processing, while the Java implementation emphasizes object-oriented design and cross-platform compatibility. Both versions support configurable canvas dimensions and multiple rendering modes.',
    highlights: [
      'Implements both grayscale (256-level) and threshold (binary) rendering algorithms',
      'C implementation uses optimized character arrays for fast pixel-to-ASCII mapping',
      'Java version features modular architecture with separate Parser, Renderer, and FileHandler classes',
      'Deterministic output ensures consistent results across platforms',
      'Custom brightness-to-character mapping for authentic ASCII aesthetic'
    ],
    links: {
      github: 'https://github.com/JKurth08/Ascii-Draw',
      demo: '',
      writeup: ''
    }
  },
  {
    id: 'weather',
    title: 'WeatherApp',
    subtitle: 'REST API integration with local caching',
    icon: 'icons/python.png',
    stack: ['Python 3', 'REST API', 'JSON', 'Tkinter', 'File I/O', 'Environment Variables'],
    summary:
      'A weather data application that demonstrates API integration, local caching strategies, and dual-interface design. Built with Python, it fetches real-time weather from external APIs while implementing intelligent caching to minimize redundant requests. Supports both command-line and graphical interfaces for maximum flexibility.',
    highlights: [
      'Integrates with OpenWeatherMap API using secure API key management via .env files',
      'Implements file-based caching system to reduce API calls and improve response time',
      'Dual interface: CLI for quick terminal queries and Tkinter GUI for visual interaction',
      'Robust error handling with user-friendly retry mechanisms for network failures',
      'JSON parsing and data transformation for clean, readable weather output',
      'API key validation and configuration checks at startup'
    ],
    links: {
      github: '#',
      demo: '',
      writeup: ''
    }
  },
  {
    id: 'terminal',
    title: 'TerminalEmulator',
    subtitle: 'Custom pseudo-terminal with low-level I/O',
    icon: 'icons/c.png',
    stack: ['C', 'POSIX', 'ncurses', 'Systems Programming', 'I/O Control'],
    summary:
      'A lightweight terminal emulator built from the ground up in C, demonstrating deep understanding of POSIX terminal control, character-level I/O, and buffer management. Features custom input echo handling, scrollback functionality, and careful attention to edge cases that plague naive terminal implementations.',
    highlights: [
      'Direct terminal control using POSIX termios for raw input mode and echo management',
      'Custom scrollback buffer with bounds checking prevents display jitter on overflow',
      'Character-level input processing with proper handling of special keys (backspace, arrows, etc.)',
      'Precise input/output alignment ensures echo appears correctly in all edge cases',
      'Minimal memory footprint with efficient circular buffer implementation',
      'Clean separation between input handling, display logic, and command execution'
    ],
    links: {
      github: '#',
      demo: '',
      writeup: ''
    }
  },
  {
    id: 'portfolio',
    title: 'PortfolioOS',
    subtitle: 'Full-stack portfolio site with Windows 95 aesthetic',
    icon: 'icons/react.svg',
    stack: ['React 18', 'JavaScript', 'CSS3', 'Vite', 'Node.js', 'npm', 'ESLint', 'HTML5'],
    summary:
      'A fully interactive portfolio website that recreates the Windows 95 desktop experience in the browser. Built with React for component-based architecture and state management, bundled with Vite for lightning-fast development, and deployed as a static site. Demonstrates modern frontend development practices while paying homage to classic OS design patterns.',
    highlights: [
      'React components manage window state (position, z-index, minimized/maximized) with hooks',
      'Vite build tool provides instant HMR during development and optimized production bundles',
      'Node.js and npm handle dependency management and build scripts (dev server, production build)',
      'Custom window management system with draggable windows, taskbar integration, and focus handling',
      'Pixel-perfect Win95 UI recreation using CSS3 (borders, shadows, classic gray palette)',
      'Component architecture: reusable Window wrapper, modular app windows (Projects, About, Terminal)',
      'Static site generation - no backend required, deployable to any CDN or static host',
      'ESLint integration ensures code quality and catches potential bugs during development'
    ],
    links: {
      github: 'https://github.com/JKurth08',
      demo: '',
      writeup: ''
    }
  }
]

const LINK_LABELS = {
  github: 'GitHub',
  demo: 'Live Demo',
  writeup: 'Write-up'
}

function ProjectsWindow() {
  // Default to first item selected (feels more “Explorer”)
  const [selectedId, setSelectedId] = useState(PROJECTS[0]?.id ?? null)

  const currentProject = useMemo(
    () => PROJECTS.find((p) => p.id === selectedId) ?? null,
    [selectedId]
  )

  const links = useMemo(() => {
    if (!currentProject?.links) return []
    return Object.entries(currentProject.links)
      .filter(([, url]) => url && url !== '#')
      .map(([key, url]) => ({
        key,
        url,
        label: LINK_LABELS[key] ?? key
      }))
  }, [currentProject])

  return (
    <div className="projects-explorer">
      <div className="pw-body">
        {/* Left pane */}
        <aside className="project-sidebar" aria-label="Projects">
          <div className="pw-sideheader">
            <img src={getAssetPath('icons/server.png')} alt="" className="pw-folder-icon" />
            <span className="pw-sideheader-text">Projects</span>
          </div>

          <div className="project-list" role="listbox" aria-label="Project list">
            {PROJECTS.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`project-item ${selectedId === project.id ? 'selected' : ''}`}
                onClick={() => setSelectedId(project.id)}
                role="option"
                aria-selected={selectedId === project.id}
              >
                <img src={getAssetPath(project.icon)} alt="" className="file-icon" />
                <span className="project-name">{project.title}</span>
              </button>
            ))}
          </div>

          <div className="pw-statusbar" aria-label="Status bar">
            {currentProject
              ? `${currentProject.title}   —   ${currentProject.stack.join(', ')}`
              : `${PROJECTS.length} item(s)`}
          </div>
        </aside>

        {/* Vertical splitter line */}
        <div className="pw-splitter" aria-hidden="true" />

        {/* Right pane */}
        <section className="project-detail" aria-label="Project details">
          {currentProject ? (
            <div className="pw-details-panel">
              <div className="pw-details-header">
                <div className="pw-details-title">{currentProject.title}</div>
                {currentProject.subtitle ? (
                  <div className="pw-details-subtitle">{currentProject.subtitle}</div>
                ) : null}
              </div>

              <fieldset className="pw-group">
                <legend>Summary</legend>
                <p className="pw-paragraph">{currentProject.summary}</p>
              </fieldset>

              <fieldset className="pw-group">
                <legend>Tech Stack</legend>
                <div className="project-tags">
                  {currentProject.stack.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </fieldset>

              <fieldset className="pw-group">
                <legend>Highlights</legend>
                <ul className="pw-bullets">
                  {currentProject.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </fieldset>

              <fieldset className="pw-group">
                <legend>Links</legend>
                {links.length ? (
                  <div className="pw-linkrow">
                    {links.map((l) => (
                      <a
                        key={l.key}
                        className="pw-btn"
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="pw-muted">No links added yet.</div>
                )}
              </fieldset>
            </div>
          ) : (
            <div className="empty-state">
              <p>Select a project from the left folder pane.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default ProjectsWindow
