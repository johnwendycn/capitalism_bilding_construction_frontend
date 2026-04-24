const contactService = require('../services/contact.service');

const contactController = {
    getContact: (req, res) => {
        const pageData = contactService.getContactData();
        const contactInfo = contactService.getContactInfo();
        
        res.render('layouts/layout', {
            title: pageData.title,
            page: pageData.page,
            activeContact: true,
            contactInfo: contactInfo,
            activeHome: false,
            activeAbout: false,
            activeEvents: false,
            activeNews: false,
            activeLogin: false
        });
    },

    postContact: (req, res) => {
        const formData = req.body;
        const validation = contactService.validateContactForm(formData);
        
        if (validation.isValid) {
            const savedMessage = contactService.saveContactMessage(formData);
            res.json({
                success: true,
                message: 'Thank you for contacting us!',
                data: savedMessage
            });
        } else {
            res.status(400).json({
                success: false,
                errors: validation.errors
            });
        }
    }
};

module.exports = contactController;