// assets/js/script.js

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.style.fontWeight = '700';
            link.style.color = '#10b981';
        }
    });
}

function addScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    if (!('IntersectionObserver' in window)) {
        sections.forEach((section) => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach((section) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}

function addKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
        const prevButton = document.querySelector('.nav-buttons button:first-child');
        const nextButton = document.querySelector('.nav-buttons button:last-child');

        if (event.key === 'ArrowLeft' && prevButton) {
            prevButton.click();
        }

        if (event.key === 'ArrowRight' && nextButton) {
            nextButton.click();
        }
    });
}

function addBackToTopButton() {
    if (!document.querySelector('.module-container')) {
        return;
    }

    const backToTop = document.createElement('button');
    backToTop.textContent = 'Top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.style.position = 'fixed';
    backToTop.style.bottom = '30px';
    backToTop.style.right = '30px';
    backToTop.style.padding = '10px 16px';
    backToTop.style.background = '#10b981';
    backToTop.style.color = 'white';
    backToTop.style.border = 'none';
    backToTop.style.borderRadius = '999px';
    backToTop.style.cursor = 'pointer';
    backToTop.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    backToTop.style.display = 'none';
    backToTop.style.zIndex = '1000';

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    addScrollAnimations();
    addKeyboardNavigation();
    addBackToTopButton();
});
