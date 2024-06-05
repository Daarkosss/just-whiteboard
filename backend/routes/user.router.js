const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserBySSOID,
} = require('../controllers/users.controller.js');

router.get('/all', getUsers);
router.get('/', getUser);
router.get('/ssoid', getUserBySSOID);
router.post('/', createUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;
