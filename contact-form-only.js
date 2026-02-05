// Contact Form Script - Standalone version
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact form script loaded');
    
    // Get form elements
    const contactForm = document.getElementById('contactForm');
    const whatsappButton = document.getElementById('whatsappSubmit');
    const phoneInput = document.getElementById('phone');
    const countryCodeInput = document.getElementById('countryCode');
    
    // Check if elements exist
    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }
    
    console.log('Contact form found, setting up handlers');
    
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
            console.log('WhatsApp button clicked');
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const countryCode = countryCodeInput.value.trim();
            const phone = phoneInput.value.trim();
            const category = document.getElementById('category').value;
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name) {
                alert('Please enter your name');
                return;
            }
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            if (!phone) {
                alert('Please enter your phone number');
                return;
            }
            
            if (!category) {
                alert('Please select how we can help you');
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
    contactForm.addEventListener('submit', function(e) {
        console.log('Form submit event triggered');
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const category = document.getElementById('category').value;
        const message = document.getElementById('message').value.trim();
        
        // Basic required field validation
        if (!name) {
            alert('Please enter your name');
            e.preventDefault();
            return false;
        }
        
        if (!email) {
            alert('Please enter your email address');
            e.preventDefault();
            return false;
        }
        
        if (!category) {
            alert('Please select how we can help you');
            e.preventDefault();
            return false;
        }
        
        if (!message) {
            alert('Please enter your message');
            e.preventDefault();
            return false;
        }
        
        // Validate country code if phone is provided
        const countryCode = countryCodeInput.value.trim();
        const phone = phoneInput.value.trim();
        
        if (!phone) {
            alert('Please enter your phone number');
            e.preventDefault();
            return false;
        }
        
        if (!countryCode || !/^\d+$/.test(countryCode)) {
            alert('Please enter a valid country code (numbers only)');
            e.preventDefault();
            return false;
        }
            
            // Format phone number - remove spaces and leading zero
            let formattedPhone = phone.replace(/\s/g, '').replace(/^0+/, '');
            
            // Validate phone number length
            if (formattedPhone.length < 9) {
                alert('Please enter a valid phone number (at least 9 digits without country code)');
                e.preventDefault();
                return false;
            }
            
            const fullPhoneNumber = '+' + countryCode + formattedPhone;
            
            // Create or update hidden field for the full phone number
            let fullPhoneField = contactForm.querySelector('input[name="fullPhone"]');
            if (!fullPhoneField) {
                fullPhoneField = document.createElement('input');
                fullPhoneField.type = 'hidden';
                fullPhoneField.name = 'fullPhone';
                contactForm.appendChild(fullPhoneField);
            }
            fullPhoneField.value = fullPhoneNumber;
            
            // Update the regular phone field with formatted value (without leading zero)
            phoneInput.value = formattedPhone;
        
        console.log('Form is valid and ready to submit');
        // Let the form submit naturally to Formspree
        return true;
    });
    
    // FAQ functionality (if FAQs exist on page)
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        console.log('FAQ questions found:', faqQuestions.length);
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const icon = this.querySelector('i');
                const isActive = answer.classList.contains('active');
                
                console.log('FAQ clicked, currently active:', isActive);
                
                if (answer && icon) {
                    // Close all other FAQs first
                    faqQuestions.forEach(otherQuestion => {
                        const otherAnswer = otherQuestion.nextElementSibling;
                        const otherIcon = otherQuestion.querySelector('i');
                        
                        if (otherQuestion !== question) {
                            if (otherAnswer) otherAnswer.classList.remove('active');
                            if (otherIcon) {
                                otherIcon.classList.remove('fa-chevron-up');
                                otherIcon.classList.add('fa-chevron-down');
                            }
                        }
                    });
                    
                    // Toggle current FAQ
                    if (isActive) {
                        answer.classList.remove('active');
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    } else {
                        answer.classList.add('active');
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    }
                }
            });
        });
    } else {
        console.log('No FAQ questions found on this page');
    }
});