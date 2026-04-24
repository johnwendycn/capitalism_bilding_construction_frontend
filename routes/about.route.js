const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about.controller');

// GET about page
router.get('/', aboutController.getAbout);

module.exports = router;