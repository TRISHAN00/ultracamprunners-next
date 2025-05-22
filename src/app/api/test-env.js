// pages/api/test-env.js
export default function handler(req, res) {
    res.status(200).json({ 
      base_url: process.env.NEXT_PUBLIC_BASE_URL,
      // other variables
    });
  }