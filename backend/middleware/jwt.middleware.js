var axios = require("axios");

const confirmToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(' ')[1];
  
  if (!accessToken) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
      params: { id_token: accessToken }
    });

    if (response.data.error_description === 'Invalid Value') {
      return res.status(401).send({
        message: 'Token has expired. Log in again.'
      });
    }

    const tokenData = response.data;

    if (tokenData.aud !== process.env.GOOGLE_CLIENT_ID || tokenData.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ message: 'Invalid token. Log in again.' });
    }

    req.user = tokenData;
    next();
  } catch (error) {
    if (error.response) {
      const status = 401;
      const message = error.response.data.error_description || 'Invalid token. Log in again.';
      return res.status(status).json({ message });
    } else if (error.request) {
      return res.status(500).json({ message: 'No response from Google API' });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  confirmToken,
};
