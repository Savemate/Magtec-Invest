(function() {
  'use strict';

  // Initialize the application
  function init() {
    setCurrentYear();
    setupModal();
    setupForm();
    setupSmoothScroll();
    setupHeaderScroll();
    setupKeyboardNavigation();
  }

  // Set current year in footer
  function setCurrentYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  // Project data
  const projects = {
    savemate: {
      title: "Savemate App",
      subtitle: "Smart savings & payments companion",
      content: `
        <p><strong>Overview</strong><br/>
        Savemate is a personal finance app designed to help users save toward goals, automate transfers, and visualize spending.</p>
        <p><strong>Features</strong></p>
        <ul>
          <li>Goal-based savings with scheduled contributions</li>
          <li>Secure payments and card integrations</li>
          <li>Personalized insights & budgeting tools</li>
          <li>Cross-platform: iOS, Android and Web</li>
        </ul>
        <p><strong>Impact</strong><br/>
        Early pilots showed a 28% increase in on-time savings among active users.</p>
      `
    },
    studio: {
      title: "MagTec Studio",
      subtitle: "Creative production and brand strategy",
      content: `
        <p><strong>Overview</strong><br/>
        MagTec Studio handles creative strategy, product motion, and campaign production for partners and startups.</p>
        <p><strong>Services</strong></p>
        <ul>
          <li>Brand identity & visual design</li>
          <li>Motion graphics & product videos</li>
          <li>Content strategy & digital campaigns</li>
          <li>Product launch support</li>
        </ul>
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
      modalBody.innerHTML = project.content;

      // Set accessibility attributes
      modal.setAttribute('aria-hidden', 'false');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      // Store last focused element
      lastFocusedElement = document.activeElement;

      // Focus trap
      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      function handleKeydown(e) {
        if (e.key === 'Escape') {
          closeModal();
        }

        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              e.preventDefault();
              lastFocusable.focus();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              e.preventDefault();
              firstFocusable.focus();
            }
          }
        }
      }

      modal.addEventListener('keydown', handleKeydown);
      modal.dataset.keydownHandler = handleKeydown;

      // Focus first element
      setTimeout(() => firstFocusable?.focus(), 100);
    }

    function closeModal() {
      const modal = document.getElementById('modalBackdrop');
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
      document.body.style.overflow = '';

      // Remove event listener
      if (modal.dataset.keydownHandler) {
        modal.removeEventListener('keydown', modal.dataset.keydownHandler);
      }

      // Return focus to the button that opened the modal
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }

    // Event listeners for project buttons
    document.querySelectorAll('[data-open]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const projectId = e.currentTarget.getAttribute('data-open');
        openModal(projectId);
      });

      // Keyboard support
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const projectId = e.currentTarget.getAttribute('data-open');
          openModal(projectId);
        }
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
    const status = document.getElementById('formStatus');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Get form data
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const company = document.getElementById('company').value.trim();
      const message = document.getElementById('message').value.trim();
      const submitBtn = form.querySelector('button[type="submit"]');

      // Validation
      if (!name || !email || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      showStatus('Sending message...', 'muted');

      try {
        // Simulate API call
        await simulateApiCall(formData);

        // Success
        showStatus('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();

        // Reset after 5 seconds
        setTimeout(() => {
          showStatus('', 'muted');
        }, 5000);

      } catch (error) {
        console.error('Form submission error:', error);
        showStatus('Something went wrong. Please try again.', 'error');
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    });

    function showStatus(text, type = 'muted') {
      status.textContent = text;
      status.className = '';
      if (type !== 'muted') {
        status.classList.add(type);
      }
    }

    function simulateApiCall(formData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // In a real application, you would send the data to your server
          // For example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
          console.log('Form data would be sent:', {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            message: document.getElementById('message').value
          });
          resolve({ success: true });
        }, 1500);
      });
    }
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
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

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
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
      } else if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
      }

      lastScroll = currentScroll;
    });
  }

  // Keyboard navigation enhancement
  function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for potential future extension
  window.MagTecInvest = {
    init,
    openModal: (projectId) => {
      const modal = document.getElementById('modalBackdrop');
      if (modal) {
        modal.style.display = 'flex';
      }
    }
  };

})();