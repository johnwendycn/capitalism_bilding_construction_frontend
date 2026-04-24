const newsService = {
    getNewsData: () => {
        return {
            page: 'news',
            title: 'Latest News'
        };
    },

    getAllNews: () => {
        return [
            { id: 1, title: 'New Feature Launch', date: '2024-03-01', summary: 'Exciting new features coming', content: 'Full content here...' },
            { id: 2, title: 'Partnership Announcement', date: '2024-03-05', summary: 'Strategic partnership formed', content: 'Full content here...' },
            { id: 3, title: 'Award Recognition', date: '2024-03-10', summary: 'Company receives industry award', content: 'Full content here...' }
        ];
    },

    getNewsById: (id) => {
        const news = newsService.getAllNews();
        return news.find(item => item.id == id);
    }
};

module.exports = newsService;

