const express = require('express');
const router = express.Router();

// Import all page routes
const homeRoutes = require('./home.route');
const aboutRoutes = require('./about.route');
const eventsRoutes = require('./events.route');
const newsRoutes = require('./news.route');
const contactRoutes = require('./contact.route');
// const loginRoutes = require('./login.route'); // Comment this out for now

// Use individual page routes
router.use('/', homeRoutes);
router.use('/about', aboutRoutes);
router.use('/events', eventsRoutes);
router.use('/news', newsRoutes);
router.use('/contact', contactRoutes);
// router.use('/login', loginRoutes); // Comment this out for now

module.exports = router;