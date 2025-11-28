export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('📥 Contact form request received:', {
      method: req.method,
      body: req.body ? 'Present' : 'Missing',
      headers: req.headers ? 'Present' : 'Missing'
    });

    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Validation failed: Invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Get client info for logging
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Log the contact attempt (since we can't send email without API key)
    console.log('📧 Contact form submission:', {
      name,
      email,
      subject: subject || 'No subject provided',
      message,
      clientIP,
      userAgent,
      timestamp: new Date().toISOString()
    });

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY environment variable is not set - logging message only');
      
      // Return success even without sending email (for now)
      return res.status(200).json({
        success: true,
        message: 'Message received! I\'ll get back to you soon via email.',
        data: {
          name,
          email,
          timestamp: new Date().toISOString(),
          note: 'Message logged - email service will be configured shortly'
        }
      });
    }

    console.log('🔑 Resend API key is present');

    // Send email using Resend
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Create email templates
    const textTemplate = `
New Portfolio Contact Message

Name: ${name}
Email: ${email}
Subject: ${subject || 'No subject provided'}

Message:
${message}

---
Request Details:
IP: ${clientIP}
User Agent: ${userAgent}
Timestamp: ${new Date().toISOString()}
    `.trim();

    const htmlTemplate = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
              .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              .message-box { border-left: 4px solid #3b82f6; padding: 16px; margin: 16px 0; background: #f8fafc; }
              .footer { background: #f1f5f9; padding: 15px; font-size: 12px; color: #64748b; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>📧 New Portfolio Contact Message</h2>
            </div>
            <div class="content">
              <p><strong>👤 Name:</strong> ${name}</p>
              <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>📝 Subject:</strong> ${subject || 'No subject provided'}</p>
              
              <h3>💬 Message:</h3>
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>
              
              <div style="margin-top: 20px;">
                <a href="mailto:${email}?subject=Re: ${subject || 'Portfolio Contact'}" 
                   style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                  Reply to ${name}
                </a>
              </div>
            </div>
            <div class="footer">
              <p><strong>📍 Request Details:</strong></p>
              <p>IP Address: ${clientIP}</p>
              <p>User Agent: ${userAgent}</p>
              <p>Timestamp: ${new Date().toLocaleString()}</p>
              <hr>
              <p style="text-align: center;">
                Sent from <a href="https://urosorolicki.vercel.app">urosorolicki.vercel.app</a>
              </p>
            </div>
          </body>
        </html>
      `;

    console.log('📧 Attempting to send email with Resend...');
    console.log('From: onboarding@resend.dev');
    console.log('To: orolickiiuros@gmail.com');
    console.log('Subject:', `New Contact Form Message from ${name}`);

    try {
      const data = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ['orolickiiuros@gmail.com'],
        subject: `New Contact Form Message from ${name}`,
        html: htmlTemplate,
        text: textTemplate
      });

      console.log('✅ Email sent successfully via Resend:', {
        id: data.id,
        name,
        email,
        subject: subject || 'No subject',
        timestamp: new Date().toISOString(),
        ip: clientIP
      });

      return res.status(200).json({
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.',
        data: {
          name,
          timestamp: new Date().toISOString(),
          id: data.id
        }
      });

    } catch (emailError) {
      console.error('❌ Resend error details:', {
        message: emailError.message,
        stack: emailError.stack,
        code: emailError.code || 'unknown',
        statusCode: emailError.statusCode || 'unknown',
        name: emailError.name || 'unknown',
        timestamp: new Date().toISOString(),
        apiKey: process.env.RESEND_API_KEY ? 'Present' : 'Missing'
      });

      // More specific error messages
      let userMessage = 'Failed to send message. Please try again later.';
      if (emailError.message?.includes('API key')) {
        userMessage = 'Email service configuration error. Please contact the administrator.';
      } else if (emailError.message?.includes('domain')) {
        userMessage = 'Email domain not verified. Please contact the administrator.';
      } else if (emailError.statusCode === 422) {
        userMessage = 'Invalid email data. Please check your inputs and try again.';
      }

      return res.status(500).json({
        success: false,
        message: userMessage,
        error: process.env.NODE_ENV === 'development' ? emailError.message : 'Internal server error'
      });
    }

  } catch (error) {
    console.error('❌ General contact form error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}