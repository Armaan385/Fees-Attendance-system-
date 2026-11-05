// Kavirox Fee & Attendance Manager - Luxury Enterprise SaaS Application Controller
class KaviroxAppController {
  constructor() {
    this.currentView = 'website'; // website, parent, teacher, fees, idcards, attendance, reports, owner
    this.isAdminVisible = false; // Admin Portal is hidden by default for pure client privacy & polish
    this.isLightTheme = false;
    this.toastContainer = null;
    this.isPresenterHubOpen = false;
    this.isProfileDropdownOpen = false;
  }

  // Static proxy methods so inline event handlers always work flawlessly
  static switchView(view) { if (window.kaviroxApp) window.kaviroxApp.switchView(view); }
  static switchRole(role) { if (window.kaviroxApp) window.kaviroxApp.switchRole(role); }
  static toggleTheme() { if (window.kaviroxApp) window.kaviroxApp.toggleTheme(); }
  static setLanguage(lang) { if (window.kaviroxApp) window.kaviroxApp.setLanguage(lang); }
  static switchCentre(c) { if (window.kaviroxApp) window.kaviroxApp.switchCentre(c); }
  static resetDemoData() { if (window.kaviroxApp) window.kaviroxApp.resetDemoData(); }
  static quickFeeCollect(id) { if (window.kaviroxApp) window.kaviroxApp.quickFeeCollect(id); }
  static showToast(m, t) { if (window.kaviroxApp) window.kaviroxApp.showToast(m, t); }
  static navTo(sub) { if (window.KaviroxAdmin) window.KaviroxAdmin.navTo(sub); }
  static togglePresenterHub() { if (window.kaviroxApp) window.kaviroxApp.togglePresenterHub(); }
  static toggleProfileDropdown() { if (window.kaviroxApp) window.kaviroxApp.toggleProfileDropdown(); }
  static toggleAdminVisibility() { if (window.kaviroxApp) window.kaviroxApp.toggleAdminVisibility(); }

