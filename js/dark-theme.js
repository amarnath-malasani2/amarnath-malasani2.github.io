// Dark Theme JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });
    
    // Typed.js initialization
    const typed = new Typed('#typed-text', {
        strings: ['DevOps Engineer', 'AWS Cloud Specialist', 'CI/CD Expert'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true,
        smartBackspace: true
    });
    
    // Navigation menu toggle for mobile
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
    
    // Sticky header on scroll
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Show/hide back to top button
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Back to top button
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Animate skill circles on scroll
    const skillCircles = document.querySelectorAll('.skill-circle-fill');
    
    const animateSkillCircles = () => {
        skillCircles.forEach(circle => {
            const circlePosition = circle.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (circlePosition < screenPosition) {
                circle.style.strokeDashoffset = `calc(283 - (283 * ${circle.style.getPropertyValue('--percent')}))`;
            }
        });
    };
    
    window.addEventListener('scroll', animateSkillCircles);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
        document.getElementById('preloader').style.display = 'none';
    });
});
