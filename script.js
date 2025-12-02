(function() {
  'use strict';

  // Initialize the application
  function init() {
    setCurrentYear();
    setupProgressBar();
    setupStatsAnimation();
    setupModal();
    setupForm();
    setupSmoothScroll();
    setupHeaderScroll();
    setupCursorEffect();
    setupScrollIndicator();
    setupAnimations();
    setupMenuToggle();
  }

  // Set current year in footer
  function setCurrentYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  // Progress bar on scroll
  function setupProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // Animate stats counter
  function setupStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target;
          const target = parseInt(statNumber.getAttribute('data-count'));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            statNumber.textContent = Math.floor(current);
          }, 16);
          
          observer.unobserve(statNumber);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
  }

  // Project data
  const projects = {
    savemate: {
      title: "Savemate",
      subtitle: "Social Commerce Platform for South Africa",
      content: `
        <div class="modal-section">
          <h4>Overview</h4>
          <p>Savemate is a revolutionary shopping and social platform designed specifically for South African consumers. We're transforming how people discover deals, share savings, and connect with fellow shoppers in real-time.</p>
        </div>

        <div class="modal-section">
          <h4>Key Features</h4>
          <ul>
            <li><strong>Deal Discovery</strong>: AI-powered personalized deal recommendations based on shopping habits</li>
            <li><strong>Social Shopping</strong>: Connect with friends, share finds, and shop together virtually</li>
            <li><strong>Price Tracking</strong>: Real-time price monitoring across major South African retailers</li>
            <li><strong>Savings Community</strong>: Join groups based on interests and shopping preferences</li>
            <li><strong>Cashback & Rewards</strong>: Earn rewards for purchases and community participation</li>
          </ul>
        </div>

        <div class="modal-section">
          <h4>Technical Stack</h4>
          <div class="tech-stack">
            <span>React Native</span>
            <span>Node.js</span>
            <span>MongoDB</span>
            <span>Redis</span>
            <span>AWS</span>
            <span>Docker</span>
          </div>
        </div>

        <div class="modal-section">
          <h4>Impact & Metrics</h4>
          <div class="metrics">
            <div class="metric">
              <div class="metric-value">50K+</div>
              <div class="metric-label">Active Users</div>
            </div>
            <div class="metric">
              <div class="metric-value">R2.5M+</div>
              <div class="metric-label">Total Savings</div>
            </div>
            <div class="metric">
              <div class="metric-value">15+</div>
              <div class="metric-label">Retail Partners</div>
            </div>
          </div>
        </div>

        <div class="modal-section">
          <h4>Unique Value Proposition</h4>
          <p>Unlike traditional shopping apps, Savemate combines social connectivity with smart shopping tools, creating a community-driven platform where South Africans can save together, discover new products, and make smarter purchasing decisions.</p>
        </div>
      `
    },
    studio: {
      title: "MagTec Studio",
      subtitle: "Immersive Media & Creative Production",
      content: `
        <div class="modal-section">
          <h4>Overview</h4>
          <p>MagTec Studio is our in-house creative powerhouse specializing in immersive media experiences, brand storytelling, and cutting-edge visual production.</p>
        </div>

        <div class="modal-section">
          <h4>Services</h4>
          <ul>
            <li><strong>3D Animation & Motion Graphics</strong>: Bringing ideas to life through dynamic visuals</li>
            <li><strong>AR/VR Experiences</strong>: Creating immersive digital environments</li>
            <li><strong>Brand Identity</strong>: Comprehensive branding and visual identity systems</li>
            <li><strong>Video Production</strong>: Cinematic storytelling from concept to delivery</li>
            <li><strong>Interactive Web Experiences</strong>: Engaging digital platforms and installations</li>
          </ul>
        </div>

        <div class="modal-section">
          <h4>Notable Projects</h4>
          <ul>
            <li>Brand campaign for Africa's leading fintech startup</li>
            <li>Interactive AR experience for major retail chain</li>
            <li>Documentary series on African innovation</li>
            <li>Virtual event production for tech conferences</li>
          </ul>
        </div>
      `
    }
  };

  // Modal functionality
  function setupModal() {
    const modal = document.getElementById('modalBackdrop');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    let lastFocusedElement = null;

    function openModal(projectId) {
      const project = projects[projectId];
      if (!project) return;

      modalTitle.textContent = project.title;
      modalSubtitle.textContent = project.subtitle;
      modalBody.innerHTML = `
        <style>
          .modal-section { margin-bottom: 30px; }
          .modal-section h4 { 
            font-size: 20px; 
            margin-bottom: 15px;
            color: white;
          }
          .tech-stack { 
            display: flex; 
            flex-wrap: wrap; 
            gap: 10px;
            margin: 15px 0;
          }
          .tech-stack span {
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            font-size: 14px;
          }
          .metrics {
            display: flex;
            gap: 30px;
            margin: 20px 0;
          }
          .metric {
            text-align: center;
          }
          .metric-value {
            font-size: 28px;
            font-weight: 800;
            background: linear-gradient(135deg, #0B3E8A 0%, #00D4FF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 5px;
          }
          .metric-label {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
          }
        </style>
        ${project.content}
      `;

      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      lastFocusedElement = document.activeElement;
      modalClose.focus();

      // Add animations
      modal.style.animation = 'none';
      setTimeout(() => {
        modal.style.animation = 'fadeIn 0.3s ease';
      }, 10);
    }

    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';

      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }

    // Event listeners
    document.querySelectorAll('[data-open]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = e.currentTarget.getAttribute('data-open');
        openModal(projectId);
      });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });
  }

  // Form handling
  function setupForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.submit-btn');
      const formData = new FormData(form);
      
      // Show loading state
      submitBtn.innerHTML = '<span>Sending...</span><div class="btn-arrow"><i class="fas fa-spinner fa-spin"></i></div>';
      submitBtn.disabled = true;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success animation
      submitBtn.innerHTML = '<span>Message Sent!</span><div class="btn-arrow"><i class="fas fa-check"></i></div>';
      submitBtn.style.background = 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)';
      
      // Reset form
      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = '<span>Send Message</span><div class="btn-arrow"><i class="fas fa-paper-plane"></i></div>';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);

      // Log form data (for development)
      console.log('Form submitted:', {
        name: formData.get('name'),
        email: formData.get('email'),
        inquiry: formData.get('inquiry'),
        message: formData.get('message')
      });
    });
  }

  // Smooth scroll for anchor links
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#0') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = targetPosition - headerHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Header scroll effect
  function setupHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 100) {
        header.style.background = 'rgba(10, 10, 10, 0.85)';
        header.style.backdropFilter = 'blur(20px)';
      } else if (currentScroll > lastScroll && currentScroll > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
        header.style.background = 'rgba(10, 10, 10, 0.95)';
      }

      lastScroll = currentScroll;
    });
  }

  // Custom cursor effect
  function setupCursorEffect() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      // Move dot
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';

      // Move outline
      outlineX += (mouseX - outlineX) * 0.08;
      outlineY += (mouseY - outlineY) * 0.08;
      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, [data-open]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '20px';
        cursorDot.style.height = '20px';
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.borderColor = 'var(--secondary)';
      });

      el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.borderColor = 'var(--accent)';
      });
    });
  }

  // Scroll indicator
  function setupScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrolled > maxScroll - 100) {
        indicator.style.opacity = '0';
      } else {
        indicator.style.opacity = '0.5';
      }
    });

    // Hide on mobile
    if (window.innerWidth < 768) {
      indicator.style.display = 'none';
    }
  }

  // Setup animations on scroll
  function setupAnimations() {
    const animateOnScroll = (elements, threshold = 0.1) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      }, { threshold });

      elements.forEach(el => observer.observe(el));
    };

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .info-card');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    setTimeout(() => {
      animateOnScroll(animatedElements);
    }, 100);
  }

  // Mobile menu toggle
  function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.style.display = 'none';
        menuToggle.classList.remove('active');
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Add global styles for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .animated {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .menu-toggle.active .menu-line:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
    }
    
    .menu-toggle.active .menu-line:nth-child(2) {
      opacity: 0;
    }
    
    .menu-toggle.active .menu-line:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }
    
    @media (max-width: 768px) {
      .nav-links {
        display: none;
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background: rgba(10, 10, 10, 0.95);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 20px;
        gap: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 99;
      }
      
      .nav-link {
        justify-content: center;
      }
    }
  `;
  document.head.appendChild(style);

})();