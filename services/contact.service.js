const contactService = {
    getContactData: () => {
        return {
            page: 'contact',
            title: 'Contact Us'
        };
    },

    getContactInfo: () => {
        return {
            email: 'info@redirectmall.com',
            phone: '+1234-567-890',
            address: '123 Business Street, City, Country'
        };
    },

    validateContactForm: (formData) => {
        const errors = [];
        
        if (!formData.name || formData.name.length < 2) {
            errors.push('Name is required and must be at least 2 characters');
        }
        
        if (!formData.email || !formData.email.includes('@')) {
            errors.push('Valid email is required');
        }
        
        if (!formData.message || formData.message.length < 10) {
            errors.push('Message must be at least 10 characters');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    saveContactMessage: (formData) => {
        // Save to database (simulated)
        const message = {
            id: Date.now(),
            ...formData,
            createdAt: new Date().toISOString()
        };
        return message;
    }
};

module.exports = contactService;