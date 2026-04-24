const aboutService = {
    getAboutData: () => {
        return {
            page: 'about',
            title: 'About RedirectMall'
        };
    },

    getTeamMembers: () => {
        return [
            { name: 'Alice Johnson', role: 'CEO', image: '/img/team1.jpg' },
            { name: 'Bob Williams', role: 'CTO', image: '/img/team2.jpg' },
            { name: 'Carol Davis', role: 'Marketing Head', image: '/img/team3.jpg' }
        ];
    },

    getMission: () => {
        return {
            title: 'Our Mission',
            description: 'To provide the best online shopping experience'
        };
    }
};

module.exports = aboutService;