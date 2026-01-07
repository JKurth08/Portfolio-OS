import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './ContactWindow.css'

// Helper to get correct asset path for GitHub Pages
const getAssetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/**
 * ContactWindow Component
 *
 * Contact form with social media badges.
 * Features form validation, honeypot spam protection, and EmailJS integration.
 *
 * EmailJS Setup:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{company}}, {{message}}
 * 4. Get your Service ID, Template ID, and Public Key from the dashboard
 * 5. Replace the placeholder values below
 */
function ContactWindow() {
  // STATE: Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    website: '' // Honeypot field (hidden from users)
  })

  // STATE: Form submission status
  const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error', or 'sending'

  // HANDLER: Update form field
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // HANDLER: Form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Honeypot check - if website field is filled, it's likely a bot
    if (formData.website) {
      console.log('Bot detected - honeypot triggered')
      return
    }

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      return
    }

    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return
    }

    // Set sending status
    setSubmitStatus('sending')

    // Send email via EmailJS
    const SERVICE_ID = 'service_zu73s0d'      // Get from EmailJS dashboard
    const TEMPLATE_ID = 'template_vu0hvh7'    // Get from EmailJS dashboard
    const PUBLIC_KEY = 'kg02rwt8u25RUPKcX'      // Get from EmailJS dashboard

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || 'N/A',
      message: formData.message
    }

    // Send the email
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text)
        setSubmitStatus('success')
      })
      .catch((error) => {
        console.error('Failed to send email:', error)
        setSubmitStatus('error')
      })
  }

  // HANDLER: Send another message
  const handleSendAnother = () => {
    setSubmitStatus(null)
    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
      website: ''
    })
  }

  // Show success confirmation page
  if (submitStatus === 'success') {
    return (
      <div className="contact-content">
        <div className="confirmation-page">
          <h1>Message Sent!</h1>
          <img
            src={getAssetPath('icons/success.png')}
            alt="Success"
            className="confirmation-icon-img"
          />
          <p className="confirmation-text">
            Thanks for reaching out! Your message has been successfully sent to <strong>jmkurth@mtu.edu</strong>.
          </p>
          <p className="confirmation-text">
            I'll get back to you as soon as possible, usually within 24-48 hours.
          </p>
          <button className="submit-btn" onClick={handleSendAnother}>
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  // Show error page
  if (submitStatus === 'error') {
    return (
      <div className="contact-content">
        <div className="confirmation-page error-page">
          <h1>Oops!</h1>
          <img
            src={getAssetPath('icons/error.png')}
            alt="Error"
            className="confirmation-icon-img error-icon-img"
          />
          <p className="confirmation-text">
            Something went wrong and your message couldn't be sent.
          </p>
          <p className="confirmation-text">
            Please try emailing me directly at{' '}
            <a href="mailto:jmkurth@mtu.edu">jmkurth@mtu.edu</a>
          </p>
          <button className="submit-btn" onClick={handleSendAnother}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Show contact form (default state or sending)
  return (
    <div className="contact-content">
      <h1>Contact</h1>
      <p>
        I'm always happy to connect! If you have questions, opportunities, or want to chat about projects,
        you can reach me at{' '}
        <a href="mailto:jmkurth@mtu.edu">jmkurth@mtu.edu</a>
        {' '}or fill out the form below.
      </p>

      {/* Social Media Badges */}
      <div className="social-row">
        <a className="badge" href="https://github.com/JKurth08" target="_blank" rel="noopener noreferrer">
          <img src={getAssetPath('icons/github.webp')} alt="GitHub" />
          <span>GitHub</span>
        </a>

        <a className="badge" href="https://www.linkedin.com/in/jkurth0/" target="_blank" rel="noopener noreferrer">
          <img src={getAssetPath('icons/world.webp')} alt="LinkedIn" />
          <span>LinkedIn</span>
        </a>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <label>
          <span className="required">*</span>Your Name:
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={submitStatus === 'sending'}
        />

        <label>
          <span className="required">*</span>Email:
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={submitStatus === 'sending'}
        />

        <label>Company (optional):</label>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          disabled={submitStatus === 'sending'}
        />

        <label>
          <span className="required">*</span>Message:
        </label>
        <textarea
          name="message"
          placeholder="Your message..."
          value={formData.message}
          onChange={handleChange}
          required
          disabled={submitStatus === 'sending'}
        />

        {/* Honeypot field (hidden from humans, attracts bots) */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex="-1"
          autoComplete="off"
        />

        <button type="submit" className="submit-btn" disabled={submitStatus === 'sending'}>
          {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <p className="note">
        <span className="required">*</span>required
      </p>
    </div>
  )
}

export default ContactWindow