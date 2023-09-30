const express = require('express');
const router = express.Router();
const { executePython, executeJava } = require('../controllers/codeController');

router.post('/execute/python', executePython);
router.post('/execute/java', executeJava);

module.exports = router;