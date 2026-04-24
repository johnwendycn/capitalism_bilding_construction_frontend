const aboutService = require('../services/about.service');

const aboutController = {
    getAbout: (req, res) => {
        const pageData = aboutService.getAboutData();
        const team = aboutService.getTeamMembers();
        const mission = aboutService.getMission();
        
        res.render('layouts/layout', {
            title: pageData.title,
            page: pageData.page,
            activeAbout: true,
            team: team,
            mission: mission,
            activeHome: false,
            activeContact: false,
            activeEvents: false,
            activeNews: false,
            activeLogin: false
        });
    }
};

module.exports = aboutController;