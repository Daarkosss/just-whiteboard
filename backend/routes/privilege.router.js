const express = require('express');
const router = express.Router();
const {
    createPrivilege,
    getAllPrivileges,
    deletePrivilegeForBoardAndUser
} = require('../controllers/privileges.controller.js');

router.get('/all', getAllPrivileges);
router.post('/', createPrivilege);
router.delete('/board-user', deletePrivilegeForBoardAndUser);

module.exports = router;
