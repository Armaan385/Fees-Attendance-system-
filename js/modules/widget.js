// ==========================================================================
// Apex Campus OS - Live Campus Services & Instant Fee Verification Console
// Oscar-Grade Real-Time Verification, Turnstile Telemetry, Section 80C Tax Estimator & Invoices
// ==========================================================================

window.KaviroxWidget = {
  activeWidgetTab: 'verify', // 'verify' | 'telemetry' | 'calculator' | 'notices' | 'enquiry' | 'login'
  searchedRoll: 'APX-101',
  calcProgram: 'PLAN-JEE',
  calcPayment: 'annual',
  calcTaxBracket: 30, // 0 | 20 | 30
  telemetryFilter: 'all',
  
  // Real-time simulated turnstile punch feed
  recentPunches: [
    { name: "Aarav Sharma", roll: "APX-101", gate: "Gate 1 (North Turnstile 1A)", time: "Just now", status: "Authorized", avatar: "👨‍🎓", batch: "IIT-JEE Adv Top 50" },
    { name: "Priya Verma", roll: "APX-102", gate: "Gate 2 (South Hostel Wing)", time: "1 min ago", status: "Authorized", avatar: "👩‍🎓", batch: "NEET Medical Champions" },
    { name: "Rohan Patel", roll: "APX-103", gate: "Gate 1 (North Turnstile 1B)", time: "3 mins ago", status: "Authorized", avatar: "👨‍🎓", batch: "STEM & Olympiad 11th" },
    { name: "Sneha Kulkarni", roll: "APX-104", gate: "Gate 3 (Central Science Lab)", time: "5 mins ago", status: "Authorized", avatar: "👩‍🎓", batch: "Class 10 Board Foundation" },
    { name: "Dr. Rajesh Sharma", roll: "FAC-01", gate: "Gate 1 (Executive Turnstile)", time: "8 mins ago", status: "Faculty Authorized", avatar: "👨‍🏫", batch: "Director & Physics Head" }
  ],

  setTab(tab) {
    this.activeWidgetTab = tab;
    if (window.playFxSound) window.playFxSound('tab');
    if (window.kaviroxApp) window.kaviroxApp.render();
  },

  quickVerify(rollNo) {
    this.searchedRoll = rollNo;
    this.activeWidgetTab = 'verify';
    if (window.playFxSound) window.playFxSound('success');
    if (window.kaviroxApp) window.kaviroxApp.render();
  },

  handleSearchSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('widget-verify-input');
    if (input && input.value.trim()) {
      this.searchedRoll = input.value.trim().toUpperCase();
      if (window.playFxSound) window.playFxSound('success');
      if (window.kaviroxApp) window.kaviroxApp.render();
    }
  },

  setCalcProgram(progId) {
    this.calcProgram = progId;
    if (window.playFxSound) window.playFxSound('click');
    if (window.kaviroxApp) window.kaviroxApp.render();
  },

  setCalcPayment(plan) {
    this.calcPayment = plan;
    if (window.playFxSound) window.playFxSound('click');
    if (window.kaviroxApp) window.kaviroxApp.render();
  },

  setCalcTaxBracket(bracket) {
    this.calcTaxBracket = parseInt(bracket, 10);
    if (window.playFxSound) window.playFxSound('click');
    if (window.kaviroxApp) window.kaviroxApp.render();
  },

  simulateGatePunch() {
    const students = [
      { name: "Vikramaditya Chauhan", roll: "APX-108", batch: "JEE Advanced 2-Year", avatar: "👨‍🎓" },
      { name: "Ishaan Trivedi", roll: "APX-109", batch: "NEET AIIMS Target", avatar: "👨‍🎓" },
      { name: "Meera Sen", roll: "APX-110", batch: "Class 11 Olympiad", avatar: "👩‍🎓" },
      { name: "Arjun Nambiar", roll: "APX-111", batch: "JEE Dropper Intensive", avatar: "👨‍🎓" }
    ];
    const gates = ["Gate 1 (North Turnstile 1A)", "Gate 1 (North Turnstile 1C)", "Gate 2 (South Hostel Corridor)", "Gate 3 (Science Lab Turnstile)"];
    const randomStu = students[Math.floor(Math.random() * students.length)];
    const randomGate = gates[Math.floor(Math.random() * gates.length)];
    
    const newPunch = {
      name: randomStu.name,
      roll: randomStu.roll,
      gate: randomGate,
      time: "Just now",
      status: "Authorized",
      avatar: randomStu.avatar,
      batch: randomStu.batch
    };

    this.recentPunches.unshift(newPunch);
    if (this.recentPunches.length > 8) this.recentPunches.pop();

    if (window.playFxSound) window.playFxSound('success');
    if (window.kaviroxApp && window.kaviroxApp.showToast) {
      window.kaviroxApp.showToast(`Biometric Turnstile Check-in: ${newPunch.name} (${newPunch.roll}) verified at ${randomGate.split(' ')[0]}`, 'success');
    }
    if (window.kaviroxApp) window.kaviroxApp.render();
  },

  render(isStandalone = false) {
    const store = window.kaviroxStore;
    const centre = store ? store.getCurrentCentre() : { name: "Apex Academy Kota Knowledge Park", address: "Plot 42, Knowledge Park III, Kota & Greater Noida" };
    const batches = store ? store.getBatches() : [];
    const feePlans = store ? store.getFeePlans() : [];
    const notices = store ? store.getNotices() : [];

    return `
      <div class="kavirox-embedded-widget">
        <!-- Live Console Header -->
        <div class="widget-header">
          <div class="d-flex justify-between items-center flex-wrap gap-2">
            <div style="display: flex; align-items: center; gap: 0.75rem; color: #38BDF8;">
              <span class="live-dot-pulse"></span>
              <span style="font-weight: 900; font-size: 0.88rem; letter-spacing: 0.05em; color: #38BDF8; font-family: 'Outfit', sans-serif;">
                APEX ACADEMY • REAL-TIME CAMPUS AUDIT &amp; SERVICES CONSOLE
              </span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
              <div style="font-size: 0.72rem; color: #34D399; font-weight: 800; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); padding: 5px 14px; border-radius: 9999px; display: flex; align-items: center; gap: 6px; box-shadow: 0 0 14px rgba(16, 185, 129, 0.2);">
                <span>⚡</span> ISO 9001:2015 Cryptographic Ledger
              </div>
              <div style="font-size: 0.72rem; color: #F59E0B; font-weight: 800; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); padding: 5px 14px; border-radius: 9999px; display: flex; align-items: center; gap: 6px;">
                <span>🛡️</span> Section 80C Tax Certified
              </div>
            </div>
          </div>

          <!-- Futuristic Segmented Navigation Tabs -->
          <div class="widget-tabs">
            <button type="button" class="w-tab ${this.activeWidgetTab === 'verify' ? 'active' : ''}" onclick="KaviroxWidget.setTab('verify')">
              <span>🔍 Instant Fee &amp; Dossier Audit</span>
              <span class="w-tab-badge">Live</span>
            </button>
            <button type="button" class="w-tab ${this.activeWidgetTab === 'telemetry' ? 'active' : ''}" onclick="KaviroxWidget.setTab('telemetry')">
              <span>🛰️ Live Gate Turnstiles</span>
              <span class="w-tab-badge" style="background: rgba(16, 185, 129, 0.3); color: #34D399;">Gate 1-4</span>
            </button>
            <button type="button" class="w-tab ${this.activeWidgetTab === 'calculator' ? 'active' : ''}" onclick="KaviroxWidget.setTab('calculator')">
              <span>💳 Tuition &amp; 80C Tax Estimator</span>
              <span class="w-tab-badge" style="background: rgba(245, 158, 11, 0.3); color: #FBBF24;">Save Tax</span>
            </button>
            <button type="button" class="w-tab ${this.activeWidgetTab === 'notices' ? 'active' : ''}" onclick="KaviroxWidget.setTab('notices')">
              <span>📢 Official Gazettes</span>
              <span class="w-tab-badge">4 Updates</span>
            </button>
            <button type="button" class="w-tab ${this.activeWidgetTab === 'enquiry' ? 'active' : ''}" onclick="KaviroxWidget.setTab('enquiry')">
              <span>📝 Fast-Track Admissions</span>
              <span class="w-tab-badge">2026-27</span>
            </button>
            <button type="button" class="w-tab ${this.activeWidgetTab === 'login' ? 'active' : ''}" onclick="KaviroxWidget.setTab('login')">
              <span>🔒 Parent Companion</span>
              <span class="w-tab-badge">1-Click</span>
            </button>
          </div>
        </div>

        <!-- Dynamic Content Body -->
        <div class="widget-content">
          ${this.renderWidgetTabContent(centre, batches, feePlans, notices)}
        </div>

        <!-- Institutional Trust Footer -->
        <div style="padding: 1.15rem 2rem; background: rgba(3, 7, 18, 0.9); border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: #94A3B8; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="color: #cbb88f; font-weight: 800;">🏛️ APEX INSTITUTIONAL OS</span>
            <span>• Government Recognized Coaching Protocol • <strong>Audit Ledger Synced</strong></span>
          </div>
          <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
            <span style="color: #38BDF8; font-weight: 700;">✓ 256-Bit SHA Encryption</span>
            <span style="color: #FBBF24; font-weight: 700;">✓ Section 80C Tax Exemption Compliant</span>
            <a href="portal.html" style="color: #60A5FA; text-decoration: none; font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">
              Launch Full Campus Portal →
            </a>
          </div>
        </div>
      </div>
    `;
  },

  renderWidgetTabContent(centre, batches, feePlans, notices) {
    const store = window.kaviroxStore;

    // ------------------------------------------------------------------------
    // TAB 1: Instant Fee & Receipt Verification (Oscar Star Feature)
    // ------------------------------------------------------------------------
    if (this.activeWidgetTab === 'verify') {
      const students = store ? store.getStudents() : [];
      const query = (this.searchedRoll || 'APX-101').toUpperCase().trim();
      const student = students.find(s => s.rollNo === query || s.id === query || s.name.toUpperCase().includes(query)) || students[0];
      const batch = batches.find(b => b.id === (student ? student.batchId : ''));
      const batchName = batch ? batch.name : (student ? student.standard : 'IIT-JEE Advanced (Class 11 PCM)');
      const isPaid = student ? (student.pendingDues || 0) === 0 : true;

      return `
        <div class="widget-verification-box">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
            <div>
              <h3 style="font-size: 1.35rem; font-weight: 900; color: #FFFFFF; margin: 0 0 0.4rem; font-family: 'Outfit', sans-serif; display: flex; align-items: center; gap: 0.65rem;">
                <span>Verified Student Fee Ledger &amp; RFID Turnstile Dossier</span>
              </h3>
              <p style="font-size: 0.88rem; color: #94A3B8; margin: 0; line-height: 1.6; max-width: 780px;">
                Public real-time ledger verification for parents, banking institutions, and scholarship sponsors. Instantly inspect biometric turnstile registration, fee clearance status, and Section 80C income tax invoices.
              </p>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(37, 99, 235, 0.15); border: 1px solid rgba(59, 130, 246, 0.35); padding: 0.45rem 1rem; border-radius: 9999px; font-size: 0.76rem; color: #60A5FA; font-weight: 700;">
              <span>🛡️ Cryptographic Ledger: <strong>BLOCK #2026-APX</strong></span>
            </div>
          </div>

          <!-- Interactive Search Input -->
          <form class="verification-search-bar" onsubmit="KaviroxWidget.handleSearchSubmit(event)">
            <input 
              type="text" 
              id="widget-verify-input" 
              class="verification-search-input" 
              placeholder="Enter Student Roll No (e.g. APX-101, APX-102, APX-103) or Full Name..." 
              value="${this.searchedRoll}"
            />
            <button type="submit" class="btn btn-primary" style="padding: 0.85rem 2rem; font-weight: 800; border-radius: 12px; display: inline-flex; align-items: center; gap: 0.5rem;">
              <span>Verify Institutional Record</span>
              <span>⚡</span>
            </button>
          </form>

          <!-- 1-Tap Quick Sample Tests -->
          <div class="verification-quick-pills">
            <span style="font-size: 0.78rem; color: #94A3B8; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Instant 1-Tap Profiles:</span>
            <button type="button" class="v-quick-pill ${this.searchedRoll === 'APX-101' ? 'active' : ''}" onclick="KaviroxWidget.quickVerify('APX-101')">
              <span>⭐ Aarav Sharma (APX-101 • Fully Paid)</span>
            </button>
            <button type="button" class="v-quick-pill ${this.searchedRoll === 'APX-102' ? 'active' : ''}" onclick="KaviroxWidget.quickVerify('APX-102')">
              <span>⚠️ Priya Verma (APX-102 • Term 2 Due)</span>
            </button>
            <button type="button" class="v-quick-pill ${this.searchedRoll === 'APX-103' ? 'active' : ''}" onclick="KaviroxWidget.quickVerify('APX-103')">
              <span>⭐ Rohan Patel (APX-103 • 100% Scholarship)</span>
            </button>
            <button type="button" class="v-quick-pill ${this.searchedRoll === 'APX-104' ? 'active' : ''}" onclick="KaviroxWidget.quickVerify('APX-104')">
              <span>⭐ Sneha Kulkarni (APX-104 • Paid)</span>
            </button>
          </div>

          <!-- Cryptographically Verified Institutional Dossier Card -->
          ${student ? `
            <div class="verified-dossier-card ${isPaid ? '' : 'due'}">
              <!-- Official Stamp Overlay -->
              <div class="official-embossed-seal ${isPaid ? '' : 'due'}">
                <span>★ APEX ACADEMY ★</span>
                <span style="font-size: 0.75rem; margin: 2px 0;">${isPaid ? 'AUDITED &amp; PAID' : 'FEE PENDING'}</span>
                <span>SEC 80C VALID</span>
              </div>

              <!-- Header with Profile and Status Pill -->
              <div class="verified-dossier-header">
                <div class="d-flex items-center gap-3">
                  <div style="width: 54px; height: 54px; border-radius: 14px; background: ${isPaid ? 'linear-gradient(135deg, #059669 0%, #10B981 100%)' : 'linear-gradient(135deg, #E11D48 0%, #F43F5E 100%)'}; color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 900; box-shadow: 0 8px 20px ${isPaid ? 'rgba(5, 150, 105, 0.45)' : 'rgba(225, 29, 72, 0.45)'};">
                    ${isPaid ? '✓' : '⚠️'}
                  </div>
                  <div>
                    <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.25rem;">
                      <strong style="font-size: 1.35rem; color: #FFFFFF; font-family: 'Outfit', sans-serif;">
                        ${student.name}
                      </strong>
                      <span style="background: rgba(255, 255, 255, 0.1); color: #CBD5E1; padding: 2px 8px; border-radius: 6px; font-size: 0.72rem; font-family: 'JetBrains Mono', monospace; font-weight: 700;">
                        ${student.rollNo}
                      </span>
                    </div>
                    <span style="font-size: 0.82rem; color: #94A3B8;">
                      Enrolment ID: <strong style="color: #60A5FA; font-family: 'JetBrains Mono', monospace;">${student.id}</strong> • Guardian: <strong>${student.parentName}</strong> (+91 ${student.parentPhone})
                    </span>
                  </div>
                </div>

                <div class="verified-status-tag ${isPaid ? '' : 'due'}">
                  <span>${isPaid ? '🛡️ ZERO OUTSTANDING DUES • VERIFIED' : '⚠️ TERM INSTALLMENT OVERDUE'}</span>
                </div>
              </div>

              <!-- 4-Grid Institutional Ledger Particulars -->
              <div class="verified-dossier-grid">
                <div class="v-item">
                  <span class="v-item-label">Academic Program &amp; Batch</span>
                  <span class="v-item-value">${batchName}</span>
                  <span style="font-size: 0.74rem; color: #64748B;">Classroom Centre: Kota Main Campus</span>
                </div>
                <div class="v-item">
                  <span class="v-item-label">Biometric Gate Turnstile Status</span>
                  <span class="v-item-value" style="color: #38BDF8;">
                    ${isPaid ? '98.4% Present' : '94.2% Present'}
                  </span>
                  <span style="font-size: 0.74rem; color: #10B981; display: flex; align-items: center; gap: 4px;">
                    <span class="live-dot-pulse" style="width: 6px; height: 6px;"></span> RFID Turnstile Active (Kota Gate 1)
                  </span>
                </div>
                <div class="v-item">
                  <span class="v-item-label">Verified Accounts Ledger</span>
                  <span class="v-item-value ${isPaid ? 'highlight-paid' : 'highlight-due'}">
                    ${isPaid ? '₹0.00 (Cleared)' : `₹${student.pendingDues.toLocaleString('en-IN')} Due`}
                  </span>
                  <span style="font-size: 0.74rem; color: #64748B;">Audit Status: Real-time Synchronized</span>
                </div>
                <div class="v-item">
                  <span class="v-item-label">Latest GST Tax Invoice</span>
                  <span class="v-item-value font-mono" style="color: #FBBF24; font-size: 1rem;">
                    #APX-2026-${student.rollNo.replace('APX-', '')}42
                  </span>
                  <span style="font-size: 0.74rem; color: #F59E0B;">Section 80C Tax Exemption Ready</span>
                </div>
              </div>

              <!-- Action Bar with Printable Receipt Modal Trigger -->
              <div class="verified-dossier-actions">
                <div style="font-size: 0.78rem; color: #94A3B8; display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
                  <span style="color: #10B981; font-size: 1rem;">🔒</span>
                  <span>Cryptographic SHA-256 Audit Seal:</span>
                  <code style="color: #E2E8F0; font-family: 'JetBrains Mono', monospace; background: rgba(0,0,0,0.5); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08); font-size: 0.75rem;">
                    8F2A-99B1-APX-${student.rollNo}-2026
                  </code>
                </div>
                <div class="d-flex gap-2 flex-wrap">
                  <button type="button" class="btn btn-sm" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #FFFFFF; font-weight: 800; border-radius: 8px; padding: 0.55rem 1.15rem;" onclick="KaviroxWidget.openReceiptModal('${student.rollNo}')">
                    📄 View &amp; Print Official GST Receipt
                  </button>
                  <button type="button" class="btn btn-sm btn-outline" style="border-color: #F59E0B; color: #FBBF24; font-weight: 800; border-radius: 8px; padding: 0.55rem 1.15rem;" onclick="window.kaviroxApp && window.kaviroxApp.showToast ? window.kaviroxApp.showToast('Downloaded Official Section 80C Tax Exemption Certificate for ' + '${student.name}', 'success') : alert('Tax Certificate Downloaded');">
                    📥 Download 80C Certificate
                  </button>
                  <a href="portal.html" class="btn btn-sm btn-primary" style="font-weight: 800; border-radius: 8px; padding: 0.55rem 1.15rem;">
                    Guardian Companion Portal →
                  </a>
                </div>
              </div>
            </div>
          ` : `
            <div style="text-align: center; padding: 3rem; color: #94A3B8; background: rgba(15, 23, 42, 0.5); border-radius: 16px; border: 1px dashed rgba(255, 255, 255, 0.15);">
              <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔍</div>
              <h4 style="color: #FFFFFF; font-size: 1.15rem; margin-bottom: 0.4rem;">No Student Record Found</h4>
              <p style="font-size: 0.88rem; margin: 0;">No active ledger entry matches query "${this.searchedRoll}". Try searching "APX-101", "Aarav", or "Rohan".</p>
            </div>
          `}
        </div>
      `;
    }

    // ------------------------------------------------------------------------
    // TAB 2: Live Gate Turnstiles & Biometric Telemetry
    // ------------------------------------------------------------------------
    if (this.activeWidgetTab === 'telemetry') {
      return `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
            <div>
              <h3 style="font-size: 1.35rem; font-weight: 900; color: #FFFFFF; margin: 0 0 0.4rem; font-family: 'Outfit', sans-serif;">
                Live Campus Turnstiles &amp; Biometric RFID Telemetry
              </h3>
              <p style="font-size: 0.88rem; color: #94A3B8; margin: 0;">
                Live synchronization with Kota Main Campus automated turnstiles (Gate 1A-1D), hostel corridors, and NCR branch gates. Zero human tampering.
              </p>
            </div>
            <button type="button" class="btn btn-sm btn-primary" style="font-weight: 800; border-radius: 10px; padding: 0.6rem 1.25rem;" onclick="KaviroxWidget.simulateGatePunch()">
              ⚡ Simulate Live RFID Turnstile Punch
            </button>
          </div>

          <!-- 4 Gate Turnstile Status Cards -->
          <div class="telemetry-grid">
            <div class="gate-card">
              <div class="gate-card-header">
                <strong style="color: #FFFFFF; font-size: 0.95rem;">Gate 1: North Turnstiles 1A-1D</strong>
                <span class="live-dot-pulse"></span>
              </div>
              <span style="font-size: 0.75rem; color: #64748B;">Kota Main Road Entrance</span>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.35rem;">
                <span style="font-size: 1.25rem; font-weight: 900; color: #38BDF8; font-family: 'Outfit', sans-serif;">2,140</span>
                <span style="font-size: 0.72rem; color: #10B981; font-weight: 700; background: rgba(16, 185, 129, 0.15); padding: 2px 8px; border-radius: 20px;">9ms Latency</span>
              </div>
              <span style="font-size: 0.74rem; color: #94A3B8;">4/4 Optical Gates Online</span>
            </div>

            <div class="gate-card">
              <div class="gate-card-header">
                <strong style="color: #FFFFFF; font-size: 0.95rem;">Gate 2: Academic &amp; Hostel Wing</strong>
                <span class="live-dot-pulse"></span>
              </div>
              <span style="font-size: 0.75rem; color: #64748B;">South Residential Corridor</span>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.35rem;">
                <span style="font-size: 1.25rem; font-weight: 900; color: #38BDF8; font-family: 'Outfit', sans-serif;">1,680</span>
                <span style="font-size: 0.72rem; color: #10B981; font-weight: 700; background: rgba(16, 185, 129, 0.15); padding: 2px 8px; border-radius: 20px;">11ms Latency</span>
              </div>
              <span style="font-size: 0.74rem; color: #94A3B8;">3/3 RFID Turnstiles Online</span>
            </div>

            <div class="gate-card">
              <div class="gate-card-header">
                <strong style="color: #FFFFFF; font-size: 0.95rem;">Gate 3: Central Science Labs</strong>
                <span class="live-dot-pulse"></span>
              </div>
              <span style="font-size: 0.75rem; color: #64748B;">Physics &amp; Chemistry Wing</span>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.35rem;">
                <span style="font-size: 1.25rem; font-weight: 900; color: #38BDF8; font-family: 'Outfit', sans-serif;">720</span>
                <span style="font-size: 0.72rem; color: #10B981; font-weight: 700; background: rgba(16, 185, 129, 0.15); padding: 2px 8px; border-radius: 20px;">14ms Latency</span>
              </div>
              <span style="font-size: 0.74rem; color: #94A3B8;">2/2 Biometric Readers Online</span>
            </div>

            <div class="gate-card">
              <div class="gate-card-header">
                <strong style="color: #FFFFFF; font-size: 0.95rem;">Gate 4: Library &amp; Study Pods</strong>
                <span class="live-dot-pulse"></span>
              </div>
              <span style="font-size: 0.75rem; color: #64748B;">24x7 Silent Study Vault</span>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.35rem;">
                <span style="font-size: 1.25rem; font-weight: 900; color: #38BDF8; font-family: 'Outfit', sans-serif;">352</span>
                <span style="font-size: 0.72rem; color: #10B981; font-weight: 700; background: rgba(16, 185, 129, 0.15); padding: 2px 8px; border-radius: 20px;">8ms Latency</span>
              </div>
              <span style="font-size: 0.74rem; color: #94A3B8;">RFID Barcode Pod Active</span>
            </div>
          </div>

          <!-- Real-Time Stream Box -->
          <div class="live-punch-stream-box">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <span class="live-dot-pulse" style="background: #38BDF8; box-shadow: 0 0 10px #38BDF8;"></span>
                <strong style="font-size: 0.95rem; color: #FFFFFF;">Real-Time Biometric Punch Feed (Kota Campus)</strong>
              </div>
              <span style="font-size: 0.74rem; color: #94A3B8; font-family: 'JetBrains Mono', monospace;">AUTO-POLLING (1.0 SEC)</span>
            </div>

            <div class="punch-stream-list">
              ${this.recentPunches.map(p => `
                <div class="punch-item">
                  <div class="d-flex items-center gap-3">
                    <span style="font-size: 1.35rem;">${p.avatar}</span>
                    <div>
                      <strong style="color: #FFFFFF; font-size: 0.92rem; display: block;">${p.name}</strong>
                      <span style="font-size: 0.75rem; color: #94A3B8;">
                        Roll: <strong style="color: #60A5FA; font-family: 'JetBrains Mono', monospace;">${p.roll}</strong> • ${p.batch}
                      </span>
                    </div>
                  </div>
                  <div style="text-align: right;">
                    <span style="font-size: 0.72rem; color: #34D399; font-weight: 800; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); padding: 3px 10px; border-radius: 20px; display: inline-block; margin-bottom: 3px;">
                      ✓ ${p.status}
                    </span>
                    <div style="font-size: 0.72rem; color: #64748B;">
                      ${p.gate} • <strong style="color: #CBD5E1;">${p.time}</strong>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    // ------------------------------------------------------------------------
    // TAB 3: Tuition & Section 80C Tax Estimator (Oscar Financial Feature)
    // ------------------------------------------------------------------------
    if (this.activeWidgetTab === 'calculator') {
      const programs = [
        { id: 'PLAN-JEE', name: 'IIT-JEE (Main + Advanced) 2-Year Program', annualFee: 144000, monthlyFee: 12000, scholarship: 18000 },
        { id: 'PLAN-NEET', name: 'NEET-UG Medical Champions Batch', annualFee: 132000, monthlyFee: 11000, scholarship: 16000 },
        { id: 'PLAN-BOARD', name: 'Class 10 Board Foundation & NTSE', annualFee: 72000, monthlyFee: 6000, scholarship: 8000 },
        { id: 'PLAN-OLY', name: 'Class 9 STEM & Junior Science Olympiad', annualFee: 60000, monthlyFee: 5000, scholarship: 7000 }
      ];

      const currentProg = programs.find(p => p.id === this.calcProgram) || programs[0];
      const isAnnual = this.calcPayment === 'annual';
      const baseFee = currentProg.annualFee;
      const discount = isAnnual ? (currentProg.scholarship + 10000) : currentProg.scholarship;
      const netPayable = baseFee - discount;
      
      // Section 80C Tax Savings Calculation
      // Coaching fee deduction claimable up to net payable (capped at 1.5L 80C limit)
      const claimableUnder80C = Math.min(netPayable, 150000);
      const taxSavings = Math.round(claimableUnder80C * (this.calcTaxBracket / 100));
      const effectiveAnnualCost = netPayable - taxSavings;
      const effectiveMonthly = Math.round(effectiveAnnualCost / 12);

      return `
        <div>
          <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.35rem; font-weight: 900; color: #FFFFFF; margin: 0 0 0.4rem; font-family: 'Outfit', sans-serif;">
              Transparent Tuition Schedule &amp; Section 80C Tax Exemption Estimator
            </h3>
            <p style="font-size: 0.88rem; color: #94A3B8; margin: 0;">
              Apex Academy tuition fees are 100% compliant with Government of India Income Tax Section 80C. Calculate your direct tax cash savings and installment schedules.
            </p>
          </div>

          <div class="calc-container">
            <!-- Left Options Form -->
            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              <!-- 1. Select Program -->
              <div>
                <label style="font-size: 0.82rem; color: #CBD5E1; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.5rem; display: block;">
                  1. Select Academic Target Program:
                </label>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                  ${programs.map(p => `
                    <div 
                      onclick="KaviroxWidget.setCalcProgram('${p.id}')"
                      style="padding: 0.85rem 1.15rem; border-radius: 12px; background: ${this.calcProgram === p.id ? 'rgba(37, 99, 235, 0.25)' : 'rgba(15, 23, 42, 0.6)'}; border: 1.5px solid ${this.calcProgram === p.id ? '#38BDF8' : 'rgba(255, 255, 255, 0.08)'}; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s ease;"
                    >
                      <div>
                        <strong style="color: #FFFFFF; font-size: 0.92rem; display: block;">${p.name}</strong>
                        <span style="font-size: 0.74rem; color: #94A3B8;">Full Classroom Lectures • Printed DPPs • Kota AI Test Series</span>
                      </div>
                      <span style="font-weight: 900; color: #38BDF8; font-family: 'Outfit', sans-serif; font-size: 1.1rem;">
                        ₹${p.annualFee.toLocaleString('en-IN')}<small style="font-size: 0.72rem; color: #94A3B8;">/yr</small>
                      </span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- 2. Payment Structure -->
              <div>
                <label style="font-size: 0.82rem; color: #CBD5E1; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.5rem; display: block;">
                  2. Select Payment Structure:
                </label>
                <div style="display: flex; gap: 0.75rem;">
                  <button 
                    type="button" 
                    onclick="KaviroxWidget.setCalcPayment('annual')" 
                    style="flex: 1; padding: 0.75rem; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; border: 1.5px solid ${isAnnual ? '#10B981' : 'rgba(255, 255, 255, 0.1)'}; background: ${isAnnual ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15, 23, 42, 0.6)'}; color: ${isAnnual ? '#34D399' : '#CBD5E1'};"
                  >
                    Annual Lump-Sum (Save Extra ₹10,000) ⚡
                  </button>
                  <button 
                    type="button" 
                    onclick="KaviroxWidget.setCalcPayment('installment')" 
                    style="flex: 1; padding: 0.75rem; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; border: 1.5px solid ${!isAnnual ? '#38BDF8' : 'rgba(255, 255, 255, 0.1)'}; background: ${!isAnnual ? 'rgba(37, 99, 235, 0.2)' : 'rgba(15, 23, 42, 0.6)'}; color: ${!isAnnual ? '#60A5FA' : '#CBD5E1'};"
                  >
                    3-Part Semester Installments (No Surcharge)
                  </button>
                </div>
              </div>

              <!-- 3. Parent Income Tax Bracket (Section 80C) -->
              <div>
                <label style="font-size: 0.82rem; color: #CBD5E1; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.5rem; display: block;">
                  3. Parent Income Tax Bracket (Section 80C Claim):
                </label>
                <div style="display: flex; gap: 0.5rem;">
                  <button 
                    type="button" 
                    onclick="KaviroxWidget.setCalcTaxBracket(30)" 
                    style="flex: 1; padding: 0.65rem; border-radius: 8px; font-size: 0.78rem; font-weight: 800; cursor: pointer; border: 1px solid ${this.calcTaxBracket === 30 ? '#F59E0B' : 'rgba(255,255,255,0.1)'}; background: ${this.calcTaxBracket === 30 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(15, 23, 42, 0.5)'}; color: ${this.calcTaxBracket === 30 ? '#FBBF24' : '#CBD5E1'};"
                  >
                    30% Tax Slab (Max Savings)
                  </button>
                  <button 
                    type="button" 
                    onclick="KaviroxWidget.setCalcTaxBracket(20)" 
                    style="flex: 1; padding: 0.65rem; border-radius: 8px; font-size: 0.78rem; font-weight: 800; cursor: pointer; border: 1px solid ${this.calcTaxBracket === 20 ? '#F59E0B' : 'rgba(255,255,255,0.1)'}; background: ${this.calcTaxBracket === 20 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(15, 23, 42, 0.5)'}; color: ${this.calcTaxBracket === 20 ? '#FBBF24' : '#CBD5E1'};"
                  >
                    20% Tax Slab
                  </button>
                  <button 
                    type="button" 
                    onclick="KaviroxWidget.setCalcTaxBracket(0)" 
                    style="flex: 1; padding: 0.65rem; border-radius: 8px; font-size: 0.78rem; font-weight: 800; cursor: pointer; border: 1px solid ${this.calcTaxBracket === 0 ? '#F59E0B' : 'rgba(255,255,255,0.1)'}; background: ${this.calcTaxBracket === 0 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(15, 23, 42, 0.5)'}; color: ${this.calcTaxBracket === 0 ? '#FBBF24' : '#CBD5E1'};"
                  >
                    Non-Taxpayer (0%)
                  </button>
                </div>
              </div>
            </div>

            <!-- Right Results & Tax Breakdown Card -->
            <div class="calc-summary-card">
              <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 1rem;">
                <span style="font-size: 0.75rem; color: #cbb88f; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
                  ESTIMATED INSTITUTIONAL QUOTATION
                </span>
                <h4 style="font-size: 1.25rem; color: #FFFFFF; font-weight: 900; margin: 0.35rem 0 0; font-family: 'Outfit', sans-serif;">
                  ${currentProg.name}
                </h4>
              </div>

              <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.88rem;">
                <div style="display: flex; justify-content: space-between; color: #CBD5E1;">
                  <span>Standard Institutional Tuition:</span>
                  <span style="font-weight: 800; color: #FFFFFF;">₹${baseFee.toLocaleString('en-IN')}</span>
                </div>
                <div style="display: flex; justify-content: space-between; color: #34D399;">
                  <span>Apex Merit Scholarship &amp; Plan Benefit:</span>
                  <span style="font-weight: 800;">-₹${discount.toLocaleString('en-IN')}</span>
                </div>
                <div style="display: flex; justify-content: space-between; color: #FFFFFF; font-weight: 900; border-top: 1px dashed rgba(255,255,255,0.15); padding-top: 0.65rem;">
                  <span>Net Payable Fee:</span>
                  <span style="color: #38BDF8; font-size: 1.15rem; font-family: 'Outfit', sans-serif;">₹${netPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <!-- High Impact Section 80C Tax Savings Callout -->
              <div class="tax-savings-callout">
                <div style="font-size: 2rem;">🛡️</div>
                <div>
                  <strong style="color: #34D399; font-size: 0.95rem; display: block;">
                    Section 80C Tax Savings: ₹${taxSavings.toLocaleString('en-IN')}
                  </strong>
                  <span style="font-size: 0.76rem; color: #CBD5E1; line-height: 1.4; display: block;">
                    Directly deductible under Section 80C of IT Act against tuition fee. Computerized tax certificates issued.
                  </span>
                </div>
              </div>

              <!-- Effective Final Cost -->
              <div style="background: rgba(2, 6, 23, 0.7); border: 1.5px solid rgba(56, 189, 248, 0.4); border-radius: 12px; padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <span style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; font-weight: 800;">Real Effective Cost (After Tax):</span>
                  <div style="font-size: 1.45rem; font-weight: 900; color: #FFFFFF; font-family: 'Outfit', sans-serif;">
                    ₹${effectiveAnnualCost.toLocaleString('en-IN')}
                  </div>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; font-weight: 800;">Monthly Equiv:</span>
                  <div style="font-size: 1.2rem; font-weight: 900; color: #34D399; font-family: 'Outfit', sans-serif;">
                    ₹${effectiveMonthly.toLocaleString('en-IN')}<small style="font-size: 0.7rem; color: #94A3B8;">/mo</small>
                  </div>
                </div>
              </div>

              <button type="button" class="btn btn-primary" style="padding: 0.85rem; font-weight: 800; border-radius: 10px; width: 100%;" onclick="KaviroxWidget.setTab('enquiry')">
                Lock Scholarship &amp; Reserve Seat Online →
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // ------------------------------------------------------------------------
    // TAB 4: Official Academic Bulletins & Gazettes
    // ------------------------------------------------------------------------
    if (this.activeWidgetTab === 'notices') {
      const gazettes = [
        {
          tag: "🔴 URGENT ADVISORY",
          date: "27 OCT 2026",
          badge: "NTA NOTICE #442",
          title: "JEE Advanced 2026 Final Mock Test & All-India Rank Predictor Schedule",
          content: "The 3-day full syllabus CBT Simulation at Kota & Greater Noida centers commences this Friday. Turnstile entry opens at 07:45 AM sharp with RFID biometric ID card.",
          signer: "Controller of Examinations, Apex Academy Kota"
        },
        {
          tag: "🟢 SCHOLARSHIP GAZETTE",
          date: "24 OCT 2026",
          badge: "APEX-STSE 2026",
          title: "Apex National Talent Scholarship Examination (ANTSE) Round 2 Shortlist",
          content: "Merit lists for 100% and 75% fee concession programs have been validated by the Academic Board. Qualified students may download the concession ledger.",
          signer: "Academic Registrar, Apex Knowledge Park"
        },
        {
          tag: "🟡 COMPLIANCE NOTICE",
          date: "20 OCT 2026",
          badge: "AUDIT REG-80C",
          title: "Quarter 3 Computerized GST Invoices & 80C Tax Certificates Released",
          content: "Parents can generate authenticated Form-16 Section 80C coaching receipts for FY 2026-27 directly from the Guardian Dossier or Accounts Desk.",
          signer: "Chief Accounts Officer, Apex Educational Trust"
        }
      ];

      return `
        <div class="widget-notices-list">
          ${gazettes.map(n => `
            <div class="w-notice-item">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: rgba(255,255,255,0.08); color: #E2E8F0;">${n.tag}</span>
                  <span style="font-size: 0.74rem; color: #38BDF8; font-family: 'JetBrains Mono', monospace; font-weight: 700;">${n.badge}</span>
                </div>
                <span style="font-size: 0.74rem; color: #94A3B8; font-weight: 700;">📅 ${n.date}</span>
              </div>
              <h4 style="font-size: 1.15rem; color: #FFFFFF; margin: 0 0 0.5rem; font-weight: 800; font-family: 'Outfit', sans-serif;">${n.title}</h4>
              <p style="font-size: 0.88rem; color: #CBD5E1; margin: 0 0 1rem; line-height: 1.6;">${n.content}</p>
              
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                <span style="font-size: 0.74rem; color: #64748B;">Digital Signatory: <strong>${n.signer}</strong></span>
                <button type="button" class="btn btn-sm btn-outline" style="border-color: rgba(56, 189, 248, 0.4); color: #38BDF8; font-weight: 700; border-radius: 6px; padding: 0.35rem 0.85rem;" onclick="window.kaviroxApp && window.kaviroxApp.showToast ? window.kaviroxApp.showToast('Downloaded Official Gazette PDF: ' + '${n.badge}', 'success') : alert('Gazette PDF Downloaded');">
                  📥 Download Official PDF
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // ------------------------------------------------------------------------
    // TAB 5: Fast-Track Admission Desk
    // ------------------------------------------------------------------------
    if (this.activeWidgetTab === 'enquiry') {
      return `
        <form class="widget-enquiry-form" onsubmit="event.preventDefault(); window.kaviroxApp && window.kaviroxApp.showToast ? window.kaviroxApp.showToast('Admissions Application Received! Senior Kota Counsellor will reach out within 15 minutes.', 'success') : alert('Application received!');">
          <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.35rem; font-weight: 900; color: #FFFFFF; margin: 0 0 0.4rem; font-family: 'Outfit', sans-serif;">
              VIP Fast-Track Campus Admission &amp; Diagnostic Scholarship Evaluation
            </h3>
            <p style="font-size: 0.88rem; color: #94A3B8; margin: 0;">
              Secure direct seat allotment for Session 2026-2027. Access verified scholarship evaluation and campus hostel tours.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="font-size: 0.8rem; color: #CBD5E1; font-weight: 800; margin-bottom: 0.35rem; display: block;">Student Full Name *</label>
              <input type="text" placeholder="e.g. Aditya Rathore" required style="background: #030712; border: 1.5px solid rgba(255,255,255,0.15); color: #FFF; padding: 0.8rem 1rem; border-radius: 10px; width: 100%; box-sizing: border-box;" />
            </div>
            <div>
              <label style="font-size: 0.8rem; color: #CBD5E1; font-weight: 800; margin-bottom: 0.35rem; display: block;">Parent WhatsApp Mobile *</label>
              <input type="tel" placeholder="10-digit registered mobile" maxlength="10" required style="background: #030712; border: 1.5px solid rgba(255,255,255,0.15); color: #FFF; padding: 0.8rem 1rem; border-radius: 10px; width: 100%; box-sizing: border-box;" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            <div>
              <label style="font-size: 0.8rem; color: #CBD5E1; font-weight: 800; margin-bottom: 0.35rem; display: block;">Target Academic Stream</label>
              <select style="background: #030712; border: 1.5px solid rgba(255,255,255,0.15); color: #FFF; padding: 0.8rem 1rem; border-radius: 10px; width: 100%; box-sizing: border-box;">
                <option>IIT-JEE (Main + Advanced) 2-Year Program</option>
                <option>NEET-UG Medical Champions Batch</option>
                <option>Class 10 Board Foundation &amp; NTSE</option>
                <option>Dropper Target Intensive Batch (Kota)</option>
              </select>
            </div>
            <div>
              <label style="font-size: 0.8rem; color: #CBD5E1; font-weight: 800; margin-bottom: 0.35rem; display: block;">Preferred Campus</label>
              <select style="background: #030712; border: 1.5px solid rgba(255,255,255,0.15); color: #FFF; padding: 0.8rem 1rem; border-radius: 10px; width: 100%; box-sizing: border-box;">
                <option>Kota Main Campus (Knowledge Park III, Kota)</option>
                <option>Greater Noida NCR Campus (Knowledge Park III)</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-primary" style="padding: 0.95rem; font-weight: 900; border-radius: 12px; width: 100%; font-size: 0.95rem;">
            Submit Fast-Track Application &amp; Schedule Diagnostic Scholarship →
          </button>
        </form>
      `;
    }

    // ------------------------------------------------------------------------
    // TAB 6: Guardian One-Touch Companion Access
    // ------------------------------------------------------------------------
    if (this.activeWidgetTab === 'login') {
      return `
        <div style="max-width: 580px; margin: 0 auto; text-align: center; padding: 1.5rem 0;">
          <div style="font-size: 3rem; margin-bottom: 0.75rem;">🔐</div>
          <h3 style="font-size: 1.45rem; font-weight: 900; color: #FFFFFF; margin: 0 0 0.5rem; font-family: 'Outfit', sans-serif;">
            Unified Guardian &amp; Parent Digital Access
          </h3>
          <p style="font-size: 0.88rem; color: #94A3B8; margin-bottom: 1.75rem; line-height: 1.6;">
            Instant passkey authentication for parents. Review biometric punch logs, computerized GST receipts, academic test percentiles, and leave applications.
          </p>

          <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem;">
            <span style="font-size: 0.76rem; color: #38BDF8; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 1rem;">
              Instant 1-Click Guardian Demo Profiles:
            </span>
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              <a href="parent-portal.html" class="btn btn-outline btn-block" style="border-color: rgba(96, 165, 250, 0.4); color: #FFFFFF; font-weight: 700; padding: 0.75rem 1rem; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; text-decoration: none;">
                <span>👨‍💼 <strong>Ramesh Sharma</strong> (Father of Aarav • APX-101)</span>
                <span style="color: #34D399; font-size: 0.75rem; font-weight: 800;">Log In →</span>
              </a>
              <a href="parent-portal.html" class="btn btn-outline btn-block" style="border-color: rgba(96, 165, 250, 0.4); color: #FFFFFF; font-weight: 700; padding: 0.75rem 1rem; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; text-decoration: none;">
                <span>👩‍💼 <strong>Meenakshi Verma</strong> (Mother of Priya • APX-102)</span>
                <span style="color: #34D399; font-size: 0.75rem; font-weight: 800;">Log In →</span>
              </a>
              <a href="parent-portal.html" class="btn btn-outline btn-block" style="border-color: rgba(96, 165, 250, 0.4); color: #FFFFFF; font-weight: 700; padding: 0.75rem 1rem; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; text-decoration: none;">
                <span>👨‍💼 <strong>Suresh Patel</strong> (Father of Rohan • APX-103)</span>
                <span style="color: #34D399; font-size: 0.75rem; font-weight: 800;">Log In →</span>
              </a>
            </div>
          </div>

          <a href="portal.html" class="btn btn-primary btn-block" style="padding: 0.85rem; font-weight: 800; border-radius: 10px; text-decoration: none; display: block;">
            Open Central Campus Portal (All Roles) →
          </a>
        </div>
      `;
    }
  },

  // --------------------------------------------------------------------------
  // Printable High-Resolution Official Fee Receipt Modal (Oscar Feature)
  // --------------------------------------------------------------------------
  openReceiptModal(rollNo) {
    const store = window.kaviroxStore;
    const students = store ? store.getStudents() : [];
    const student = students.find(s => s.rollNo === rollNo) || students[0];
    if (!student) return;

    if (window.playFxSound) window.playFxSound('click');

    let modal = document.getElementById('receipt-modal-container');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'receipt-modal-container';
      document.body.appendChild(modal);
    }

    const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const receiptNo = `APX-2026-${student.rollNo.replace('APX-', '')}42`;

    modal.innerHTML = `
      <div class="receipt-modal-backdrop" onclick="if(event.target === this) KaviroxWidget.closeReceiptModal()">
        <div class="receipt-sheet animate-scale-up">
          <!-- Close Button -->
          <button type="button" onclick="KaviroxWidget.closeReceiptModal()" style="position: absolute; top: 1.25rem; right: 1.25rem; background: #F1F5F9; border: none; font-size: 1.2rem; cursor: pointer; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #475569;" class="receipt-actions">
            ✕
          </button>

          <!-- Receipt Header -->
          <div class="receipt-header">
            <div>
              <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.35rem;">
                <span style="font-size: 2rem;">🎓</span>
                <div>
                  <h2 style="font-size: 1.45rem; font-weight: 900; color: #013284; margin: 0; font-family: 'Outfit', sans-serif;">
                    APEX IIT-JEE &amp; MEDICAL ACADEMY
                  </h2>
                  <span style="font-size: 0.72rem; color: #64748B; font-weight: 700; letter-spacing: 0.04em;">
                    PREMIER INSTITUTIONAL CENTRE • KOTA &amp; GREATER NOIDA
                  </span>
                </div>
              </div>
              <p style="font-size: 0.76rem; color: #475569; margin: 0; line-height: 1.4;">
                Govt Reg No: <strong>DL-EDU/2018/88492</strong> • GSTIN: <strong>07AAAAA0000A1Z5</strong><br/>
                Plot 42, Knowledge Park III, Kota &amp; NCR • Helpline: +91 98765 43210
              </p>
            </div>

            <div style="text-align: right; margin-right: 2.5rem;">
              <span style="background: #013284; color: #FFFFFF; font-size: 0.72rem; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase;">
                OFFICIAL TAX INVOICE
              </span>
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.95rem; font-weight: 800; color: #013284; margin-top: 0.35rem;">
                ${receiptNo}
              </div>
              <span style="font-size: 0.76rem; color: #64748B;">Date: ${todayStr}</span>
            </div>
          </div>

          <!-- Student & Guardian Particulars -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 1rem; font-size: 0.82rem; margin-bottom: 1.5rem;">
            <div>
              <span style="color: #64748B; display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase;">Student Particulars</span>
              <strong style="font-size: 0.95rem; color: #0F172A;">${student.name}</strong><br/>
              Roll Number: <strong style="font-family: monospace; color: #013284;">${student.rollNo}</strong> • Enrolment: ${student.id}<br/>
              Standard &amp; Batch: <strong>${student.standard}</strong>
            </div>
            <div>
              <span style="color: #64748B; display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase;">Guardian / Billing Particulars</span>
              Parent Name: <strong>${student.parentName}</strong><br/>
              Mobile Contact: +91 ${student.parentPhone}<br/>
              Exemption Status: <strong style="color: #059669;">Eligible for Section 80C Deduction</strong>
            </div>
          </div>

          <!-- Fee Schedule Table -->
          <table class="receipt-table">
            <thead>
              <tr>
                <th style="width: 8%;">S.No</th>
                <th style="width: 52%;">Description of Academic Services</th>
                <th style="width: 20%; text-align: center;">SAC / HSN Code</th>
                <th style="width: 20%; text-align: right;">Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><strong>Institutional Coaching &amp; Classroom Lectures</strong><br/><small style="color: #64748B;">Advanced JEE/NEET Faculty Lectures (Term 2026-27)</small></td>
                <td style="text-align: center; font-family: monospace;">999293</td>
                <td style="text-align: right; font-weight: 700;">₹42,000.00</td>
              </tr>
              <tr>
                <td>2</td>
                <td><strong>Comprehensive DLP Study Material &amp; DPPs</strong><br/><small style="color: #64748B;">Kota Formula Booklets &amp; Question Vaults</small></td>
                <td style="text-align: center; font-family: monospace;">490110</td>
                <td style="text-align: right; font-weight: 700;">₹8,500.00</td>
              </tr>
              <tr>
                <td>3</td>
                <td><strong>National All-India CBT Test Series &amp; AI Analytics</strong><br/><small style="color: #64748B;">Biometric Turnstile &amp; Cloud Portal Telemetry</small></td>
                <td style="text-align: center; font-family: monospace;">998431</td>
                <td style="text-align: right; font-weight: 700;">₹4,500.00</td>
              </tr>
              <tr>
                <td>4</td>
                <td><strong>Central GST (CGST @ 9.0%)</strong></td>
                <td style="text-align: center; font-family: monospace;">-</td>
                <td style="text-align: right; font-weight: 700;">₹4,950.00</td>
              </tr>
              <tr>
                <td>5</td>
                <td><strong>State GST (SGST @ 9.0%)</strong></td>
                <td style="text-align: center; font-family: monospace;">-</td>
                <td style="text-align: right; font-weight: 700;">₹4,950.00</td>
              </tr>
              <tr style="background: #F8FAFC; border-top: 2px solid #013284;">
                <td colspan="3" style="font-weight: 900; color: #013284; font-size: 0.95rem;">
                  TOTAL AMOUNT RECEIVED (INR):
                </td>
                <td style="text-align: right; font-weight: 900; color: #013284; font-size: 1.15rem; font-family: 'Outfit', sans-serif;">
                  ₹64,900.00
                </td>
              </tr>
            </tbody>
          </table>

          <div style="font-size: 0.78rem; color: #475569; margin-bottom: 1.5rem;">
            <strong>Amount in Words:</strong> Sixty Four Thousand Nine Hundred Rupees Only.<br/>
            <strong>Payment Mode:</strong> HDFC PG / Biometric UPI (Txn Ref: #UPI-992841-APX) • <strong>Balance Remaining: ₹0.00</strong>
          </div>

          <!-- Signatures & Verification Stamp -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #E2E8F0; padding-top: 1.5rem; flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <!-- Simulated Stamp -->
              <div style="border: 2px solid #059669; border-radius: 8px; padding: 6px 12px; color: #059669; font-size: 0.7rem; font-weight: 900; text-align: center; transform: rotate(-3deg);">
                ✓ VERIFIED &amp; AUDITED<br/>
                <span style="font-size: 0.62rem;">APEX ACCOUNTS DIVISION</span>
              </div>
              <div style="font-size: 0.74rem; color: #64748B;">
                SHA-256 Hash:<br/>
                <code style="font-family: monospace; color: #0F172A;">8F2A-99B1-APX-${student.rollNo}-2026</code>
              </div>
            </div>

            <div style="text-align: right;">
              <div style="font-family: cursive; font-size: 1.15rem; color: #013284; margin-bottom: 0.25rem;">
                Sunil Verma
              </div>
              <strong style="font-size: 0.78rem; color: #0F172A; display: block;">Authorized Signatory &amp; Registrar</strong>
              <span style="font-size: 0.7rem; color: #64748B;">Apex Academy Central Accounts Division</span>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="receipt-actions" style="margin-top: 2rem; display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid #E2E8F0; padding-top: 1rem;">
            <button type="button" class="btn btn-outline" style="border-color: #64748B; color: #334155; font-weight: 700;" onclick="KaviroxWidget.closeReceiptModal()">
              Close Window
            </button>
            <button type="button" class="btn btn-primary" style="font-weight: 800; background: #013284;" onclick="window.print()">
              🖨️ Print Official Receipt
            </button>
          </div>
        </div>
      </div>
    `;
  },

  closeReceiptModal() {
    const modal = document.getElementById('receipt-modal-container');
    if (modal) modal.innerHTML = '';
  },

  renderInstituteWebsite() {
    return this.render(true);
  }
};
