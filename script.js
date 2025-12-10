// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initContactForm();
    initScrollSpy();
    initCookiesPopup();
    initReturnToTop();
    updateCopyrightYear();
    
    // Add smooth page load
    document.body.classList.add('loaded');
});

// Navigation
function initNavigation() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update aria-expanded
            const expanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-container') && 
                navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Dynamic fields based on interest
    const interestSelect = document.getElementById('interest');
    const dynamicFields = document.getElementById('dynamicFields');
    
    interestSelect.addEventListener('change', function() {
        dynamicFields.innerHTML = '';
        
        if (this.value === 'investment') {
            dynamicFields.innerHTML = `
                <div class="form-group">
                    <input type="text" id="businessStage" placeholder=" ">
                    <label for="businessStage">Business Stage *</label>
                </div>
                <div class="form-group">
                    <input type="text" id="fundingAmount" placeholder=" ">
                    <label for="fundingAmount">Funding Amount Needed *</label>
                </div>
            `;
        }
        
        // Reinitialize form field interactions for new fields
        initFormFieldInteractions();
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            company: document.getElementById('company').value.trim(),
            interest: interestSelect.value,
            message: document.getElementById('message').value.trim()
        };
        
        // Add dynamic fields if they exist
        const businessStage = document.getElementById('businessStage');
        const fundingAmount = document.getElementById('fundingAmount');
        
        if (businessStage && fundingAmount) {
            formData.businessStage = businessStage.value.trim();
            formData.fundingAmount = fundingAmount.value.trim();
        }
        
        // Validate form
        if (!validateForm(formData)) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset dynamic fields
            dynamicFields.innerHTML = '';
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Reset form field states
            initFormFieldInteractions();
            
            // Log form data
            console.log('Form submitted:', formData);
        }, 1500);
    });
    
    // Initialize form field interactions
    initFormFieldInteractions();
}

// Initialize form field interactions
function initFormFieldInteractions() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Check initial state
            if (input.value || input.tagName === 'SELECT' && input.value !== '') {
                label.style.color = '#222222';
                label.style.fontSize = '0.85rem';
                label.style.top = '-0.5rem';
            }
            
            input.addEventListener('focus', () => {
                label.style.color = '#222222';
                label.style.fontSize = '0.85rem';
                label.style.top = '-0.5rem';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value || (input.tagName === 'SELECT' && input.value === '')) {
                    label.style.color = '#888888';
                    label.style.fontSize = '0.95rem';
                    label.style.top = '1rem';
                }
            });
        }
    });
}

// Validate form
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
    
    // Check investment-specific fields
    if (formData.interest === 'investment') {
        if (!formData.businessStage || !formData.fundingAmount) {
            return false;
        }
    }
    
    return true;
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#222222' : '#444444'};
        color: #FFFDD0;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 350px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        border: 1px solid rgba(255,253,208,0.1);
        font-size: 0.95rem;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Remove on click
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Scroll spy for active navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// Cookies Popup
function initCookiesPopup() {
    const cookiesPopup = document.getElementById('cookiesPopup');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const rejectCookiesBtn = document.getElementById('rejectCookies');
    const privacyPolicyLink = document.getElementById('privacyPolicy');
    const cookiePolicyLink = document.getElementById('cookiePolicy');
    
    // Check if user already made a choice
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted) {
        // Show popup after 1 second
        setTimeout(() => {
            cookiesPopup.classList.add('show');
        }, 1000);
    }
    
    // Accept cookies
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookiesPopup.classList.remove('show');
        showNotification('Cookie preferences saved.', 'success');
        
        // Here you would initialize analytics cookies
        console.log('Analytics cookies enabled');
    });
    
    // Reject non-essential cookies
    rejectCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'false');
        cookiesPopup.classList.remove('show');
        showNotification('Only essential cookies enabled.', 'info');
        
        // Here you would only set essential cookies
        console.log('Only essential cookies enabled');
    });
    
    // Privacy policy link
    privacyPolicyLink.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Privacy policy page would open here.', 'info');
        // window.open('privacy-policy.html', '_blank');
    });
    
    // Cookie policy link
    cookiePolicyLink.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Cookie policy page would open here.', 'info');
        // window.open('cookie-policy.html', '_blank');
    });
    
    // Close popup on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cookiesPopup.classList.contains('show')) {
            cookiesPopup.classList.remove('show');
        }
    });
}

// Return to Top Button
function initReturnToTop() {
    const returnToTopBtn = document.getElementById('returnToTop');
    
    if (!returnToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            returnToTopBtn.classList.add('show');
        } else {
            returnToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    returnToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Focus on navigation for accessibility
        document.querySelector('.navbar').focus();
    });
}

// Update copyright year
function updateCopyrightYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const offsetTop = targetElement.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update URL hash
            history.pushState(null, null, targetId);
        }
    });
});

// Initialize on load
window.addEventListener('load', function() {
    // Add any on-load animations here
    document.body.classList.add('loaded');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recalculate anything if needed
    }, 250);
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Tab key navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});