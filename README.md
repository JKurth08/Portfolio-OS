# Portfolio-OS

A fully interactive portfolio website that recreates the Windows 95 desktop experience in the browser. This project demonstrates modern frontend development practices while paying homage to classic OS design patterns.

## Tech Stack

- **React 18** - Component-based UI with hooks for state management
- **Vite** - Lightning-fast build tool with HMR during development
- **JavaScript** - Modern ES6+ syntax
- **CSS3** - Pixel-perfect Win95 UI recreation
- **Node.js & npm** - Dependency management and build scripts

## Features

- 🖥️ Authentic Windows 95 desktop interface
- 🪟 Draggable, resizable windows with minimize/maximize/close
- 📋 Taskbar with Start menu and window management
- 📁 Multiple app windows (Projects, About, Contact, Terminal)
- 🎨 Custom Win95 styling with classic gray palette
- ⚡ Fast development with Vite's HMR
- 📦 Static site - no backend required

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This is a static site that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

The production build outputs optimized files to the `dist/` directory.

## Project Structure

```
src/
├── components/      # React components (Window, Desktop, etc.)
├── assets/         # Fonts, icons, images
├── App.jsx         # Main application component
└── main.jsx        # Application entry point
public/             # Static assets
```

---

Built with 💾 by Jack Kurth