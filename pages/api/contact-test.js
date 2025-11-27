export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check environment variables
    const checks = {
      resendApiKey: !!process.env.RESEND_API_KEY,
      resendApiKeyLength: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : 0,
      nodeEnv: process.env.NODE_ENV || 'unknown',
      timestamp: new Date().toISOString()
    };

    // Try to initialize Resend
    let resendStatus = 'Not tested';
    try {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      resendStatus = 'Initialized successfully';
    } catch (error) {
      resendStatus = `Initialization failed: ${error.message}`;
    }

    return res.status(200).json({
      status: 'Contact API Health Check',
      checks,
      resendStatus,
      message: checks.resendApiKey 
        ? 'API key is present - ready to send emails' 
        : 'API key is missing - emails will fail'
    });

  } catch (error) {
    return res.status(500).json({
      status: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}