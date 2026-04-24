const eventsService = require('../services/events.service');

const eventsController = {
    getEvents: (req, res) => {
        const pageData = eventsService.getEventsData();
        const events = eventsService.getAllEvents();
        
        res.render('layouts/layout', {
            title: pageData.title,
            page: pageData.page,
            activeEvents: true,
            events: events,
            activeHome: false,
            activeAbout: false,
            activeContact: false,
            activeNews: false,
            activeLogin: false
        });
    },

    getEventById: (req, res) => {
        const eventId = req.params.id;
        const event = eventsService.getEventById(eventId);
        
        if (event) {
            res.render('layouts/layout', {
                title: event.title,
                page: 'event-details',
                activeEvents: true,
                event: event,
                activeHome: false,
                activeAbout: false,
                activeContact: false,
                activeNews: false,
                activeLogin: false
            });
        } else {
            res.status(404).render('layouts/layout', {
                title: 'Event Not Found',
                page: '404',
                activeHome: false,
                activeAbout: false,
                activeContact: false,
                activeEvents: false,
                activeNews: false,
                activeLogin: false
            });
        }
    }
};

module.exports = eventsController;