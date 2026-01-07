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
          From a young age, I've been fascinated with how technology works.
          I began programming in high school, which quickly led me into deeper studies of
          <strong> AI, cybersecurity, and low-level system development</strong>.
          I love working on projects that blend creativity and logic — from
          emulating old-school operating systems to building machine learning models.
        </p>
        <p>
          Outside of coding, I enjoy exploring the outdoors in Michigan's Upper Peninsula,
          reading about computer history, and automating everyday tasks for fun.
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