cat > public/js/main.js << 'EOF'
// Global JavaScript for all pages
console.log('App loaded - Master page pattern working!');

// Add any global functionality here
document.addEventListener('DOMContentLoaded', () => {
    // Highlight current page in navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else if (currentPath === '/' && link.getAttribute('href') === '/') {
            link.classList.add('active');
        }
    });
});
EOF