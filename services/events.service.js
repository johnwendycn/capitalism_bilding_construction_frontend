const eventsService = {
    getEventsData: () => {
        return {
            page: 'events',
            title: 'Upcoming Events'
        };
    },

    getAllEvents: () => {
        return [
            { id: 1, title: 'Summer Sale', date: '2024-06-15', location: 'Online', description: 'Big summer discounts' },
            { id: 2, title: 'Tech Conference', date: '2024-07-20', location: 'New York', description: 'Latest tech trends' },
            { id: 3, title: 'Fashion Week', date: '2024-08-10', location: 'Paris', description: 'Latest fashion collections' }
        ];
    },

    getEventById: (id) => {
        const events = eventsService.getAllEvents();
        return events.find(event => event.id == id);
    }
};

module.exports = eventsService;