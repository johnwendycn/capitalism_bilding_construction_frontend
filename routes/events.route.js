const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');

// GET events page
router.get('/', eventsController.getEvents);

// GET single event by ID
router.get('/:id', eventsController.getEventById);

module.exports = router;