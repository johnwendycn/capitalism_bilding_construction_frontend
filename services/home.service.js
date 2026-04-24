const homeService = {
    getHomeData: () => {
        return {
            page: 'home',
            title: 'RedirectMall - Your Shopping Destination'
        };
    },

    getFeatures: () => {
        return [
            { icon: 'fa-shopping-cart', title: 'Easy Shopping', description: 'Shop with ease and convenience' },
            { icon: 'fa-truck', title: 'Fast Delivery', description: 'Get your items delivered quickly' },
            { icon: 'fa-shield', title: 'Secure Payment', description: '100% secure transactions' }
        ];
    },

    getTestimonials: () => {
        return [
            { name: 'John Doe', comment: 'Great experience!', rating: 5 },
            { name: 'Jane Smith', comment: 'Excellent service', rating: 4 }
        ];
    },

    processHomeForm: (formData) => {
        // Process newsletter signup or search
        return { received: true, data: formData };
    }
};

module.exports = homeService;