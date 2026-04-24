const express = require('express');
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const mainRouter = require('./routes/index.route');

// Check if chat route exists, if not create a simple fallback
let chatRouter;
try {
    chatRouter = require('./routes/api/chat.route');
    console.log('✅ Chat route loaded successfully');
} catch (error) {
    console.log('⚠️ Chat route not found, creating fallback...');
    chatRouter = express.Router();
    chatRouter.post('/send', (req, res) => {
        const { message } = req.body;
        const replies = {
            'hello': 'Hello! How can I help you today?',
            'what is compassionate capitalism': 'Compassionate Capitalism combines free market principles with social responsibility.',
            'services': 'We offer investment advisory, business consulting, and educational programs.',
            'contact': 'Email us at support@compassionatecapitalism.com or call +3453-909-6565'
        };
        const reply = replies[message?.toLowerCase()] || 'Thank you for your question. Please visit our website for more information.';
        res.json({ success: true, reply });
    });
    chatRouter.get('/health', (req, res) => {
        res.json({ status: 'healthy', service: 'AI Chat' });
    });
}

const app = express();
const PORT = process.env.PORT || 3003;

// ============================================
// CSP HEADERS - MUST BE BEFORE ANY ROUTES
// ============================================
// In your server.js - Updated CSP headers
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://translate.google.com http://translate.google.com https://*.google.com http://*.google.com https://*.googleapis.com http://*.googleapis.com https://www.gstatic.com http://www.gstatic.com https://cdn.jsdelivr.net https://player.vimeo.com; " +
        "script-src-elem 'self' 'unsafe-inline' https://translate.google.com http://translate.google.com https://*.google.com http://*.google.com https://*.googleapis.com http://*.googleapis.com https://www.gstatic.com https://player.vimeo.com; " +
        "style-src 'self' 'unsafe-inline' https://translate.google.com http://translate.google.com https://*.google.com http://*.google.com https://*.googleapis.com http://*.googleapis.com https://www.gstatic.com https://fonts.googleapis.com https://cdn.jsdelivr.net; " +
        "style-src-elem 'self' 'unsafe-inline' https://translate.google.com http://translate.google.com https://*.google.com http://*.google.com https://*.googleapis.com http://*.googleapis.com https://www.gstatic.com https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com http://fonts.gstatic.com https://*.google.com http://*.google.com https://*.googleapis.com http://*.googleapis.com https://www.gstatic.com data:; " +
        "connect-src 'self' https://translate.google.com http://translate.google.com https://*.google.com http://*.google.com https://*.googleapis.com http://*.googleapis.com https://www.gstatic.com https://player.vimeo.com; " +
        "frame-src 'self' https://translate.google.com http://translate.google.com https://*.google.com http://*.google.com https://player.vimeo.com https://vimeo.com; " +
        "img-src 'self' data: https://*.google.com http://*.google.com https://*.googleapis.com http://*.googleapis.com https://www.gstatic.com http://www.gstatic.com https://fonts.gstatic.com http://fonts.gstatic.com https://*.ggpht.com http://*.ggpht.com translate.google.com http://translate.google.com https://i.vimeocdn.com https://player.vimeo.com; " +
        "media-src 'self' https://player.vimeo.com https://vimeo.com; " +
        "object-src 'none'; " +
        "base-uri 'self'; " +
        "worker-src 'self' blob:;"
    );
    next();
});

// CORS middleware
app.use(cors());

// Rate limiting for API
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
    skip: (req) => req.path === '/api/chat/health'
});
app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// Serve node_modules for external libraries if needed
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// Routes
app.use('/', mainRouter);
app.use('/api/chat', chatRouter);

// Google Translate API endpoint
app.get('/api/google-translate', (req, res) => {
    res.json({
        status: 'available',
        message: 'Google Translate is available on the frontend',
        languages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh-CN', 'ja', 'ko', 'ar', 'hi', 'ru', 'ha', 'ig', 'yo']
    });
});

// Simple home route if EJS not available
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Compassionate Capitalism</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
                .container { max-width: 1200px; margin: 0 auto; padding: 20px; text-align: center; }
                h1 { color: #0a2b3e; }
                .features { display: flex; justify-content: center; gap: 20px; margin-top: 40px; flex-wrap: wrap; }
                .feature { padding: 20px; border: 1px solid #ddd; border-radius: 10px; width: 200px; background: white; }
                .feature i { font-size: 40px; color: #667eea; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Compassionate Capitalism</h1>
                <p>Your gateway to ethical and sustainable economic development.</p>
                <div class="features">
                    <div class="feature"><i class="fa fa-line-chart"></i><h3>Investment</h3></div>
                    <div class="feature"><i class="fa fa-graduation-cap"></i><h3>Education</h3></div>
                    <div class="feature"><i class="fa fa-users"></i><h3>Community</h3></div>
                </div>
                <p style="margin-top: 40px;">Server is running correctly! 🚀</p>
            </div>
        </body>
        </html>
    `);
});

// 404 handler for API - using regex pattern
app.use(/\/api\/.*/, (req, res) => {
    res.status(404).json({ 
        success: false, 
        message: `API endpoint not found: ${req.originalUrl}` 
    });
});

// 404 handler for pages
app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
        res.status(404).json({ success: false, message: 'API endpoint not found' });
    } else {
        res.status(404).send(`
            <!DOCTYPE html>
            <html>
            <head><title>404 - Page Not Found</title></head>
            <body>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <a href="/">Go back to Home</a>
            </body>
            </html>
        `);
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    
    if (req.path.startsWith('/api/')) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message || 'Internal server error'
        });
    } else {
        res.status(err.status || 500).send(`
            <!DOCTYPE html>
            <html>
            <head><title>500 - Server Error</title></head>
            <body>
                <h1>500 - Internal Server Error</h1>
                <p>Something went wrong. Please try again later.</p>
                <a href="/">Go back to Home</a>
            </body>
            </html>
        `);
    }
});

// Create necessary directories if they don't exist
const fs = require('fs');
const dirs = ['public', 'public/css', 'public/js', 'public/img', 'uploads', 'views', 'routes/api'];
dirs.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
    }
});

app.listen(PORT, () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🚀 SERVER RUNNING SUCCESSFULLY`);
    console.log(`${'='.repeat(60)}`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`📄 Home: http://localhost:${PORT}`);
    console.log(`🤖 Chat API: http://localhost:${PORT}/api/chat/health`);
    console.log(`🌐 Google Translate: Enabled with Nigerian languages (Hausa, Igbo, Yoruba)`);
    console.log(`${'='.repeat(60)}\n`);
});