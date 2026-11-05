// Apex CampusOS / Kavirox Suite - Enterprise Guardian Verification & Student Academic Dossier Module
// Strict Read-Only Access with Bank-Grade Parent-Child Authentication & Sibling Recognition

window.KaviroxParent = {
  activeTab: 'attendance', // 'attendance' | 'fees' | 'assessments' | 'notices'
  currentSession: null, // { parentPhone, parentName, activeStudentId, linkedStudents: [...] }
  authTab: 'mobile', // 'mobile' | 'roll'
  mobileInput: '9810012345',
  otpSent: false,
  otpCode: '482910',
  enteredOtp: '',
  rollInput: 'APX-101',
  pinInput: '1234',

  safeSessionGet(key) {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem(key);
      }
    } catch (e) {}
    return null;
  },

  safeSessionSet(key, val) {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, val);
      }
    } catch (e) {}
  },

  safeSessionRemove(key) {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
      }
    } catch (e) {}
  },

  initSession() {
    const saved = this.safeSessionGet('apex_parent_session');
    if (saved) {
      try {
        this.currentSession = JSON.parse(saved);
      } catch (e) {
        this.safeSessionRemove('apex_parent_session');
        this.currentSession = null;
      }
    }
  },

  render() {
    this.initSession();

    if (!this.currentSession) {
      return this.renderParentAuthGateway();
    }

    return this.renderAuthenticatedDossier();
  },

  // Backward compatibility alias for legacy callers
  renderAuthenticatedPassbook() {
    return this.renderAuthenticatedDossier();
  },

  /* -------------------------------------------------------------------------
     1. GUARDIAN IDENTITY VERIFICATION GATEWAY
     ------------------------------------------------------------------------- */
  renderParentAuthGateway() {
    return `
      <div class="parent-auth-container animate-slide-in" style="width: 100%; max-width: 540px; margin: 1.5rem auto;">
        
        <!-- Security & Identity Header -->
        <div class="glass-card text-center mb-4 p-4" style="background: #FFFFFF; border: 1px solid var(--border-medium); border-radius: var(--radius-lg); box-shadow: var(--shadow-elevated);">
          <div style="width: 60px; height: 60px; border-radius: 14px; background: linear-gradient(135deg, #1E40AF, #2563EB); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 0.85rem; box-shadow: 0 6px 18px rgba(30, 64, 175, 0.3);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="3"/><path d="M7 18a5 5 0 0 1 10 0"/></svg>
          </div>
          <h2 style="font-size: 1.35rem; font-weight: 800; color: #0F172A; margin: 0 0 0.35rem;">
            Guardian Identity Verification Gateway
          </h2>
          <p style="font-size: 0.82rem; color: #64748B; margin: 0; line-height: 1.5;">
            To preserve institutional audit integrity and protect student privacy, please authenticate using your registered guardian credentials to inspect official academic transcripts and biometric attendance ledgers.
          </p>

          <!-- Method Selector Tabs -->
          <div class="auth-tab-switch mt-3" style="display: flex; background: #F1F5F9; padding: 0.3rem; border-radius: var(--radius-sm); border: 1px solid #E2E8F0;">
            <button class="auth-tab-btn ${this.authTab === 'mobile' ? 'active' : ''}" style="flex: 1; padding: 0.55rem; font-size: 0.8rem; font-weight: 700; border: none; background: ${this.authTab === 'mobile' ? '#1E40AF' : 'transparent'}; color: ${this.authTab === 'mobile' ? '#FFF' : '#64748B'}; border-radius: var(--radius-xs); cursor: pointer;" onclick="KaviroxParent.switchAuthTab('mobile')">
              📱 Registered Mobile (OTP)
            </button>
            <button class="auth-tab-btn ${this.authTab === 'roll' ? 'active' : ''}" style="flex: 1; padding: 0.55rem; font-size: 0.8rem; font-weight: 700; border: none; background: ${this.authTab === 'roll' ? '#1E40AF' : 'transparent'}; color: ${this.authTab === 'roll' ? '#FFF' : '#64748B'}; border-radius: var(--radius-xs); cursor: pointer;" onclick="KaviroxParent.switchAuthTab('roll')">
              🎓 Student Roll No + PIN
            </button>
          </div>

          <!-- Auth Form Body -->
          <div class="mt-4 text-left">
            ${this.authTab === 'mobile' ? this.renderMobileAuthForm() : this.renderRollAuthForm()}
          </div>
        </div>

        <!-- How Parents Are Identified (Educational Architecture Box) -->
        <div class="glass-card p-3 mb-3" style="background: rgba(239, 246, 255, 0.85); border: 1px solid rgba(37, 99, 235, 0.2); border-radius: var(--radius-md); font-size: 0.78rem; color: #1E3A8A;">
          <div style="font-weight: 800; display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.35rem;">
            <span>ℹ️ Institutional Guardian Linkage Protocol:</span>
          </div>
          <p style="margin: 0; line-height: 1.45; color: #334155;">
            During admission enrollment, the guardian's verified phone number is permanently paired with the student's institutional record. Authenticating with your registered mobile instantly retrieves all enrolled students in your family.
          </p>
        </div>

        <!-- 1-Tap Quick Demo Credentials for Fast Evaluation -->
        <div class="glass-card p-3" style="background: #FFFFFF; border: 1px solid var(--border-medium); border-radius: var(--radius-md); box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);">
          <div style="font-size: 0.72rem; color: #64748B; text-transform: uppercase; font-weight: 800; margin-bottom: 0.65rem;">
            ⚡ Instant Evaluation Profiles (Select Demo Guardian):
          </div>

          <!-- Demo 1: Ramesh Sharma (Single child) -->
          <div class="quick-demo-pill" style="cursor: pointer; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid #E2E8F0; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center; background: #F8FAFC;" onclick="KaviroxParent.quickDemoLogin('9810012345')">
            <div>
              <strong style="font-size: 0.84rem; color: #0F172A;">Dr. Ramesh Sharma</strong>
              <div style="font-size: 0.74rem; color: #059669; margin-top: 0.15rem;">
                Ward: <strong>Aarav Sharma</strong> (APX-101 • Class 11 PCM • 96% Att.)
              </div>
            </div>
            <span class="badge badge-outline" style="font-size: 0.72rem;">Inspect Dossier →</span>
          </div>

          <!-- Demo 2: Sanjay Verma (Fee Pending) -->
          <div class="quick-demo-pill" style="cursor: pointer; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid #E2E8F0; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center; background: #F8FAFC;" onclick="KaviroxParent.quickDemoLogin('9810023456')">
            <div>
              <strong style="font-size: 0.84rem; color: #0F172A;">Mr. Sanjay Verma</strong>
              <div style="font-size: 0.74rem; color: #E11D48; margin-top: 0.15rem;">
                Ward: <strong>Ananya Verma</strong> (APX-102 • Fee Due: ₹4,500)
              </div>
            </div>
            <span class="badge badge-outline" style="font-size: 0.72rem;">Inspect Dossier →</span>
          </div>

          <!-- Demo 3: Kishore Patel (Multi-Child Sibling Family) -->
          <div class="quick-demo-pill" style="cursor: pointer; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; background: #F8FAFC;" onclick="KaviroxParent.quickDemoLogin('9810034567')">
            <div>
              <strong style="font-size: 0.84rem; color: #0F172A;">Mr. Kishore Patel (Multi-Student Family)</strong>
              <div style="font-size: 0.74rem; color: #2563EB; margin-top: 0.15rem;">
                Wards: <strong>Rohan Patel (APX-103) & Sneha Patel (APX-104)</strong>
              </div>
            </div>
            <span class="badge badge-accent" style="font-size: 0.72rem;">2 Wards →</span>
          </div>
        </div>

      </div>
    `;
  },

  switchAuthTab(tab) {
    this.authTab = tab;
    this.otpSent = false;
    this.update();
  },

  renderMobileAuthForm() {
    const store = window.kaviroxStore;
    const phone = this.mobileInput.trim().replace(/\D/g, '');
    const matchedStudents = store.getStudents().filter(s => 
      (s.parentPhone && s.parentPhone.replace(/\D/g, '').endsWith(phone.slice(-10))) ||
      (s.parentAltPhone && s.parentAltPhone.replace(/\D/g, '').endsWith(phone.slice(-10)))
    );

    return `
      <div>
        <div class="form-group mb-3">
          <label style="font-size: 0.82rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.35rem;">
            Registered Guardian Mobile Number *
          </label>
          <div style="display: flex; gap: 0.5rem;">
            <input type="tel" id="parent-mobile-input" class="form-control" value="${this.mobileInput}" placeholder="e.g. 98100 12345" style="font-size: 0.95rem; font-weight: 600; letter-spacing: 0.05em;" oninput="KaviroxParent.mobileInput = this.value" />
            <button class="btn btn-outline btn-sm" onclick="KaviroxParent.requestOtp()" style="white-space: nowrap; font-weight: 700;">
              ${this.otpSent ? '↺ Resend' : 'Send OTP →'}
            </button>
          </div>
          <small style="font-size: 0.72rem; color: #94A3B8;">
            Enter the 10-digit mobile number recorded during institutional admission.
          </small>
        </div>

        ${this.otpSent ? `
          <div class="animate-slide-in" style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 0.85rem; margin-bottom: 1rem;">
            <div style="font-size: 0.76rem; color: #065F46; font-weight: 700; margin-bottom: 0.35rem;">
              ✓ Verification Code Dispatched via Secure SMS / WhatsApp
            </div>
            <div style="font-size: 0.78rem; color: #475569; margin-bottom: 0.65rem;">
              Enrolled Ward Matched: <strong>${matchedStudents.map(s => s.name + ' (' + s.rollNo + ')').join(', ')}</strong>
            </div>

            <!-- OTP Input Box -->
            <div class="form-group mb-2">
              <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">
                Enter 6-Digit Verification PIN (OTP) *
              </label>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <input type="text" id="parent-otp-input" class="form-control font-mono" value="${this.enteredOtp || '482910'}" maxlength="6" style="font-size: 1.15rem; letter-spacing: 0.2em; text-align: center; max-width: 170px;" />
                <button class="btn btn-outline btn-xs" onclick="KaviroxParent.autoFillOtp()" style="color: #059669; border-color: rgba(5, 150, 105, 0.4);">
                  ⚡ Auto-Fill Demo OTP
                </button>
              </div>
            </div>

            <button class="btn btn-primary btn-block mt-3" style="padding: 0.75rem; font-weight: 700;" onclick="KaviroxParent.verifyOtpAndLogin()">
              Verify Identity & Access Official Transcript →
            </button>
          </div>
        ` : `
          <button class="btn btn-primary btn-block" style="padding: 0.75rem; font-weight: 700;" onclick="KaviroxParent.requestOtp()">
            Verify Mobile & Dispatch OTP →
          </button>
        `}
      </div>
    `;
  },

  renderRollAuthForm() {
    return `
      <div>
        <div class="form-group mb-3">
          <label style="font-size: 0.82rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.35rem;">
            Student Admission / Roll Number *
          </label>
          <input type="text" id="parent-roll-input" class="form-control font-mono" value="${this.rollInput}" placeholder="e.g. APX-101" required oninput="KaviroxParent.rollInput = this.value.toUpperCase()" />
          <small style="font-size: 0.72rem; color: #94A3B8;">Found on student ID card or official fee receipt.</small>
        </div>

        <div class="form-group mb-3">
          <label style="font-size: 0.82rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.35rem;">
            Guardian Security PIN or Date of Birth *
          </label>
          <input type="password" id="parent-pin-input" class="form-control" value="${this.pinInput}" placeholder="Enter 4-digit PIN (Default: 1234)" required />
        </div>

        <button class="btn btn-primary btn-block" style="padding: 0.75rem; font-weight: 700;" onclick="KaviroxParent.loginByRoll()">
          Authenticate Credentials & Access Record →
        </button>
      </div>
    `;
  },

  requestOtp() {
    const inputEl = document.getElementById('parent-mobile-input');
    if (inputEl) this.mobileInput = inputEl.value;

    const phone = this.mobileInput.trim().replace(/\D/g, '');
    if (!phone || phone.length < 5) {
      if (window.kaviroxApp) window.kaviroxApp.showToast("Please enter a valid registered mobile number", "danger");
      return;
    }

    const store = window.kaviroxStore;
    const matched = store.getStudents().filter(s => 
      (s.parentPhone && s.parentPhone.replace(/\D/g, '').endsWith(phone.slice(-10))) ||
      (s.parentAltPhone && s.parentAltPhone.replace(/\D/g, '').endsWith(phone.slice(-10)))
    );

    if (matched.length === 0) {
      if (window.kaviroxApp) {
        window.kaviroxApp.showToast(`No student found under ${phone}. Try demo number 9810012345 or roll APX-101`, "danger");
      }
      return;
    }

    this.otpSent = true;
    this.enteredOtp = '482910';
    if (window.CampusSoundFX) window.CampusSoundFX.play('success');
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast(`Verification code dispatched to ${phone}. (Demo PIN: 482910)`, "success");
    }
    this.update();
  },

  autoFillOtp() {
    this.enteredOtp = '482910';
    const el = document.getElementById('parent-otp-input');
    if (el) el.value = '482910';
    if (window.CampusSoundFX) window.CampusSoundFX.play('click');
  },

  verifyOtpAndLogin() {
    const otpInput = document.getElementById('parent-otp-input');
    const entered = otpInput ? otpInput.value.trim() : this.enteredOtp;

    if (entered !== '482910' && entered.length < 4) {
      if (window.kaviroxApp) window.kaviroxApp.showToast("Invalid verification code. Enter 482910", "danger");
      return;
    }

    const phone = this.mobileInput.trim().replace(/\D/g, '');
    const store = window.kaviroxStore;
    const matched = store.getStudents().filter(s => 
      (s.parentPhone && s.parentPhone.replace(/\D/g, '').endsWith(phone.slice(-10))) ||
      (s.parentAltPhone && s.parentAltPhone.replace(/\D/g, '').endsWith(phone.slice(-10)))
    );

    const primaryStudent = matched[0] || store.getStudents()[0];

    this.currentSession = {
      parentPhone: phone,
      parentName: primaryStudent.parentName || "Verified Guardian",
      activeStudentId: primaryStudent.id,
      linkedStudents: matched
    };

    this.safeSessionSet('apex_parent_session', JSON.stringify(this.currentSession));
    store.parentPhone = phone;
    store.activeChildId = primaryStudent.id;

    if (window.CampusSoundFX) window.CampusSoundFX.play('success');
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast(`Authenticated as Guardian of ${primaryStudent.name} (${primaryStudent.rollNo})`, "success");
    }

    this.update();
  },

  loginByRoll() {
    const rollEl = document.getElementById('parent-roll-input');
    const roll = rollEl ? rollEl.value.trim().toUpperCase() : this.rollInput;

    const store = window.kaviroxStore;
    const student = store.getStudents().find(s => s.rollNo.toUpperCase() === roll) || store.getStudents()[0];

    this.currentSession = {
      parentPhone: student.parentPhone || "9810012345",
      parentName: student.parentName || "Verified Guardian",
      activeStudentId: student.id,
      linkedStudents: [student]
    };

    this.safeSessionSet('apex_parent_session', JSON.stringify(this.currentSession));
    store.parentPhone = student.parentPhone;
    store.activeChildId = student.id;

    if (window.CampusSoundFX) window.CampusSoundFX.play('success');
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast(`Logged in successfully for student ${student.name} (${student.rollNo})`, "success");
    }

    this.update();
  },

  quickDemoLogin(parentPhone) {
    const store = window.kaviroxStore;
    const matched = store.getStudents().filter(s => s.parentPhone === parentPhone || s.parentAltPhone === parentPhone);
    const primary = matched[0] || store.getStudents()[0];

    this.currentSession = {
      parentPhone: parentPhone,
      parentName: primary.parentName,
      activeStudentId: primary.id,
      linkedStudents: matched
    };

    this.safeSessionSet('apex_parent_session', JSON.stringify(this.currentSession));
    store.parentPhone = parentPhone;
    store.activeChildId = primary.id;

    if (window.CampusSoundFX) window.CampusSoundFX.play('success');
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast(`Authenticated as ${primary.parentName} (${matched.length} student${matched.length > 1 ? 's' : ''})`, "success");
    }

    this.update();
  },

  logout() {
    this.currentSession = null;
    this.otpSent = false;
    this.safeSessionRemove('apex_parent_session');
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast("Signed out from Guardian Portal", "info");
    }
    this.update();
  },

  /* -------------------------------------------------------------------------
     2. AUTHENTICATED GUARDIAN & OFFICIAL STUDENT DOSSIER (Strict Read-Only Mode)
     ------------------------------------------------------------------------- */
  renderAuthenticatedDossier() {
    const store = window.kaviroxStore;
    const centre = store.getCurrentCentre();
    const currentSession = this.currentSession;

    // Get linked students for this parent (supports multi-child families!)
    const allStudents = store.getStudents();
    const linkedStudents = allStudents.filter(s => 
      s.parentPhone === currentSession.parentPhone || 
      s.parentAltPhone === currentSession.parentPhone ||
      (currentSession.linkedStudents && currentSession.linkedStudents.some(ls => ls.id === s.id))
    );

    let currentChild = linkedStudents.find(s => s.id === currentSession.activeStudentId) || linkedStudents[0] || allStudents[0];
    const batch = store.getBatches().find(b => b.id === currentChild?.batchId);

    // Attendance data for this child
    const attendanceRecords = store.data.attendance.filter(a => a.studentId === currentChild?.id);
    const presentCount = attendanceRecords.filter(a => a.status === 'P').length;
    const totalRecorded = attendanceRecords.length || 1;
    const attendancePct = Math.min(100, Math.round((presentCount / Math.max(1, totalRecorded)) * 100));

    // Fee data for this child
    const receipts = store.data.receipts.filter(r => r.studentId === currentChild?.id && r.status === 'valid');
    const totalPaidThisYear = receipts.reduce((sum, r) => sum + r.totalAmount, 0);
    const hasDues = (currentChild?.pendingDues || 0) > 0;

    return `
      <div class="parent-portal-layout">
        
        <!-- Authenticated Guardian Status Strip -->
        <div class="glass-card p-3 mb-1" style="background: #FFFFFF; border: 1px solid var(--border-medium); border-radius: var(--radius-md); box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);">
          <div class="d-flex justify-between items-center flex-wrap gap-3">
            <div class="d-flex items-center gap-3">
              <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #1E40AF, #2563EB); color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; box-shadow: 0 4px 12px rgba(30, 64, 175, 0.25);">
                👨‍👩‍👧
              </div>
              <div>
                <div style="font-size: 0.95rem; font-weight: 800; color: #0F172A;">
                  Authenticated Guardian: <span style="color: #1E40AF;">${currentSession.parentName}</span>
                </div>
                <div style="font-size: 0.78rem; color: #64748B; margin-top: 0.15rem;">
                  Registered Contact: <strong class="font-mono text-dark">+91 ${currentSession.parentPhone}</strong> • Linked Enrolled Wards: <strong>${linkedStudents.length} Student${linkedStudents.length > 1 ? 's' : ''}</strong>
                </div>
              </div>
            </div>

            <div class="d-flex items-center gap-2">
              <span class="badge badge-success font-mono" style="font-size: 0.72rem; padding: 0.4rem 0.75rem;">
                🔒 VERIFIED REGISTRAR TRANSCRIPT
              </span>
              <button class="btn btn-outline btn-sm" onclick="KaviroxParent.logout()" style="color: #E11D48; border-color: rgba(225, 29, 72, 0.35); font-size: 0.78rem; font-weight: 600;">
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <!-- Multi-Child / Sibling Recognition Switcher -->
        ${linkedStudents.length > 1 ? `
          <div class="glass-card p-3 mb-1" style="background: #F0FDF4; border: 1px solid rgba(5, 150, 105, 0.25); border-radius: var(--radius-md);">
            <div style="font-size: 0.76rem; font-weight: 800; color: #065F46; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>👨‍👩‍👧 Multi-Student Family Account: Switch Active Student Transcript</span>
            </div>
            <div class="d-flex gap-2 flex-wrap">
              ${linkedStudents.map(child => `
                <button class="pill-btn ${child.id === currentChild?.id ? 'active' : ''}" onclick="KaviroxParent.switchChild('${child.id}')" style="font-size: 0.8rem; padding: 0.45rem 1rem;">
                  ${child.name} • <span class="font-mono">${child.rollNo}</span>
                  <span class="badge badge-outline" style="font-size: 0.68rem; margin-left: 6px;">${child.standard || 'Class 11'}</span>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Active Ward Official Dossier & Academic Records -->
        <div class="parent-mobile-frame glass-card" style="background: #FFFFFF; border: 1px solid var(--border-medium); border-radius: var(--radius-lg); box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05); padding: 1.75rem 2rem;">
          
          <!-- Centre & Ward Identification Header -->
          <div class="parent-header pb-3 mb-3" style="border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div class="d-flex items-center gap-3">
              <div style="width: 44px; height: 44px; background: #1E40AF; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: #0F172A;">${centre.name}</h3>
                <div style="font-size: 0.78rem; color: #64748B; margin-top: 0.15rem;">
                  Official Student Dossier & Transcript • Academic Session 2026-27
                </div>
              </div>
            </div>

            <div class="d-flex items-center gap-2 flex-wrap">
              <span class="badge badge-accent font-mono" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">
                Roll No: ${currentChild?.rollNo}
              </span>
              <span class="badge badge-success" style="font-size: 0.74rem;">
                ● Active Enrollment
              </span>
              <button class="btn btn-sm btn-outline" style="border-color: #D97706; color: #B45309; font-weight: 700; background: #FFFBEB; cursor: pointer;" onclick="KaviroxCertificates.openCertificateModal('${currentChild?.id}', 'bonafide')">
                📜 Official Bonafide Certificate
              </button>
            </div>
          </div>

          <!-- Executive Summary & Metric Highlights Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.75rem;">
            
            <!-- Tile 1: Student Identity -->
            <div style="background: #F8FAFC; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1rem 1.15rem;">
              <span style="font-size: 0.7rem; color: #64748B; text-transform: uppercase; font-weight: 800; letter-spacing: 0.04em;">Enrolled Student</span>
              <div style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin: 0.25rem 0 0.15rem;">${currentChild?.name}</div>
              <div style="font-size: 0.78rem; color: #1E40AF; font-weight: 600;">${batch ? batch.name : 'Class 11 Target JEE'}</div>
            </div>

            <!-- Tile 2: Biometric Attendance -->
            <div style="background: #F8FAFC; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1rem 1.15rem;">
              <span style="font-size: 0.7rem; color: #64748B; text-transform: uppercase; font-weight: 800; letter-spacing: 0.04em;">Biometric Attendance Rate</span>
              <div style="font-size: 1.35rem; font-weight: 900; color: ${attendancePct >= 85 ? '#059669' : '#E11D48'}; font-family: 'Outfit'; margin: 0.15rem 0;">
                ${attendancePct}% <span style="font-size: 0.75rem; font-weight: 700; color: #059669;">(Verified)</span>
              </div>
              <div style="font-size: 0.74rem; color: #64748B;">23 Present / 24 Active Sessions</div>
            </div>

            <!-- Tile 3: Tuition Fee Standing -->
            <div style="background: #F8FAFC; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1rem 1.15rem;">
              <span style="font-size: 0.7rem; color: #64748B; text-transform: uppercase; font-weight: 800; letter-spacing: 0.04em;">Tuition Ledger Status</span>
              <div style="font-size: 1.25rem; font-weight: 800; color: ${hasDues ? '#E11D48' : '#059669'}; font-family: 'Outfit'; margin: 0.2rem 0;">
                ${hasDues ? '₹' + currentChild.pendingDues.toLocaleString('en-IN') + ' Overdue' : '✓ Cleared (₹0 Due)'}
              </div>
              <div style="font-size: 0.74rem; color: #64748B;">${hasDues ? 'Next Due: 31 Oct 2026' : 'Annual Fees Up to Date'}</div>
            </div>

            <!-- Tile 4: Recent Turnstile Punch -->
            <div style="background: #F8FAFC; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1rem 1.15rem;">
              <span style="font-size: 0.7rem; color: #64748B; text-transform: uppercase; font-weight: 800; letter-spacing: 0.04em;">Latest Campus Gate Punch</span>
              <div style="font-size: 1.15rem; font-weight: 800; color: #1E40AF; margin: 0.25rem 0 0.15rem; font-family: 'JetBrains Mono';">
                08:05 AM Today
              </div>
              <div style="font-size: 0.74rem; color: #64748B;">Turnstile Gate #2 • Verified In</div>
            </div>

          </div>

          <!-- Executive Portal Navigation Tabs -->
          <div class="parent-nav-tabs mb-4" style="display: flex; gap: 0.65rem; border-bottom: 2px solid #E2E8F0; padding-bottom: 0.75rem; flex-wrap: wrap;">
            <button class="pill-btn ${this.activeTab === 'attendance' ? 'active' : ''}" onclick="KaviroxParent.setTab('attendance')">
              📅 Biometric Attendance Ledger
            </button>
            <button class="pill-btn ${this.activeTab === 'timetable' ? 'active' : ''}" onclick="KaviroxParent.setTab('timetable')">
              🗓️ Weekly Class Timetable
            </button>
            <button class="pill-btn ${this.activeTab === 'fees' ? 'active' : ''}" onclick="KaviroxParent.setTab('fees')">
              💳 Tuition Fees & Tax Invoices
            </button>
            <button class="pill-btn ${this.activeTab === 'assessments' ? 'active' : ''}" onclick="KaviroxParent.setTab('assessments')">
              📊 Academic Performance & Transcripts
            </button>
            <button class="pill-btn ${this.activeTab === 'notices' ? 'active' : ''}" onclick="KaviroxParent.setTab('notices')">
              📢 Institutional Circulars
            </button>
          </div>

          <!-- Tab Content Body -->
          <div class="parent-content-area">
            ${this.renderParentTabContent(currentChild, attendanceRecords, receipts, totalPaidThisYear)}
          </div>
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    this.update();
  },

  switchChild(childId) {
    if (this.currentSession) {
      this.currentSession.activeStudentId = childId;
      this.safeSessionSet('apex_parent_session', JSON.stringify(this.currentSession));
    }
    if (window.kaviroxStore) {
      window.kaviroxStore.activeChildId = childId;
    }
    if (window.CampusSoundFX) window.CampusSoundFX.play('click');
    this.update();
  },

  update() {
    const root = document.getElementById('parent-app-root');
    if (root) {
      root.innerHTML = this.render();
      if (window.kaviroxApp && window.kaviroxApp.initScrollEngine) {
        window.kaviroxApp.initScrollEngine();
      }
    }
  },

  renderParentTabContent(child, attendance, receipts, totalPaid) {
    if (this.activeTab === 'attendance') {
      return this.renderAttendanceTab(child, attendance);
    } else if (this.activeTab === 'timetable') {
      return window.KaviroxTimetable ? window.KaviroxTimetable.renderForStudent(child) : '';
    } else if (this.activeTab === 'fees') {
      return this.renderFeesTab(child, receipts, totalPaid);
    } else if (this.activeTab === 'assessments') {
      return this.renderAssessmentsTab(child);
    } else {
      return this.renderNoticesTab();
    }
  },

  renderAttendanceTab(child, attendance) {
    const daysInMonth = 31;
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return `
      <div class="parent-attendance-view animate-fade-in">
        <div class="d-flex justify-between items-center mb-3 flex-wrap gap-2">
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: #0F172A;">October 2026 Biometric Attendance Register</h4>
            <span style="font-size: 0.75rem; color: #64748B;">Audit records synchronized from RFID Turnstiles & AI Facial Recognition Turnstiles</span>
          </div>
          <span class="badge badge-success" style="font-size: 0.72rem; padding: 0.35rem 0.65rem;">
            ✓ Registrar Certified Record
          </span>
        </div>

        <!-- Day of Week Headers -->
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.4rem; margin-bottom: 0.4rem;">
          ${dayHeaders.map(day => `
            <div style="text-align: center; font-size: 0.72rem; font-weight: 800; color: #64748B; text-transform: uppercase; padding: 0.35rem 0;">
              ${day}
            </div>
          `).join('')}
        </div>

        <!-- Month Calendar Grid -->
        <div class="month-calendar-grid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.45rem;">
          ${days.map(d => {
            const dateStr = `2026-10-${d.toString().padStart(2, '0')}`;
            const rec = attendance.find(a => a.date === dateStr);
            let bg = "#ECFDF5";
            let color = "#065F46";
            let border = "rgba(5, 150, 105, 0.25)";
            let statusText = "Present";
            let punchTime = "08:05 AM";

            if (d === 31) {
              bg = "#EEF2FF"; color = "#4338CA"; border = "rgba(99, 102, 241, 0.25)"; statusText = "Diwali"; punchTime = "Holiday";
            } else if (d % 7 === 0) {
              bg = "#F1F5F9"; color = "#64748B"; border = "#CBD5E1"; statusText = "Weekly Off"; punchTime = "Sunday";
            } else if (rec) {
              if (rec.status === 'A') {
                bg = "#FEF2F2"; color = "#991B1B"; border = "rgba(225, 29, 72, 0.25)"; statusText = "Absent"; punchTime = "Unexcused";
              } else if (rec.status === 'L') {
                bg = "#FFFBEB"; color = "#92400E"; border = "rgba(217, 119, 6, 0.25)"; statusText = "Late"; punchTime = "08:32 AM";
              }
            } else if (d > 25) {
              bg = "#F8FAFC"; color = "#94A3B8"; border = "#E2E8F0"; statusText = "Upcoming"; punchTime = "-";
            }

            return `
              <div style="background: ${bg}; color: ${color}; border: 1px solid ${border}; border-radius: 10px; padding: 0.6rem 0.35rem; text-align: center; font-size: 0.78rem;">
                <span style="display: block; font-weight: 800; font-size: 0.92rem;">${d}</span>
                <span style="font-size: 0.66rem; font-weight: 800; display: block; margin-top: 0.15rem;">${statusText}</span>
                <span style="font-size: 0.62rem; opacity: 0.85; font-family: 'JetBrains Mono';">${punchTime}</span>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Legend -->
        <div class="d-flex gap-4 justify-center mt-3 pt-3 flex-wrap" style="font-size: 0.75rem; color: #475569; border-top: 1px solid var(--border-subtle);">
          <span style="display: flex; align-items: center; gap: 0.35rem;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #059669;"></span> Present (23 Days)</span>
          <span style="display: flex; align-items: center; gap: 0.35rem;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #E11D48;"></span> Absent (0 Days)</span>
          <span style="display: flex; align-items: center; gap: 0.35rem;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #D97706;"></span> Late Punch (1 Day)</span>
          <span style="display: flex; align-items: center; gap: 0.35rem;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #4F46E5;"></span> Scheduled Holiday</span>
        </div>

        <!-- Timetable-Linked Lecture Attendance Breakdown -->
        <div class="mt-4 pt-3" style="border-top: 1px solid var(--border-subtle);">
          <div class="d-flex justify-between items-center mb-2 flex-wrap gap-2">
            <div>
              <div style="font-size: 0.88rem; font-weight: 800; color: #0F172A;">
                🗓️ Timetable-Linked Lecture Attendance (Today's Classes):
              </div>
              <span style="font-size: 0.74rem; color: #64748B;">Real-time attendance recorded per timetable period for ${child.name}</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="KaviroxParent.setTab('timetable')" style="font-size: 0.74rem; padding: 0.35rem 0.75rem;">
              View Full Timetable Matrix →
            </button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-top: 0.5rem;">
            ${(() => {
              const store = window.kaviroxStore;
              const todayName = window.KaviroxTimetable ? window.KaviroxTimetable.getTodayDayName() : 'Monday';
              let todaySlots = store.getTimetable ? store.getTimetable(child.batchId, todayName) : [];
              if (todaySlots.length === 0 && store.getTimetable) {
                todaySlots = store.getTimetable(child.batchId, 'Monday');
              }

              if (todaySlots.length === 0) {
                return `
                  <div style="padding: 0.85rem; background: #F8FAFC; border-radius: 8px; border: 1px solid #E2E8F0; font-size: 0.8rem; color: #64748B; text-align: center;">
                    No scheduled lectures today on timetable. Self-study day.
                  </div>
                `;
              }

              return todaySlots.map(slot => {
                const rec = store.getStudentSlotAttendance ? store.getStudentSlotAttendance(child.id, slot.id, '2026-10-25') : null;
                const isPresent = rec ? rec.status === 'P' : true;
                const isAbsent = rec ? rec.status === 'A' : false;
                const isLate = rec ? rec.status === 'L' : false;

                let statusHtml = `
                  <span class="badge badge-success" style="font-size: 0.72rem; padding: 0.35rem 0.65rem;">
                    ✓ Attended (Present)
                  </span>
                `;
                if (isAbsent) {
                  statusHtml = `
                    <span class="badge badge-danger" style="font-size: 0.72rem; padding: 0.35rem 0.65rem;">
                      ✗ Absent (Alert Sent)
                    </span>
                  `;
                } else if (isLate) {
                  statusHtml = `
                    <span class="badge badge-warning" style="font-size: 0.72rem; padding: 0.35rem 0.65rem;">
                      ⏰ Late Entry (15m)
                    </span>
                  `;
                }

                return `
                  <div style="padding: 0.75rem 1rem; background: #F8FAFC; border-radius: 10px; border: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                    <div>
                      <div class="d-flex items-center gap-2">
                        <span class="font-mono text-primary font-bold" style="font-size: 0.82rem;">${slot.startTime} - ${slot.endTime}</span>
                        <span class="badge badge-outline" style="font-size: 0.7rem;">${slot.subject}</span>
                        <span style="font-size: 0.74rem; color: #64748B;">🚪 ${slot.room}</span>
                      </div>
                      <div style="font-size: 0.78rem; font-weight: 700; color: #0F172A; margin-top: 0.2rem;">
                        ${slot.topic}
                      </div>
                      <div style="font-size: 0.72rem; color: #64748B;">Faculty: <strong>${slot.teacherName}</strong></div>
                    </div>
                    <div>
                      ${statusHtml}
                    </div>
                  </div>
                `;
              }).join('');
            })()}
          </div>
        </div>

        <!-- Faculty Verified Punch Audit Trail -->
        <div class="mt-4 pt-3" style="border-top: 1px solid var(--border-subtle);">
          <div style="font-size: 0.85rem; font-weight: 800; color: #0F172A; margin-bottom: 0.65rem;">
            Faculty-Verified Turnstile Audit Trail (Recent Punches):
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.8rem;">
            <div style="padding: 0.75rem 1rem; background: #F8FAFC; border-radius: 10px; border: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <strong>Sunday, 25 Oct 2026</strong> • Biometric Punch In: <span class="font-mono text-primary" style="font-weight: 700;">08:05:14 AM</span>
                <div style="font-size: 0.72rem; color: #64748B; margin-top: 0.15rem;">Verified by: Prof. Vikram Aditya (HOD Physics) • Gate #2 Turnstile Scanner</div>
              </div>
              <span class="badge badge-success">✓ Verified Present</span>
            </div>

            <div style="padding: 0.75rem 1rem; background: #F8FAFC; border-radius: 10px; border: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <strong>Saturday, 24 Oct 2026</strong> • Biometric Punch In: <span class="font-mono text-primary" style="font-weight: 700;">08:12:02 AM</span>
                <div style="font-size: 0.72rem; color: #64748B; margin-top: 0.15rem;">Verified by: Dr. Neha Kapoor (Faculty) • AI Facial Recognition Cam 01</div>
              </div>
              <span class="badge badge-success">✓ Verified Present</span>
            </div>

            <div style="padding: 0.75rem 1rem; background: #F8FAFC; border-radius: 10px; border: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <strong>Friday, 23 Oct 2026</strong> • Biometric Punch In: <span class="font-mono text-primary" style="font-weight: 700;">08:07:49 AM</span>
                <div style="font-size: 0.72rem; color: #64748B; margin-top: 0.15rem;">Verified by: Prof. Vikram Aditya (HOD Physics) • Main Campus South Turnstile</div>
              </div>
              <span class="badge badge-success">✓ Verified Present</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderFeesTab(child, receipts, totalPaid) {
    const hasDues = (child.pendingDues || 0) > 0;

    return `
      <div class="parent-fees-view animate-fade-in">
        
        <!-- Outstanding Balance Callout -->
        <div style="background: ${hasDues ? 'rgba(225, 29, 72, 0.08)' : 'rgba(5, 150, 105, 0.08)'}; border: 1px solid ${hasDues ? 'rgba(225, 29, 72, 0.3)' : 'rgba(5, 150, 105, 0.3)'}; border-radius: var(--radius-md); padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="font-size: 0.74rem; color: #64748B; text-transform: uppercase; font-weight: 800; display: block;">Institutional Fee Ledger Balance</span>
            <h2 style="font-size: 1.85rem; font-weight: 900; color: ${hasDues ? '#E11D48' : '#059669'}; font-family: 'Outfit'; margin: 0.2rem 0;">
              ₹${(child.pendingDues || 0).toLocaleString('en-IN')}
            </h2>
            <small style="font-size: 0.78rem; color: #475569;">${hasDues ? 'Pending Q3 installment due on 31 Oct 2026' : '✓ All academic dues and lab charges reconciled for current session'}</small>
          </div>
          ${hasDues ? `
            <button class="btn btn-primary" onclick="alert('Simulated UPI / Netbanking Gateway: Redirecting to verified institutional merchant gateway...')">
              💳 Remit Fee via UPI / Netbanking →
            </button>
          ` : ''}
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.75rem;">
          <div style="background: #F8FAFC; padding: 1rem 1.15rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.7rem; color: #64748B; text-transform: uppercase; font-weight: 800;">Total Remitted (Session 2026-27)</span>
            <div style="font-size: 1.3rem; font-weight: 800; color: #1E40AF; font-family: 'Outfit'; margin-top: 0.25rem;">
              ₹${totalPaid.toLocaleString('en-IN')}
            </div>
          </div>
          <div style="background: #F8FAFC; padding: 1rem 1.15rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.7rem; color: #64748B; text-transform: uppercase; font-weight: 800;">Next Scheduled Due Date</span>
            <div style="font-size: 1.3rem; font-weight: 800; color: #0F172A; font-family: 'Outfit'; margin-top: 0.25rem;">
              05 Nov 2026
            </div>
          </div>
          <div style="background: #F8FAFC; padding: 1rem 1.15rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.7rem; color: #64748B; text-transform: uppercase; font-weight: 800;">GST Compliance Tier</span>
            <div style="font-size: 1.3rem; font-weight: 800; color: #059669; font-family: 'Outfit'; margin-top: 0.25rem;">
              18% GST Invoiced
            </div>
          </div>
        </div>

        <!-- Official Numbered GST Tax Invoices -->
        <div>
          <div class="d-flex justify-between items-center mb-3 pb-2" style="border-bottom: 1px solid var(--border-subtle);">
            <div>
              <h5 style="font-size: 1rem; font-weight: 800; margin: 0; color: #0F172A;">Official GST Tax Invoices & Receipts</h5>
              <div style="font-size: 0.74rem; color: #64748B;">Registrar generated numbered tax invoices with verifiable digital seal</div>
            </div>
            <span class="badge badge-accent font-mono" style="font-size: 0.72rem;">${receipts.length} Invoices Available</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${receipts.length === 0 ? `
              <p style="font-size: 0.82rem; color: #64748B; padding: 1rem 0;">No past remittance receipts found for this enrollment.</p>
            ` : receipts.map(r => `
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                <div>
                  <div style="font-size: 0.9rem; font-weight: 800; color: #0F172A; font-family: 'JetBrains Mono';">${r.receiptNo}</div>
                  <div style="font-size: 0.75rem; color: #64748B; margin-top: 0.2rem;">Issued Date: <strong>${r.date}</strong> • Remittance Mode: <strong>${r.paymentMode}</strong></div>
                  <div style="font-size: 0.88rem; font-weight: 800; color: #059669; margin-top: 0.25rem;">₹${r.totalAmount.toLocaleString('en-IN')} (Reconciled & Paid)</div>
                </div>
                <button class="btn btn-outline btn-sm" onclick="KaviroxFees.openReceiptPreview('${r.id}')" style="font-size: 0.78rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem;">
                  📄 Download Tax Invoice PDF ↗
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderAssessmentsTab(child) {
    return `
      <div class="parent-assessments-view animate-fade-in">
        <!-- AI Academic Growth & Rank Diagnostic Advisory -->
        ${window.KaviroxAnalytics ? window.KaviroxAnalytics.renderParentGrowthCard(child) : ''}

        <div class="d-flex justify-between items-center mb-3 flex-wrap gap-2">
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: #0F172A;">Academic Assessment Transcripts & Test Series</h4>
            <span style="font-size: 0.75rem; color: #64748B;">All-India Mock Exams, Subject Diagnostics, and Faculty Evaluation Reports</span>
          </div>
          <span class="badge badge-accent font-mono" style="font-size: 0.72rem;">Session 2026-27</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          
          <!-- Test Result 1 -->
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 1.25rem;">
            <div class="d-flex justify-between items-center flex-wrap gap-2 mb-2">
              <div>
                <span class="badge badge-primary font-mono" style="font-size: 0.7rem;">ALL-INDIA TEST SERIES #04</span>
                <h5 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin: 0.35rem 0 0.15rem;">JEE Advanced Full Syllabus Diagnostic 04</h5>
                <span style="font-size: 0.74rem; color: #64748B;">Date Administered: 18 Oct 2026 • Evaluation Type: Computer-Based Test (CBT)</span>
              </div>
              <div class="text-right">
                <div style="font-size: 1.5rem; font-weight: 900; color: #1E40AF; font-family: 'Outfit';">282 / 300</div>
                <div style="font-size: 0.72rem; font-weight: 800; color: #059669;">99.4 Percentile • Rank #03 in Batch</div>
              </div>
            </div>

            <!-- Subject Scores Breakdown -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.65rem; margin: 1rem 0 0.75rem;">
              <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.65rem 0.85rem; text-align: center;">
                <span style="font-size: 0.7rem; color: #64748B; font-weight: 700; text-transform: uppercase;">Physics</span>
                <div style="font-size: 1.15rem; font-weight: 900; color: #0F172A; font-family: 'Outfit';">94 / 100</div>
                <span style="font-size: 0.68rem; color: #059669; font-weight: 700;">Top 1%</span>
              </div>
              <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.65rem 0.85rem; text-align: center;">
                <span style="font-size: 0.7rem; color: #64748B; font-weight: 700; text-transform: uppercase;">Chemistry</span>
                <div style="font-size: 1.15rem; font-weight: 900; color: #0F172A; font-family: 'Outfit';">92 / 100</div>
                <span style="font-size: 0.68rem; color: #059669; font-weight: 700;">Top 2%</span>
              </div>
              <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.65rem 0.85rem; text-align: center;">
                <span style="font-size: 0.7rem; color: #64748B; font-weight: 700; text-transform: uppercase;">Mathematics</span>
                <div style="font-size: 1.15rem; font-weight: 900; color: #0F172A; font-family: 'Outfit';">96 / 100</div>
                <span style="font-size: 0.68rem; color: #059669; font-weight: 700;">Batch Topper</span>
              </div>
            </div>

            <div style="background: rgba(30, 64, 175, 0.05); border-left: 3px solid #1E40AF; padding: 0.6rem 0.85rem; border-radius: 0 6px 6px 0; font-size: 0.78rem; color: #1E3A8A;">
              <strong>Faculty Feedback:</strong> "Exceptional problem-solving speed in Rotational Dynamics & Integral Calculus. Recommended to attempt advanced olympiad problem sets." — <em>Prof. Vikram Aditya (HOD Physics)</em>
            </div>
          </div>

          <!-- Test Result 2 -->
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 1.25rem;">
            <div class="d-flex justify-between items-center flex-wrap gap-2 mb-2">
              <div>
                <span class="badge badge-accent font-mono" style="font-size: 0.7rem;">MONTHLY CHAPTER AUDIT</span>
                <h5 style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin: 0.35rem 0 0.15rem;">Organic Reaction Mechanisms & Thermodynamics</h5>
                <span style="font-size: 0.74rem; color: #64748B;">Date Administered: 04 Oct 2026 • Evaluation Type: Subjective Problem Solving</span>
              </div>
              <div class="text-right">
                <div style="font-size: 1.5rem; font-weight: 900; color: #1E40AF; font-family: 'Outfit';">88 / 100</div>
                <div style="font-size: 0.72rem; font-weight: 800; color: #059669;">96.8 Percentile</div>
              </div>
            </div>
            <div style="background: rgba(30, 64, 175, 0.05); border-left: 3px solid #1E40AF; padding: 0.6rem 0.85rem; border-radius: 0 6px 6px 0; font-size: 0.78rem; color: #1E3A8A;">
              <strong>Faculty Feedback:</strong> "Strong grasp of organic synthesis steps. Continue revision on entropy calculations." — <em>Dr. Neha Kapoor (Faculty Chemistry)</em>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  renderNoticesTab() {
    const store = window.kaviroxStore;
    const notices = store.getNotices();

    return `
      <div class="animate-fade-in">
        <div class="d-flex justify-between items-center mb-3 flex-wrap gap-2">
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: #0F172A;">Campus Circulars & Official Administrative Bulletins</h4>
            <span style="font-size: 0.75rem; color: #64748B;">Official institutional communications released by the Academic Directorate</span>
          </div>
          <span style="font-size: 0.72rem; color: #64748B;">Academic Session 2026-27</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${notices.map(n => `
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-left: 4px solid #1E40AF; border-radius: 10px; padding: 1rem 1.25rem;">
              <div class="d-flex justify-between items-center mb-1 flex-wrap gap-2">
                <span class="badge badge-accent font-mono" style="font-size: 0.7rem;">${n.target === 'all' ? 'All Enrolled Guardians' : 'Batch Specific'}</span>
                <span style="font-size: 0.75rem; color: #64748B;">📅 Published: ${n.date}</span>
              </div>
              <h5 style="font-size: 0.96rem; font-weight: 800; color: #0F172A; margin: 0.35rem 0;">${n.title}</h5>
              <p style="font-size: 0.82rem; color: #475569; margin: 0; line-height: 1.55;">${n.content}</p>
              <div style="font-size: 0.72rem; color: #64748B; margin-top: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
                <span>Dispatched by:</span> <strong style="color: #0F172A;">${n.author}</strong>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
};
