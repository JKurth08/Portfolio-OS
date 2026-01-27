import './AboutWindow.css'

// Helper to get correct asset path for GitHub Pages
const getAssetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/**
 * AboutWindow Component
 *
 * Content for the About Me window.
 * This gets rendered inside the Window component.
 *
 * Props:
 * @param {function} onOpenContact - Callback to open the Contact window
 */
function AboutWindow({ onOpenContact }) {
  return (
    <div className="about-content">
      <div className="section">
        <h1>Welcome</h1>
        <h2>I'm Jack Kurth</h2>
        <p>
          I'm a Computer Science student at <strong>Michigan Technological University</strong>.
          I am currently a third year undergraduate specializing in software development.
          This page serves as a window into my personal OS project, personal projects and academic work.
        </p>
      </div>

      <div className="divider"></div>

      <div className="section resume-section">
        <img src={getAssetPath('icons/resume.png')} alt="Resume icon" className="resume-image" />
        <div className="resume-text">
          <h2>My Resume!</h2>
          <a href={getAssetPath('resume/Resume.pdf')} download>Download my resume</a>
        </div>
      </div>

      <div className="divider"></div>

      <div className="section">
        <h2>About Me</h2>
        <p>
          Hi, I’m Jack!
          I am a third-year Computer Science student at Michigan Technological University, minoring in Cybersecurity.

          My goal is simple; learn as much as I can about every programming discipline while here at MTU.

          I learn best by building. Alongside coursework, I’ve taught myself full-stack development, low-level programming, and systems work (including Arduino/Raspberry Pi projects). I’m especially interested in how software communicates with hardware: operating systems, networking, and security.

          On the networking/security side, I’ve worked with Linux (Kali) and common defensive/security tooling, focusing on fundamentals like network traffic analysis, segmentation, and IDS/IPS concepts.

          I have built many full stack websites as well. From simple E-commerce to fully functioning personal portfolios. I enjoy using the React framework and for backend I have worked with Python Flask, PHP, Node.js and Java. 

          Right now I’m deep into terminal tooling and automation. My current project is building a terminal emulator in C and Bash while sharpening my scripting and systems skills. 

          I also love to get outside. I am an avid mountain biker and snowboarder, I love participating in Downhill MTB racing and slope-style snowboarding. However I don't just ride the bikes, I also work on them; I am a very experienced bike mechanic and know my way around a tool very well. 

          Please reach out! I am always on the hunt for new opportunities and my goal is to secure a summer 2026 internship related to software development.
        </p>
      </div>

      <div className="divider"></div>

      <div className="section">
        <h2>Get In Touch</h2>
        <p className="contact">
          You can reach me directly at <strong>jmkurth@mtu.edu</strong> or{' '}
          <button className="contact-button" onClick={onOpenContact}>
            click here
          </button>{' '}
          to send me a message.
        </p>
      </div>
    </div>
  )
}

export default AboutWindow