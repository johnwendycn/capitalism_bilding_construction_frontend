const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// GET contact page
router.get('/', contactController.getContact);

// POST contact form submission
router.post('/', contactController.postContact);

module.exports = router;