// ============================================
// MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg) translate(5px, 5px)' 
                : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(-45deg) translate(7px, -6px)' 
                : 'none';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ============================================
// STATISTICS COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

// Observe all stat numbers
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => observer.observe(stat));
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// CARD HOVER EFFECTS (Optional Enhancement)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.objective-card, .stat-card, .partner-logo');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// ============================================
// FORM VALIDATION (For future contact/membership forms)
// ============================================
function validateForm(formId) {
    const form = document.getElementById(formId);
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Form submission logic here
                console.log('Form is valid and ready to submit');
                alert('Thank you! Your form has been submitted successfully.');
                form.reset();
                // form.submit(); // Uncomment when backend is ready
            } else {
                alert('Please fill in all required fields');
            }
        });
    }
}

// Initialize form validation for contact and membership forms
document.addEventListener('DOMContentLoaded', function() {
    validateForm('contactForm');
    validateForm('membershipForm');
});

// ============================================
// EVENT FILTERING (Events Page)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.tab-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get selected category
                const category = this.getAttribute('data-category');
                
                // Filter events
                eventCards.forEach(card => {
                    const cardCategories = card.getAttribute('data-category');
                    
                    if (category === 'all' || cardCategories.includes(category)) {
                        card.style.display = 'block';
                        // Add fade-in animation
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});

// Add CSS animation for fade-in
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// FAQ ACCORDION (Contact Page)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// ============================================
// SMOOTH SCROLL TO REGISTRATION FORM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const registrationLinks = document.querySelectorAll('a[href="#registration"]');
    
    registrationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const registrationSection = document.getElementById('registration');
            
            if (registrationSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = registrationSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// LAZY LOADING IMAGES (Performance optimization)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Scroll to top button (can be added later)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide element based on scroll position
function toggleElementOnScroll(elementSelector, scrollPosition) {
    const element = document.querySelector(elementSelector);
    
    if (element) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > scrollPosition) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('slideshow-container');
    const dotsContainer = document.getElementById('dots-container');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    const totalImages = 15;
    let currentIndex = 0;
    let slideInterval;

    // 1. Generate Images (2-15) and Dots (1-15)
    for (let i = 1; i <= totalImages; i++) {
        if (i > 1) {
            const img = document.createElement('img');
            img.src = `images/hero_${i}.jpeg`;
            img.classList.add('slide');
            img.alt = `Hero Image ${i}`;
            img.loading = "lazy"; // Browser only loads it when needed
            container.appendChild(img);
        }

        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 1) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i - 1));
        dotsContainer.appendChild(dot);
    }

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // 2. Navigation Logic
    function updateUI() {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === currentIndex));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    function startTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateUI();
        }, 2000);
    }

    function goToSlide(index) {
        currentIndex = index;
        updateUI();
        startTimer();
    }

    // 3. Arrow Listeners
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateUI();
        startTimer();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateUI();
        startTimer();
    });

    // Initialize
    startTimer();
});