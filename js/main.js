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
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });
    
    // Scroll animations for sections
    const sections = document.querySelectorAll('section:not(#hero)');
    sections.forEach(section => {
        section.classList.add('section-fade');
    });
    
    // Add data-title attributes to section headings for the large background text
    document.querySelector('#about h2').setAttribute('data-title', 'ABOUT');
    document.querySelector('#skills h2').setAttribute('data-title', 'SKILLS');
    document.querySelector('#projects h2').setAttribute('data-title', 'PROJECTS');
    document.querySelector('#experience h2').setAttribute('data-title', 'EXPERIENCE');
    document.querySelector('#documents h2').setAttribute('data-title', 'DOCUMENTS');
    document.querySelector('#notes h2').setAttribute('data-title', 'NOTES');
    document.querySelector('#contact h2').setAttribute('data-title', 'CONTACT');
    
    // Update section titles with spans for styling
    const sectionTitles = document.querySelectorAll('section h2');
    sectionTitles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = `<span>${text}</span>`;
    });
    
    // Animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Function to check and add animations when elements come into view
    function checkScrollAnimation() {
        // Animate sections
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible');
            }
        });
        
        // Animate timeline items
        timelineItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('in-view');
            }
        });
    }
    
    // Run once on load
    checkScrollAnimation();
    
    // Run on scroll
    window.addEventListener('scroll', checkScrollAnimation);
});
