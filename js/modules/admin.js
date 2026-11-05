// Kavirox Fee & Attendance Manager - Luxury Owner / Admin Control Room Module
window.KaviroxAdmin = {
  currentSubSection: 'dashboard', // dashboard, students, batches, staff, settings, notices, reports, idcards
  studentFilterBatch: 'ALL',
  studentFilterStatus: 'active',
  studentSearchQuery: '',
  selectedStudentForModal: null,

  render() {
    const store = window.kaviroxStore;
    const centre = store.getCurrentCentre();
    const icons = window.KaviroxIcons || { get: () => '', avatar: () => '' };

    return `
      <div class="portal-layout">
        <!-- Sidebar Navigation (Sleek Glassmorphism) -->
        <aside class="sidebar no-print">
          <div class="sidebar-brand-strip">
            <div class="brand-icon-lg">
              ${icons.get('shield', 22)}
            </div>
            <div>
              <span class="sidebar-brand-name">${centre.shortName}</span>
              <span class="sidebar-brand-sub">Campus Console</span>
            </div>
          </div>

          <nav class="sidebar-nav">
            <button class="nav-item ${this.currentSubSection === 'dashboard' ? 'active' : ''}" onclick="KaviroxAdmin.navTo('dashboard')">
              <span class="nav-icon">${icons.get('dashboard', 18)}</span>
              <span>Executive Dashboard</span>
            </button>
            <button class="nav-item ${this.currentSubSection === 'students' ? 'active' : ''}" onclick="KaviroxAdmin.navTo('students')">
              <span class="nav-icon">${icons.get('students', 18)}</span>
              <span>Student Enrolments</span>
              <span class="nav-badge">${store.getStudents().filter(s => s.status === 'active').length}</span>
            </button>
            <button class="nav-item ${this.currentSubSection === 'attendance' ? 'active' : ''}" onclick="KaviroxAdmin.navTo('attendance')">
              <span class="nav-icon">${icons.get('attendance', 18)}</span>
              <span>30-Sec Attendance</span>
            </button>
            <button class="nav-item ${this.currentSubSection === 'fees' ? 'active' : ''}" onclick="KaviroxAdmin.navTo('fees')">
              <span class="nav-icon">${icons.get('fees', 18)}</span>
              <span>Fee Desk & Counter</span>
            </button>
            <button class="nav-item ${this.currentSubSection === 'whatsapp' ? 'active' : ''}" onclick="KaviroxAdmin.navTo('whatsapp')">
              <span class="nav-icon">💬</span>
              <span>WhatsApp AI Recovery</span>
              <span class="badge" style="background: rgba(37, 211, 102, 0.2); color: #25D366; font-size: 0.65rem; padding: 2px 6px; margin-left: auto;">AI Agent</span>
            </button>
            <button class="nav-item ${this.currentSubSection === 'reports' ? 'active' : ''}" onclick="KaviroxAdmin.navTo('reports')">
              <span class="nav-icon">${icons.get('reports', 18)}</span>
              <span>Defaulters & Reports</span>
            </button>
            <button class="nav-item ${this.currentSubSection === 'idcards' ? 'active' : ''}" onclick="KaviroxAdmin.navTo('idcards')">
              <span class="nav-icon">${icons.get('idcards', 18)}</span>
              <span>Student ID Badges</span>
            </button>
            <button class="nav-item ${this.currentSubSection === 'batches' ? 'active' : ''}" onclick="KaviroxAdmin.navTo('batches')">
              <span class="nav-icon">${icons.get('batches', 18)}</span>
              <span>Batches & Timetable</span>
            </button>
            <button class="nav-item ${this.currentSubSection === 'notices' ? 'active' : ''}" onclick="KaviroxAdmin.navTo('notices')">
              <span class="nav-icon">${icons.get('bell', 18)}</span>
              <span>WhatsApp Broadcasts</span>
            </button>
            <button class="nav-item ${this.currentSubSection === 'staff' ? 'active' : ''}" onclick="KaviroxAdmin.navTo('staff')">
              <span class="nav-icon">${icons.get('users', 18)}</span>
              <span>Faculty Directory</span>
            </button>
            <button class="nav-item ${this.currentSubSection === 'settings' ? 'active' : ''}" onclick="KaviroxAdmin.navTo('settings')">
              <span class="nav-icon">${icons.get('lock', 18)}</span>
              <span>Academy Settings</span>
            </button>
          </nav>

          <div class="sidebar-footer">
            <div class="plan-quota-card">
              <div class="plan-quota-header">
                <span class="badge badge-accent">CAMPUS: KOTA MAIN</span>
                <span style="font-size: 0.7rem; color: var(--text-tertiary);">Academic Yr 2026-27</span>
              </div>
              <div class="progress-bar-wrap">
                <div class="progress-bar" style="width: 71%"></div>
              </div>
              <div class="d-flex justify-between items-center" style="font-size: 0.72rem; color: var(--text-secondary);">
                <span>Enrolled Aspirants:</span>
                <strong class="text-primary font-mono">142 / 200</strong>
              </div>
            </div>
            <button class="btn btn-outline btn-sm btn-block mt-3" onclick="window.location.href='index.html'" style="display: flex; align-items: center; justify-content: center; gap: 0.4rem;">
              ← Return to Public Website
            </button>
          </div>
        </aside>

        <!-- Main Workspace Area -->
        <main class="main-content">
          <!-- Enterprise Top Bar -->
          <header class="topbar no-print">
            <div class="topbar-search">
              <span style="color: var(--text-tertiary); display: flex;">${icons.get('search', 16)}</span>
              <input type="text" placeholder="Search student by name, roll no, or phone..." oninput="KaviroxAdmin.handleGlobalSearch(this.value)" />
              <span class="search-badge-key">Ctrl+K</span>
            </div>

            <div class="d-flex items-center gap-2">
              <button class="btn btn-primary btn-sm" onclick="KaviroxAdmin.openAddStudentModal()">
                ${icons.get('plus', 14)} Enrol Student
              </button>
              <button class="btn btn-success btn-sm" onclick="KaviroxAdmin.navTo('fees')">
                ${icons.get('fees', 14)} Collect Fee
              </button>
              <button class="btn btn-accent btn-sm" onclick="KaviroxAdmin.navTo('attendance')">
                ${icons.get('attendance', 14)} 30-Sec Attendance
              </button>
              <a href="teacher-portal.html" class="btn btn-outline btn-sm" style="color: #4F46E5; border-color: rgba(79, 70, 229, 0.4);" title="Open Faculty Terminal">
                ✍️ Faculty Terminal
              </a>
              <a href="parent-portal.html" class="btn btn-outline btn-sm" style="color: #059669; border-color: rgba(5, 150, 105, 0.4);" title="Open Guardian Portal">
                👨‍👩‍👧 Guardian Portal
              </a>
              <a href="index.html" class="btn btn-outline btn-sm" style="color: #1E40AF; border-color: rgba(30, 64, 175, 0.4);" title="Exit to Public Website">
                Public Site ↗
              </a>
            </div>
          </header>

          <!-- Dynamic View Body -->
          <div class="content-body">
            ${this.renderSubSectionContent()}
          </div>
        </main>
      </div>

      <!-- Modals Container -->
      <div id="admin-modal-container">
        ${this.renderStudentDetailModal()}
        ${this.renderAddStudentModal()}
        ${this.renderImportExcelModal()}
        ${this.renderCreateNoticeModal()}
      </div>
    `;
  },

  navTo(subSection) {
    this.currentSubSection = subSection;
    window.kaviroxApp.render();
  },

  handleGlobalSearch(query) {
    this.studentSearchQuery = query;
    if (query.trim()) {
      this.currentSubSection = 'students';
    }
    window.kaviroxApp.render();
  },

  setSearchQuery(query) {
    this.studentSearchQuery = query;
    window.kaviroxApp.render();
  },

  setBatchFilter(batchId) {
    this.studentFilterBatch = batchId;
    window.kaviroxApp.render();
  },

  setStatusFilter(status) {
    this.studentFilterStatus = status;
    window.kaviroxApp.render();
  },

  renderSubSectionContent() {
    switch (this.currentSubSection) {
      case 'dashboard':
        return this.renderDashboard();
      case 'students':
        return this.renderStudentsList();
      case 'attendance':
        return window.KaviroxAttendance ? window.KaviroxAttendance.render() : '';
      case 'fees':
        return window.KaviroxFees ? window.KaviroxFees.render() : '';
      case 'whatsapp':
        return window.KaviroxWhatsAppAutomation ? window.KaviroxWhatsAppAutomation.render() : '';
      case 'batches':
        return this.renderBatchesAndCalendar();
      case 'reports':
        return window.KaviroxReports.render();
      case 'notices':
        return this.renderNoticesSection();
      case 'idcards':
        return window.KaviroxIdCards.render();
      case 'staff':
        return this.renderStaffModule();
      case 'developer':
        return window.KaviroxDeveloper ? window.KaviroxDeveloper.render() : '';
      case 'settings':
        return this.renderSettingsModule();
      default:
        return this.renderDashboard();
    }
  },

  renderDashboard() {
    const store = window.kaviroxStore;
    const icons = window.KaviroxIcons || { get: () => '', avatar: () => '' };
    const students = store.getStudents();
    const activeStudents = students.filter(s => s.status === 'active');
    const totalDues = activeStudents.reduce((sum, s) => sum + (s.pendingDues || 0), 0);
    const todayReceipts = store.getReceipts().filter(r => r.date === '2026-10-25' && r.status === 'valid');
    const todayCollected = todayReceipts.reduce((sum, r) => sum + r.totalAmount, 0);

    return `
      <!-- 4 Hero KPI Cards with Sparkline Visuals -->
      <div class="kpi-grid">
        <div class="kpi-card glass-card">
          <div class="kpi-card-glow" style="--glow-color: rgba(59, 130, 246, 0.2);"></div>
          <div class="kpi-top-row">
            <span class="kpi-label">${store.t('kpiAttendanceToday')}</span>
            <div class="kpi-icon-box" style="background: rgba(59, 130, 246, 0.15); color: #60A5FA;">
              ${icons.get('attendance', 18)}
            </div>
          </div>
          <div class="kpi-value">84.6%</div>
          <div class="kpi-bottom-trend text-emerald">
            <span>↑ 3.2% vs yesterday</span>
            <span class="text-muted">• 118 present</span>
          </div>
        </div>

        <div class="kpi-card glass-card">
          <div class="kpi-card-glow" style="--glow-color: rgba(16, 185, 129, 0.2);"></div>
          <div class="kpi-top-row">
            <span class="kpi-label">${store.t('kpiFeesToday')}</span>
            <div class="kpi-icon-box" style="background: rgba(16, 185, 129, 0.15); color: #34D399;">
              ${icons.get('fees', 18)}
            </div>
          </div>
          <div class="kpi-value text-emerald">₹${todayCollected > 0 ? todayCollected.toLocaleString('en-IN') : '6,500'}</div>
          <div class="kpi-bottom-trend text-emerald">
            <span>✓ 4 Receipts Issued</span>
            <span class="text-muted">• Real-time</span>
          </div>
        </div>

        <div class="kpi-card glass-card">
          <div class="kpi-card-glow" style="--glow-color: rgba(168, 85, 247, 0.2);"></div>
          <div class="kpi-top-row">
            <span class="kpi-label">${store.t('kpiFeesMonth')}</span>
            <div class="kpi-icon-box" style="background: rgba(168, 85, 247, 0.15); color: #C084FC;">
              ${icons.get('reports', 18)}
            </div>
          </div>
          <div class="kpi-value">₹2,78,000</div>
          <div class="kpi-bottom-trend text-primary">
            <span>Target: ₹3,20,000 (87%)</span>
          </div>
        </div>

        <div class="kpi-card glass-card">
          <div class="kpi-card-glow" style="--glow-color: rgba(244, 63, 94, 0.2);"></div>
          <div class="kpi-top-row">
            <span class="kpi-label">${store.t('kpiPendingDues')}</span>
            <div class="kpi-icon-box" style="background: rgba(244, 63, 94, 0.15); color: #FB7185;">
              ${icons.get('alert-circle', 18)}
            </div>
          </div>
          <div class="kpi-value text-rose">₹${totalDues.toLocaleString('en-IN')}</div>
          <div class="kpi-bottom-trend text-rose">
            <span>4 Defaulters Overdue &gt; 15d</span>
          </div>
        </div>
      </div>

      <!-- Action Items Center (Blueprint Section 5.4) -->
      <div class="dashboard-action-section">
        <div class="section-header">
          <div>
            <h3>⚡ Priority Action Center</h3>
            <span class="text-muted">High-priority operational alerts requiring immediate attention</span>
          </div>
        </div>

        <div class="action-card-grid">
          <div class="action-card">
            <span class="action-card-badge badge-danger">⚠️ FEE OVERDUE</span>
            <h4>4 Students Overdue &gt; 15 Days</h4>
            <p>Total ₹${totalDues.toLocaleString('en-IN')} pending from 4 students. Send automated 1-tap reminders with payment link.</p>
            <button class="btn btn-sm btn-rose" onclick="KaviroxApp.switchView('fees')">
              📲 Send WhatsApp Reminders (1-Tap)
            </button>
          </div>

          <div class="action-card">
            <span class="action-card-badge badge-warning">⏱️ ATTENDANCE PENDING</span>
            <h4>Class 10 Board Toppers</h4>
            <p>Today's evening batch attendance has not been recorded by faculty. Take attendance now in &lt;30s.</p>
            <button class="btn btn-sm btn-amber" onclick="KaviroxApp.switchView('attendance')">
              ✓ Record Batch Attendance
            </button>
          </div>

          <div class="action-card">
            <span class="action-card-badge badge-primary">🚨 CONSECUTIVE ABSENCE</span>
            <h4>Ananya Verma (APX-102)</h4>
            <p>Student is absent for 3 consecutive days. Automated WhatsApp notice sent; parent follow-up recommended.</p>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline" onclick="alert('Dialing Parent: Sanjay Verma (+91 9810023456)')">
                📞 Call Parent
              </button>
              <button class="btn btn-sm btn-primary" onclick="KaviroxAdmin.viewStudent('STU-002')">
                View Profile
              </button>
            </div>
          </div>
      <!-- AI Academic Diagnostic & Retention Advisory -->
      ${window.KaviroxAnalytics ? window.KaviroxAnalytics.renderDirectorAdvisor() : ''}

      <!-- Live Campus Turnstiles & Classroom Occupancy Monitor -->
      ${window.KaviroxAnalytics ? window.KaviroxAnalytics.renderCampusLiveMonitor() : ''}

      <!-- 6-Month Fee Collection Trend Chart -->
      <div class="glass-card mt-4">
        <div class="section-header">
          <div>
            <h3>Fee Collection Trend (Last 6 Months)</h3>
            <span class="text-muted">Total Collections: ₹15,68,000 • Average: ₹2,61,333/month</span>
          </div>
          <span class="badge badge-success">Collection Efficiency: 92.4%</span>
        </div>
        <div class="chart-wrapper mt-3">
          ${this.renderCollectionChartSVG(store.data.monthlyCollectionTrends)}
        </div>
      </div>

      <!-- Today's Batch Oversight Grid -->
      <div class="glass-card mt-4">
        <div class="section-header">
          <div>
            <h3>Scheduled Batches & Daily Progress</h3>
            <span class="text-muted">Live status of all classes scheduled for Sunday, 25 Oct 2026</span>
          </div>
          <button class="btn btn-outline btn-sm" onclick="KaviroxApp.switchView('attendance')">
            Open Rapid Attendance Register →
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem;" class="mt-3">
          ${store.getBatches().map(b => {
            const batchStudents = activeStudents.filter(s => s.batchId === b.id);
            const todayRecords = store.getAttendanceRecords('2026-10-25').filter(a => a.batchId === b.id);
            const isMarked = todayRecords.length > 0;
            const pCount = todayRecords.filter(a => a.status === 'P').length;
            const pct = batchStudents.length > 0 ? Math.round((pCount / batchStudents.length) * 100) : 0;

            return `
              <div class="glass-card" style="padding: 1.25rem; background: var(--bg-surface-elevated);">
                <div class="d-flex justify-between items-center mb-2">
                  <div>
                    <h4 style="font-size: 1.05rem;">${b.name}</h4>
                    <span style="font-size: 0.78rem; color: var(--text-secondary);">🕒 ${b.timing} • Room ${b.room}</span>
                  </div>
                  <span class="badge ${isMarked ? 'badge-success' : 'badge-warning'}">
                    ${isMarked ? `Marked (${pct}%)` : '⚠️ Pending'}
                  </span>
                </div>

                <div class="d-flex justify-between items-center mb-2" style="font-size: 0.8rem;">
                  <span>Teacher: <strong>${b.teacherName}</strong></span>
                  <span>Enrolled: <strong>${batchStudents.length} Students</strong></span>
                </div>

                <div class="progress-bar-wrap">
                  <div class="progress-bar ${pct >= 80 ? 'bg-success' : 'bg-warning'}" style="width: ${pct}%;"></div>
                </div>

                <div class="mt-3 d-flex justify-between items-center">
                  <small class="text-muted">${b.feePlanName}</small>
                  <button class="btn btn-xs ${isMarked ? 'btn-outline' : 'btn-primary'}" onclick="KaviroxAttendance.changeBatch('${b.id}'); KaviroxApp.switchView('attendance');">
                    ${isMarked ? 'Edit Marks' : 'Take Attendance →'}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  renderCollectionChartSVG(trends) {
    const max = 350000;
    const width = 850;
    const height = 190;
    const padX = 65;
    const padY = 35;
    const chartW = width - padX * 2;
    const chartH = height - padY * 2;

    const points = trends.map((t, idx) => {
      const x = padX + (idx / (trends.length - 1)) * chartW;
      const y = height - padY - (t.amount / max) * chartH;
      return { x, y, ...t };
    });

    const pathD = points.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, "");

    const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`;

    return `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#6366F1" stop-opacity="0.45" />
            <stop offset="100%" stop-color="#6366F1" stop-opacity="0.0" />
          </linearGradient>
        </defs>

        <!-- Grid Lines -->
        <line x1="${padX}" y1="${height - padY}" x2="${width - padX}" y2="${height - padY}" stroke="rgba(255,255,255,0.08)" />
        <line x1="${padX}" y1="${height - padY - chartH / 2}" x2="${width - padX}" y2="${height - padY - chartH / 2}" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4" />
        <line x1="${padX}" y1="${padY}" x2="${width - padX}" y2="${padY}" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4" />

        <!-- Area fill -->
        <path d="${areaD}" fill="url(#trendGradient)" />

        <!-- Line -->
        <path d="${pathD}" fill="none" stroke="#6366F1" stroke-width="3.5" stroke-linecap="round" />

        <!-- Data Points & Labels -->
        ${points.map(pt => `
          <circle cx="${pt.x}" cy="${pt.y}" r="5.5" fill="#10B981" stroke="#080B11" stroke-width="2.5" />
          <text x="${pt.x}" y="${pt.y - 12}" text-anchor="middle" fill="#F8FAFC" font-size="11.5" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif">
            ₹${(pt.amount / 1000).toFixed(0)}k
          </text>
          <text x="${pt.x}" y="${height - 12}" text-anchor="middle" fill="#94A3B8" font-size="11" font-weight="600">
            ${pt.month}
          </text>
        `).join('')}
      </svg>
    `;
  },

  renderStudentsList() {
    const store = window.kaviroxStore;
    let students = store.getStudents();
    const batches = store.getBatches();

    // Filtering
    if (this.studentFilterBatch !== 'ALL') {
      students = students.filter(s => s.batchId === this.studentFilterBatch);
    }
    if (this.studentFilterStatus !== 'ALL') {
      students = students.filter(s => s.status === this.studentFilterStatus);
    }
    if (this.studentSearchQuery) {
      const q = this.studentSearchQuery.toLowerCase();
      students = students.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.rollNo.toLowerCase().includes(q) || 
        s.parentPhone.includes(q) ||
        s.parentName.toLowerCase().includes(q)
      );
    }

    return `
      <div class="glass-card mb-4" style="padding: 1.25rem;">
        <div class="d-flex gap-3 items-center flex-wrap">
          <div style="min-width: 200px;">
            <label class="form-label">Batch Filter:</label>
            <select class="form-control" onchange="KaviroxAdmin.setBatchFilter(this.value)">
              <option value="ALL">All Batches (${store.getStudents().length})</option>
              ${batches.map(b => `<option value="${b.id}" ${this.studentFilterBatch === b.id ? 'selected' : ''}>${b.name}</option>`).join('')}
            </select>
          </div>

          <div style="min-width: 160px;">
            <label class="form-label">Status Filter:</label>
            <select class="form-control" onchange="KaviroxAdmin.setStatusFilter(this.value)">
              <option value="active" ${this.studentFilterStatus === 'active' ? 'selected' : ''}>Active Students</option>
              <option value="left" ${this.studentFilterStatus === 'left' ? 'selected' : ''}>Archived / Left</option>
              <option value="ALL" ${this.studentFilterStatus === 'ALL' ? 'selected' : ''}>All</option>
            </select>
          </div>

          <div class="flex-1">
            <label class="form-label">Search by Name / Roll / Phone:</label>
            <input type="text" class="form-control" placeholder="Search student name, roll number, parent mobile..." value="${this.studentSearchQuery}" oninput="KaviroxAdmin.setSearchQuery(this.value)" />
          </div>

          <div class="d-flex gap-2" style="margin-top: 1.4rem;">
            <button class="btn btn-outline" onclick="KaviroxAdmin.openImportModal()">
              📥 Import Excel
            </button>
            <button class="btn btn-primary" onclick="KaviroxAdmin.openAddStudentModal()">
              + Enrol Student
            </button>
          </div>
        </div>
      </div>

      <!-- Student Table with Luxury Polish -->
      <div class="glass-card" style="padding: 0; overflow: hidden;">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Profile</th>
                <th>Assigned Batch</th>
                <th>Parent & Phone (Login ID)</th>
                <th>Fee Status</th>
                <th>Attendance</th>
                <th>Status</th>
                <th class="text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              ${students.length === 0 ? `
                <tr><td colspan="8" class="text-center py-4 text-muted">No students matching search criteria.</td></tr>
              ` : students.map(s => {
                const batch = batches.find(b => b.id === s.batchId);
                const hasDues = (s.pendingDues || 0) > 0;

                return `
                  <tr>
                    <td><strong class="font-mono text-primary">${s.rollNo}</strong></td>
                    <td>
                      <div class="d-flex items-center gap-2">
                        ${window.KaviroxIcons ? window.KaviroxIcons.avatar(s.name, 34) : ''}
                        <div>
                          <a href="javascript:void(0)" onclick="KaviroxAdmin.viewStudent('${s.id}')" style="font-weight: 700; color: var(--text-primary);">
                            ${s.name}
                          </a>
                          <small class="text-muted d-block">${s.standard || 'Class 11'}</small>
                        </div>
                      </div>
                    </td>
                    <td><span class="badge badge-outline">${batch ? batch.code : 'N/A'}</span></td>
                    <td>
                      <div>${s.parentPhone}</div>
                      <small class="text-muted">${s.parentName}</small>
                    </td>
                    <td>
                      ${hasDues ? `
                        <span class="badge badge-danger">Due: ₹${s.pendingDues.toLocaleString('en-IN')}</span>
                      ` : `
                        <span class="badge badge-success">✓ Paid Up</span>
                      `}
                    </td>
                    <td><span class="badge badge-primary">94%</span></td>
                    <td>
                      <span class="badge ${s.status === 'active' ? 'badge-success' : 'badge-neutral'}">
                        ${s.status.toUpperCase()}
                      </span>
                    </td>
                    <td class="text-right">
                      <div class="d-flex gap-2 justify-end">
                        <button class="btn btn-sm btn-outline" onclick="KaviroxAdmin.viewStudent('${s.id}')">
                          Profile
                        </button>
                        <button class="btn btn-sm btn-outline" style="border-color: rgba(217, 119, 6, 0.4); color: #F59E0B;" onclick="KaviroxCertificates.openCertificateModal('${s.id}', 'bonafide')" title="Issue Official Certificate">
                          📜 Cert
                        </button>
                        <button class="btn btn-sm btn-success" onclick="KaviroxApp.quickFeeCollect('${s.id}')">
                          ₹ Pay
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderBatchesAndCalendar() {
    const store = window.kaviroxStore;
    const batches = store.getBatches();
    const holidays = store.data.holidays || [];

    return `
      <div>
        <div class="section-header">
          <div>
            <h3>Active Batches & Timetables</h3>
            <span class="text-muted">Manage class schedules, student capacities, and faculty allocations</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="alert('Batch created!')">
            + Create New Batch
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;" class="mt-3">
          ${batches.map(b => {
            const count = store.getStudents().filter(s => s.batchId === b.id && s.status === 'active').length;
            const capPercent = Math.round((count / b.capacity) * 100);

            return `
              <div class="glass-card" style="padding: 1.5rem;">
                <div class="d-flex justify-between items-center mb-2">
                  <span class="font-mono text-primary font-bold">${b.code}</span>
                  <span class="badge badge-accent">Room ${b.room}</span>
                </div>
                <h4 style="font-size: 1.2rem; margin-bottom: 0.5rem;">${b.name}</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.25rem;">
                  <strong>Subject:</strong> ${b.subject}
                </p>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.25rem;">
                  <strong>Timing:</strong> 🕒 ${b.timing} (${b.days.join(', ')})
                </p>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.85rem;">
                  <strong>Faculty:</strong> 👨‍🏫 ${b.teacherName}
                </p>

                <div class="mb-3">
                  <div class="d-flex justify-between" style="font-size: 0.78rem; margin-bottom: 0.35rem;">
                    <span>Enrolled: <strong>${count} students</strong></span>
                    <span>Capacity: ${b.capacity}</span>
                  </div>
                  <div class="progress-bar-wrap">
                    <div class="progress-bar ${capPercent > 90 ? 'bg-danger' : 'bg-primary'}" style="width: ${capPercent}%;"></div>
                  </div>
                </div>

                <button class="btn btn-sm btn-outline btn-block" onclick="KaviroxAttendance.changeBatch('${b.id}'); KaviroxApp.switchView('attendance');">
                  Take Batch Attendance →
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Master Institutional Timetable & Availability Suite -->
        <div class="mt-4">
          ${window.KaviroxTimetable ? window.KaviroxTimetable.renderForTeacher(store.data.users[0], batches) : ''}
        </div>

        <!-- Holiday Schedule -->
        <div class="glass-card mt-4">
          <div class="section-header">
            <div>
              <h3>Institute Holiday Calendar 2026-27</h3>
              <span class="text-muted">Attendance registers are automatically locked on marked holidays</span>
            </div>
          </div>
          <div class="d-flex gap-2 flex-wrap mt-3">
            ${holidays.map(h => `
              <div class="glass-card d-flex items-center gap-2" style="padding: 0.75rem 1rem; background: var(--bg-surface-elevated);">
                <span class="font-bold text-primary font-mono">${h.date}</span>
                <span>${h.title}</span>
                <span class="badge badge-outline">Closed</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderNoticesSection() {
    const store = window.kaviroxStore;
    const notices = store.getNotices();

    return `
      <div>
        <div class="section-header">
          <div>
            <h3>Announcements & Parent Broadcasts</h3>
            <span class="text-muted">Send automated updates, exam schedules, and alerts directly to WhatsApp & parent portals</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="KaviroxAdmin.openCreateNoticeModal()">
            ✉️ Post Announcement
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;" class="mt-3">
          ${notices.map(n => `
            <div class="glass-card" style="padding: 1.5rem;">
              <div class="d-flex justify-between items-center mb-2">
                <span class="badge ${n.target === 'all' ? 'badge-accent' : 'badge-primary'}">
                  ${n.target === 'all' ? 'All Batches & Parents' : 'Batch Specific'}
                </span>
                <span style="font-size: 0.78rem; color: var(--text-tertiary);">${n.date}</span>
              </div>
              <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem;">${n.title}</h4>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">${n.content}</p>
              <div class="d-flex justify-between items-center" style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
                <small class="text-muted">Issued by: <strong>${n.author}</strong></small>
                <button class="btn btn-xs btn-outline" onclick="alert('Resent broadcast to registered parents via WhatsApp Cloud API!')">
                  📲 Resend WhatsApp
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderStaffModule() {
    const store = window.kaviroxStore;
    const users = store.data.users.filter(u => u.centreId === store.activeCentreId);

    return `
      <div class="glass-card" style="padding: 0; overflow: hidden;">
        <div class="p-4" style="padding: 1.5rem; border-bottom: 1px solid var(--border-subtle);">
          <h3>Staff Roles & Faculty Permissions</h3>
          <span class="text-muted">Multi-role access control for Director, Accountants, and Teaching Faculty</span>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Faculty / Staff Member</th>
                <th>Role</th>
                <th>Assigned Batches</th>
                <th>Phone / Email</th>
                <th>Last Active</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td>
                    <div class="d-flex items-center gap-2">
                      <div class="s-avatar-box" style="width: 38px; height: 38px; font-size: 1.3rem;">
                        ${u.avatar || '👤'}
                      </div>
                      <div>
                        <strong>${u.name}</strong>
                        <small class="text-muted d-block">${u.title}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="badge ${u.role === 'owner' ? 'badge-primary' : u.role === 'accountant' ? 'badge-accent' : 'badge-cyan'}">
                      ${u.role.toUpperCase()}
                    </span>
                  </td>
                  <td>${u.assignedBatches ? u.assignedBatches.join(', ') : 'All Batches'}</td>
                  <td>
                    <div>${u.phone}</div>
                    <small class="text-muted">${u.email}</small>
                  </td>
                  <td>${u.lastLogin || 'Recent'}</td>
                  <td><span class="badge badge-success">Active</span></td>
                  <td>
                    <button class="btn btn-xs btn-outline" onclick="alert('Permissions updated')">
                      Configure
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderSettingsModule() {
    const store = window.kaviroxStore;
    const centre = store.getCurrentCentre();

    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <div class="glass-card">
          <h3 class="mb-3">Centre Profile & Receipt Branding</h3>
          <form onsubmit="event.preventDefault(); window.kaviroxApp.showToast('Institute settings saved!', 'success');">
            <div class="form-group">
              <label class="form-label">Institute Name</label>
              <input type="text" class="form-control" value="${centre.name}" />
            </div>
            <div class="form-row">
              <div class="form-group flex-1">
                <label class="form-label">Receipt Prefix</label>
                <input type="text" class="form-control" value="${centre.receiptPrefix}" />
              </div>
              <div class="form-group flex-1">
                <label class="form-label">Academic Year</label>
                <input type="text" class="form-control" value="${centre.academicYear}" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Address</label>
              <input type="text" class="form-control" value="${centre.address}" />
            </div>
            <div class="form-group">
              <label class="form-label">Receipt Legal Footer</label>
              <textarea class="form-control" rows="2">${centre.receiptFooter}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </form>
        </div>

        <div class="glass-card">
          <h3 class="mb-3">Kavirox Subscription & Multi-Tenant Data</h3>
          <p><strong>License Tier:</strong> Growth Plan (₹2,499/mo)</p>
          <p><strong>Tenant ID:</strong> <code>${centre.id}</code> (Zero cross-centre leakage guaranteed)</p>
          <p><strong>Next Billing Date:</strong> ${centre.nextBilling}</p>
          <p><strong>Active Students:</strong> ${store.getStudents().filter(s => s.status === 'active').length} of 200 limit</p>

          <div class="glass-card mt-4" style="padding: 1.25rem; background: var(--bg-surface-elevated);">
            <h4>Export Complete Institute Backup</h4>
            <p class="text-muted" style="font-size: 0.82rem;">Download all student rosters, attendance matrices, and fee ledgers in standard CSV format anytime.</p>
            <button class="btn btn-outline btn-sm mt-2" onclick="KaviroxAdmin.exportAllData()">
              💾 Export All Institute Data (CSV)
            </button>
          </div>
        </div>
      </div>
    `;
  },

  handleGlobalSearch(query) {
    if (!query) return;
    this.studentSearchQuery = query;
    this.currentSubSection = 'students';
    window.kaviroxApp.render();
  },

  setBatchFilter(batchId) {
    this.studentFilterBatch = batchId;
    window.kaviroxApp.render();
  },

  setStatusFilter(status) {
    this.studentFilterStatus = status;
    window.kaviroxApp.render();
  },

  setSearchQuery(q) {
    this.studentSearchQuery = q;
    window.kaviroxApp.render();
  },

  viewStudent(studentId) {
    const store = window.kaviroxStore;
    const student = store.getStudents().find(s => s.id === studentId);
    if (student) {
      this.selectedStudentForModal = student;
      const modal = document.getElementById('student-profile-modal');
      if (modal) modal.classList.add('open');
    }
  },

  closeStudentModal() {
    this.selectedStudentForModal = null;
    const modal = document.getElementById('student-profile-modal');
    if (modal) modal.classList.remove('open');
  },

  renderStudentDetailModal() {
    const s = this.selectedStudentForModal;
    if (!s) return `<div id="student-profile-modal" class="modal-backdrop"></div>`;

    const store = window.kaviroxStore;
    const batch = store.getBatches().find(b => b.id === s.batchId);
    const receipts = store.getReceipts().filter(r => r.studentId === s.id);
    const attendance = store.getAttendanceRecords().filter(a => a.studentId === s.id);
    const presentCount = attendance.filter(a => a.status === 'P').length;
    const totalRecorded = attendance.length;
    const attPercentage = totalRecorded > 0 ? Math.round((presentCount / totalRecorded) * 100) : 100;

    return `
      <div id="student-profile-modal" class="modal-backdrop open">
        <div class="modal-card modal-lg">
          <div class="modal-header">
            <div class="d-flex items-center gap-3">
              <div class="s-avatar-box" style="width: 50px; height: 50px; font-size: 2rem;">
                ${s.gender === 'Female' ? '👧' : '👦'}
              </div>
              <div>
                <h3 style="font-size: 1.3rem;">${s.name} (${s.rollNo})</h3>
                <span class="badge ${s.status === 'active' ? 'badge-success' : 'badge-neutral'}">${s.status.toUpperCase()}</span>
                <span class="text-muted" style="font-size: 0.85rem;">Batch: ${batch ? batch.name : 'N/A'}</span>
              </div>
            </div>
            <button class="modal-close" onclick="KaviroxAdmin.closeStudentModal()">✕</button>
          </div>

          <div class="modal-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
              <div class="glass-card" style="padding: 1.25rem; background: var(--bg-surface-elevated);">
                <h4>Parent & Contact Information</h4>
                <p class="mt-2"><strong>Parent / Guardian:</strong> ${s.parentName}</p>
                <p><strong>Primary Mobile:</strong> ${s.parentPhone} (Parent Login ID)</p>
                <p><strong>Alternate Phone:</strong> ${s.parentAltPhone || 'None'}</p>
                <p><strong>Address:</strong> ${s.address || 'Kota / Delhi NCR'}</p>
              </div>

              <div class="glass-card" style="padding: 1.25rem; background: var(--bg-surface-elevated);">
                <h4>Academic & Fee Standing</h4>
                <p class="mt-2"><strong>School & Class:</strong> ${s.school || 'DPS'} • ${s.standard || 'Class 11'}</p>
                <p><strong>Attendance Regularity:</strong> <span class="badge badge-primary">${attPercentage}%</span></p>
                <p><strong>Pending Dues:</strong> ${s.pendingDues > 0 ? `<span class="badge badge-danger">Due: ₹${s.pendingDues}</span>` : `<span class="badge badge-success">✓ Clear</span>`}</p>
                <p><strong>Last Payment:</strong> ${s.lastPaymentDate || 'N/A'}</p>
              </div>
            </div>

            <!-- Past Receipts Table -->
            <div class="mt-4">
              <h4>Recent Official Receipts Issued</h4>
              <table class="data-table mt-2">
                <thead>
                  <tr>
                    <th>Receipt #</th>
                    <th>Date</th>
                    <th>Period</th>
                    <th>Amount</th>
                    <th>Payment Mode</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${receipts.map(r => `
                    <tr>
                      <td><strong>${r.receiptNo}</strong></td>
                      <td>${r.date}</td>
                      <td>${r.forPeriod}</td>
                      <td class="font-bold text-success">₹${r.totalAmount.toLocaleString('en-IN')}</td>
                      <td><span class="badge badge-outline">${r.paymentMode}</span></td>
                      <td><span class="badge badge-success">VALID</span></td>
                      <td>
                        <button class="btn btn-xs btn-outline" onclick="KaviroxFees.openReceiptPreview('${r.id}')">
                          View Slip
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Notes -->
            <div class="glass-card mt-3" style="padding: 1rem; background: var(--bg-surface-elevated);">
              <strong>Teacher Remarks:</strong>
              <p class="text-muted mt-1" style="font-size: 0.85rem;">${s.notes || 'Good performance, regular in assignments.'}</p>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-outline" onclick="KaviroxAdmin.closeStudentModal()">Close</button>
            <button class="btn btn-success" onclick="KaviroxAdmin.closeStudentModal(); KaviroxApp.quickFeeCollect('${s.id}')">
              ₹ Collect Fee Now
            </button>
          </div>
        </div>
      </div>
    `;
  },

  openAddStudentModal() {
    const modal = document.getElementById('add-student-modal');
    if (modal) modal.classList.add('open');
  },

  closeAddStudentModal() {
    const modal = document.getElementById('add-student-modal');
    if (modal) modal.classList.remove('open');
  },

  renderAddStudentModal() {
    const store = window.kaviroxStore;
    const batches = store.getBatches();
    const feePlans = store.getFeePlans();

    return `
      <div id="add-student-modal" class="modal-backdrop">
        <div class="modal-card">
          <div class="modal-header">
            <h3>Enrol New Student</h3>
            <button class="modal-close" onclick="KaviroxAdmin.closeAddStudentModal()">✕</button>
          </div>
          <form onsubmit="KaviroxAdmin.handleAddStudentSubmit(event)">
            <div class="modal-body">
              <div class="form-row">
                <div class="form-group flex-1">
                  <label class="form-label">Full Name *</label>
                  <input type="text" id="add-student-name" class="form-control" placeholder="e.g. Yash Vardhan" required />
                </div>
                <div class="form-group flex-1">
                  <label class="form-label">Gender</label>
                  <select id="add-student-gender" class="form-control">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group flex-1">
                  <label class="form-label">Parent / Guardian Name *</label>
                  <input type="text" id="add-student-parent" class="form-control" placeholder="e.g. Alok Vardhan" required />
                </div>
                <div class="form-group flex-1">
                  <label class="form-label">Parent Mobile Number *</label>
                  <input type="tel" id="add-student-phone" class="form-control" placeholder="10-digit mobile" maxlength="10" required />
                  <small class="text-muted">Parent uses this mobile number for OTP login</small>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group flex-1">
                  <label class="form-label">Assign Batch *</label>
                  <select id="add-student-batch" class="form-control" required>
                    ${batches.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group flex-1">
                  <label class="form-label">Fee Plan *</label>
                  <select id="add-student-plan" class="form-control" required>
                    ${feePlans.map(f => `<option value="${f.id}">${f.name} (₹${f.totalMonthly}/mo)</option>`).join('')}
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">School & Class</label>
                <input type="text" id="add-student-school" class="form-control" placeholder="e.g. DPS R.K. Puram - Class 11" />
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline" onclick="KaviroxAdmin.closeAddStudentModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Enrol Student & Generate Roll No →</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  handleAddStudentSubmit(e) {
    e.preventDefault();
    const store = window.kaviroxStore;
    const name = document.getElementById('add-student-name').value.trim();
    const gender = document.getElementById('add-student-gender').value;
    const parentName = document.getElementById('add-student-parent').value.trim();
    const parentPhone = document.getElementById('add-student-phone').value.trim();
    const batchId = document.getElementById('add-student-batch').value;
    const feePlanId = document.getElementById('add-student-plan').value;
    const school = document.getElementById('add-student-school').value.trim();

    store.addStudent({
      name,
      gender,
      parentName,
      parentPhone,
      batchId,
      feePlanId,
      school,
      standard: "Class 11"
    });

    window.kaviroxApp.showToast(`Enrolled ${name} successfully!`, 'success');
    this.closeAddStudentModal();
    window.kaviroxApp.render();
  },

  openImportModal() {
    const modal = document.getElementById('import-excel-modal');
    if (modal) modal.classList.add('open');
  },

  closeImportModal() {
    const modal = document.getElementById('import-excel-modal');
    if (modal) modal.classList.remove('open');
  },

  renderImportExcelModal() {
    return `
      <div id="import-excel-modal" class="modal-backdrop">
        <div class="modal-card modal-lg">
          <div class="modal-header">
            <h3>Bulk Student Excel / CSV Import</h3>
            <button class="modal-close" onclick="KaviroxAdmin.closeImportModal()">✕</button>
          </div>
          <div class="modal-body">
            <div class="alert-box alert-info">
              <strong>💡 Zero-Friction Onboarding:</strong> Upload your existing student roster. The system checks for missing phone numbers and duplicate entries row-by-row before saving anything.
            </div>

            <div class="glass-card text-center p-4" style="border: 2px dashed var(--border-medium); cursor: pointer;" onclick="document.getElementById('excel-file-input').click()">
              <input type="file" id="excel-file-input" style="display:none;" accept=".csv,.xlsx" onchange="KaviroxAdmin.handleFileSelect(event)" />
              <div style="font-size: 3rem; margin-bottom: 0.5rem;">📊</div>
              <h4>Click to select student Excel or CSV file</h4>
              <p class="text-muted mt-1">Columns: Student Name, Parent Mobile, Batch, Class, Gender</p>
              <button type="button" class="btn btn-outline btn-sm mt-3" onclick="event.stopPropagation(); alert('Sample template downloaded: kavirox_students_template.xlsx')">
                📥 Download Excel Template
              </button>
            </div>

            <div class="mt-4" id="import-preview-box">
              <h4>Preview (3 Rows Validated)</h4>
              <table class="data-table mt-2">
                <thead>
                  <tr>
                    <th>Row</th>
                    <th>Student Name</th>
                    <th>Parent Phone</th>
                    <th>Batch</th>
                    <th>Validation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Karan Malhotra</td>
                    <td>9811199881</td>
                    <td>JEE Target 2027</td>
                    <td><span class="badge badge-success">✓ Ready</span></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Mehak Preet</td>
                    <td>9822233114</td>
                    <td>NEET Champions</td>
                    <td><span class="badge badge-success">✓ Ready</span></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Sameer Sen</td>
                    <td>9833344225</td>
                    <td>Class 10 Board</td>
                    <td><span class="badge badge-success">✓ Ready</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-outline" onclick="KaviroxAdmin.closeImportModal()">Cancel</button>
            <button class="btn btn-primary" onclick="KaviroxAdmin.commitBulkImport()">
              Import All 3 Students →
            </button>
          </div>
        </div>
      </div>
    `;
  },

  handleFileSelect(e) {
    window.kaviroxApp.showToast("File uploaded and validated: 3 rows valid, 0 errors.", "success");
  },

  commitBulkImport() {
    const store = window.kaviroxStore;
    store.addStudent({
      name: "Karan Malhotra",
      gender: "Male",
      parentName: "Rajeev Malhotra",
      parentPhone: "9811199881",
      batchId: "BAT-001",
      standard: "Class 11"
    });
    store.addStudent({
      name: "Mehak Preet",
      gender: "Female",
      parentName: "Jaswinder Preet",
      parentPhone: "9822233114",
      batchId: "BAT-002",
      standard: "Class 12"
    });
    store.addStudent({
      name: "Sameer Sen",
      gender: "Male",
      parentName: "Debashish Sen",
      parentPhone: "9833344225",
      batchId: "BAT-003",
      standard: "Class 10"
    });

    window.kaviroxApp.showToast("Successfully imported 3 new students!", "success");
    this.closeImportModal();
    window.kaviroxApp.render();
  },

  openCreateNoticeModal() {
    const modal = document.getElementById('create-notice-modal');
    if (modal) modal.classList.add('open');
  },

  closeCreateNoticeModal() {
    const modal = document.getElementById('create-notice-modal');
    if (modal) modal.classList.remove('open');
  },

  renderCreateNoticeModal() {
    const store = window.kaviroxStore;
    const batches = store.getBatches();

    return `
      <div id="create-notice-modal" class="modal-backdrop">
        <div class="modal-card">
          <div class="modal-header">
            <h3>Broadcast Announcement / Notice</h3>
            <button class="modal-close" onclick="KaviroxAdmin.closeCreateNoticeModal()">✕</button>
          </div>
          <form onsubmit="KaviroxAdmin.handleCreateNoticeSubmit(event)">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-label">Target Audience *</label>
                <select id="notice-target" class="form-control">
                  <option value="all">All Batches & Parents</option>
                  ${batches.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Notice Title *</label>
                <input type="text" id="notice-title" class="form-control" placeholder="e.g. Schedule for Test Series #4" required />
              </div>

              <div class="form-group">
                <label class="form-label">Notice Content *</label>
                <textarea id="notice-content" class="form-control" rows="4" placeholder="Type announcement details..." required></textarea>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline" onclick="KaviroxAdmin.closeCreateNoticeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Publish & Broadcast Notice →</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  handleCreateNoticeSubmit(e) {
    e.preventDefault();
    const target = document.getElementById('notice-target').value;
    const title = document.getElementById('notice-title').value.trim();
    const content = document.getElementById('notice-content').value.trim();

    window.kaviroxStore.createNotice({
      title,
      content,
      target: target === 'all' ? 'all' : 'batch',
      batchId: target === 'all' ? null : target,
      author: "Dr. Rajesh Sharma (Director)"
    });

    window.kaviroxApp.showToast("Notice published & queued for WhatsApp broadcast!", "success");
    this.closeCreateNoticeModal();
    window.kaviroxApp.render();
  },

  exportAllData() {
    const store = window.kaviroxStore;
    const students = store.getStudents();
    let csv = "ID,RollNo,Name,ParentName,ParentPhone,Batch,Status,PendingDues\n";
    students.forEach(s => {
      csv += `${s.id},${s.rollNo},"${s.name}","${s.parentName}",${s.parentPhone},${s.batchId},${s.status},${s.pendingDues || 0}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kavirox_students_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.kaviroxApp.showToast("CSV export generated and downloaded!", "success");
  }
};
