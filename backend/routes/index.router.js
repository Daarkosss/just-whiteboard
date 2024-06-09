
const express = require('express');
const router = express.Router();
const { findOrCreateUser } = require('../controllers/users.controller');

router.post('/login', async (req, res) => {
  try {
    // Logika związana z weryfikacją tokena
    const userData = req.user;
    // console.log(userData);
    if (!userData) {
      throw new Error('User data not found');
    }
    const user = await findOrCreateUser(userData);
    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: String(error) });
  }
});
// Logout route

module.exports = router;

