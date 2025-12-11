// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('MagTec Invest Website - Initializing...');
    
    // Initialize all components
    initNavigation();
    initContactForm();
    initScrollSpy();
    initCookiesPopup();
    initReturnToTop();
    updateCopyrightYear();
    
    console.log('All components initialized successfully!');
});

// ===== NAVIGATION - Hamburger Menu =====
function initNavigation() {
    console.log('Initializing navigation...');
    
    const mobileMenu = document.getElementById('mobileMenu');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenu || !navMenu) {
        console.error('Navigation elements not found!');
        return;
    }
    
    console.log('Found navigation elements:', { mobileMenu, navMenu });
    
    // Toggle mobile menu
    function toggleMenu() {
        console.log('Toggling menu...');
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            console.log('Menu opened - body scroll locked');
        } else {
            document.body.style.overflow = '';
            console.log('Menu closed - body scroll restored');
        }
    }
    
    // Add click event to hamburger button
    mobileMenu.addEventListener('click', function(event) {
        event.stopPropagation();
        console.log('Hamburger button clicked');
        toggleMenu();
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Navigation link clicked:', this.textContent);
            if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                console.log('Closing menu on mobile');
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && 
            navMenu.classList.contains('active')) {
            console.log('Clicked outside menu - closing');
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            console.log('Escape key pressed - closing menu');
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on window resize (if switching to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            console.log('Window resized to desktop - closing menu');
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    console.log('Navigation initialized successfully');
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }
    
    console.log('Initializing contact form...');
    
    // Initialize form field interactions
    function initFormFields() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Update label position based on input value
                function updateLabel() {
                    if (input.value || (input.tagName === 'SELECT' && input.value !== '')) {
                        label.style.top = '-0.5rem';
                        label.style.fontSize = '0.85rem';
                        label.style.color = '#222222';
                    } else {
                        label.style.top = '1rem';
                        label.style.fontSize = '0.95rem';
                        label.style.color = '#888888';
                    }
                }
                
                // Initial update
                updateLabel();
                
                // Update on input/change
                input.addEventListener('input', updateLabel);
                input.addEventListener('change', updateLabel);
                input.addEventListener('focus', function() {
                    label.style.color = '#222222';
                });
                input.addEventListener('blur', updateLabel);
            }
        });
    }
    
    // Dynamic fields based on interest
    const interestSelect = document.getElementById('interest');
    const dynamicFields = document.getElementById('dynamicFields');
    
    if (interestSelect && dynamicFields) {
        interestSelect.addEventListener('change', function() {
            console.log('Interest changed to:', this.value);
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
                
                // Reinitialize form fields for new inputs
                setTimeout(initFormFields, 100);
            }
        });
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Contact form submitted');
        
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
        
        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted successfully:', formData);
            
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            
            // Reset form
            contactForm.reset();
            dynamicFields.innerHTML = '';
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Reinitialize form fields
            initFormFields();
        }, 1500);
    });
    
    // Initialize form fields
    initFormFields();
    console.log('Contact form initialized successfully');
}

// Form validation
function validateForm(formData) {
    if (!formData.name || !formData.email || !formData.message || !formData.interest) {
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return false;
    }
    
    if (formData.interest === 'investment') {
        if (!formData.businessStage || !formData.fundingAmount) {
            return false;
        }
    }
    
    return true;
}

// ===== SCROLL SPY =====
function initScrollSpy() {
    console.log('Initializing scroll spy...');
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) {
        console.log('No sections or nav links found for scroll spy');
        return;
    }
    
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
    
    console.log('Scroll spy initialized successfully');
}

// ===== COOKIES POPUP =====
function initCookiesPopup() {
    console.log('Initializing cookies popup...');
    
    const cookiesPopup = document.getElementById('cookiesPopup');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const rejectCookiesBtn = document.getElementById('rejectCookies');
    
    if (!cookiesPopup) {
        console.log('Cookies popup not found');
        return;
    }
    
    // Check if user already made a choice
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted) {
        // Show popup after 1 second
        setTimeout(() => {
            cookiesPopup.classList.add('show');
            console.log('Cookies popup shown');
        }, 1000);
    } else {
        console.log('Cookies already accepted/rejected:', cookiesAccepted);
    }
    
    // Accept cookies
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookiesPopup.classList.remove('show');
            showNotification('Cookie preferences saved. Thank you!', 'success');
            console.log('Cookies accepted');
        });
    }
    
    // Reject non-essential cookies
    if (rejectCookiesBtn) {
        rejectCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'false');
            cookiesPopup.classList.remove('show');
            showNotification('Only essential cookies enabled.', 'info');
            console.log('Non-essential cookies rejected');
        });
    }
    
    // Privacy policy link
    const privacyPolicyLink = document.getElementById('privacyPolicy');
    if (privacyPolicyLink) {
        privacyPolicyLink.addEventListener('click', function(event) {
            event.preventDefault();
            showNotification('Privacy policy page would open here.', 'info');
            console.log('Privacy policy link clicked');
        });
    }
    
    // Cookie policy link
    const cookiePolicyLink = document.getElementById('cookiePolicy');
    if (cookiePolicyLink) {
        cookiePolicyLink.addEventListener('click', function(event) {
            event.preventDefault();
            showNotification('Cookie policy page would open here.', 'info');
            console.log('Cookie policy link clicked');
        });
    }
    
    console.log('Cookies popup initialized successfully');
}

// ===== RETURN TO TOP BUTTON =====
function initReturnToTop() {
    console.log('Initializing return to top button...');
    
    const returnToTopBtn = document.getElementById('returnToTop');
    
    if (!returnToTopBtn) {
        console.log('Return to top button not found');
        return;
    }
    
    // Show/hide button based on scroll position
    function toggleReturnButton() {
        if (window.scrollY > 300) {
            returnToTopBtn.classList.add('show');
        } else {
            returnToTopBtn.classList.remove('show');
        }
    }
    
    window.addEventListener('scroll', toggleReturnButton);
    toggleReturnButton(); // Initial check
    
    // Scroll to top when clicked
    returnToTopBtn.addEventListener('click', function() {
        console.log('Return to top button clicked');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('Return to top button initialized successfully');
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    console.log('Showing notification:', { message, type });
    
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
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
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
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
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
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    const removeTimeout = setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Remove on click
    notification.addEventListener('click', () => {
        clearTimeout(removeTimeout);
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// ===== UPDATE COPYRIGHT YEAR =====
function updateCopyrightYear() {
    console.log('Updating copyright year...');
    
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
        console.log('Copyright year updated to:', yearElement.textContent);
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    console.log('Initializing smooth scrolling...');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();
                
                // Calculate position (accounting for fixed header)
                const headerHeight = 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log('Smooth scrolling to:', targetId);
            }
        });
    });
    
    console.log('Smooth scrolling initialized successfully');
}

// Initialize smooth scrolling
initSmoothScrolling();

// ===== WINDOW LOAD EVENT =====
window.addEventListener('load', function() {
    console.log('Page fully loaded');
    document.body.classList.add('loaded');
});

// ===== WINDOW RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
    }, 250);
});

console.log('All JavaScript functions defined');