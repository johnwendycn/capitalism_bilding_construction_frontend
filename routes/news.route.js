const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');

// GET news page
router.get('/', newsController.getNews);

// GET single news by ID
router.get('/:id', newsController.getNewsById);

module.exports = router;