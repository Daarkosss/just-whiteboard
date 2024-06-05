const express = require('express');
const router = express.Router();
const {
  getBoards, getBoard, createBoard, updateBoard, deleteBoard, getBoardsObjects
} = require('../controllers/boards.controller');

router.get('/all', getBoards);
router.get('/', getBoard);
router.get('/objects', getBoardsObjects);
router.post('/', createBoard);
router.put('/', updateBoard);
router.delete('/', deleteBoard);

module.exports = router;
