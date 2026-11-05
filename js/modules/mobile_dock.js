/**
 * Apex Academy - Mobile Browser Navigation Dock
 * Provides an app-like frosted glass bottom navigation bar on mobile viewports (<= 768px).
 * Supports iOS Safe Area insets, active route highlighting, and smooth touch interactions.
 */

(function () {
  'use strict';

  function initMobileDock() {
    // Avoid double initialization
    if (document.getElementById('apex-mobile-dock')) return;

    const dock = document.createElement('nav');
    dock.id = 'apex-mobile-dock';
    dock.className = 'apex-mobile-dock no-print';
    dock.setAttribute('aria-label', 'Mobile Quick Navigation Dock');

    const currentPath = window.location.pathname.toLowerCase();
    const isHome = currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/');
    const isCourses = currentPath.includes('courses.html');
    const isPortal = currentPath.includes('portal.html') || currentPath.includes('parent-portal') || currentPath.includes('teacher-portal');
    const isResults = currentPath.includes('results.html');
    const isContact = currentPath.includes('contact.html') || currentPath.includes('admissions.html');

    dock.innerHTML = `
      <div class="mobile-dock-inner">
        <a href="index.html" class="dock-tab ${isHome ? 'active' : ''}">
          <div class="dock-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <span class="dock-label">Home</span>
        </a>

        <a href="courses.html" class="dock-tab ${isCourses ? 'active' : ''}">
          <div class="dock-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
          </div>
          <span class="dock-label">Courses</span>
        </a>

        <a href="portal.html" class="dock-tab dock-tab-primary ${isPortal ? 'active' : ''}">
          <div class="dock-icon-pill">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <span class="dock-label">Portal</span>
        </a>

        <a href="results.html" class="dock-tab ${isResults ? 'active' : ''}">
          <div class="dock-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          </div>
          <span class="dock-label">Results</span>
        </a>

        <a href="tel:+919810012345" class="dock-tab">
          <div class="dock-icon-wrap" style="color: #34D399;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <span class="dock-label" style="color: #34D399;">Call</span>
        </a>
      </div>
    `;

    document.body.appendChild(dock);

    // Audio touch feedback integration if sound FX engine is active
    dock.querySelectorAll('.dock-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        if (window.soundFx && typeof window.soundFx.playTap === 'function') {
          window.soundFx.playTap();
        }
      });
    });

    // Auto-hide dock when full screen modal is open
    const observer = new MutationObserver(() => {
      const hasOpenModal = document.querySelector('.modal-backdrop.open, #apex-pdf-preview-modal, .presenter-hub-backdrop');
      if (hasOpenModal) {
        dock.style.transform = 'translateY(120%)';
        dock.style.opacity = '0';
        dock.style.pointerEvents = 'none';
      } else {
        dock.style.transform = 'translateY(0)';
        dock.style.opacity = '1';
        dock.style.pointerEvents = 'auto';
      }
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileDock);
  } else {
    initMobileDock();
  }
})();
