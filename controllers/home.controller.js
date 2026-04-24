const homeService = require('../services/home.service');

const homeController = {
    getHome: (req, res) => {
        const pageData = homeService.getHomeData();
        const features = homeService.getFeatures();
        const testimonials = homeService.getTestimonials();
        
        res.render('layouts/layout', {
            title: pageData.title,
            page: pageData.page,
            activeHome: true,
            features: features,
            testimonials: testimonials,
            activeAbout: false,
            activeContact: false,
            activeEvents: false,
            activeNews: false,
            activeLogin: false
        });
    },

    postHome: (req, res) => {
        const formData = req.body;
        const result = homeService.processHomeForm(formData);
        res.json(result);
    }
};

module.exports = homeController;