# EmailJS Setup Guide

This guide will help you set up EmailJS to receive contact form submissions via email.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the prompts to connect your email account
5. Copy your **Service ID** (you'll need this later)
service_zu73s0d

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: Portfolio Contact from {{from_name}}

You have a new message from your portfolio contact form!

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}

Message:
{{message}}

---
This message was sent via your portfolio contact form.
```

4. The template variables **must match exactly**:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{company}}`
   - `{{message}}`

5. Copy your **Template ID** (you'll need this later)
template_vu0hvh7

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the dashboard
2. Find your **Public Key** (looks like: `xYz123AbC456dEf`)
3. Copy this key (you'll need this later)

kg02rwt8u25RUPKcX


## Step 5: Update Your Code

Open `src/components/ContactWindow.jsx` and replace these lines (around line 67-69):

```javascript
const SERVICE_ID = 'YOUR_SERVICE_ID'      // Replace with your Service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'    // Replace with your Template ID
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'      // Replace with your Public Key
```

With your actual credentials:

```javascript
const SERVICE_ID = 'service_abc123'       // Your actual Service ID
const TEMPLATE_ID = 'template_xyz789'     // Your actual Template ID
const PUBLIC_KEY = 'xYz123AbC456dEf'      // Your actual Public Key
```

## Step 6: Test It!

1. Run your React app: `npm run dev`
2. Open the Contact window
3. Fill out the form and submit
4. Check your email (jmkurth@mtu.edu) for the message!

## Free Tier Limits

EmailJS free tier includes:
- **200 emails per month**
- **2 email templates**
- **1 email service**

This is perfect for a portfolio site!

## Security Note

Your Public Key is safe to expose in client-side code - that's why it's called a "public" key. EmailJS has rate limiting and domain restrictions to prevent abuse.

## Troubleshooting

**Emails not sending?**
- Check browser console for errors
- Verify all IDs are correct
- Make sure template variables match exactly
- Check EmailJS dashboard for error logs

**Emails going to spam?**
- This is common with automated emails
- Add a reply-to address in your template
- EmailJS Pro offers better deliverability

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Support: support@emailjs.com

---

Once set up, every form submission will send an email directly to **jmkurth@mtu.edu**!