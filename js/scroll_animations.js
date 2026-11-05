// ==========================================================================
// Apex Academy & Kavirox Suite - Impressive Next-Gen Scroll Engine
// 3D Perspective Reveal, Specular Light Sheen, Dynamic Count-Up, and Floating Spy
// ==========================================================================
(function() {
  'use strict';

  function initScrollEngine() {
    // 1. Glowing Multi-Tone Reading Progress Bar
    let progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress-bar';
      progressBar.className = 'scroll-progress-indicator';
      document.body.prepend(progressBar);
    }

    // 2. Floating Back-to-Top Button
    let backToTopBtn = document.getElementById('back-to-top-fab');
    if (!backToTopBtn) {
      backToTopBtn = document.createElement('button');
      backToTopBtn.id = 'back-to-top-fab';
      backToTopBtn.className = 'back-to-top-fab';
      backToTopBtn.setAttribute('title', 'Return to top of page');
      backToTopBtn.setAttribute('aria-label', 'Return to top');
      backToTopBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      `;
      backToTopBtn.onclick = function() {
        if (window.SoundFx) window.SoundFx.play('click');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      document.body.appendChild(backToTopBtn);
    }

    // 3. Floating Campus Section Spy Navigator (Homepage Only)
    initSectionSpyRail();

    // 4. Numbers Count-Up Animation on Scroll View
    initAnimatedNumberCounters();

    // 5. 3D Perspective Scroll Reveal with Staggered Cascades
    initPerspectiveScrollReveal();

    // 6. 3D Card Tilt & Specular Physics
    initCard3DTiltPhysics();

    // 8. Magnetic Button Interactive Micro-Physics
    initMagneticButtons();

    // 9. Spatial UI Ambient Cursor Glow Engine
    initSpatialCursorGlow();

    // 10. Scroll Listener with Parallax, Frosted Header & Spy Updates
    let ticking = false;
    const heroBanner = document.querySelector('.page-hero-banner');
    const navbar = document.querySelector('.inst-navbar-wrap');

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

          // Update Progress Bar
          if (progressBar) {
            progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
          }

          // Update Back-to-Top FAB
          if (backToTopBtn) {
            if (scrollTop > 380) {
              backToTopBtn.classList.add('visible');
            } else {
              backToTopBtn.classList.remove('visible');
            }
          }

          // Update Frosted Glass Header Compression
          if (navbar) {
            if (scrollTop > 25) {
              navbar.classList.add('scrolled-header');
            } else {
              navbar.classList.remove('scrolled-header');
            }
          }

          // Subtle Parallax on Hero Banner (if on top)
          if (heroBanner && scrollTop < window.innerHeight) {
            heroBanner.style.backgroundPositionY = `${scrollTop * 0.25}px`;
          }

          // Update Campus Section Spy Dots
          updateActiveSpyDot(scrollTop);

          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --------------------------------------------------------------------------
  // Floating Campus Section Spy Navigator
  // --------------------------------------------------------------------------
  const campusSections = [
    { id: 'gd-hero-carousel', name: 'Overview' },
    { id: 'toppers-section', name: 'Top Rankers 2026' },
    { id: 'pedagogy-section', name: 'Why Apex Pedagogy' },
    { id: 'academic-wings-section', name: 'Target Batches' },
    { id: 'facilities-tab-section', name: 'Campus Facilities' },
    { id: 'campus-overview', name: 'Director & Circulars' },
    { id: 'parents-voice-section', name: 'Parents Voice' },
    { id: 'portals-ecosystem', name: 'Dedicated Portals' },
    { id: 'live-ai-scanner-section', name: 'AI Turnstile Scanner' },
    { id: 'student-desk', name: 'Fee Verification Desk' },
    { id: 'roi-calculator-section', name: 'Institutional ROI' }
  ];

  function initSectionSpyRail() {
    // Only mount if the page has at least 3 of these sections
    const existingSections = campusSections.filter(sec => document.getElementById(sec.id));
    if (existingSections.length < 3) return;

    let spyRail = document.getElementById('campus-scroll-spy');
    if (!spyRail) {
      spyRail = document.createElement('nav');
      spyRail.id = 'campus-scroll-spy';
      spyRail.className = 'campus-scroll-spy-rail';
      spyRail.setAttribute('aria-label', 'Section Quick Navigation');

      existingSections.forEach((sec, idx) => {
        const dot = document.createElement('button');
        dot.className = `spy-dot-item ${idx === 0 ? 'active' : ''}`;
        dot.dataset.targetId = sec.id;
        dot.setAttribute('title', sec.name);
        dot.setAttribute('aria-label', `Jump to ${sec.name}`);
        dot.innerHTML = `<span class="spy-dot-tooltip">${sec.name}</span>`;
        dot.onclick = function() {
          if (window.SoundFx) window.SoundFx.play('tab');
          window.smoothScrollTo(sec.id);
        };
        spyRail.appendChild(dot);
      });

      document.body.appendChild(spyRail);
    }
  }

  function updateActiveSpyDot(scrollTop) {
    const dots = document.querySelectorAll('.campus-scroll-spy-rail .spy-dot-item');
    if (!dots.length) return;

    let currentSectionId = '';
    const scrollPos = scrollTop + (window.innerHeight * 0.35);

    campusSections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = sec.id;
        }
      }
    });

    if (currentSectionId) {
      dots.forEach(dot => {
        if (dot.dataset.targetId === currentSectionId) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // Dynamic Count-Up Animation for Numerical Stats
  // --------------------------------------------------------------------------
  function initAnimatedNumberCounters() {
    const counterElements = document.querySelectorAll('.counter-stat, [data-count]');
    if (!counterElements.length) return;

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateNumber(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15
      });

      counterElements.forEach(el => counterObserver.observe(el));
    } else {
      counterElements.forEach(el => animateNumber(el));
    }
  }

  function animateNumber(element) {
    const targetVal = parseFloat(element.dataset.count);
    if (isNaN(targetVal)) return;

    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const duration = 1400; // ms
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Exponential ease-out curve for smooth deceleration
      const easeProgress = 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * targetVal);

      element.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = `${prefix}${targetVal}${suffix}`;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // --------------------------------------------------------------------------
  // 3D Perspective Reveal with Staggered Cascades
  // --------------------------------------------------------------------------
  function initPerspectiveScrollReveal() {
    if ('IntersectionObserver' in window) {
      document.body.classList.add('has-scroll-anim');

      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '120px 0px 80px 0px',
        threshold: 0.04
      });

      // Target reveal elements
      const targets = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, ' +
        '.pillar-card, .topper-card-luxury, .course-card-detailed, .review-card-item, ' +
        '.gd-pillar-card, .gd-wing-card, .gd-voice-card, .animate-section, .animate-left, .animate-right, .animate-bottom'
      );

      targets.forEach((el, index) => {
        if (!el.classList.contains('scroll-reveal') &&
            !el.classList.contains('scroll-reveal-left') &&
            !el.classList.contains('scroll-reveal-right') &&
            !el.classList.contains('scroll-reveal-scale')) {
          el.classList.add('scroll-reveal');
        }

        // Apply automatic staggered cascade to sibling cards inside grids
        const parentGrid = el.closest('.pillars-grid, .toppers-grid-showcase, .testimonials-grid-strip, .client-stats-strip, .gd-pillars-grid, .gd-wings-grid, .gd-voice-grid');
        if (parentGrid) {
          const siblings = Array.from(parentGrid.children);
          const childIndex = siblings.indexOf(el);
          if (childIndex >= 0) {
            const staggerNum = (childIndex % 5) + 1;
            el.classList.add(`stagger-${staggerNum}`);
            el.style.transitionDelay = `${childIndex * 110}ms`;
          }
        }

        revealObserver.observe(el);
      });
    } else {
      document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .gd-pillar-card, .gd-wing-card, .gd-voice-card').forEach(el => {
        el.classList.add('in-view');
        el.classList.add('show');
      });
    }
  }

  // --------------------------------------------------------------------------
  // 6. 3D Card Tilt & Specular Physics Engine
  // --------------------------------------------------------------------------
  function initCard3DTiltPhysics() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll(
      '.gd-pillar-card, .gd-wing-card, .gd-voice-card, .gd-fac-preview-box, .gd-facility-nav-btn, ' +
      '.dock-btn-circle, .gd-partner-chip, .glass-card, .stat-pill, .pillar-card, .topper-card-luxury, .review-card-item'
    );

    cards.forEach(card => {
      card.classList.add('card-3d-tilt');

      // Add specular glint highlight surface if not present
      if (!card.querySelector('.card-glint-surface')) {
        const glint = document.createElement('div');
        glint.className = 'card-glint-surface';
        card.appendChild(glint);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${percentX}%`);
        card.style.setProperty('--mouse-y', `${percentY}%`);

        // Dynamic 3D tilt calculation with subtle depth (max 8.5 deg)
        const tiltX = ((y - centerY) / centerY) * -8.5;
        const tiltY = ((x - centerX) / centerX) * 8.5;

        card.style.transform = `perspective(1100px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-8px) scale3d(1.025, 1.025, 1.025) translateZ(10px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1) translateZ(0)';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. Magnetic Button Interactive Micro-Physics
  // --------------------------------------------------------------------------
  function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const magneticTargets = document.querySelectorAll(
      '.btn-gd-gold, .btn-gd-navy-outline, .dock-btn-circle, .gd-facility-nav-btn, .gd-carousel-nav-btn, ' +
      '.btn-primary, .sales-hub-trigger-btn, .sound-fx-toggle-btn'
    );
    magneticTargets.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - btnCenterX) * 0.28;
        const deltaY = (e.clientY - btnCenterY) * 0.28;

        btn.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0) scale(1.04)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
        btn.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      });

      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'transform 0.1s ease-out';
      });
    });
  }

  // --------------------------------------------------------------------------
  // Spatial UI Ambient Cursor Glow Engine
  // --------------------------------------------------------------------------
  function initSpatialCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    let glow = document.getElementById('spatial-ambient-glow');
    if (!glow) {
      glow = document.createElement('div');
      glow.id = 'spatial-ambient-glow';
      glow.className = 'spatial-ambient-glow-follower';
      document.body.appendChild(glow);
    }
    
    let mouseX = -500, mouseY = -500;
    let currentX = -500, currentY = -500;
    
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });
    
    function animateGlow() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(animateGlow);
    }
    requestAnimationFrame(animateGlow);
  }

  // --------------------------------------------------------------------------
  // 9. Precision Smooth Camera Glide Scroll Helper
  // --------------------------------------------------------------------------
  window.smoothScrollTo = function(target, duration = 900) {
    let el = null;
    if (typeof target === 'string') {
      el = document.getElementById(target.replace('#', ''));
    } else if (target instanceof HTMLElement) {
      el = target;
    }

    if (!el) return;

    if (window.CampusSoundFX) {
      window.CampusSoundFX.play('click');
    } else if (window.SoundFx) {
      window.SoundFx.play('click');
    }

    const navbarHeight = 78;
    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = Math.max(0, el.getBoundingClientRect().top + startY - navbarHeight);
    const distance = targetY - startY;
    const startTime = performance.now();

    // Custom cubic bezier camera glide: fast start, soft deceleration
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easeVal = easeInOutCubic(progress);

      window.scrollTo(0, startY + (distance * easeVal));

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  };

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollEngine);
  } else {
    initScrollEngine();
  }
})();

