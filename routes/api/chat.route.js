const express = require('express');
const router = express.Router();

// Simple AI responses (works without external API)
const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    const responses = {
        'hello|hi|hey|good morning|good afternoon|good evening': 'Hello! 👋 How can I assist you with Compassionate Capitalism today?',
        'what is compassionate capitalism|what is cc|tell me about cc': 'Compassionate Capitalism is an innovative economic system that combines free market principles with social responsibility, focusing on ethical business practices, sustainability, and equitable wealth distribution.',
        'services|what services|what do you offer': 'We offer investment advisory, business consulting, educational programs, and community development initiatives. Would you like specific details about any service?',
        'contact|support|help|customer service': 'You can reach our support team at support@compassionatecapitalism.com or call +3453-909-6565. Our office hours are Monday-Friday, 9 AM to 6 PM.',
        'price|cost|pricing|how much': 'For pricing information, please contact our sales team directly for a customized quote based on your specific needs.',
        'thank|thanks|appreciate': "You're welcome! Is there anything else I can help you with?",
        'investment|invest|funding': 'We offer various investment opportunities aligned with compassionate capitalism principles. Our team can provide detailed information about current investment options.',
        'mission|vision|values': 'Our mission is to transform capitalism into a force for good by prioritizing people and planet alongside profit.',
        'events|webinar|conference': 'We host regular webinars, conferences, and workshops. Check our Events page for upcoming dates and registration details!',
        'news|updates|announcements': 'Stay updated with our latest news and announcements on our News page. We regularly share insights about Compassionate Capitalism.',
        'bye|goodbye|see you': 'Goodbye! Feel free to come back if you have more questions. Have a great day!',
        'who are you|what are you': "I'm an AI assistant created to help you learn about Compassionate Capitalism and RedirectMall services.",
        'website|about this site': 'This website provides information about Compassionate Capitalism, our services, events, news, and how you can get involved.'
    };
    
    for (const [pattern, response] of Object.entries(responses)) {
        if (new RegExp(pattern, 'i').test(lowerMessage)) {
            return response;
        }
    }
    
    return "Thank you for your question. For the most accurate information, please visit our website or contact our support team directly. I'm here to help with general inquiries about Compassionate Capitalism and RedirectMall services.";
};

// Rate limiting store
const rateLimitStore = new Map();

// Chat send endpoint
router.post('/send', (req, res) => {
    try {
        const { message, sessionId } = req.body;
        
        // Rate limiting
        const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
        const now = Date.now();
        const windowMs = 60000; // 1 minute
        const maxRequests = 10;
        
        if (!rateLimitStore.has(ip)) {
            rateLimitStore.set(ip, []);
        }
        
        const requests = rateLimitStore.get(ip).filter(time => now - time < windowMs);
        
        if (requests.length >= maxRequests) {
            return res.status(429).json({
                success: false,
                message: 'Too many messages. Please wait a moment before sending more.'
            });
        }
        
        requests.push(now);
        rateLimitStore.set(ip, requests);
        
        // Validate input
        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Message is required and must be a string'
            });
        }
        
        if (message.length > 500) {
            return res.status(400).json({
                success: false,
                message: 'Message exceeds maximum length of 500 characters'
            });
        }
        
        // Generate response
        const reply = getAIResponse(message);
        
        console.log(`[CHAT] ${sessionId || 'anonymous'}: "${message.substring(0, 50)}..."`);
        
        res.json({
            success: true,
            reply: reply,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Chat Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'AI Chat',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

module.exports = router;