  init() {
    this.toastContainer = document.getElementById('toast-container');
    window.kaviroxStore.subscribe(() => this.render());

    // Liquid Glass UI is permanent standard
    document.body.classList.remove('light-theme', 'dark-theme');

    // Global Presenter Keyboard Shortcut: Ctrl + Shift + A (Toggles Admin Portal Hide / Show)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        this.toggleAdminVisibility();
      }
    });

    // Close dropdowns on outside click
    window.addEventListener('click', (e) => {
      if (!e.target.closest('.user-profile-menu-wrap') && this.isProfileDropdownOpen) {
        this.isProfileDropdownOpen = false;
        this.render();
      }
    });

    this.render();
  }

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    if (this.isLightTheme) {
      document.body.classList.add('light-theme');
      localStorage.setItem('kavirox_theme', 'light');
      this.showToast('Daylight Corporate Theme activated', 'info');
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('kavirox_theme', 'dark');
      this.showToast('Executive Dark Theme activated', 'info');
    }
    this.render();
  }

  togglePresenterHub() {
    this.isPresenterHubOpen = !this.isPresenterHubOpen;
    this.render();
  }

  toggleAdminVisibility() {
    this.isAdminVisible = !this.isAdminVisible;
    if (this.isAdminVisible) {
      this.currentView = 'owner';
      this.showToast('Admin Portal Unlocked & Active', 'success');
    } else {
      if (['owner', 'students', 'reports', 'batches', 'staff', 'settings', 'notices'].includes(this.currentView)) {
        this.currentView = 'website';
      }
      this.showToast('Admin Portal Hidden from view', 'info');
    }
    this.render();
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    this.render();
  }

  switchRole(role) {
    window.kaviroxStore.setActiveRole(role);
    this.currentView = role;
    this.isPresenterHubOpen = false;
    this.render();
  }

  switchView(view) {
    this.currentView = view;
    this.isPresenterHubOpen = false;
    this.render();
  }

  quickFeeCollect(studentId) {
    window.KaviroxFees.selectedStudentId = studentId;
    window.KaviroxFees.currentTab = 'collect';
    this.currentView = 'fees';
    this.render();
  }

  setLanguage(lang) {
    window.kaviroxStore.setLanguage(lang);
    this.showToast(`Language switched to ${lang === 'hi' ? 'हिंदी' : 'English'}`, 'info');
    this.render();
  }

  switchCentre(centreId) {
    window.kaviroxStore.setActiveCentre(centreId);
    const centre = window.kaviroxStore.getCurrentCentre();
    this.showToast(`Active institute set to: ${centre.name}`, 'info');
    this.render();
  }

  resetDemoData() {
    if (confirm("Reset all students, attendance and fee records to initial clean sample state?")) {
      window.kaviroxStore.resetToSeed();
      this.showToast("All records restored successfully", "success");
      this.render();
    }
  }

  showToast(message, type = 'info') {
    if (!this.toastContainer) this.toastContainer = document.getElementById('toast-container');
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type} animate-slide-in`;
    toast.innerHTML = `
      <span class="toast-icon">${window.KaviroxIcons ? window.KaviroxIcons.get(type === 'success' ? 'check' : type === 'danger' ? 'alert-circle' : 'bell', 16) : '•'}</span>
      <span class="toast-msg">${message}</span>
    `;

    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('toast-fade-out');
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  render() {
    const store = window.kaviroxStore;
    const currentCentre = store.getCurrentCentre();
    const appEl = document.getElementById('app-root');
    if (!appEl) return;

    // Dedicated Clean Executive Admin Workspace (No demo bars or toy controls)
    if (window.location.pathname.includes('admin') || this.currentView === 'owner') {
      appEl.innerHTML = window.KaviroxAdmin ? window.KaviroxAdmin.render() : '<p>Admin module not loaded</p>';
      return;
    }

    const icons = window.KaviroxIcons || { get: () => '', avatar: () => '' };

    appEl.innerHTML = `
      <!-- Professional Enterprise Top Navigation Bar (No AI-demo clutter) -->
      <nav class="universal-demo-bar no-print">
        <!-- Brand & Institute Context -->
        <div class="demo-bar-left">
          <div class="brand-pill" onclick="KaviroxApp.switchView('owner')" title="Kavirox Institute Suite">
            <div class="brand-logo-gem">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect width="20" height="20" x="2" y="2" rx="5" fill="url(#brandGrad)"/>
                <path d="M7 12L11 16L17 8" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <defs>
                  <linearGradient id="brandGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#4F46E5"/>
                    <stop offset="1" stop-color="#7C3AED"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="brand-text-group">
              <span class="brand-title-text">KAVIROX</span>
              <span class="brand-sub-badge">SUITE</span>
            </div>
          </div>

          <div class="header-divider-v"></div>

          <!-- Active Centre Context Badge -->
          <div class="active-centre-pill" title="Currently active campus">
            <span class="centre-live-dot"></span>
            <span class="centre-name-text">${currentCentre.name}</span>
            <span class="badge badge-outline" style="font-size: 0.68rem; padding: 0.1rem 0.45rem;">${currentCentre.code || 'KOTA'}</span>
          </div>
        </div>

        <!-- Clean Enterprise Primary Navigation Links (All portals integrated in 1 website) -->
        <div class="portal-main-nav">
          <button class="nav-tab-btn ${this.currentView === 'website' || this.currentView === 'widget' ? 'active' : ''}" onclick="KaviroxApp.switchView('website')" title="Institute Public Website & Services">
            ${icons.get('shield', 16)}
            <span>Apex Academy</span>
          </button>
          <button class="nav-tab-btn ${this.currentView === 'parent' ? 'active' : ''}" onclick="KaviroxApp.switchView('parent')" title="Parent & Student Mobile Companion">
            ${icons.get('users', 16)}
            <span>Parent Portal</span>
          </button>
          <button class="nav-tab-btn ${this.currentView === 'teacher' ? 'active' : ''}" onclick="KaviroxApp.switchView('teacher')" title="Faculty Daily Attendance Terminal">
            ${icons.get('attendance', 16)}
            <span>Teacher Terminal</span>
          </button>
          <button class="nav-tab-btn ${this.currentView === 'fees' ? 'active' : ''}" onclick="KaviroxApp.switchView('fees')" title="20-Second Fee Counter & Receipts">
            ${icons.get('fees', 16)}
            <span>Fee Desk</span>
          </button>
          <button class="nav-tab-btn ${this.currentView === 'idcards' ? 'active' : ''}" onclick="KaviroxApp.switchView('idcards')" title="High-Resolution Laminated Student ID Badges">
            ${icons.get('idcards', 16)}
            <span>ID Badges</span>
          </button>
          <button class="nav-tab-btn ${this.currentView === 'attendance' ? 'active' : ''}" onclick="KaviroxApp.switchView('attendance')" title="Fast Batch Attendance">
            ${icons.get('batches', 16)}
            <span>Attendance</span>
          </button>

          <!-- Conditionally shown when Admin Portal is Unlocked -->
          ${this.isAdminVisible ? `
            <button class="nav-tab-btn ${this.currentView === 'owner' ? 'active' : ''}" onclick="KaviroxApp.switchView('owner')" title="Director Control Room">
              ${icons.get('dashboard', 16)}
              <span>Admin Console</span>
            </button>
            <button class="nav-tab-btn ${this.currentView === 'reports' ? 'active' : ''}" onclick="KaviroxApp.switchView('reports')" title="Financial Ledger & Defaulter Audits">
              ${icons.get('reports', 16)}
              <span>Reports</span>
            </button>
          ` : ''}
        </div>

        <!-- Right System Controls -->
        <div class="demo-bar-right">
          <!-- Admin Portal Hide/Show Toggle Button -->
          <button class="admin-toggle-btn ${this.isAdminVisible ? 'admin-visible' : 'admin-hidden'}" onclick="KaviroxApp.toggleAdminVisibility()" title="Toggle Admin Portal (Ctrl + Shift + A)">
            ${this.isAdminVisible ? icons.get('shield', 14) : icons.get('lock', 14)}
            <span>${this.isAdminVisible ? 'Hide Admin' : 'Show Admin'}</span>
          </button>

          <!-- Quick Search -->
          <button class="header-icon-btn search-trigger-btn" onclick="KaviroxApp.isAdminVisible = true; KaviroxAdmin.navTo('students'); KaviroxApp.switchView('owner');" title="Quick Search (Ctrl+K)">
            ${icons.get('search', 16)}
            <span class="search-label-compact">Search</span>
            <kbd class="kbd-badge">⌘K</kbd>
          </button>

          <!-- Theme Toggle -->
          <button class="header-icon-btn" onclick="KaviroxApp.toggleTheme()" title="Toggle Light/Dark Theme">
            ${this.isLightTheme ? icons.get('moon', 16) : icons.get('sun', 16)}
          </button>

          <!-- Language Switcher -->
          <div class="lang-toggle-wrap">
            <button class="lang-btn ${store.currentLanguage === 'en' ? 'active' : ''}" onclick="KaviroxApp.setLanguage('en')">EN</button>
            <button class="lang-btn ${store.currentLanguage === 'hi' ? 'active' : ''}" onclick="KaviroxApp.setLanguage('hi')">हिंदी</button>
          </div>

          <!-- User Profile & Menu -->
          <div class="user-profile-menu-wrap" style="position: relative;">
            <div class="user-profile-badge" onclick="KaviroxApp.toggleProfileDropdown()" title="User Profile & Settings" style="cursor: pointer;">
              ${icons.avatar(currentCentre.directorName || 'Rajesh Sharma', 32)}
              <div class="profile-meta">
                <span class="name">${currentCentre.directorName || 'Dr. Rajesh Sharma'}</span>
                <span class="role">Director & Owner</span>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 4px; opacity: 0.6;"><polyline points="6 9 12 15 18 9"/></svg>
            </div>

            <!-- Profile Dropdown Menu -->
            ${this.isProfileDropdownOpen ? `
              <div class="profile-dropdown-card glass-card animate-slide-in">
                <div class="dropdown-header">
                  <strong>${currentCentre.directorName || 'Dr. Rajesh Sharma'}</strong>
                  <small class="text-muted">${currentCentre.email || 'director@apexacademy.edu.in'}</small>
                </div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item" onclick="KaviroxAdmin.navTo('settings'); KaviroxApp.switchView('owner'); KaviroxApp.toggleProfileDropdown();">
                  ${icons.get('lock', 14)}
                  <span>Campus Settings & Security</span>
                </div>
                <div class="dropdown-item" onclick="KaviroxApp.resetDemoData(); KaviroxApp.toggleProfileDropdown();">
                  ${icons.get('alert-circle', 14)}
                  <span>Reset Sample Database</span>
                </div>
                <div class="dropdown-divider"></div>
                <!-- Hidden Presenter Gateway in Dropdown -->
                <div class="dropdown-item highlight-item" onclick="KaviroxApp.togglePresenterHub(); KaviroxApp.toggleProfileDropdown();">
                  ${icons.get('shield', 14)}
                  <span>Presenter Control Hub</span>
                  <kbd class="kbd-badge ml-auto">Ctrl+Shift+A</kbd>
                </div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item" onclick="KaviroxApp.switchRole('sign-in'); KaviroxApp.toggleProfileDropdown();" style="color: var(--rose);">
                  ${icons.get('x', 14)}
                  <span>Sign Out</span>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </nav>

      <!-- Active View Body Container -->
      <div class="portal-viewport">
        ${this.renderActiveView()}
      </div>
    `;
  }

  renderActiveView() {
    switch (this.currentView) {
      case 'website':
      case 'widget':
        return window.KaviroxWidget ? window.KaviroxWidget.renderInstituteWebsite() : '';
      case 'parent':
        return window.KaviroxParent ? window.KaviroxParent.render() : '';
      case 'teacher':
        return window.KaviroxTeacher ? window.KaviroxTeacher.render() : '';
      case 'fees':
      case 'accountant':
        return window.KaviroxFees ? window.KaviroxFees.render() : '';
      case 'attendance':
        return window.KaviroxAttendance ? window.KaviroxAttendance.render() : '';
      case 'reports':
        return window.KaviroxReports ? window.KaviroxReports.render() : '';
      case 'idcards':
        return window.KaviroxIdCards ? window.KaviroxIdCards.render() : '';
      case 'owner':
      case 'students':
      case 'batches':
      case 'settings':
      case 'notices':
      case 'staff':
        return window.KaviroxAdmin ? window.KaviroxAdmin.render() : '';
      case 'marketing':
        return window.KaviroxAdmin && window.KaviroxAdmin.renderMarketingLanding ? window.KaviroxAdmin.renderMarketingLanding() : (window.KaviroxWidget ? window.KaviroxWidget.renderInstituteWebsite() : '');
      case 'sign-in':
        return window.KaviroxAuth ? window.KaviroxAuth.renderSignInPortal() : '';
      case 'superadmin':
        return window.KaviroxSuperAdmin ? window.KaviroxSuperAdmin.render() : '';
      default:
        return window.KaviroxWidget ? window.KaviroxWidget.renderInstituteWebsite() : '';
    }
  }

  // The Presenter Multi-Portal Hub Modal:
  // Allows the user to teleport between ANY portal seamlessly during client presentations!
  renderPresenterHubModal() {
    const store = window.kaviroxStore;
    const currentCentre = store.getCurrentCentre();
    const icons = window.KaviroxIcons || { get: () => '' };

    return `
      <div class="modal-backdrop" onclick="if(event.target === this) KaviroxApp.togglePresenterHub()">
        <div class="presenter-hub-card glass-card animate-slide-in">
          <div class="hub-header">
            <div>
              <div class="d-flex items-center gap-2">
                <span class="badge badge-accent">PRESENTER MASTER HUB</span>
                <span class="badge badge-outline">Private Demo Gateway</span>
              </div>
              <h2 style="font-size: 1.4rem; margin-top: 0.4rem;">Multi-Portal & Campus Teleport</h2>
              <p class="text-muted" style="font-size: 0.85rem;">Instantly switch portals or active institutes without exposing developer menus to your client.</p>
            </div>
            <button class="btn btn-outline btn-sm" onclick="KaviroxApp.togglePresenterHub()">
              ${icons.get('x', 16)} Close (Esc)
            </button>
          </div>

          <!-- Active Campus Switcher -->
          <div class="hub-campus-strip">
            <span class="text-muted" style="font-size: 0.82rem; font-weight: 600;">Active Coaching Centre:</span>
            <div class="d-flex gap-2">
              ${store.data.centres.map(c => `
                <button class="pill-btn ${c.id === store.activeCentreId ? 'active' : ''}" onclick="KaviroxApp.switchCentre('${c.id}')">
                  ${c.name} (${c.code || 'CAMPUS'})
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Portal Grid -->
          <div class="presenter-grid mt-4">
            <!-- Director Admin Room -->
            <div class="hub-tile ${this.currentView === 'owner' ? 'active-tile' : ''}" onclick="KaviroxApp.switchView('owner')">
              <div class="tile-icon-box bg-indigo">
                ${icons.get('dashboard', 22)}
              </div>
              <div class="tile-content">
                <h4>Director Control Room</h4>
                <p>Owner executive dashboard, real-time collection metrics, student roster and batch timetable.</p>
              </div>
              <span class="tile-action">Open →</span>
            </div>

            <!-- Fee Collection Desk -->
            <div class="hub-tile ${this.currentView === 'fees' ? 'active-tile' : ''}" onclick="KaviroxApp.switchView('fees')">
              <div class="tile-icon-box bg-emerald">
                ${icons.get('fees', 22)}
              </div>
              <div class="tile-content">
                <h4>Fee Operations Desk</h4>
                <p>Under-20s collection desk, dynamic UPI QR generator, official Guilloche numbered receipts.</p>
              </div>
              <span class="tile-action">Open →</span>
            </div>

            <!-- 30-Second Rapid Attendance -->
            <div class="hub-tile ${this.currentView === 'attendance' ? 'active-tile' : ''}" onclick="KaviroxApp.switchView('attendance')">
              <div class="tile-icon-box bg-purple">
                ${icons.get('attendance', 22)}
              </div>
              <div class="tile-content">
                <h4>30-Sec Attendance Register</h4>
                <p>1-tap batch roll call, radial percentage gauge, automated WhatsApp absence notifications.</p>
              </div>
              <span class="tile-action">Open →</span>
            </div>

            <!-- Financial Reports & Defaulters -->
            <div class="hub-tile ${this.currentView === 'reports' ? 'active-tile' : ''}" onclick="KaviroxApp.switchView('reports')">
              <div class="tile-icon-box bg-amber">
                ${icons.get('reports', 22)}
              </div>
              <div class="tile-content">
                <h4>Financial Audits & Reports</h4>
                <p>Collection breakdown, mode splits (UPI/Cash/Cheque), 15d/30d defaulters aging analysis.</p>
              </div>
              <span class="tile-action">Open →</span>
            </div>

            <!-- High-Resolution ID Cards -->
            <div class="hub-tile ${this.currentView === 'idcards' ? 'active-tile' : ''}" onclick="KaviroxApp.switchView('idcards')">
              <div class="tile-icon-box bg-cyan">
                ${icons.get('idcards', 22)}
              </div>
              <div class="tile-content">
                <h4>Printable Student ID Passports</h4>
                <p>Batch laminated cards with crisp SVG barcodes, verification QR code and blood group badge.</p>
              </div>
              <span class="tile-action">Open →</span>
            </div>

            <!-- Parent Mobile PWA -->
            <div class="hub-tile" onclick="window.open('parent-portal.html', '_blank')">
              <div class="tile-icon-box bg-rose">
                ${icons.get('users', 22)}
              </div>
              <div class="tile-content">
                <h4>Parent Mobile Web App (PWA)</h4>
                <p>Dedicated parent portal with OTP verification, child switcher, attendance calendar and dues card.</p>
              </div>
              <span class="tile-action">Launch PWA ↗</span>
            </div>

            <!-- Faculty Attendance Terminal -->
            <div class="hub-tile" onclick="window.open('teacher-portal.html', '_blank')">
              <div class="tile-icon-box bg-blue">
                ${icons.get('calendar', 22)}
              </div>
              <div class="tile-content">
                <h4>Faculty Attendance App</h4>
                <p>Fast mobile-optimized terminal for teachers to mark batch attendance within 30 seconds.</p>
              </div>
              <span class="tile-action">Launch App ↗</span>
            </div>

            <!-- Client Website with Embedded Widget -->
            <div class="hub-tile" onclick="window.open('widget-embed.html', '_blank')">
              <div class="tile-icon-box bg-slate">
                ${icons.get('qr-code', 22)}
              </div>
              <div class="tile-content">
                <h4>Academy Website + Widget</h4>
                <p>Apex Academy public website showing the embedded Kavirox live student/parent service widget.</p>
              </div>
              <span class="tile-action">View Site ↗</span>
            </div>

            <!-- Super-Admin Multi-Tenant Suite -->
            <div class="hub-tile ${this.currentView === 'superadmin' ? 'active-tile' : ''}" onclick="KaviroxApp.switchView('superadmin')">
              <div class="tile-icon-box bg-emerald">
                ${icons.get('shield', 22)}
              </div>
              <div class="tile-content">
                <h4>Kavirox Super-Admin</h4>
                <p>Multi-tenant licensing management, billing ledger, and zero cross-tenant leak isolation tests.</p>
              </div>
              <span class="tile-action">Open →</span>
            </div>

            <!-- Public Marketing SaaS Landing -->
            <div class="hub-tile" onclick="window.open('marketing.html', '_blank')">
              <div class="tile-icon-box bg-indigo">
                ${icons.get('arrow-right', 22)}
              </div>
              <div class="tile-content">
                <h4>Public SaaS Landing Page</h4>
                <p>World-class marketing site with interactive fee recovery ROI calculator and pricing tiers.</p>
              </div>
              <span class="tile-action">View Site ↗</span>
            </div>
          </div>

          <div class="hub-footer">
            <span class="text-muted" style="font-size: 0.78rem;">
              Press <kbd class="kbd-badge">Ctrl + Shift + A</kbd> anywhere across all portals to toggle this presenter hub.
            </span>
            <button class="btn btn-outline btn-xs" onclick="KaviroxApp.resetDemoData()">
              ↺ Reset Sample Database
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

// Global App Instance
window.kaviroxApp = new KaviroxAppController();
window.KaviroxApp = window.kaviroxApp;
window.KaviroxAppController = KaviroxAppController;

document.addEventListener('DOMContentLoaded', () => {
  window.kaviroxApp.init();
});
