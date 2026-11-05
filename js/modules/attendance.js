// Kavirox Fee & Attendance Manager - Rapid 30-Second Attendance Module
window.KaviroxAttendance = {
  activeBatchId: 'BAT-001',
  selectedDate: '2026-10-25',
  activeSlotId: null,
  activeSubject: null,
  activeTiming: null,
  currentTab: 'rapid', // rapid, monthly
  filterStatus: 'ALL', // ALL, P, A, L
  tempStatusMap: {}, // studentId -> 'P' | 'A' | 'L' | 'Leave'

  openLectureAttendance(slotId, batchId, subject, timing) {
    this.activeBatchId = batchId || this.activeBatchId;
    this.activeSlotId = slotId || null;
    this.activeSubject = subject || null;
    this.activeTiming = timing || null;
    this.initBatch(this.activeBatchId);
    if (window.kaviroxApp) {
      window.kaviroxApp.switchView('attendance');
    }
  },

  initBatch(batchId) {
    this.activeBatchId = batchId || this.activeBatchId;
    this.tempStatusMap = {};
    const store = window.kaviroxStore;
    const students = store.getStudents().filter(s => s.batchId === this.activeBatchId && s.status === 'active');
    
    // Look up existing records for this specific slot or date
    const existingRecords = store.getAttendanceRecords(this.selectedDate).filter(a => 
      a.batchId === this.activeBatchId && (this.activeSlotId ? a.slotId === this.activeSlotId : true)
    );

    students.forEach(s => {
      const rec = existingRecords.find(r => r.studentId === s.id);
      this.tempStatusMap[s.id] = rec ? rec.status : 'P'; // Default to Present for quick 1-tap marking!
    });
  },

  render() {
    const store = window.kaviroxStore;
    const batches = store.getBatches();
    if (!this.tempStatusMap || Object.keys(this.tempStatusMap).length === 0) {
      this.initBatch(this.activeBatchId);
    }

    const currentBatch = batches.find(b => b.id === this.activeBatchId) || batches[0];
    const allStudents = store.getStudents().filter(s => s.batchId === this.activeBatchId && s.status === 'active');
    const batchSlots = store.getTimetable ? (store.getTimetable(currentBatch.id) || []) : [];

    // Counts
    let pCount = 0;
    let aCount = 0;
    let lCount = 0;
    Object.values(this.tempStatusMap).forEach(st => {
      if (st === 'P') pCount++;
      if (st === 'A') aCount++;
      if (st === 'L') lCount++;
    });

    const totalStudents = allStudents.length || 1;
    const presentPercentage = Math.round((pCount / totalStudents) * 100);

    // Filter students for display
    let displayedStudents = allStudents;
    if (this.filterStatus !== 'ALL') {
      displayedStudents = allStudents.filter(s => this.tempStatusMap[s.id] === this.filterStatus);
    }

    return `
      <div class="attendance-container">
        <!-- Top Bar with Live Gauge and Batch Select -->
        <div class="attendance-sticky-bar">
          <div class="attendance-gauge-wrap">
            <div class="gauge-meta">
              <span class="gauge-num">${presentPercentage}%</span>
              <small>PRESENT TODAY</small>
            </div>
            <div>
              <div class="d-flex items-center gap-2">
                <h3 style="font-size: 1.15rem; margin: 0;">${currentBatch.name}</h3>
                ${this.activeSubject ? `<span class="badge badge-accent font-mono" style="font-size: 0.72rem;">${this.activeSubject.toUpperCase()} LECTURE</span>` : ''}
              </div>
              <span class="text-muted" style="font-size: 0.8rem;">
                🕒 ${this.activeTiming || currentBatch.timing} • Room ${currentBatch.room} • Faculty: <strong>${currentBatch.teacherName}</strong>
              </span>
            </div>
          </div>

          <div class="d-flex items-center gap-2 flex-wrap">
            <select class="form-control" style="width: auto;" onchange="KaviroxAttendance.changeBatch(this.value)">
              ${batches.map(b => `<option value="${b.id}" ${this.activeBatchId === b.id ? 'selected' : ''}>${b.name}</option>`).join('')}
            </select>

            <!-- Timetable Lecture Slot Selector -->
            <select class="form-control" style="width: auto; font-size: 0.82rem;" onchange="KaviroxAttendance.changeSlot(this.value)">
              <option value="" ${!this.activeSlotId ? 'selected' : ''}>📋 All Day Session / General Roll Call</option>
              ${batchSlots.map(s => `
                <option value="${s.id}" ${this.activeSlotId === s.id ? 'selected' : ''}>
                  🗓️ ${s.day.slice(0, 3)}: ${s.subject} (${s.startTime} - ${s.endTime})
                </option>
              `).join('')}
            </select>

            <input type="date" class="form-control" style="width: auto;" value="${this.selectedDate}" onchange="KaviroxAttendance.changeDate(this.value)" />

            <button class="btn btn-primary" onclick="KaviroxAttendance.markAllPresent()" title="Mark all students Present with 1 tap">
              ✓ Mark All Present (1-Tap)
            </button>
          </div>
        </div>

        <!-- Filter Chips and Tabs -->
        <div class="d-flex justify-between items-center mb-3 flex-wrap gap-2">
          <div class="d-flex gap-2">
            <button class="pill-btn ${this.filterStatus === 'ALL' ? 'active' : ''}" onclick="KaviroxAttendance.setFilter('ALL')">
              All (${allStudents.length})
            </button>
            <button class="pill-btn ${this.filterStatus === 'P' ? 'active' : ''}" onclick="KaviroxAttendance.setFilter('P')">
              Present (${pCount})
            </button>
            <button class="pill-btn ${this.filterStatus === 'A' ? 'active' : ''}" onclick="KaviroxAttendance.setFilter('A')">
              Absent (${aCount})
            </button>
            <button class="pill-btn ${this.filterStatus === 'L' ? 'active' : ''}" onclick="KaviroxAttendance.setFilter('L')">
              Late (${lCount})
            </button>
          </div>

          <div class="d-flex gap-2">
            <button class="btn btn-outline btn-sm ${this.currentTab === 'rapid' ? 'active' : ''}" onclick="KaviroxAttendance.setTab('rapid')">
              ⚡ 30-Sec Register
            </button>
            <button class="btn btn-outline btn-sm ${this.currentTab === 'monthly' ? 'active' : ''}" onclick="KaviroxAttendance.setTab('monthly')">
              📅 Monthly Grid (31 Days)
            </button>
          </div>
        </div>

        <!-- Tab Body -->
        ${this.currentTab === 'rapid' ? this.renderRapidSheet(displayedStudents, currentBatch, aCount) : this.renderMonthlyGrid(allStudents, currentBatch)}
      </div>
    `;
  },

  renderRapidSheet(students, currentBatch, aCount) {
    return `
      <div>
        <div class="student-attendance-list">
          ${students.length === 0 ? `
            <div class="glass-card text-center py-4 text-muted">No students in this filter view.</div>
          ` : students.map((s, idx) => {
            const currentStatus = this.tempStatusMap[s.id] || 'P';

            return `
              <div class="attendance-row ${currentStatus === 'A' ? 'row-absent' : ''}">
                <div class="student-info-col">
                  <span class="font-mono" style="font-size: 0.8rem; color: var(--text-tertiary); width: 22px;">${idx + 1}</span>
                  ${window.KaviroxIcons ? window.KaviroxIcons.avatar(s.name, 36) : ''}
                  <div class="s-details-meta">
                    <strong>${s.name}</strong>
                    <div class="s-details-sub">
                      Roll: <span class="font-mono font-bold text-primary">${s.rollNo}</span> • 
                      Parent: ${s.parentName} (${s.parentPhone}) 
                      <a href="https://wa.me/91${s.parentPhone}" target="_blank" style="margin-left: 0.35rem; color: #10B981; font-weight: 600;">WhatsApp</a>
                    </div>
                  </div>
                </div>

                <!-- 1-Tap Tactile Status Pill Toggles -->
                <div class="status-toggles">
                  <button type="button" class="status-btn btn-present ${currentStatus === 'P' ? 'active' : ''}" onclick="KaviroxAttendance.setStatus('${s.id}', 'P')">
                    P • Present
                  </button>
                  <button type="button" class="status-btn btn-absent ${currentStatus === 'A' ? 'active' : ''}" onclick="KaviroxAttendance.setStatus('${s.id}', 'A')">
                    A • Absent
                  </button>
                  <button type="button" class="status-btn btn-late ${currentStatus === 'L' ? 'active' : ''}" onclick="KaviroxAttendance.setStatus('${s.id}', 'L')">
                    L • Late
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="glass-card mt-4 d-flex justify-between items-center" style="padding: 1.25rem 1.75rem;">
          <div>
            <strong>Automated Parent Notification:</strong>
            <p class="text-muted" style="font-size: 0.82rem; margin-top: 0.2rem;">
              ${aCount > 0 ? `⚠️ Saving will immediately send SMS / WhatsApp absence alerts to parents of ${aCount} absent students.` : `✓ 100% batch presence! No absence alerts required.`}
            </p>
          </div>
          <button class="btn btn-primary btn-lg" onclick="KaviroxAttendance.saveRecords()">
            💾 Save Attendance Record Now →
          </button>
        </div>
      </div>
    `;
  },

  renderMonthlyGrid(students, currentBatch) {
    const daysInMonth = 31;
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return `
      <div class="glass-card" style="padding: 1.5rem;">
        <div class="section-header">
          <div>
            <h3>Monthly Attendance Matrix: October 2026</h3>
            <span class="text-muted">${currentBatch.name} • ${students.length} Students</span>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.print()">
            🖨️ Export Printable Matrix
          </button>
        </div>

        <div class="table-responsive matrix-scroll-wrap mt-3">
          <table class="matrix-table">
            <thead>
              <tr>
                <th class="sticky-col">Roll No</th>
                <th class="sticky-col-2">Student Name</th>
                ${days.map(d => `<th>${d}</th>`).join('')}
                <th>Total P</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              ${students.map(s => {
                let pTotal = 0;
                return `
                  <tr>
                    <td class="sticky-col font-mono">${s.rollNo}</td>
                    <td class="sticky-col-2"><strong>${s.name}</strong></td>
                    ${days.map(d => {
                      let cellVal = "P";
                      let cellClass = "cell-p";
                      if (d === 31) {
                        cellVal = "H";
                        cellClass = "cell-h";
                      } else if (d % 7 === 0) {
                        cellVal = "Sun";
                        cellClass = "cell-sun";
                      } else if (s.id === 'STU-002' && (d === 23 || d === 24 || d === 25)) {
                        cellVal = "A";
                        cellClass = "cell-a";
                      } else if (s.id === 'STU-003' && (d === 25 || d === 18)) {
                        cellVal = "A";
                        cellClass = "cell-a";
                      } else if (d === 21 && s.id === 'STU-001') {
                        cellVal = "L";
                        cellClass = "cell-l";
                        pTotal++;
                      } else {
                        pTotal++;
                      }

                      return `<td class="${cellClass}">${cellVal}</td>`;
                    }).join('')}
                    <td class="font-bold text-success">${pTotal}</td>
                    <td class="font-bold">${Math.round((pTotal / 25) * 100)}%</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="matrix-legend mt-3">
          <span class="legend-item"><span class="box-p">P</span> Present</span>
          <span class="legend-item"><span class="box-a">A</span> Absent</span>
          <span class="legend-item"><span class="box-l">L</span> Late</span>
          <span class="legend-item"><span class="box-h">H</span> Holiday</span>
          <span class="legend-item"><span class="box-sun">Sun</span> Weekend</span>
        </div>
      </div>
    `;
  },

  setStatus(studentId, status) {
    this.tempStatusMap[studentId] = status;
    window.kaviroxApp.render();
  },

  setFilter(filter) {
    this.filterStatus = filter;
    window.kaviroxApp.render();
  },

  markAllPresent() {
    Object.keys(this.tempStatusMap).forEach(id => {
      this.tempStatusMap[id] = 'P';
    });
    window.kaviroxApp.showToast("All students marked Present! (Under 1 second)", "success");
    window.kaviroxApp.render();
  },

  changeBatch(batchId) {
    this.activeBatchId = batchId;
    this.initBatch(batchId);
    window.kaviroxApp.render();
  },

  changeSlot(slotId) {
    this.activeSlotId = slotId || null;
    if (slotId) {
      const store = window.kaviroxStore;
      const slot = (store.data.timetable || []).find(t => t.id === slotId);
      if (slot) {
        this.activeSubject = slot.subject;
        this.activeTiming = `${slot.startTime} - ${slot.endTime}`;
      }
    } else {
      this.activeSubject = null;
      this.activeTiming = null;
    }
    this.initBatch(this.activeBatchId);
    window.kaviroxApp.render();
  },

  changeDate(date) {
    this.selectedDate = date;
    this.initBatch(this.activeBatchId);
    window.kaviroxApp.render();
  },

  setTab(tab) {
    this.currentTab = tab;
    window.kaviroxApp.render();
  },

  saveRecords() {
    const store = window.kaviroxStore;
    store.recordBatchAttendance(
      this.activeBatchId,
      this.selectedDate,
      this.tempStatusMap,
      "Dr. Rajesh / Faculty",
      this.activeSlotId,
      this.activeSubject,
      this.activeTiming
    );

    const absentIds = Object.keys(this.tempStatusMap).filter(id => this.tempStatusMap[id] === 'A');
    const slotDesc = this.activeSubject ? ` for ${this.activeSubject} (${this.activeTiming})` : '';

    if (absentIds.length > 0) {
      window.kaviroxApp.showToast(`Attendance saved${slotDesc}! ✉️ Automated WhatsApp alerts dispatched to parents of ${absentIds.length} absent students.`, 'success');
    } else {
      window.kaviroxApp.showToast(`Attendance saved${slotDesc}! 100% presence recorded in timetable ledger.`, 'success');
    }

    window.kaviroxApp.render();
  }
};
