(function() {
  'use strict';

  // DOM Elements
  const rulesModal = document.getElementById('rulesModal');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const body = document.body;
  const navLinks = document.querySelectorAll('.nav-link');
  const contentSections = document.querySelectorAll('.content-section');
  const profileSection = document.getElementById('profile');
  
  // Create audio element for ting sound
  const tingSound = new Audio('data:audio/wav;base64,UklGRlwAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YVoAAACAgICAf39/f39/f39/f3+AgICAf39/f39/f39/f3+AgICAf39/f39/f39/f3+AgICAf39/f39/f39/f3+AgICAf39/f39/f39/f38=');
  tingSound.volume = 0.3;

  // ===== LINK PLACEHOLDERS - REPLACE THESE WITH YOUR ACTUAL LINKS =====
  // Instagram: Find the href="#" in the social-link with fa-instagram and replace #
  // Pinterest: Find the href="#" in the social-link with fa-pinterest and replace #
  // Spotify: Find the href="#" in the social-link with fa-spotify and replace #
  // Email: Find the href="#" in the social-link with fa-envelope and replace with mailto:youremail@example.com
  // Other Website: Find the href="#" in the .website-link and replace #
  // =====================================================================

  // Show modal on page load
  function showModal() {
    setTimeout(() => {
      rulesModal.classList.add('active');
      tingSound.play().catch(() => {});
    }, 300);
  }

  // Hide modal and show content
  function hideModal() {
    rulesModal.classList.remove('active');
    body.classList.add('content-visible');
    tingSound.currentTime = 0;
    tingSound.play().catch(() => {});
  }

  // Modal OK button click
  modalOkBtn.addEventListener('click', hideModal);

  // Click outside modal to close
  rulesModal.addEventListener('click', (e) => {
    if (e.target === rulesModal) {
      hideModal();
    }
  });

  // Initialize - show modal
  showModal();

  // Navigation filtering - show only selected section
  function filterSection(sectionName) {
    // Sections that should hide the profile
    const hideProfileSections = ['gaming', 'faves', 'rules', 'friends'];
    
    // Show/hide profile based on section
    if (hideProfileSections.includes(sectionName)) {
      profileSection.classList.add('profile-hidden');
    } else {
      profileSection.classList.remove('profile-hidden');
    }
    
    // Filter content sections
    contentSections.forEach(section => {
      const sectionType = section.getAttribute('data-section');
      if (sectionType === sectionName) {
        section.classList.remove('hidden');
        section.style.animation = 'none';
        section.offsetHeight;
        section.style.animation = 'fadeUp 0.6s ease-out';
      } else {
        section.classList.add('hidden');
      }
    });
  }

  // Scroll to section smoothly
  function scrollToSection(sectionName) {
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Update active nav link
  function updateActiveNav(sectionName) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === sectionName) {
        link.classList.add('active');
      }
    });
  }

  // Main navigation click handler
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const sectionName = this.getAttribute('data-section');
      
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      if (sectionName) {
        filterSection(sectionName);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // Scroll animations - fade up sections as they come into view
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'none';
        entry.target.offsetHeight;
        entry.target.style.animation = 'fadeUp 0.6s ease-out';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section-card').forEach(card => {
    fadeObserver.observe(card);
  });

  // Profile status toggle - click to change status
  const profileStatus = document.querySelector('.profile-status');
  if (profileStatus) {
    const statuses = [
      { class: 'idle', icon: 'fa-moon', title: 'idle', color: '#f0c45a' },
      { class: 'online', icon: 'fa-circle', title: 'online', color: '#4CAF50' },
      { class: 'dnd', icon: 'fa-minus-circle', title: 'do not disturb', color: '#f44336' },
      { class: 'offline', icon: 'fa-circle', title: 'offline', color: '#9e9e9e' }
    ];
    
    let statusIndex = 0;
    
    profileStatus.addEventListener('click', () => {
      statusIndex = (statusIndex + 1) % statuses.length;
      const newStatus = statuses[statusIndex];
      
      profileStatus.className = `profile-status ${newStatus.class}`;
      profileStatus.innerHTML = `<i class="fas ${newStatus.icon}"></i>`;
      profileStatus.title = newStatus.title;
      profileStatus.style.background = newStatus.color;
    });
  }

  // Set about as active by default
  const aboutLink = document.querySelector('[data-section="about"]');
  if (aboutLink) {
    aboutLink.classList.add('active');
  }
  
  // Show about section and profile by default
  filterSection('about');
  profileSection.classList.remove('profile-hidden');

  // Smooth reveal on load
  window.addEventListener('load', () => {
    body.classList.add('content-visible');
  });

  // Re-trigger animations on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.querySelectorAll('.section-card').forEach(card => {
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'fadeUp 0.6s ease-out';
      });
    }, 100);
  });

})();