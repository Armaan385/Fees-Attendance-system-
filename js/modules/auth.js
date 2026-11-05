// Kavirox Fee & Attendance Manager - Auth & Sign-In Module
window.KaviroxAuth = {
  currentTab: 'staff', // staff, parent, superadmin
  generatedOtp: '482910',

  renderSignInPortal() {
    const store = window.kaviroxStore;
    const centre = store.getCurrentCentre();
    const isSuspended = centre.status === 'suspended';

    return `
      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-header">
            <div class="centre-badge-pill">
              <span class="centre-logo">${centre.logo}</span>
              <span class="centre-name">${centre.name}</span>
            </div>
            <h2 class="auth-title">Welcome to Kavirox</h2>
            <p class="auth-subtitle">${centre.shortName} Portal Sign-In</p>
          </div>

          ${isSuspended ? `
            <div class="alert-box alert-danger">
              <strong>⚠️ Centre Subscription Suspended</strong>
              <p>The subscription for this centre has lapsed. Staff access is read-only or temporarily paused. You may still export data or contact Kavirox support.</p>
            </div>
          ` : ''}

          <!-- Role selection tabs -->
          <div class="auth-tabs">
            <button class="auth-tab ${this.currentTab === 'staff' ? 'active' : ''}" onclick="KaviroxAuth.switchTab('staff')">
              👨‍🏫 Staff Login
            </button>
            <button class="auth-tab ${this.currentTab === 'parent' ? 'active' : ''}" onclick="KaviroxAuth.switchTab('parent')">
              👨‍👩‍👦 Parent (OTP)
            </button>
            <button class="auth-tab ${this.currentTab === 'superadmin' ? 'active' : ''}" onclick="KaviroxAuth.switchTab('superadmin')">
              🛡️ Super-Admin
            </button>
          </div>

          <!-- Form Area -->
          <div class="auth-body">
            ${this.renderFormForCurrentTab()}
          </div>

          <!-- Quick Demo Logins for instant evaluation -->
          <div class="quick-demo-logins">
            <div class="demo-heading">
              <span>⚡ Fast Demo Login (1-Click)</span>
            </div>
            <div class="demo-btn-grid">
              <button class="btn btn-outline btn-sm" onclick="KaviroxAuth.quickLogin('owner')">
                👑 Owner (Dr. Rajesh)
              </button>
              <button class="btn btn-outline btn-sm" onclick="KaviroxAuth.quickLogin('accountant')">
                💼 Accountant (Sunil)
              </button>
              <button class="btn btn-outline btn-sm" onclick="KaviroxAuth.quickLogin('teacher')">
                👩‍🏫 Teacher (Pooja)
              </button>
              <button class="btn btn-outline btn-sm" onclick="KaviroxAuth.quickLogin('parent')">
                👨‍👧 Parent (Ramesh)
              </button>
              <button class="btn btn-outline btn-sm" onclick="KaviroxAuth.quickLogin('superadmin')">
                🛡️ Kavirox Super-Admin
              </button>
            </div>
          </div>

          <div class="auth-footer">
            <div class="support-links">
              <span>Need help? <a href="https://wa.me/919999000000" target="_blank" class="link-wa">💬 WhatsApp Support</a></span>
              <span>🔒 256-bit Encrypted Multi-Tenant Session</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderFormForCurrentTab() {
    if (this.currentTab === 'staff') {
      return `
        <form onsubmit="KaviroxAuth.handleStaffSubmit(event)">
          <div class="form-group">
            <label class="form-label">Phone or Email Address</label>
            <input type="text" id="staff-login-input" class="form-control" value="director@apexacademy.edu.in" placeholder="Enter phone or email" required />
          </div>
          <div class="form-group">
            <div class="label-row">
              <label class="form-label">Password</label>
              <a href="javascript:void(0)" onclick="alert('Demo notice: For this demo, password is demo123, or use the 1-Click Fast Demo Login buttons below!')" class="link-forgot">Forgot?</a>
            </div>
            <div class="password-input-wrap">
              <input type="password" id="staff-password-input" class="form-control" value="demo123" placeholder="Enter password" required />
              <button type="button" class="btn-toggle-pw" onclick="KaviroxAuth.togglePwVisibility('staff-password-input')">👁️</button>
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Sign In to Dashboard →</button>
        </form>
      `;
    }

    if (this.currentTab === 'parent') {
      return `
        <div id="parent-otp-container">
          <div class="form-group">
            <label class="form-label">Registered Parent Mobile Number</label>
            <div class="phone-input-group">
              <span class="country-code">+91</span>
              <input type="tel" id="parent-phone-input" class="form-control" value="9810012345" placeholder="10-digit mobile number" maxlength="10" />
            </div>
            <small class="form-hint">Enter the number provided at the time of student admission</small>
          </div>
          
          <div class="otp-box-area" id="otp-entry-section">
            <div class="label-row">
              <label class="form-label">Enter 6-Digit OTP</label>
              <span class="badge badge-success">Demo OTP: ${this.generatedOtp}</span>
            </div>
            <div class="otp-inputs">
              <input type="text" id="otp-input" class="form-control text-center otp-code" maxlength="6" value="${this.generatedOtp}" />
            </div>
            <div class="otp-meta">
              <span id="otp-timer">Resend available in 28s</span>
              <a href="javascript:void(0)" onclick="KaviroxAuth.resendOtp()" class="link-resend">Resend OTP</a>
            </div>
          </div>

          <button type="button" class="btn btn-primary btn-block" onclick="KaviroxAuth.handleParentSubmit()">
            Verify OTP & View Student Portal →
          </button>
        </div>
      `;
    }

    if (this.currentTab === 'superadmin') {
      return `
        <form onsubmit="KaviroxAuth.handleSuperSubmit(event)">
          <div class="alert-box alert-info">
            <strong>🛡️ Kavirox Master Platform Access</strong>
            <p>Super-Admin manages tenant centres, licenses, subscriptions, and system health.</p>
          </div>
          <div class="form-group">
            <label class="form-label">Kavirox Master ID / Email</label>
            <input type="email" id="super-login-input" class="form-control" value="admin@kavirox.space" required />
          </div>
          <div class="form-group">
            <label class="form-label">Master Password</label>
            <input type="password" id="super-password-input" class="form-control" value="kavirox2026" required />
          </div>
          <div class="form-group">
            <label class="form-label">MFA 2-Factor Auth Code</label>
            <input type="text" class="form-control" value="738 291" placeholder="Authenticator 6-digit code" />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Enter Kavirox Super-Admin →</button>
        </form>
      `;
    }
  },

  switchTab(tab) {
    this.currentTab = tab;
    window.kaviroxApp.render();
  },

  togglePwVisibility(inputId) {
    const el = document.getElementById(inputId);
    if (el) {
      el.type = el.type === 'password' ? 'text' : 'password';
    }
  },

  resendOtp() {
    this.generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpInput = document.getElementById('otp-input');
    if (otpInput) otpInput.value = this.generatedOtp;
    window.kaviroxApp.showToast(`New OTP sent: ${this.generatedOtp}`, 'info');
  },

  handleStaffSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('staff-login-input').value.toLowerCase();
    const store = window.kaviroxStore;

    // Detect user role by email/phone or default to owner
    if (input.includes('accounts') || input.includes('verma')) {
      store.setActiveRole('accountant');
    } else if (input.includes('physics') || input.includes('teacher') || input.includes('pooja')) {
      store.setActiveRole('teacher');
    } else {
      store.setActiveRole('owner');
    }

    store.logAudit('LOGIN_SUCCESS', `Staff signed in via email/phone: ${input}`);
    window.kaviroxApp.showToast('Login successful! Redirecting to portal...', 'success');
    window.kaviroxApp.render();
  },

  handleParentSubmit() {
    const phone = document.getElementById('parent-phone-input').value.trim();
    const otp = document.getElementById('otp-input').value.trim();
    const store = window.kaviroxStore;

    if (!phone) {
      window.kaviroxApp.showToast('Please enter registered phone number', 'danger');
      return;
    }

    // Match student with this parent number
    const matchingStudents = store.data.students.filter(s => s.parentPhone === phone || s.parentAltPhone === phone);

    if (matchingStudents.length > 0) {
      store.parentPhone = phone;
      store.activeChildId = matchingStudents[0].id;
      store.setActiveRole('parent');
      store.logAudit('PARENT_LOGIN', `Parent login verified via OTP for student ${matchingStudents[0].name}`, 'Parent Portal', 'parent');
      window.kaviroxApp.showToast(`Welcome! Showing records for ${matchingStudents[0].name}`, 'success');
      window.kaviroxApp.render();
    } else {
      // Default to Aarav Sharma for demo flexibility
      store.parentPhone = "9810012345";
      store.activeChildId = "STU-001";
      store.setActiveRole('parent');
      window.kaviroxApp.showToast(`Logged in as parent for Aarav Sharma (APX-101)`, 'success');
      window.kaviroxApp.render();
    }
  },

  handleSuperSubmit(e) {
    e.preventDefault();
    const store = window.kaviroxStore;
    store.setActiveRole('superadmin');
    store.logAudit('SUPERADMIN_LOGIN', 'Master Super-Admin session initiated', 'Armaan Chaudhary', 'superadmin');
    window.kaviroxApp.showToast('Welcome Kavirox Super-Admin', 'success');
    window.kaviroxApp.render();
  },

  quickLogin(role) {
    const store = window.kaviroxStore;
    if (role === 'parent') {
      store.parentPhone = "9810012345";
      store.activeChildId = "STU-001";
    }
    store.setActiveRole(role);
    window.kaviroxApp.showToast(`Switched into ${role.toUpperCase()} portal`, 'info');
    window.kaviroxApp.render();
  }
};
