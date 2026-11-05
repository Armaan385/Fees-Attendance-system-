// ==========================================================================
// Apex Campus OS - Interactive AI Facial Recognition Attendance Scanner
// Real-Time Optical Turnstile Simulation & Complete Everyday Single Detail Register
// ==========================================================================

window.CampusAiAttendanceSimulator = {
  activeTab: 'scanner', // 'scanner' | 'everyday' | 'calendar' | 'whatsapp'
  activeStudentIndex: 0,
  isScanning: false,
  scanMode: 'in', // 'in' (Punch-In) | 'out' (Punch-Out)
  lastScanResult: null,
  inspectedDay: 27, // currently inspected day
  filterStatus: 'all', // 'all' | 'present' | 'late' | 'holiday'

  students: [
    {
      id: "STU-001",
      name: "Aarav Sharma",
      rollNo: "APX-101",
      batch: "IIT-JEE Advanced (Top 50 Super Batch)",
      parent: "Dr. Rajeshwar Sharma",
      phone: "+91 98100 12345",
      photo: "images/aarav_sharma.jpg",
      confidence: "99.8%",
      gate: "Kota North Gate #1 (Turnstile 1A - Cam 01)",
      monthlyRate: "96.2%",
      totalPresent: 23,
      totalLate: 1,
      totalWorking: 24,
      avgInTime: "07:54 AM",
      avgOutTime: "04:32 PM",
      avgHours: "8h 38m"
    },
    {
      id: "STU-002",
      name: "Priya Verma",
      rollNo: "APX-102",
      batch: "NEET-UG Medical Champions Batch",
      parent: "Mr. Suresh Verma",
      phone: "+91 98200 67890",
      photo: "images/priya_verma.jpg",
      confidence: "99.4%",
      gate: "South Hostel Wing Gate #2 (Turnstile 2B - Cam 04)",
      monthlyRate: "94.2%",
      totalPresent: 22,
      totalLate: 2,
      totalWorking: 24,
      avgInTime: "07:58 AM",
      avgOutTime: "04:30 PM",
      avgHours: "8h 32m"
    },
    {
      id: "STU-003",
      name: "Rohan Patel",
      rollNo: "APX-103",
      batch: "Class 11 STEM & Olympiad Foundation",
      parent: "Mrs. Meenakshi Patel",
      phone: "+91 98400 11223",
      photo: "images/rohan_patel.jpg",
      confidence: "99.9%",
      gate: "Main Academic Porch Gate #1 (Turnstile 1C - Cam 02)",
      monthlyRate: "98.5%",
      totalPresent: 24,
      totalLate: 0,
      totalWorking: 24,
      avgInTime: "07:49 AM",
      avgOutTime: "04:35 PM",
      avgHours: "8h 46m"
    },
    {
      id: "STU-004",
      name: "Sneha Kulkarni",
      rollNo: "APX-104",
      batch: "Class 10 Board Foundation & NTSE",
      parent: "Mr. Anand Kulkarni",
      phone: "+91 98300 44556",
      photo: "images/sneha_kulkarni.jpg",
      confidence: "99.6%",
      gate: "Library Bio-Turnstile Gate #4 (Cam 03)",
      monthlyRate: "95.8%",
      totalPresent: 23,
      totalLate: 1,
      totalWorking: 24,
      avgInTime: "07:56 AM",
      avgOutTime: "04:28 PM",
      avgHours: "8h 32m"
    }
  ],

  // Generate authentic everyday single detail log for all 27 days of October 2026
  getDailyAttendanceLog(studentId) {
    const student = this.students.find(s => s.id === studentId) || this.students[0];
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let day = 27; day >= 1; day--) {
      // 2026-10-01 was a Thursday
      // Date(2026, 9, day) -> month index 9 is October
      const dateObj = new Date(2026, 9, day);
      const dayOfWeek = dayNames[dateObj.getDay()];
      const isSunday = dateObj.getDay() === 0;
      const isGandhiJayanti = day === 2;

      let status = "PRESENT";
      let statusClass = "present";
      let inTime = "07:54 AM";
      let outTime = "04:32 PM";
      let hours = "8h 38m";
      let temp = "98.2°F";
      let gate = student.gate;
      let notes = "Verified by AI Neural Face Cam #1 • Turnstile Gate 1";
      let alertStatus = "Delivered ✓✓";

      if (isSunday) {
        status = "SUNDAY";
        statusClass = "holiday";
        inTime = "--";
        outTime = "--";
        hours = "--";
        temp = "--";
        gate = "Campus Closed / Study Vault Open";
        notes = "Weekly Institutional Holiday. Silent Study Vault accessible.";
        alertStatus = "N/A";
      } else if (isGandhiJayanti) {
        status = "NATIONAL HOLIDAY";
        statusClass = "holiday";
        inTime = "--";
        outTime = "--";
        hours = "--";
        temp = "--";
        gate = "All Gates Secured";
        notes = "Gandhi Jayanti Gazetted Holiday. Online DPP assignments active.";
        alertStatus = "N/A";
      } else if (day === 18 && student.id === 'STU-001') {
        status = "LATE ARRIVAL";
        statusClass = "late";
        inTime = "08:12 AM";
        outTime = "04:35 PM";
        hours = "8h 23m";
        temp = "98.4°F";
        notes = "Turnstile punch logged at 08:12 AM. Parent SMS & WhatsApp late arrival notice sent.";
        alertStatus = "Delivered ✓✓ (Late)";
      } else if (day === 12 && student.id === 'STU-002') {
        status = "AUTHORIZED LEAVE";
        statusClass = "late";
        inTime = "--";
        outTime = "--";
        hours = "--";
        temp = "--";
        notes = "Prior medical sanction approved by Academic Director Dr. Rajesh Sharma.";
        alertStatus = "Leave Approved";
      } else {
        // Realistic variation in punch times
        const inMins = 48 + ((day * 7) % 15);
        const outMins = 25 + ((day * 3) % 20);
        inTime = `07:${inMins < 10 ? '0' + inMins : inMins} AM`;
        outTime = `04:${outMins < 10 ? '0' + outMins : outMins} PM`;
        const tempDec = 2 + ((day * 2) % 4);
        temp = `98.${tempDec}°F`;
      }

      days.push({
        day,
        dayOfWeek,
        dateFormatted: `${day < 10 ? '0' + day : day} Oct 2026 (${dayOfWeek})`,
        status,
        statusClass,
        inTime,
        outTime,
        hours,
        temp,
        gate,
        notes,
        alertStatus,
        confidence: isSunday || isGandhiJayanti ? "--" : student.confidence
      });
    }

    return days;
  },

  setActiveTab(tab) {
    this.activeTab = tab;
    if (window.playFxSound) window.playFxSound('tab');
    this.update();
  },

  selectStudent(idx) {
    this.activeStudentIndex = idx;
    this.lastScanResult = null;
    if (window.playFxSound) window.playFxSound('click');
    this.update();
  },

  setFilterStatus(status) {
    this.filterStatus = status;
    if (window.playFxSound) window.playFxSound('click');
    this.update();
  },

  inspectDay(dayNum) {
    this.inspectedDay = dayNum;
    if (window.playFxSound) window.playFxSound('click');
    this.update();
  },

  triggerScan(mode = 'in') {
    if (this.isScanning) return;
    this.isScanning = true;
    this.scanMode = mode;
    this.lastScanResult = null;
    this.update();

    if (window.playFxSound) {
      window.playFxSound('click');
    }

    setTimeout(() => {
      this.isScanning = false;
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      const student = this.students[this.activeStudentIndex];
      
      this.lastScanResult = {
        time: timeStr,
        mode: this.scanMode,
        confidence: student.confidence,
        gate: student.gate,
        thermal: "98.4°F Normal",
        liveness: "99.8% (3D FaceMesh Landmark Depth Pass)",
        antiSpoof: "PASSED (Zero Mask/Photo Glitch)"
      };

      if (window.playFxSound) {
        window.playFxSound('success');
      }

      if (window.kaviroxApp && window.kaviroxApp.showToast) {
        window.kaviroxApp.showToast(`Biometric Verified: ${student.name} (${student.rollNo}) - ${this.scanMode === 'in' ? 'Check-In' : 'Departure'} Recorded!`, 'success');
      }

      this.update();
    }, 1100);
  },

  render() {
    const student = this.students[this.activeStudentIndex];
    const dailyLogs = this.getDailyAttendanceLog(student.id);
    const inspectedRecord = dailyLogs.find(d => d.day === this.inspectedDay) || dailyLogs[0];

    return `
      <div class="ai-terminal-wrapper">
        <!-- Terminal Header -->
        <div style="padding: 1.5rem 2rem 1rem; background: rgba(15, 23, 42, 0.85); border-bottom: 1px solid rgba(255, 255, 255, 0.08); display: flex; flex-direction: column; gap: 1rem;">
          <div class="d-flex justify-between items-center flex-wrap gap-2">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span class="live-dot-pulse" style="background: #38BDF8; box-shadow: 0 0 14px #38BDF8;"></span>
              <div>
                <h3 style="font-size: 1.35rem; font-weight: 900; color: #FFFFFF; margin: 0; font-family: 'Outfit', sans-serif;">
                  AI Facial Recognition Attendance Scanner
                </h3>
                <span style="font-size: 0.75rem; color: #94A3B8; font-weight: 700;">
                  Kota Campus Biometric Turnstiles • 4K Optical Sensor &amp; Real-Time Parent Telemetry
                </span>
              </div>
            </div>

            <!-- Terminal Telemetry Badges -->
            <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
              <span style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #34D399; padding: 4px 12px; border-radius: 20px; font-size: 0.72rem; font-weight: 800; display: inline-flex; align-items: center; gap: 5px;">
                <span>●</span> 60 FPS Camera Active
              </span>
              <span style="background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.4); color: #38BDF8; padding: 4px 12px; border-radius: 20px; font-size: 0.72rem; font-weight: 800; font-family: 'JetBrains Mono', monospace;">
                3D LIVENESS ON (0.012s)
              </span>
            </div>
          </div>

          <!-- Feature Navigation Tabs -->
          <div class="ai-terminal-nav-tabs">
            <button 
              type="button" 
              class="w-tab ${this.activeTab === 'scanner' ? 'active' : ''}" 
              onclick="CampusAiAttendanceSimulator.setActiveTab('scanner')"
            >
              <span>📷 Live Camera &amp; AI Scanner</span>
            </button>
            <button 
              type="button" 
              class="w-tab ${this.activeTab === 'everyday' ? 'active' : ''}" 
              onclick="CampusAiAttendanceSimulator.setActiveTab('everyday')"
            >
              <span>📅 Everyday Single Detail Register</span>
              <span class="w-tab-badge" style="background: rgba(16, 185, 129, 0.3); color: #34D399;">27 Days</span>
            </button>
            <button 
              type="button" 
              class="w-tab ${this.activeTab === 'calendar' ? 'active' : ''}" 
              onclick="CampusAiAttendanceSimulator.setActiveTab('calendar')"
            >
              <span>🗓️ Monthly Heatmap (Oct 2026)</span>
            </button>
            <button 
              type="button" 
              class="w-tab ${this.activeTab === 'whatsapp' ? 'active' : ''}" 
              onclick="CampusAiAttendanceSimulator.setActiveTab('whatsapp')"
            >
              <span>📲 Parent WhatsApp Dispatch Stream</span>
            </button>
          </div>
        </div>

        <!-- Student Switcher Bar (Available Across All Tabs) -->
        <div style="padding: 1rem 2rem; background: rgba(15, 23, 42, 0.5); border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
            <span style="font-size: 0.76rem; color: #94A3B8; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">
              Select Enrolled Student:
            </span>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${this.students.map((s, idx) => `
                <button 
                  type="button"
                  class="v-quick-pill ${idx === this.activeStudentIndex ? 'active' : ''}"
                  onclick="CampusAiAttendanceSimulator.selectStudent(${idx})"
                >
                  <img src="${s.photo}" alt="${s.name}" style="width: 22px; height: 22px; border-radius: 50%; object-fit: cover; border: 1px solid #38BDF8;" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👤</text></svg>'"/>
                  <span>${s.name} (${s.rollNo})</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div style="font-size: 0.78rem; color: #CBD5E1; display: flex; align-items: center; gap: 0.5rem;">
            <span>Current Month Attendance:</span>
            <strong style="color: #34D399; font-size: 0.95rem; font-family: 'Outfit', sans-serif;">
              ${student.monthlyRate}
            </strong>
            <span style="color: #64748B;">(${student.totalPresent}/${student.totalWorking} Days Present)</span>
          </div>
        </div>

        <!-- Tab Body -->
        <div style="padding: 2rem;">
          ${this.renderActiveTabContent(student, dailyLogs, inspectedRecord)}
        </div>
      </div>
    `;
  },

  renderActiveTabContent(student, dailyLogs, inspectedRecord) {
    // ------------------------------------------------------------------------
    // SUB-VIEW 1: Live AI Facial Camera & Neural Scanner
    // ------------------------------------------------------------------------
    if (this.activeTab === 'scanner') {
      const isScanComplete = Boolean(this.lastScanResult);

      return `
        <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: 2.25rem; align-items: center;">
          <!-- Left: 4K Neural Camera Viewfinder -->
          <div>
            <div class="ai-face-scanner-box">
              ${this.isScanning ? '<div class="ai-face-scanner-laser"></div>' : ''}
              
              <!-- Video Stream Background Simulation -->
              <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <img 
                  src="${student.photo}" 
                  alt="${student.name}" 
                  style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.95) contrast(1.03); transform: scale(1.05);"
                  onerror="this.style.display='none'"
                />
              </div>

              <!-- HUD Top Camera Telemetry -->
              <div style="position: absolute; top: 12px; left: 14px; right: 14px; display: flex; justify-content: space-between; font-size: 0.68rem; color: #38BDF8; font-family: 'JetBrains Mono', monospace; z-index: 15; text-shadow: 0 1px 4px #000;">
                <span>LIVE FEED • 4K SENSOR</span>
                <span style="color: #10B981;">3D DEPTH: OK (468 PTS)</span>
              </div>

              <!-- Bottom Scan HUD Status Tag -->
              <div class="ai-scan-hud-tag">
                <div>
                  <strong style="color: #FFFFFF; font-size: 0.88rem; display: block;">${student.name}</strong>
                  <span style="color: #94A3B8; font-size: 0.7rem;">Roll: ${student.rollNo} • Gate 1 Turnstile</span>
                </div>
                <div style="text-align: right;">
                  <span style="color: ${this.isScanning ? '#F59E0B' : isScanComplete ? '#10B981' : '#38BDF8'}; font-weight: 800; font-size: 0.82rem;">
                    ${this.isScanning ? '⚡ AI MATCHING...' : isScanComplete ? '✓ VERIFIED 99.8%' : 'READY TO SCAN'}
                  </span>
                  <div style="font-size: 0.68rem; color: #94A3B8;">Thermal: 98.4°F Normal</div>
                </div>
              </div>
            </div>

            <!-- Fast In / Out Punch Buttons -->
            <div style="display: flex; gap: 0.75rem; margin-top: 1.25rem;">
              <button 
                type="button" 
                class="btn btn-primary" 
                style="flex: 1; padding: 0.85rem; font-weight: 800; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
                onclick="CampusAiAttendanceSimulator.triggerScan('in')"
                ${this.isScanning ? 'disabled' : ''}
              >
                <span>⚡ Trigger Morning Check-In (In-Punch)</span>
              </button>
              <button 
                type="button" 
                class="btn btn-outline" 
                style="flex: 1; padding: 0.85rem; font-weight: 800; border-radius: 12px; border-color: rgba(96, 165, 250, 0.4); color: #60A5FA; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
                onclick="CampusAiAttendanceSimulator.triggerScan('out')"
                ${this.isScanning ? 'disabled' : ''}
              >
                <span>🚪 Trigger Departure (Out-Punch)</span>
              </button>
            </div>
          </div>

          <!-- Right: Verification Card & Instant WhatsApp Alert Dispatch -->
          <div>
            <div style="background: rgba(15, 23, 42, 0.65); padding: 1.5rem; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.6rem;">
                <span style="font-size: 0.74rem; color: #94A3B8; font-weight: 800; text-transform: uppercase;">Biometric Profile Dossier</span>
                <span style="background: rgba(37, 99, 235, 0.2); color: #60A5FA; font-size: 0.74rem; font-weight: 800; padding: 2px 8px; border-radius: 6px; font-family: 'JetBrains Mono', monospace;">
                  ${student.rollNo}
                </span>
              </div>

              <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
                <img src="${student.photo}" alt="${student.name}" style="width: 50px; height: 50px; border-radius: 12px; object-fit: cover; border: 2px solid #10B981;"/>
                <div>
                  <strong style="font-size: 1.25rem; color: #FFFFFF; font-family: 'Outfit', sans-serif; display: block;">
                    ${student.name}
                  </strong>
                  <span style="font-size: 0.8rem; color: #94A3B8;">${student.batch}</span>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; font-size: 0.78rem;">
                <div style="background: rgba(3, 7, 18, 0.5); padding: 0.65rem; border-radius: 8px;">
                  <span style="color: #64748B; display: block; font-size: 0.68rem; text-transform: uppercase;">Registered Guardian:</span>
                  <strong style="color: #FFFFFF;">${student.parent}</strong>
                </div>
                <div style="background: rgba(3, 7, 18, 0.5); padding: 0.65rem; border-radius: 8px;">
                  <span style="color: #64748B; display: block; font-size: 0.68rem; text-transform: uppercase;">Mobile SMS/WhatsApp:</span>
                  <strong style="color: #38BDF8; font-family: 'JetBrains Mono', monospace;">${student.phone}</strong>
                </div>
              </div>
            </div>

            <!-- Instant WhatsApp Result Target -->
            <div id="ai-scan-alert-target">
              ${this.lastScanResult ? this.renderAlertSuccess(student) : `
                <div style="padding: 1.5rem; border-radius: 14px; border: 1.5px dashed rgba(255, 255, 255, 0.15); text-align: center; font-size: 0.84rem; color: #94A3B8; background: rgba(3, 7, 18, 0.3);">
                  <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚡</div>
                  <strong style="color: #FFFFFF; display: block; margin-bottom: 0.3rem;">Scanner Armed &amp; Waiting</strong>
                  <span>Click <strong>"Trigger Morning Check-In"</strong> above to test instantaneous identity verification, biometric timestamping, and automatic parent WhatsApp alert dispatch.</span>
                </div>
              `}
            </div>
          </div>
        </div>
      `;
    }

    // ------------------------------------------------------------------------
    // SUB-VIEW 2: Complete Everyday Single Detail Register
    // ------------------------------------------------------------------------
    if (this.activeTab === 'everyday') {
      let filteredDays = dailyLogs;
      if (this.filterStatus === 'present') filteredDays = dailyLogs.filter(d => d.status === 'PRESENT');
      else if (this.filterStatus === 'late') filteredDays = dailyLogs.filter(d => d.status.includes('LATE'));
      else if (this.filterStatus === 'holiday') filteredDays = dailyLogs.filter(d => d.status === 'SUNDAY' || d.status.includes('HOLIDAY'));

      return `
        <div>
          <!-- Top Analytics Bar -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            <div class="v-item">
              <span class="v-item-label">Total Month Days</span>
              <span class="v-item-value">27 Days Logged</span>
              <span style="font-size: 0.72rem; color: #64748B;">Oct 1 – Oct 27, 2026</span>
            </div>
            <div class="v-item">
              <span class="v-item-label">Present (On-Time)</span>
              <span class="v-item-value" style="color: #34D399;">${student.totalPresent} Days</span>
              <span style="font-size: 0.72rem; color: #10B981;">96.0% On-Time Record</span>
            </div>
            <div class="v-item">
              <span class="v-item-label">Average Punch-In</span>
              <span class="v-item-value" style="color: #38BDF8;">${student.avgInTime}</span>
              <span style="font-size: 0.72rem; color: #64748B;">Turnstile 1A Kota</span>
            </div>
            <div class="v-item">
              <span class="v-item-label">Average Duration</span>
              <span class="v-item-value" style="color: #FBBF24;">${student.avgHours}</span>
              <span style="font-size: 0.72rem; color: #F59E0B;">208 hrs classroom study</span>
            </div>
          </div>

          <!-- Controls & Filters -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;">
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
              <button class="v-quick-pill ${this.filterStatus === 'all' ? 'active' : ''}" onclick="CampusAiAttendanceSimulator.setFilterStatus('all')">
                All Days (27)
              </button>
              <button class="v-quick-pill ${this.filterStatus === 'present' ? 'active' : ''}" onclick="CampusAiAttendanceSimulator.setFilterStatus('present')">
                ✓ Present (${student.totalPresent})
              </button>
              <button class="v-quick-pill ${this.filterStatus === 'late' ? 'active' : ''}" onclick="CampusAiAttendanceSimulator.setFilterStatus('late')">
                ⚠️ Late Arrivals (${student.totalLate})
              </button>
              <button class="v-quick-pill ${this.filterStatus === 'holiday' ? 'active' : ''}" onclick="CampusAiAttendanceSimulator.setFilterStatus('holiday')">
                🗓️ Sundays &amp; Holidays (4)
              </button>
            </div>
            <span style="font-size: 0.76rem; color: #94A3B8;">
              Showing every single day audit record for <strong>${student.name}</strong>
            </span>
          </div>

          <!-- Detailed Day-by-Day Table -->
          <div class="ai-table-scroll-wrap" style="background: rgba(3, 7, 18, 0.65); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow-x: auto;">
            <table class="ai-everyday-table">
              <thead>
                <tr>
                  <th style="width: 15%;">Date &amp; Day</th>
                  <th style="width: 14%;">Morning In-Punch</th>
                  <th style="width: 14%;">Evening Out-Punch</th>
                  <th style="width: 12%;">Duration</th>
                  <th style="width: 18%;">Gate Turnstile</th>
                  <th style="width: 10%;">Thermal Check</th>
                  <th style="width: 17%;">Attendance Status</th>
                </tr>
              </thead>
              <tbody>
                ${filteredDays.map(d => `
                  <tr style="cursor: pointer;" onclick="CampusAiAttendanceSimulator.inspectDay(${d.day})">
                    <td>
                      <strong style="color: #FFFFFF; font-family: 'JetBrains Mono', monospace;">${d.dateFormatted}</strong>
                    </td>
                    <td>
                      ${d.inTime !== '--' ? `
                        <span style="color: ${d.status === 'LATE ARRIVAL' ? '#F59E0B' : '#34D399'}; font-weight: 800; font-family: 'JetBrains Mono', monospace;">
                          ${d.inTime}
                        </span>
                      ` : '<span style="color: #64748B;">--</span>'}
                    </td>
                    <td>
                      <span style="color: #CBD5E1; font-family: 'JetBrains Mono', monospace;">${d.outTime}</span>
                    </td>
                    <td>
                      <span style="color: #38BDF8; font-weight: 700;">${d.hours}</span>
                    </td>
                    <td>
                      <span style="font-size: 0.74rem; color: #94A3B8;">${d.gate}</span>
                    </td>
                    <td>
                      <span style="font-size: 0.76rem; color: ${d.temp !== '--' ? '#34D399' : '#64748B'}; font-weight: 700;">
                        ${d.temp}
                      </span>
                    </td>
                    <td>
                      <span style="font-size: 0.72rem; font-weight: 800; padding: 3px 10px; border-radius: 20px; display: inline-block; ${
                        d.status === 'PRESENT' ? 'background: rgba(16, 185, 129, 0.15); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.4);' :
                        d.status === 'LATE ARRIVAL' ? 'background: rgba(245, 158, 11, 0.15); color: #FBBF24; border: 1px solid rgba(245, 158, 11, 0.4);' :
                        'background: rgba(255, 255, 255, 0.08); color: #94A3B8; border: 1px solid rgba(255, 255, 255, 0.1);'
                      }">
                        ${d.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Highlight of Inspected Day Audit -->
          <div style="margin-top: 1.5rem; background: linear-gradient(145deg, rgba(37, 99, 235, 0.12) 0%, rgba(15, 23, 42, 0.75) 100%); border: 1.5px solid rgba(56, 189, 248, 0.35); border-radius: 16px; padding: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.85rem; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <span style="font-size: 0.72rem; color: #38BDF8; font-weight: 800; text-transform: uppercase;">
                  DAY AUDIT INSPECTION REPORT
                </span>
                <h4 style="font-size: 1.2rem; color: #FFFFFF; font-weight: 900; margin: 0.2rem 0 0; font-family: 'Outfit', sans-serif;">
                  ${inspectedRecord.dateFormatted} • ${inspectedRecord.status}
                </h4>
              </div>
              <span style="font-size: 0.74rem; color: #34D399; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); padding: 4px 12px; border-radius: 20px; font-weight: 800;">
                WhatsApp Alert: ${inspectedRecord.alertStatus}
              </span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; font-size: 0.84rem;">
              <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">In-Punch Timestamp:</span>
                <strong style="color: #FFFFFF; font-family: 'JetBrains Mono', monospace;">${inspectedRecord.inTime}</strong>
              </div>
              <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Out-Punch Timestamp:</span>
                <strong style="color: #FFFFFF; font-family: 'JetBrains Mono', monospace;">${inspectedRecord.outTime}</strong>
              </div>
              <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Biometric Match Confidence:</span>
                <strong style="color: #38BDF8;">${inspectedRecord.confidence}</strong>
              </div>
              <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block; text-transform: uppercase;">Turnstile Gate Location:</span>
                <strong style="color: #E2E8F0;">${inspectedRecord.gate}</strong>
              </div>
            </div>

            <div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px solid rgba(255,255,255,0.06); font-size: 0.8rem; color: #94A3B8;">
              Audit Memo: <strong style="color: #CBD5E1;">${inspectedRecord.notes}</strong>
            </div>
          </div>
        </div>
      `;
    }

    // ------------------------------------------------------------------------
    // SUB-VIEW 3: Monthly Heatmap Calendar (October 2026)
    // ------------------------------------------------------------------------
    if (this.activeTab === 'calendar') {
      const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      // October 2026 started on Thursday (3 empty slots in Monday-first calendar)
      const emptyDays = [null, null, null];
      const calDays = [];
      for (let d = 1; d <= 31; d++) {
        const record = dailyLogs.find(l => l.day === d);
        calDays.push({
          day: d,
          record: record || { status: d > 27 ? 'UPCOMING' : 'PRESENT', statusClass: d > 27 ? 'holiday' : 'present' }
        });
      }

      return `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
            <div>
              <h4 style="font-size: 1.25rem; color: #FFFFFF; font-weight: 900; margin: 0 0 0.25rem; font-family: 'Outfit', sans-serif;">
                October 2026 Biometric Attendance Heatmap
              </h4>
              <span style="font-size: 0.78rem; color: #94A3B8;">
                Visual everyday inspection for <strong>${student.name}</strong> • Click any day to view verified punch details
              </span>
            </div>

            <!-- Legend -->
            <div style="display: flex; gap: 0.75rem; font-size: 0.74rem; align-items: center; flex-wrap: wrap;">
              <span style="display: flex; align-items: center; gap: 5px;">
                <span style="width: 10px; height: 10px; border-radius: 50%; background: #10B981;"></span> On-Time Present
              </span>
              <span style="display: flex; align-items: center; gap: 5px;">
                <span style="width: 10px; height: 10px; border-radius: 50%; background: #F59E0B;"></span> Late Arrival
              </span>
              <span style="display: flex; align-items: center; gap: 5px;">
                <span style="width: 10px; height: 10px; border-radius: 50%; background: #64748B;"></span> Holiday / Sunday
              </span>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="ai-calendar-grid">
            ${weekdays.map(w => `<div class="ai-cal-header">${w}</div>`).join('')}
            ${emptyDays.map(() => `<div></div>`).join('')}
            ${calDays.map(c => `
              <div 
                class="ai-cal-day ${c.record.statusClass} ${this.inspectedDay === c.day ? 'active' : ''}"
                onclick="CampusAiAttendanceSimulator.inspectDay(${c.day})"
              >
                <span class="ai-cal-day-num">${c.day}</span>
                <span class="ai-cal-day-status" style="
                  ${c.record.statusClass === 'present' ? 'background: rgba(16, 185, 129, 0.2); color: #34D399;' : 
                    c.record.statusClass === 'late' ? 'background: rgba(245, 158, 11, 0.2); color: #FBBF24;' : 
                    'background: rgba(255, 255, 255, 0.08); color: #64748B;'}
                ">
                  ${c.day > 27 ? 'Pending' : c.record.statusClass === 'present' ? 'Present' : c.record.statusClass === 'late' ? 'Late' : 'Holiday'}
                </span>
              </div>
            `).join('')}
          </div>

          <!-- Selected Day Inspection Box -->
          <div style="margin-top: 1.5rem; background: rgba(3, 7, 18, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <span style="font-size: 0.72rem; color: #38BDF8; font-weight: 800; text-transform: uppercase;">Selected Inspection Day:</span>
              <div style="font-size: 1.15rem; font-weight: 800; color: #FFFFFF;">
                ${inspectedRecord.dateFormatted} — <span style="color: #34D399;">${inspectedRecord.status}</span>
              </div>
              <span style="font-size: 0.76rem; color: #94A3B8;">
                In: <strong style="color: #FFF;">${inspectedRecord.inTime}</strong> • Out: <strong style="color: #FFF;">${inspectedRecord.outTime}</strong> • Duration: ${inspectedRecord.hours} • Gate: ${inspectedRecord.gate}
              </span>
            </div>
            <button type="button" class="btn btn-sm btn-outline" style="border-color: #38BDF8; color: #38BDF8; font-weight: 800;" onclick="CampusAiAttendanceSimulator.setActiveTab('everyday')">
              Open Full Daily Audit Register →
            </button>
          </div>
        </div>
      `;
    }

    // ------------------------------------------------------------------------
    // SUB-VIEW 4: Parent WhatsApp Alert Stream Simulation
    // ------------------------------------------------------------------------
    if (this.activeTab === 'whatsapp') {
      return `
        <div style="max-width: 620px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <h4 style="font-size: 1.35rem; color: #FFFFFF; font-weight: 900; margin: 0 0 0.35rem; font-family: 'Outfit', sans-serif;">
              Instant WhatsApp Parent Notification Protocol
            </h4>
            <p style="font-size: 0.84rem; color: #94A3B8; margin: 0;">
              Every morning check-in and evening departure automatically triggers a verified WhatsApp SMS notice to the registered guardian within 0.8 seconds.
            </p>
          </div>

          <!-- Phone Frame Mockup -->
          <div style="background: #0B141A; border: 2px solid #202C33; border-radius: 20px; padding: 1.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
            <!-- WhatsApp Chat Header -->
            <div style="display: flex; align-items: center; gap: 0.85rem; border-bottom: 1px solid #202C33; padding-bottom: 0.85rem; margin-bottom: 1.25rem;">
              <div style="width: 42px; height: 42px; border-radius: 50%; background: #128C7E; color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
                🎓
              </div>
              <div style="flex: 1;">
                <strong style="color: #E9EDEF; font-size: 0.95rem; display: block;">Apex Academy Official Bot ✓</strong>
                <span style="font-size: 0.72rem; color: #25D366;">Automated Biometric Dispatcher • Online</span>
              </div>
            </div>

            <!-- Chat Message Bubbles -->
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <!-- Message 1 -->
              <div style="background: #005C4B; color: #E9EDEF; border-radius: 12px 12px 0 12px; padding: 1rem; font-size: 0.82rem; line-height: 1.5; max-width: 90%; align-self: flex-end; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 0.35rem;">
                  <strong style="color: #25D366; font-size: 0.78rem;">CAMPUS ENTRY NOTIFICATION (GATE 1)</strong>
                  <span style="font-size: 0.68rem; color: #A0C3B7;">07:54 AM</span>
                </div>
                Dear <strong>${student.parent}</strong>,<br/>
                Your ward <strong>${student.name} (${student.rollNo})</strong> has successfully punched into Kota Main Campus via AI Facial Optical Turnstile 1A at <strong>07:54 AM</strong> today.<br/>
                • Temperature: <strong>98.2°F Normal</strong><br/>
                • Biometric Match: <strong>99.8% Verified</strong><br/>
                • Status: <strong style="color: #25D366;">PRESENT • ON-TIME</strong>
              </div>

              <!-- Message 2 -->
              <div style="background: #005C4B; color: #E9EDEF; border-radius: 12px 12px 0 12px; padding: 1rem; font-size: 0.82rem; line-height: 1.5; max-width: 90%; align-self: flex-end; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 0.35rem;">
                  <strong style="color: #25D366; font-size: 0.78rem;">EVENING DEPARTURE NOTIFICATION</strong>
                  <span style="font-size: 0.68rem; color: #A0C3B7;">04:32 PM</span>
                </div>
                Dear <strong>${student.parent}</strong>,<br/>
                Your ward <strong>${student.name}</strong> has safely exited the classroom wing via South Turnstile at <strong>04:32 PM</strong>.<br/>
                Total Study Duration: <strong>8 hrs 38 mins</strong>. Have a safe journey home!
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },

  renderAlertSuccess(student) {
    const isOut = this.lastScanResult.mode === 'out';
    return `
      <div class="animate-slide-in" style="background: rgba(16, 185, 129, 0.1); border: 1.5px solid rgba(16, 185, 129, 0.45); border-radius: 16px; padding: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <span style="font-size: 0.8rem; font-weight: 800; color: #34D399; display: flex; align-items: center; gap: 0.4rem;">
            <span>✓</span> BIOMETRIC ${isOut ? 'DEPARTURE' : 'ENTRY'} LOGGED (${this.lastScanResult.time})
          </span>
          <span style="background: rgba(16, 185, 129, 0.2); color: #34D399; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 20px; font-family: 'JetBrains Mono', monospace;">
            Match: ${this.lastScanResult.confidence}
          </span>
        </div>
        
        <div style="font-size: 0.82rem; color: #E2E8F0; line-height: 1.5; margin-bottom: 0.85rem;">
          Punch recorded at <strong>${this.lastScanResult.gate}</strong>. Anti-spoofing liveness verification passed with zero optical discrepancy.
        </div>

        <!-- Simulated WhatsApp Alert -->
        <div style="background: #0B141A; border: 1px solid #202C33; border-left: 4px solid #25D366; border-radius: 10px; padding: 0.85rem; font-size: 0.78rem; color: #E9EDEF;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
            <strong style="color: #25D366; display: flex; align-items: center; gap: 0.35rem;">
              <span>📲</span> Instant WhatsApp Alert Delivered to Guardian
            </strong>
            <span style="font-size: 0.68rem; color: #94A3B8;">Just now</span>
          </div>
          <p style="margin: 0; line-height: 1.45; color: #CBD5E1;">
            "Dear ${student.parent}, your ward <strong>${student.name} (${student.rollNo})</strong> has ${isOut ? 'completed afternoon sessions and departed campus' : 'safely punched into campus'} at <strong>${this.lastScanResult.time}</strong>. Status: <strong>PRESENT</strong>. Verified by Kota Turnstile Facial AI."
          </p>
        </div>
      </div>
    `;
  },

  update() {
    const el = document.getElementById('ai-attendance-simulator-root');
    if (el) el.innerHTML = this.render();
  }
};
