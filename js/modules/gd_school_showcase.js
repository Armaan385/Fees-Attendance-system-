// ==========================================================================
// Apex Academy & World School - Institutional Features & Interactive Engine
// Interactive Hero Carousel, Facility Tabs, Quick Enquiry Modal & Floating Dock
// ==========================================================================

window.GDSchoolShowcase = {
  currentSlide: 0,
  totalSlides: 3,
  carouselTimer: null,
  activeFacilityTab: 'classroom',

  init() {
    this.initCarousel();
    this.initDirectionalScroll();
    this.initFacilityTabs();
    this.initEnquiryModal();
  },

  /* -------------------------------------------------------------------------
     1. HERO CAROUSEL WITH AUTO-PLAY & DOTS
     ------------------------------------------------------------------------- */
  initCarousel() {
    this.showSlide(0);
    this.startCarouselAutoPlay();

    // Pause on hover
    const carouselEl = document.getElementById('gd-hero-carousel');
    if (carouselEl) {
      carouselEl.addEventListener('mouseenter', () => this.stopCarouselAutoPlay());
      carouselEl.addEventListener('mouseleave', () => this.startCarouselAutoPlay());
    }
  },

  startCarouselAutoPlay() {
    this.stopCarouselAutoPlay();
    this.carouselTimer = setInterval(() => {
      this.nextSlide();
    }, 6000);
  },

  stopCarouselAutoPlay() {
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
      this.carouselTimer = null;
    }
  },

  showSlide(index) {
    this.currentSlide = (index + this.totalSlides) % this.totalSlides;
    const slides = document.querySelectorAll('.gd-carousel-slide');
    const dots = document.querySelectorAll('.gd-carousel-dot');

    slides.forEach((slide, i) => {
      if (i === this.currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === this.currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  },

  nextSlide() {
    this.showSlide(this.currentSlide + 1);
  },

  prevSlide() {
    this.showSlide(this.currentSlide - 1);
  },

  goToSlide(idx) {
    if (window.SoundFx) window.SoundFx.play('tab');
    this.showSlide(idx);
    this.startCarouselAutoPlay();
  },

  /* -------------------------------------------------------------------------
     2. "WE LEARN TO SERVE" FACILITY TABS
     ------------------------------------------------------------------------- */
  initFacilityTabs() {
    // Listeners for facility tab buttons
    const tabBtns = document.querySelectorAll('.gd-facility-nav-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabKey = btn.dataset.tab;
        if (tabKey) this.switchFacilityTab(tabKey);
      });
    });
  },

  switchFacilityTab(tabKey) {
    this.activeFacilityTab = tabKey;
    if (window.SoundFx) window.SoundFx.play('tab');

    // Update buttons
    const tabBtns = document.querySelectorAll('.gd-facility-nav-btn');
    tabBtns.forEach(b => {
      if (b.dataset.tab === tabKey) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Update panes
    const panes = document.querySelectorAll('.gd-facility-pane');
    panes.forEach(p => {
      if (p.id === `facility-pane-${tabKey}`) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  },

  /* -------------------------------------------------------------------------
     3. QUICK ENQUIRY POPUP MODAL (GD GOENKA STYLE)
     ------------------------------------------------------------------------- */
  initEnquiryModal() {
    const modal = document.getElementById('gd-enquiry-modal');
    if (!modal) return;

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeEnquiryModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        this.closeEnquiryModal();
      }
    });
  },

  openEnquiryModal(prefillClass = '') {
    if (window.SoundFx) window.SoundFx.play('modal_open');
    const modal = document.getElementById('gd-enquiry-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (prefillClass) {
        const classSelect = document.getElementById('enq-student-class');
        if (classSelect) classSelect.value = prefillClass;
      }
    }
  },

  closeEnquiryModal() {
    if (window.SoundFx) window.SoundFx.play('modal_close');
    const modal = document.getElementById('gd-enquiry-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  submitEnquiry(event) {
    event.preventDefault();
    const parentName = document.getElementById('enq-parent-name')?.value || 'Parent';
    const studentName = document.getElementById('enq-student-name')?.value || 'Student';
    const mobile = document.getElementById('enq-parent-phone')?.value || '';
    const studentClass = document.getElementById('enq-student-class')?.value || 'General';

    if (window.SoundFx) window.SoundFx.play('payment_success');

    // Show toast confirmation
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast(`✅ Admission Inquiry Registered for ${studentName} (${studentClass}). Our Academic Counselor will call ${mobile} shortly!`, 'success');
    } else {
      alert(`Admission Enquiry Received for ${studentName}! Our counselor will reach out shortly.`);
    }

    this.closeEnquiryModal();
    const form = document.getElementById('gd-enquiry-form');
    if (form) form.reset();
  },

  /* -------------------------------------------------------------------------
     4. DIRECTIONAL SCROLL REVEAL OBSERVER (GD GOENKA ENGINE)
     ------------------------------------------------------------------------- */
  initDirectionalScroll() {
    if (!('IntersectionObserver' in window)) return;

    const sections = document.querySelectorAll('.animate-section, .animate-left, .animate-right, .animate-bottom');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08
    });

    sections.forEach(s => observer.observe(s));
  }
};

// Auto-boot on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.GDSchoolShowcase.init();
});
