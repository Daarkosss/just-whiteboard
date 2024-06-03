var express = require("express");
var cors = require("cors");
var axios = require("axios");

const app = express();

require("dotenv").config();

app.use(cors());

app.post('/login', async (req, res) => {
  const accessToken = req.body.accessToken;

  if (!accessToken) {
    return res.status(400).json({ message: 'No access token provided' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
      params: { id_token: accessToken }
    });

    const tokenData = response.data;

    // Sprawdź, czy token jest dla tej aplikacji
    if (tokenData.aud !== process.env.GOOGLE_CLIENT_ID) {
      return res.status(401).json({ message: 'Invalid token audience' });
    }

    // Sprawdź, czy token nie wygasł
    const now = Math.floor(Date.now() / 1000);
    if (tokenData.exp < now) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    // Sprawdź, czy użytkownik istnieje w bazie, jeśli nie to dodaj
    // Tutaj dalsza logika z bazą danych

    res.json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error(error);
    if (error.response) {
      // Błędy z serwera Google
      res.status(error.response.status).json({ message: error.response.data.error_description });
    } else {
      // Błędy sieci lub inne
      res.status(500).json({ message: 'Failed to authenticate' });
    }
  }
});
// Logout route

module.exports = app;
