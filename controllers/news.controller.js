const newsService = require('../services/news.service');

const newsController = {
    getNews: (req, res) => {
        const pageData = newsService.getNewsData();
        const news = newsService.getAllNews();
        
        res.render('layouts/layout', {
            title: pageData.title,
            page: pageData.page,
            activeNews: true,
            news: news,
            activeHome: false,
            activeAbout: false,
            activeContact: false,
            activeEvents: false,
            activeLogin: false
        });
    },

    getNewsById: (req, res) => {
        const newsId = req.params.id;
        const newsItem = newsService.getNewsById(newsId);
        
        if (newsItem) {
            res.render('layouts/layout', {
                title: newsItem.title,
                page: 'news-details',
                activeNews: true,
                newsItem: newsItem,
                activeHome: false,
                activeAbout: false,
                activeContact: false,
                activeEvents: false,
                activeLogin: false
            });
        } else {
            res.status(404).render('layouts/layout', {
                title: 'News Not Found',
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

module.exports = newsController;