// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScrolling();
    initContactForm();
    initButtonFunctionality();
    initMobileNavigation();
    initAnimations();
    updateCopyrightYear();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(sectionId) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            company: document.getElementById('company').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!validateEmail(formData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            // In production, replace with actual fetch/AJAX call
            // Example:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
            
            // Show success message
            showNotification(`Thank you ${formData.name}! Your message has been sent successfully. We'll respond within 24 hours.`, 'success');
            
            // Create mailto link as backup
            const mailtoBody = `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not specified'}
Subject: ${formData.subject || 'General Inquiry'}

Message:
${formData.message}
            `.trim();
            
            const mailtoLink = `mailto:hello@magtecinvest.com?subject=${encodeURIComponent(formData.subject || 'Contact Form Submission')}&body=${encodeURIComponent(mailtoBody)}`;
            
            // Optionally open mail client as backup
            // window.location.href = mailtoLink;
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
        }, 1500);
    });
}

// Show Notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Make Non-functional Buttons Functional
function initButtonFunctionality() {
    // Make all buttons with # href functional
    document.querySelectorAll('a[href="#"], .btn[href="#"]').forEach(button => {
        if (button.getAttribute('href') === '#') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const buttonText = this.textContent.trim();
                
                if (buttonText.includes('Download')) {
                    showNotification('Case study download will be available soon. Contact us for the full report.', 'info');
                } else {
                    showNotification('This feature is currently being developed. Please check back soon!', 'info');
                }
            });
        }
    });
    
    // Handle internal page buttons
    document.querySelectorAll('.btn[href*=".html"]').forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const buttonText = this.textContent.trim();
            
            // Check if the page exists
            if (href === 'blog.html' || href === 'press-kit.html' || href === 'careers.html' || 
                href === 'privacy-policy.html' || href === 'terms.html' || href === 'venture-lab.html' || 
                href === 'retail-ai.html') {
                // These pages should exist
                return;
            }
            
            // For potentially missing pages, show notification
            e.preventDefault();
            if (buttonText.includes('Venture Lab') || buttonText.includes('Portfolio')) {
                showNotification('Venture Lab portfolio page is under development. Contact us for more information.', 'info');
            } else if (buttonText.includes('Retail AI') || buttonText.includes('Explore')) {
                showNotification('Retail AI investments page coming soon. Contact us for current opportunities.', 'info');
            } else {
                showNotification('This page is currently being developed. Please check back soon!', 'info');
            }
        });
    });
}

// Mobile Navigation Toggle
function initMobileNavigation() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuButton && navLinks) {
        menuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
                this.setAttribute('aria-expanded', 'true');
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
                this.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuButton && navLinks) {
        navLinks.classList.remove('active');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.setAttribute('aria-expanded', 'false');
    }
}

// Initialize Animations
function initAnimations() {
    // Add scroll-based animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.info-card, .team-member, .service-card');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Trigger on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial trigger
    setTimeout(animateOnScroll, 100);
}

// Form Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Update copyright year
function updateCopyrightYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Also update any other copyright elements
    const copyrightElements = document.querySelectorAll('.copyright p');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(el => {
        el.textContent = el.textContent.replace(/2024/, currentYear);
    });
}

// Scroll-based active navigation update
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('nav').offsetHeight;
        
        if (scrollY >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener for active nav
window.addEventListener('scroll', updateActiveNavOnScroll);

// Debounce function for scroll events
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

// Form field validation on blur
function initFormValidation() {
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = 'var(--danger-color)';
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.style.borderColor = '#ddd';
                this.setCustomValidity('');
            }
        });
    }
    
    const nameField = document.getElementById('name');
    if (nameField) {
        nameField.addEventListener('blur', function() {
            if (this.value && this.value.length < 2) {
                this.style.borderColor = 'var(--danger-color)';
                this.setCustomValidity('Name must be at least 2 characters');
            } else {
                this.style.borderColor = '#ddd';
                this.setCustomValidity('');
            }
        });
    }
}

// Initialize form validation
initFormValidation();

// Smooth page load
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});