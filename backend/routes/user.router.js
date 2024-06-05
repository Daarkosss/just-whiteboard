const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserBySSOID,
  getUsersBoards
} = require('../controllers/users.controller.js');

router.get('/all', getUsers);
router.get('/', getUser);
router.get('/ssoid', getUserBySSOID);
router.get('/users-boards', getUsersBoards);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;
