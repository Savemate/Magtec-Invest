// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initContactForm();
    initStatsCounter();
    initBackToTop();
    initParticles();
    initModal();
    initScrollSpy();
    initFormValidation();
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
                
                // Start counters if element has counter
                if (entry.target.querySelector('.stat-number')) {
                    startCounterAnimation(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.service-card, .info-card, .portfolio-item, .detail-card').forEach(el => {
        observer.observe(el);
    });

    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });

    // Globe rotation
    const globe = document.querySelector('.globe');
    if (globe) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            globe.style.transform = `translate(-50%, -50%) rotate(${scrollY * 0.2}deg)`;
        });
    }
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

    // In production, you would use:
    // fetch('/api/send-email', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: formData.email, body: emailBody })
    // })

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
        background: linear-gradient(135deg, #dc3545, #c82333);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        margin: 20px 0;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
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
        background: linear-gradient(135deg, #28a745, #218838);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        margin: 20px 0;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
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

// Initialize Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const startCounterAnimation = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    };

    // Create observer for counter elements
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounterAnimation(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
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

// Initialize Particles
function initParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Apply styles
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, 
            rgba(0,123,255,${opacity}) 0%,
            rgba(23,162,184,${opacity}) 100%);
        border-radius: 50%;
        top: ${posY}%;
        left: ${posX}%;
        animation: floatParticle ${duration}s linear infinite ${delay}s;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
}

// Add particle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg);
            opacity: 0;
        }
    }

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
                label.style.color = '#007BFF';
            });

            // Handle input blur
            input.addEventListener('blur', () => {
                if (!input.value && input.type !== 'select-one') {
                    label.style.top = '15px';
                    label.style.fontSize = '1rem';
                    label.style.color = '#6c757d';
                }
            });

            // Handle select change
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', () => {
                    if (input.value) {
                        label.style.top = '-10px';
                        label.style.fontSize = '14px';
                        label.style.color = '#007BFF';
                    }
                });
            }

            // Initialize label position if input has value
            if (input.value) {
                label.style.top = '-10px';
                label.style.fontSize = '14px';
                label.style.color = '#007BFF';
            }
        }
    });
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

// Preload Images
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w-1200&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize on load
window.addEventListener('load', function() {
    preloadImages();
    
    // Remove loading class
    document.body.classList.add('loaded');
    
    // Add loaded class to specific elements
    document.querySelectorAll('.hero-title .title-line').forEach((line, index) => {
        setTimeout(() => {
            line.style.animationDelay = `${index * 0.2}s`;
        }, 100);
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