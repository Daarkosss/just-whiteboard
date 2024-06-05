const express = require('express');
const router = express.Router();
const {
  getBoards, getUsersBoards, getBoard, createBoard, updateBoard, deleteBoard
} = require('../controllers/boards.controller');

router.get('/all', getBoards);
router.get('/users-boards', getUsersBoards);
router.get('/', getBoard);
router.post('/', createBoard);
router.put('/', updateBoard);
router.delete('/', deleteBoard);

module.exports = router;
