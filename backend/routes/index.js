var express = require("express");
var cors = require("cors");
var axios = require("axios");
const { confirmToken } = require("../controllers/security.controller.js");

const app = express();

require("dotenv").config();

app.use(cors());

app.post('/login', async (req, res) => {
  try {
    // Logika związana z weryfikacją tokena
    await confirmToken(req, res);

    if (res.statusCode !== 200) {
      return res;
    }

    // Kontynuuj z logiką biznesową
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
  }
});
// Logout route

module.exports = app;
