var axios = require("axios");

const confirmToken = async (req, res) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];
  
    if (!accessToken) {
      return res.status(401).json({ message: 'No token provided' });
    }
    try {
        // Logika związana z weryfikacją tokena z Google
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
          params: { id_token: accessToken }
        });
        const tokenData = response.data;
        if (tokenData.aud !== process.env.GOOGLE_CLIENT_ID || tokenData.exp < Math.floor(Date.now() / 1000)) {
          return res.status(401).json({ message: 'Invalid token' });
        }
        
        res.status(200);
      } catch (error) {
        console.error(error);
        if (error.response) {
          // Błędy z serwera Google
          res.status(error.response.status).json({ message: error.response.data.error_description });
        } else if (error.name === 'TokenExpiredError') {
          res.status(401).json({ message: 'Token has expired' });
        } else {
          // Błędy weryfikacji JWT lub inne błędy sieci
          res.status(500).json({ message: 'Failed to authenticate' });
        }
      }
};

module.exports = {
    confirmToken,
  };
  