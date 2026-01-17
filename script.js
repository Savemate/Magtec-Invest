// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('MagTec Invest Website - Initializing with Mind-Blowing Effects...');
    
    // Initialize all components
    initParticleBackground();
    initNavigation();
    initContactForm();
    initScrollSpy();
    initCookiesPopup();
    initReturnToTop();
    updateCopyrightYear();
    initSmoothScrolling();
    initStaggeredAnimations();
    initParallaxEffects();
    initMagneticButtons();
    initHoverEffects();
    initLenisSmoothScroll();
    initScrollTriggeredAnimations();
    initGlitchEffects();
    initDynamicBackground();
    initTypewriterEffect();
    initInteractiveParticles();
    
    console.log('All mind-blowing effects initialized successfully!');
});

// ===== PARTICLE BACKGROUND =====
function initParticleBackground() {
    console.log('Initializing particle background...');
    
    const canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0, radius: 100 };
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(34, 34, 34, ${Math.random() * 0.5})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Mouse interaction
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                this.x -= dx * force * 0.05;
                this.y -= dy * force * 0.05;
            }
            
            // Bounce off edges
            if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
            if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(34, 34, 34, ${0.2 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    resizeCanvas();
    animateParticles();
}

// ===== STAGGERED ANIMATIONS =====
function initStaggeredAnimations() {
    console.log('Initializing staggered animations...');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add different animation classes based on element type
                if (element.classList.contains('feature-card')) {
                    element.style.animation = 'slideUp 0.6s ease forwards';
                    element.style.animationDelay = `${element.dataset.delay || '0s'}`;
                } else if (element.classList.contains('stats-item')) {
                    element.style.animation = 'countUp 2s ease-out forwards';
                    animateCounter(element);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.feature-card, .stats-item, .service-card').forEach((el, index) => {
        el.dataset.delay = `${index * 0.1}s`;
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes countUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 20px rgba(34, 34, 34, 0.1);
            }
            50% {
                box-shadow: 0 0 40px rgba(34, 34, 34, 0.3);
            }
        }
        
        .feature-card:hover {
            animation: float 3s ease-in-out infinite, glow 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    console.log('Initializing parallax effects...');
    
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallaxSpeed || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
    console.log('Initializing magnetic buttons...');
    
    const magneticButtons = document.querySelectorAll('.btn, .nav-cta');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) * 0.3;
            const deltaY = (y - centerY) * 0.3;
            
            button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
            button.style.transition = 'transform 0.3s ease';
        });
    });
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    console.log('Initializing hover effects...');
    
    const cards = document.querySelectorAll('.feature-card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.boxShadow = `
                ${-rotateY}px ${rotateX}px 30px rgba(0,0,0,0.1)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            card.style.transition = 'all 0.5s ease';
        });
    });
}

// ===== LENIS SMOOTH SCROLL =====
function initLenisSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });
        
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        
        requestAnimationFrame(raf);
    }
}

// ===== SCROLL TRIGGERED ANIMATIONS =====
function initScrollTriggeredAnimations() {
    console.log('Initializing scroll-triggered animations...');
    
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add special effects based on data attributes
                if (entry.target.dataset.effect === 'text-reveal') {
                    animateTextReveal(entry.target);
                }
            }
        });
    }, {
        threshold: 0.2
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// ===== GLITCH EFFECTS =====
function initGlitchEffects() {
    console.log('Initializing glitch effects...');
    
    const glitchElements = document.querySelectorAll('[data-glitch]');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('glitch-active');
            
            setTimeout(() => {
                element.classList.remove('glitch-active');
            }, 600);
        });
    });
    
    // Add glitch animation styles
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        .glitch-active {
            position: relative;
            animation: glitch 0.3s linear;
        }
        
        @keyframes glitch {
            0% {
                transform: translate(0);
            }
            20% {
                transform: translate(-2px, 2px);
                color: #FF6B6B;
            }
            40% {
                transform: translate(-2px, -2px);
                color: #4ECDC4;
            }
            60% {
                transform: translate(2px, 2px);
                color: #FFD166;
            }
            80% {
                transform: translate(2px, -2px);
            }
            100% {
                transform: translate(0);
            }
        }
        
        .glitch-active::before,
        .glitch-active::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.8;
        }
        
        .glitch-active::before {
            animation: glitch-top 1s linear infinite;
            clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
            -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
        }
        
        .glitch-active::after {
            animation: glitch-bottom 1.5s linear infinite;
            clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
            -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
        }
    `;
    document.head.appendChild(glitchStyle);
}

// ===== DYNAMIC BACKGROUND =====
function initDynamicBackground() {
    console.log('Initializing dynamic background...');
    
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    heroSection.style.position = 'relative';
    heroSection.style.overflow = 'hidden';
    
    // Create gradient overlay
    const gradientOverlay = document.createElement('div');
    gradientOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            45deg,
            rgba(34,34,34,0.8) 0%,
            rgba(34,34,34,0.4) 50%,
            rgba(34,34,34,0.8) 100%
        );
        z-index: -1;
        animation: gradientShift 10s ease infinite;
        background-size: 400% 400%;
    `;
    
    heroSection.appendChild(gradientOverlay);
    
    // Add animation styles
    const bgStyle = document.createElement('style');
    bgStyle.textContent = `
        @keyframes gradientShift {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
    `;
    document.head.appendChild(bgStyle);
}

