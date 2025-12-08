// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initContactForm();
    initBackToTop();
    initProgressBars();
    initModal();
    initScrollSpy();
    initFormValidation();
    initCountdown();
    updateCopyrightYear();
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Initialize Navigation
function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && 
            !event.target.closest('.menu-toggle')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Initialize Animations
function initAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate progress bars if element has them
                if (entry.target.querySelector('.progress-ring-circle')) {
                    animateProgressBars(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.service-card, .info-card, .detail-card, .design-shape').forEach(el => {
        observer.observe(el);
    });

    // Animate design shapes
    const designShapes = document.querySelectorAll('.design-shape');
    designShapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover effect
        shape.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(15deg)';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animate color swatches
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach((swatch, index) => {
        swatch.style.animationDelay = `${index * 0.3}s`;
    });
}

// Initialize Progress Bars
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-ring-circle');
    
    progressBars.forEach(bar => {
        const circle = bar;
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const parent = bar.closest('.expertise-progress');
        const skillValue = parent ? parent.getAttribute('data-skill') : 0;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        // Store the target progress
        circle.dataset.target = skillValue;
        circle.dataset.circumference = circumference;
    });
}

// Animate Progress Bars
function animateProgressBars(container) {
    const progressBars = container.querySelectorAll('.progress-ring-circle');
    
    progressBars.forEach(bar => {
        const target = parseInt(bar.dataset.target);
        const circumference = parseFloat(bar.dataset.circumference);
        const offset = circumference - (target / 100) * circumference;
        
        // Animate the stroke
        bar.style.transition = 'stroke-dashoffset 2s ease-in-out';
        bar.style.strokeDashoffset = offset;
        
        // Animate the percentage text
        const valueElement = bar.parentElement.querySelector('.progress-value');
        if (valueElement) {
            animateCounter(valueElement, target);
        }
    });
}

// Animate Counter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // 2 second animation at 25fps
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        element.textContent = `${Math.floor(current)}%`;
    }, 40);
}

// Initialize Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            company: document.getElementById('company').value.trim(),
            interest: document.getElementById('interest').value,
            message: document.getElementById('message').value.trim()
        };

        // Validate form
        if (!validateForm(formData)) {
            showFormError('Please fill in all required fields correctly.');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Show success modal
            if (successModal) {
                successModal.classList.add('active');
            } else {
                showSuccessMessage();
            }

            // Reset form
            contactForm.reset();

            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            // Send email (in production, this would be a real API call)
            sendEmail(formData);
        }, 1500);
    });
}

// Validate Form
function validateForm(formData) {
    // Check required fields
    if (!formData.name || !formData.email || !formData.message || !formData.interest) {
        return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return false;
    }

    // Validate name length
    if (formData.name.length < 2) {
        return false;
    }

    return true;
}

// Send Email (Simulated)
function sendEmail(formData) {
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not provided'}
Interest: ${formData.interest}

Message:
${formData.message}
    `.trim();

    console.log('Email would be sent with data:', formData);
}

// Show Form Error
function showFormError(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    errorDiv.style.cssText = `
        background: linear-gradient(135deg, #444, #222);
        color: #FFFDD0;
        padding: 15px 20px;
        border-radius: 8px;
        margin: 20px 0;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
        border: 1px solid rgba(255,253,208,0.2);
    `;

    const form = document.getElementById('contactForm');
    const firstChild = form.firstChild;
    form.insertBefore(errorDiv, firstChild);

    // Remove error after 5 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

// Show Success Message
function showSuccessMessage() {
    // Create success notification
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Thank you! Your message has been sent successfully.</span>
    `;
    successDiv.style.cssText = `
        background: linear-gradient(135deg, #666, #444);
        color: #FFFDD0;
        padding: 15px 20px;
        border-radius: 8px;
        margin: 20px 0;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
        border: 1px solid rgba(255,253,208,0.2);
    `;

    const form = document.getElementById('contactForm');
    const firstChild = form.firstChild;
    form.insertBefore(successDiv, firstChild);

    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

// Initialize Back to Top Button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');

    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize Modal
function initModal() {
    const modal = document.getElementById('successModal');
    const modalClose = modal?.querySelector('.modal-close');

    if (!modal || !modalClose) return;

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Initialize Scroll Spy
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize Form Validation
function initFormValidation() {
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const label = group.querySelector('label');

        if (input && label) {
            // Handle input focus
            input.addEventListener('focus', () => {
                label.style.top = '-10px';
                label.style.fontSize = '14px';
                label.style.color = '#222222';
            });

            // Handle input blur
            input.addEventListener('blur', () => {
                if (!input.value && input.type !== 'select-one') {
                    label.style.top = '15px';
                    label.style.fontSize = '1rem';
                    label.style.color = '#888888';
                }
            });

            // Handle select change
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', () => {
                    if (input.value) {
                        label.style.top = '-10px';
                        label.style.fontSize = '14px';
                        label.style.color = '#222222';
                    }
                });
            }

            // Initialize label position if input has value
            if (input.value) {
                label.style.top = '-10px';
                label.style.fontSize = '14px';
                label.style.color = '#222222';
            }
        }
    });
}

// Initialize Countdown
function initCountdown() {
    // Set launch date (example: 3 months from now)
    const launchDate = new Date();
    launchDate.setMonth(launchDate.getMonth() + 3);
    
    function updateCountdown() {
        const now = new Date();
        const difference = launchDate - now;
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            
            // Update display
            const timeUnits = document.querySelectorAll('.time-unit');
            if (timeUnits.length >= 3) {
                timeUnits[0].querySelector('.number').textContent = days.toString().padStart(2, '0');
                timeUnits[1].querySelector('.number').textContent = hours.toString().padStart(2, '0');
                timeUnits[2].querySelector('.number').textContent = minutes.toString().padStart(2, '0');
            }
        }
    }
    
    // Update immediately and then every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
    
    // Notify form submission
    const notifyForm = document.querySelector('.notify-input');
    if (notifyForm) {
        const button = notifyForm.querySelector('button');
        const input = notifyForm.querySelector('input');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (input.value && validateEmail(input.value)) {
                // Show success message
                const originalText = button.textContent;
                button.textContent = 'Subscribed!';
                button.style.background = '#666';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    input.value = '';
                }, 2000);
            } else {
                // Show error
                input.style.borderColor = '#ff4444';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });
    }
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Update Copyright Year
function updateCopyrightYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on load
window.addEventListener('load', function() {
    // Add loaded class to specific elements
    document.querySelectorAll('.hero-title .title-line').forEach((line, index) => {
        setTimeout(() => {
            line.style.animationDelay = `${index * 0.2}s`;
        }, 100);
    });
    
    // Animate design elements
    const elements = document.querySelectorAll('.element');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Re-initialize any responsive components if needed
    }, 250);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Focus trap for mobile menu
    if (document.querySelector('.nav-menu.active')) {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const modal = document.querySelector('.nav-menu.active');
        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }

        if (e.key === 'Escape') {
            document.querySelector('.menu-toggle').click();
        }
    }
});