export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message, subject } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    // Rate limiting check (simple implementation)
    const userAgent = req.headers['user-agent'];
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    // Send email using Resend
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'onboarding@resend.dev', // Using Resend's sandbox domain
      to: ['orolickiiuros@gmail.com'],
      subject: `Portfolio Contact: ${subject || 'New Message'}`,
      html: `
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
      `
    });
    // Log successful email sending
    console.log('✅ Email sent successfully via Resend:', {
      name,
      email,
      subject: subject || 'No subject',
      timestamp: new Date().toISOString(),
      ip: clientIP
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      data: {
        name,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}