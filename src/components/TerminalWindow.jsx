import { useState, useRef, useEffect } from 'react'
import './TerminalWindow.css'

/**
 * TerminalWindow Component
 *
 * Interactive Windows 95-style terminal with custom commands.
 * Users can type commands and get responses.
 */
function TerminalWindow() {
  // ASCII Art for welcome screen
  const asciiArt = ` .----------------.
| .--------------. |
| |     _____    | |
| |    |_   _|   | |
| |      | |     | |
| |   _  | |     | |
| |  | |_' |     | |
| |  \`.___.'     | |
| |              | |
| '--------------' |
 '----------------'

Jack Kurth Portfolio Terminal [Version 1.0.0]
(c) 2025 Jack Kurth. All rights reserved.

Type "help" for available commands.`

  // STATE: Command history (array of {input, output} objects)
  const [history, setHistory] = useState([
    {
      input: null,
      output: asciiArt
    }
  ])

  // STATE: Current input value
  const [input, setInput] = useState('')

  // REF: Terminal output div for auto-scrolling
  const outputRef = useRef(null)

  // REF: Input field for auto-focus
  const inputRef = useRef(null)

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // HANDLER: Process command
  const handleSubmit = (e) => {
    e.preventDefault()

    const cmd = input.trim().toLowerCase()
    let output = ''

    // Process commands
    switch (cmd) {
      case '':
        // Empty command - just show prompt again
        setHistory([...history, { input, output: '' }])
        setInput('')
        return

      case 'help':
        output = `Available commands:
  help       - Show this help message
  about      - Learn about Jack Kurth
  skills     - View technical skills
  projects   - List recent projects
  contact    - Get contact information
  education  - View education background
  clear      - Clear terminal screen
  whoami     - Display current user
  date       - Show current date and time
  echo       - Echo back your message (usage: echo <message>)`
        break

      case 'about':
        output = `Jack Kurth
==========
Computer Science student at Michigan Technological University
Specializing in software development, AI, and cybersecurity

Passionate about building innovative solutions and exploring
low-level system development.`
        break

      case 'skills':
        output = `Technical Skills:
=================
Languages:     Python, Java, C, JavaScript, SQL
Frameworks:    React, Flask, Node.js
Tools:         Git, Docker, Linux, VS Code
Areas:         AI/ML, Cybersecurity, Web Development
Databases:     SQLite, PostgreSQL, MongoDB`
        break

      case 'projects':
        output = `Recent Projects:
================
1. Portfolio OS        - Retro Windows 95 portfolio in React
2. Ascii-Draw          - Terminal ASCII art renderer in C/Java
3. WeatherApp          - CLI/GUI weather application in Python
4. Terminal Emulator   - Lightweight pseudo-terminal in C
5. Fractional Knapsack - Greedy algorithm solver in Java

Type 'projects --details' for more information.`
        break

      case 'projects --details':
        output = `For detailed project information, please visit the Projects window
or check out my GitHub: https://github.com/JKurth08`
        break

      case 'contact':
        output = `Contact Information:
====================
Email:    jmkurth@mtu.edu
GitHub:   https://github.com/JKurth08
LinkedIn: https://www.linkedin.com/in/jkurth0/

Feel free to reach out!`
        break

      case 'education':
        output = `Education:
==========
Michigan Technological University
Bachelor of Science in Computer Science
Expected Graduation: 2026
Current Status: Third-year undergraduate`
        break

      case 'clear':
        setHistory([
          {
            input: null,
            output: asciiArt
          }
        ])
        setInput('')
        return

      case 'whoami':
        output = 'guest@jackkurth-portfolio'
        break

      case 'date':
        output = new Date().toString()
        break

      default:
        if (cmd.startsWith('echo ')) {
          output = cmd.substring(5)
        } else {
          output = `'${input}' is not recognized as an internal or external command.\nType 'help' for available commands.`
        }
    }

    // Add to history
    setHistory([...history, { input, output }])
    setInput('')
  }

  // HANDLER: Click anywhere to focus input
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="terminal-content" onClick={handleTerminalClick}>
      <div className="terminal-output" ref={outputRef}>
        {history.map((entry, index) => (
          <div key={index} className="terminal-entry">
            {entry.input !== null && (
              <div className="terminal-prompt">
                <span className="prompt-symbol">C:\Portfolio&gt;</span>
                <span className="terminal-input-text">{entry.input}</span>
              </div>
            )}
            {entry.output && (
              <pre className="terminal-output-text">{entry.output}</pre>
            )}
          </div>
        ))}

        {/* Current prompt */}
        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="prompt-symbol">C:\Portfolio&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="terminal-input"
            spellCheck="false"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  )
}

export default TerminalWindow