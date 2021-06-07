const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware } = require('../controllers/auth');
const { create_file, read_file, read_all_files, delete_file } = require('../controllers/file');

// validators
const { runValidation } = require('../validators');

router.post('/file', requireSignin, authMiddleware, create_file);
router.get('/files', requireSignin, runValidation, authMiddleware, read_all_files);
router.delete('/file/:filename', requireSignin, runValidation, authMiddleware, delete_file);

module.exports = router;
