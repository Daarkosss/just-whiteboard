const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserBySSOID,
  getUsersBoards,
  loginUser
} = require('../controllers/users.controller.js');

router.get('/all', getUsers);
router.get('/', getUser);
router.get('/ssoid', getUserBySSOID);
router.get('/users-boards', getUsersBoards);
router.post('/login', loginUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;
