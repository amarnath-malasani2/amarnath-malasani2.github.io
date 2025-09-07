// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add header background on scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = '#fff';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.background = '#fff';
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });
    
    // Placeholder functionality for project cards (Example data - can be replaced with real data)
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        // Projects are already in the HTML
    }
    
    // Placeholder functionality for experience timeline (Example data - can be replaced with real data)
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        // Experience items are already in the HTML
    }
});