// ===== TYPEWRITER EFFECT =====
function initTypewriterEffect() {
    console.log('Initializing typewriter effect...');
    
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.dataset.typewriter;
        element.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                observer.unobserve(element);
            }
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// ===== INTERACTIVE PARTICLES =====
function initInteractiveParticles() {
    console.log('Initializing interactive particles...');
    
    const interactiveSections = document.querySelectorAll('.hero, .cta-section');
    
    interactiveSections.forEach(section => {
        section.addEventListener('mousemove', (e) => {
            const particles = section.querySelectorAll('.interactive-particle');
            
            particles.forEach(particle => {
                const speed = particle.dataset.speed || 1;
                const x = (window.innerWidth - e.pageX * speed) / 100;
                const y = (window.innerHeight - e.pageY * speed) / 100;
                
                particle.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        });
    });
}

// ===== ENHANCED NAVIGATION =====
function initNavigation() {
    console.log('Initializing enhanced navigation...');
    
    const mobileMenu = document.getElementById('mobileMenu');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenu || !navMenu) {
        console.error('Navigation elements not found!');
        return;
    }
    
    // Enhanced menu toggle with animation
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            // Animate menu items
            const navItems = navMenu.querySelectorAll('.nav-link');
            navItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('slide-in');
            });
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Add ripple effect to mobile menu button
    mobileMenu.addEventListener('click', function(event) {
        event.stopPropagation();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
        `;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size/2}px`;
        ripple.style.top = `${event.clientY - rect.top - size/2}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        toggleMenu();
    });
    
    // Enhanced hover effect for nav items
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add animation styles
    const navStyle = document.createElement('style');
    navStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .slide-in {
            animation: slideInRight 0.5s ease forwards;
            opacity: 0;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(navStyle);
}

// ===== ENHANCED CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Add floating label effect
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', () => {
                label.style.transform = 'translateY(-25px) scale(0.85)';
                label.style.color = '#222222';
                group.style.borderColor = '#222222';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = '#888888';
                }
                group.style.borderColor = '#ddd';
            });
            
            // Initialize
            if (input.value) {
                label.style.transform = 'translateY(-25px) scale(0.85)';
            }
        }
    });
    
    // Add submit animation
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.style.width = submitBtn.offsetWidth + 'px';
        
        setTimeout(() => {
            // Success animation
            submitBtn.innerHTML = '<i class="fas fa-check"></i>';
            submitBtn.style.background = '#4CAF50';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.width = '';
                submitBtn.style.background = '';
                contactForm.reset();
            }, 1500);
        }, 2000);
    });
}

// ===== ENHANCED SCROLL SPY =====
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add progress indicator
    const progressBar = document.createElement('div');
    progressBar.id = 'scrollProgress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #222222, #444444);
        width: 0%;
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        // Update progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
        
        // Update active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                
                // Add pulse effect
                link.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    link.style.animation = '';
                }, 500);
            }
        });
    });
}

// ===== ENHANCED COOKIES POPUP =====
function initCookiesPopup() {
    const cookiesPopup = document.getElementById('cookiesPopup');
    if (!cookiesPopup) return;
    
    // Add floating animation
    cookiesPopup.style.animation = 'float 3s ease-in-out infinite';
    
    // Add glow effect
    setInterval(() => {
        cookiesPopup.style.boxShadow = cookiesPopup.style.boxShadow.includes('0 0 20px')
            ? '0 0 40px rgba(34, 34, 34, 0.3)'
            : '0 0 20px rgba(34, 34, 34, 0.1)';
    }, 2000);
}

// ===== UTILITY FUNCTIONS =====
function animateTextReveal(element) {
    const text = element.textContent;
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.animationDelay = `${i * 0.05}s`;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.style.animation = 'fadeInUp 0.5s ease forwards';
        element.appendChild(span);
    }
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    let count = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(count).toLocaleString();
    }, 30);
}

// ===== WINDOW LOAD ENHANCEMENTS =====
window.addEventListener('load', function() {
    console.log('Page fully loaded - Starting final animations');
    
    // Add loaded class with delay for staggered reveal
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Add confetti effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            createConfetti(hero);
        }
    }, 500);
});

function createConfetti(container) {
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${['#222222', '#444444', '#666666'][i % 3]};
            top: -20px;
            left: ${Math.random() * 100}%;
            animation: fall ${2 + Math.random() * 3}s linear ${Math.random() * 2}s infinite;
            opacity: ${0.5 + Math.random() * 0.5};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;
        container.appendChild(confetti);
    }
    
    // Add animation style
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(${360 * 3}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);
}

// ===== PERFORMANCE OPTIMIZATION =====
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Resize complete - Reinitializing effects');
        // Reinitialize any effects that need recalculation
        if (window.particleSystem) {
            window.particleSystem.resize();
        }
    }, 250);
});

// Export functions for debugging
window.MagTecEffects = {
    initParticleBackground,
    initStaggeredAnimations,
    initParallaxEffects,
    initMagneticButtons,
    showNotification
};

console.log('MagTec Invest - Mind-blowing effects system ready! 🚀');