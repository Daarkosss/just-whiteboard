const express = require("express");
const cors = require("cors");
const { confirmToken } = require("../controllers/security.controller.js");
const { findOrCreateUser } = require('../controllers/users.controller');

const app = express();

require("dotenv").config();

app.use(cors());

app.post('/login', async (req, res) => {
  try {
    // Logika związana z weryfikacją tokena
    const userData = await confirmToken(req, res);
    if (!userData) {
      return res;
    }

    if (res.statusCode !== 200) {
      return res;
    }
    const user = await findOrCreateUser(userData);
    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: String(error) });
  }
});
// Logout route

module.exports = app;
