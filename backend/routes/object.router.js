const express = require('express');
const router = express.Router();
const {
  createObject,
  getAllObjects,
  getObjectById,
  updateObject,
  deleteObject
} = require('../controllers/objects.controller.js');

router.post('/', createObject);
router.get('/all', getAllObjects);
router.get('/', getObjectById);
router.put('/', updateObject);
router.delete('/', deleteObject);

module.exports = router;
