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

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp form submission
    const whatsappButton = document.getElementById('whatsappSubmit');
    const contactForm = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const replyToEmail = document.getElementById('replyToEmail');
    const phoneInput = document.getElementById('phone');
    
    // Update reply-to email when email input changes
    if (emailInput && replyToEmail) {
        emailInput.addEventListener('input', function() {
            replyToEmail.value = this.value;
        });
    }
    
    // Format phone number input - remove leading zero automatically
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remove any non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Remove leading zero if present
            if (value.startsWith('0')) {
                value = value.substring(1);
            }
            
            // Format with spaces for readability
            if (value.length > 0) {
                // Format as XX XXX XXXX for Ghana numbers
                let formatted = '';
                if (value.length <= 2) {
                    formatted = value;
                } else if (value.length <= 5) {
                    formatted = value.substring(0, 2) + ' ' + value.substring(2);
                } else if (value.length <= 9) {
                    formatted = value.substring(0, 2) + ' ' + value.substring(2, 5) + ' ' + value.substring(5, 9);
                } else {
                    formatted = value.substring(0, 2) + ' ' + value.substring(2, 5) + ' ' + value.substring(5, 9);
                }
                this.value = formatted;
            }
        });
        
        // Validate on blur
        phoneInput.addEventListener('blur', function() {
            const value = this.value.replace(/\s/g, '');
            if (value && value.length < 9) {
                alert('Please enter a valid phone number (at least 9 digits without country code)');
                this.focus();
            }
        });
    }
    
    // WhatsApp submission
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const countryCode = document.getElementById('countryCode').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const category = document.getElementById('category').value;
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name) {
                alert('Please enter your name');
                return;
            }
            
            if (!phone) {
                alert('Please enter your phone number');
                return;
            }
            
            if (!message) {
                alert('Please enter your message');
                return;
            }
            
            // Validate country code
            if (!countryCode || !/^\d+$/.test(countryCode)) {
                alert('Please enter a valid country code (numbers only)');
                return;
            }
            
            // Format the phone number - remove spaces and ensure no leading zero
            let formattedPhone = phone.replace(/\s/g, '').replace(/^0+/, '');
            
            // Validate phone number length
            if (formattedPhone.length < 9) {
                alert('Please enter a valid phone number (at least 9 digits without country code)');
                return;
            }
            
            const fullPhoneNumber = '+' + countryCode + formattedPhone;
            
            // Get category text
            const categoryText = {
                'general': 'General Inquiry',
                'donation': 'Donate (Soles of Hope/Sanitary Pads)',
                'membership': 'Become a Member',
                'partnership': 'Corporate Partnership',
                'volunteer': 'Volunteer for Outreach'
            }[category] || 'General Inquiry';
            
            // Create WhatsApp message
            const whatsappMessage = `*New Contact Form Submission - Marvelous Touch Foundation*\n\n` +
                                   `*Name:* ${name}\n` +
                                   `*Email:* ${email || 'Not provided'}\n` +
                                   `*Phone:* ${fullPhoneNumber}\n` +
                                   `*Inquiry Type:* ${categoryText}\n` +
                                   `*Message:* ${message}\n\n` +
                                   `_This message was sent via the website contact form_`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Your WhatsApp number
            const yourWhatsappNumber = '233547539664';
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${yourWhatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // Form validation for email submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Validate country code
            const countryCode = document.getElementById('countryCode').value.trim();
            if (!countryCode || !/^\d+$/.test(countryCode)) {
                alert('Please enter a valid country code (numbers only)');
                e.preventDefault();
                return;
            }
            
            // Validate phone number
            const phone = document.getElementById('phone').value.trim();
            if (!phone) {
                alert('Please enter your phone number');
                e.preventDefault();
                return;
            }
            
            // Format phone number - remove spaces and leading zero
            let formattedPhone = phone.replace(/\s/g, '').replace(/^0+/, '');
            
            // Validate phone number length
            if (formattedPhone.length < 9) {
                alert('Please enter a valid phone number (at least 9 digits without country code)');
                e.preventDefault();
                return;
            }
            
            const fullPhoneNumber = '+' + countryCode + formattedPhone;
            
            // Create hidden field for the full phone number
            let fullPhoneField = document.querySelector('input[name="fullPhone"]');
            if (!fullPhoneField) {
                fullPhoneField = document.createElement('input');
                fullPhoneField.type = 'hidden';
                fullPhoneField.name = 'fullPhone';
                contactForm.appendChild(fullPhoneField);
            }
            fullPhoneField.value = fullPhoneNumber;
            
            // Also update the regular phone field with formatted value
            document.getElementById('phone').value = formattedPhone;
            
            // Optional: Add form data to console for debugging
            console.log('Form submitted to Formspree:', {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: fullPhoneNumber,
                category: document.getElementById('category').value,
                message: document.getElementById('message').value
            });
        });
    }
    
    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Toggle current FAQ
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
            
            // Close other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('i');
                    otherAnswer.style.display = 'none';
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                }
            });
        });
    });
});