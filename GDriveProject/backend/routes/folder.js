const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware } = require('../controllers/auth');
const { create_folder, read_folder, update_folder, delete_folder } = require('../controllers/folder');

// validators
const { runValidation } = require('../validators');

router.post('/folder', requireSignin, authMiddleware, create_folder);
// router.get('/folder', requireSignin, authMiddleware, read_folder);
// router.put('/folder', requireSignin, runValidation, authMiddleware, update_folder);
// router.delete('/folder', requireSignin, runValidation, authMiddleware, delete_folder);

module.exports = router;
