// Kavirox Fee & Attendance Manager - Advanced Faculty Workstation
// Complete teacher suite: Lectures, 30-Sec Roll Call, Exam Marks & Rank List, DPPs, Doubts Desk
window.KaviroxTeacher = {
  activeTab: 'schedule', // schedule, marks, dpp, doubts, broadcast
  selectedExamId: 'EXM-001',
  selectedBatchId: 'BAT-001',

  render() {
    const store = window.kaviroxStore;
    const centre = store.getCurrentCentre();
    const teacherId = store.activeTeacherId || "USR-003";
    const teacherUser = store.data.users.find(u => u.id === teacherId) || store.data.users[2] || {
      name: "Vikram Aditya",
      title: "Senior Faculty HOD Physics",
      assignedBatches: ["BAT-001", "BAT-003"]
    };
    const assignedBatches = store.getBatches().filter(b => teacherUser.assignedBatches?.includes(b.id) || b.teacherId === teacherId);

    const totalStudents = store.getStudents().filter(s => assignedBatches.some(b => b.id === s.batchId)).length;
    const exams = store.getExams();
    const dpps = store.getAssignments();
    const doubts = store.getDoubts();
    const pendingDoubts = doubts.filter(d => d.status === 'pending').length;

    const isInsideUnifiedPortal = Boolean(window.UnifiedPortal && window.UnifiedPortal.currentUser?.role === 'teacher');

    return `
      <div class="teacher-portal-layout" style="display: flex; flex-direction: column; width: 100%;">
        ${!isInsideUnifiedPortal ? `
          <!-- Standalone Faculty Executive Top Card (only when not in Unified Portal) -->
          <div class="glass-card mb-4" style="padding: 1.5rem; border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium); width: 100%;">
            <div class="d-flex justify-between items-center flex-wrap gap-3">
              <div class="d-flex items-center gap-3">
                <div style="width: 52px; height: 52px; border-radius: 12px; background: linear-gradient(135deg, #4F46E5, #7C3AED); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #FFF; font-weight: 800; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);">
                  ${teacherUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div class="d-flex items-center gap-2">
                    <h3 style="font-size: 1.3rem; font-weight: 800; margin: 0; color: var(--text-primary);">${teacherUser.name}</h3>
                    <span class="badge badge-success" style="font-size: 0.72rem;">● Faculty Live</span>
                  </div>
                  <p style="margin: 0.2rem 0 0; font-size: 0.85rem; color: var(--text-secondary);">
                    ${teacherUser.title} • Kota Main Campus (Room 102 & Hall B)
                  </p>
                </div>
              </div>

              <!-- Faculty Action Bar -->
              <div class="d-flex gap-2">
                <button class="btn btn-outline btn-sm" onclick="window.location.href='index.html'">
                  Public Site ↗
                </button>
                <button class="btn btn-primary btn-sm" onclick="kaviroxApp.switchView('attendance')">
                  ⚡ 30-Sec Roll Call
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Quick Stats Row -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; width: 100%;">
          <div style="background: var(--bg-surface-elevated); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Assigned Batches</span>
            <div style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary); font-family: 'Outfit'; margin-top: 0.2rem;">
              ${assignedBatches.length} Batches
            </div>
          </div>
          <div style="background: var(--bg-surface-elevated); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Active Students</span>
            <div style="font-size: 1.4rem; font-weight: 800; color: #60A5FA; font-family: 'Outfit'; margin-top: 0.2rem;">
              ${totalStudents} Aspirants
            </div>
          </div>
          <div style="background: var(--bg-surface-elevated); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Tests Conducted</span>
            <div style="font-size: 1.4rem; font-weight: 800; color: #34D399; font-family: 'Outfit'; margin-top: 0.2rem;">
              ${exams.length} Minor/Major
            </div>
          </div>
          <div style="background: var(--bg-surface-elevated); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Pending Doubts</span>
            <div style="font-size: 1.4rem; font-weight: 800; color: ${pendingDoubts > 0 ? '#FB7185' : '#34D399'}; font-family: 'Outfit'; margin-top: 0.2rem;">
              ${pendingDoubts} Queries
            </div>
          </div>
        </div>

        <!-- Workstation Navigation Tabs -->
        <div class="d-flex items-center gap-2 mb-4 flex-wrap" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; width: 100%;">
          <button class="pill-btn ${this.activeTab === 'schedule' ? 'active' : ''}" onclick="KaviroxTeacher.setTab('schedule')">
            📅 Classes & Attendance
          </button>
          <button class="pill-btn ${this.activeTab === 'timetable' ? 'active' : ''}" onclick="KaviroxTeacher.setTab('timetable')">
            🗓️ Class Timetable & Availability
          </button>
          <button class="pill-btn ${this.activeTab === 'marks' ? 'active' : ''}" onclick="KaviroxTeacher.setTab('marks')">
            📝 Test Marks & Rank List
          </button>
          <button class="pill-btn ${this.activeTab === 'dpp' ? 'active' : ''}" onclick="KaviroxTeacher.setTab('dpp')">
            📚 Daily Practice Problems (DPP)
          </button>
          <button class="pill-btn ${this.activeTab === 'doubts' ? 'active' : ''}" onclick="KaviroxTeacher.setTab('doubts')">
            💬 Student Doubt Desk ${pendingDoubts > 0 ? `<span class="badge badge-danger" style="margin-left: 4px; font-size: 0.68rem;">${pendingDoubts}</span>` : ''}
          </button>
          <button class="pill-btn ${this.activeTab === 'broadcast' ? 'active' : ''}" onclick="KaviroxTeacher.setTab('broadcast')">
            📢 Batch Broadcasts
          </button>
        </div>

        <!-- Tab Content Views -->
        <div class="teacher-tab-body" style="width: 100%;">
          ${this.renderActiveTabContent(store, assignedBatches)}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    if (window.UnifiedPortal) {
      window.UnifiedPortal.render();
    } else if (window.kaviroxApp) {
      window.kaviroxApp.render();
    }
  },

  renderActiveTabContent(store, assignedBatches) {
    switch (this.activeTab) {
      case 'schedule':
        return this.renderScheduleTab(store, assignedBatches);
      case 'timetable':
        const teacherId = store.activeTeacherId || "USR-003";
        const teacherUser = store.data.users.find(u => u.id === teacherId) || store.data.users[2] || {
          id: "USR-003",
          name: "Pooja Chawla",
          title: "Senior Faculty HOD Physics"
        };
        return window.KaviroxTimetable ? window.KaviroxTimetable.renderForTeacher(teacherUser, assignedBatches) : '';
      case 'marks':
        return this.renderMarksTab(store);
      case 'dpp':
        return this.renderDppTab(store, assignedBatches);
      case 'doubts':
        return this.renderDoubtsTab(store);
      case 'broadcast':
        return this.renderBroadcastTab(store, assignedBatches);
      default:
        return this.renderScheduleTab(store, assignedBatches);
    }
  },

  renderScheduleTab(store, assignedBatches) {
    return `
      <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
        <div class="d-flex justify-between items-center mb-3">
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0;">Today's Lecture Schedule</h4>
            <span class="text-secondary" style="font-size: 0.82rem;">Sunday, 25 October 2026 • Real-time Session Status</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="kaviroxApp.switchView('attendance')">
            ⚡ Take Rapid Attendance →
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          ${assignedBatches.map(b => {
            const batchStudents = store.getStudents().filter(s => s.batchId === b.id && s.status === 'active');
            const todayAttendance = store.getAttendanceRecords('2026-10-25').filter(a => a.batchId === b.id);
            const isMarked = todayAttendance.length > 0;
            const pCount = todayAttendance.filter(a => a.status === 'P').length;

            return `
              <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: gap-3;">
                <div>
                  <div class="d-flex items-center gap-2">
                    <span style="font-size: 0.8rem; font-weight: 700; color: #60A5FA; font-family: 'JetBrains Mono';">🕒 ${b.timing}</span>
                    <span class="badge badge-outline" style="font-size: 0.7rem;">Room ${b.room || '102'}</span>
                    <span class="badge ${isMarked ? 'badge-success' : 'badge-warning'}" style="font-size: 0.72rem;">
                      ${isMarked ? `✓ Marked (${pCount}/${batchStudents.length} Present)` : '⚠️ Attendance Pending'}
                    </span>
                  </div>
                  <h4 style="font-size: 1.1rem; font-weight: 800; margin: 0.4rem 0 0.2rem; color: var(--text-primary);">${b.name}</h4>
                  <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">Subject: ${b.subject} • ${batchStudents.length} Enrolled Aspirants</p>
                </div>
                <div class="d-flex gap-2">
                  <button class="btn ${isMarked ? 'btn-outline' : 'btn-primary'} btn-sm" onclick="KaviroxAttendance.changeBatch('${b.id}'); kaviroxApp.switchView('attendance');">
                    ${isMarked ? '✏️ Edit Roll Call' : '⚡ Take 30-Sec Roll Call →'}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  renderMarksTab(store) {
    const exams = store.getExams();
    const activeExam = exams.find(e => e.id === this.selectedExamId) || exams[0];
    const results = activeExam?.results || [];

    // Calculate Highest & Average
    const marksArr = results.map(r => r.marks);
    const highest = marksArr.length ? Math.max(...marksArr) : 0;
    const avg = marksArr.length ? Math.round(marksArr.reduce((a, b) => a + b, 0) / marksArr.length) : 0;

    return `
      <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
        <!-- Top Exam Header & Filter -->
        <div class="d-flex justify-between items-center mb-4 flex-wrap gap-3">
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0;">Test Marks Entry & Rank List</h4>
            <span class="text-secondary" style="font-size: 0.82rem;">Record marks, calculate batch rank & percentile, and broadcast scorecards</span>
          </div>

          <div class="d-flex gap-2 items-center">
            <select class="form-control" style="font-size: 0.85rem; padding: 0.45rem 0.85rem; width: auto;" onchange="KaviroxTeacher.selectedExamId = this.value; KaviroxTeacher.setTab('marks');">
              ${exams.map(e => `
                <option value="${e.id}" ${e.id === activeExam?.id ? 'selected' : ''}>
                  ${e.title.slice(0, 45)}...
                </option>
              `).join('')}
            </select>
            <button class="btn btn-success btn-sm" onclick="KaviroxTeacher.broadcastScorecards('${activeExam?.id}')">
              📲 Broadcast Scorecards
            </button>
          </div>
        </div>

        <!-- Exam Summary Stats -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: var(--bg-surface-elevated); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase;">Max Score</span>
            <div style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); font-family: 'Outfit';">${activeExam.maxMarks} Marks</div>
          </div>
          <div style="background: var(--bg-surface-elevated); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase;">Batch Highest</span>
            <div style="font-size: 1.3rem; font-weight: 800; color: #10B981; font-family: 'Outfit';">${highest} / ${activeExam.maxMarks}</div>
          </div>
          <div style="background: var(--bg-surface-elevated); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase;">Class Average</span>
            <div style="font-size: 1.3rem; font-weight: 800; color: #60A5FA; font-family: 'Outfit';">${avg} Marks</div>
          </div>
          <div style="background: var(--bg-surface-elevated); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase;">Date Conducted</span>
            <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">${activeExam.date}</div>
          </div>
        </div>

        <!-- Marks Entry Table -->
        <form onsubmit="KaviroxTeacher.handleSaveMarks(event, '${activeExam.id}')">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Marks (Out of ${activeExam.maxMarks})</th>
                  <th>Percentile</th>
                  <th>Teacher Remarks</th>
                </tr>
              </thead>
              <tbody>
                ${results.map((r, i) => `
                  <tr>
                    <td>
                      <span class="badge ${r.rank === 1 ? 'badge-accent' : r.rank <= 3 ? 'badge-success' : 'badge-outline'}" style="font-size: 0.78rem;">
                        #${r.rank}
                      </span>
                    </td>
                    <td class="font-mono" style="font-weight: 700; color: #60A5FA;">${r.rollNo}</td>
                    <td><strong>${r.name}</strong></td>
                    <td>
                      <input type="number" name="marks_${r.studentId}" class="form-control" value="${r.marks}" max="${activeExam.maxMarks}" min="0" style="width: 100px; padding: 0.35rem 0.6rem; font-family: 'JetBrains Mono';" required />
                    </td>
                    <td><strong class="text-emerald font-mono">${r.percentile}%</strong></td>
                    <td><span style="font-size: 0.82rem; color: var(--text-secondary);">${r.remarks || 'Consistent performance'}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="d-flex justify-between items-center mt-3 pt-3 border-top">
            <span class="text-secondary" style="font-size: 0.82rem;">⚡ Saving recalculates batch rank list & updates guardian academic transcripts.</span>
            <button type="submit" class="btn btn-primary btn-md">
              💾 Save & Recompute Ranks →
            </button>
          </div>
        </form>
      </div>
    `;
  },

  handleSaveMarks(e, examId) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const marksMap = {};
    for (const [key, val] of formData.entries()) {
      if (key.startsWith('marks_')) {
        const studentId = key.replace('marks_', '');
        marksMap[studentId] = Number(val);
      }
    }
    window.kaviroxStore.recordExamMarks(examId, marksMap);
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast('Test scores saved and All-India Rank percentiles updated!', 'success');
      window.kaviroxApp.render();
    }
  },

  broadcastScorecards(examId) {
    const exam = window.kaviroxStore.getExams().find(e => e.id === examId);
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast(`Scorecards for "${exam?.title}" dispatched to all parents via WhatsApp & SMS!`, 'success');
    }
  },

  renderDppTab(store, assignedBatches) {
    const dpps = store.getAssignments();

    return `
      <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
        <div class="d-flex justify-between items-center mb-4 flex-wrap gap-3">
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0;">Daily Practice Problems (DPP) & Homework</h4>
            <span class="text-secondary" style="font-size: 0.82rem;">Assign questions, set deadlines, and monitor student problem sheets</span>
          </div>

          <button class="btn btn-primary btn-sm" onclick="document.getElementById('new-dpp-form').classList.toggle('d-none')">
            + Assign New DPP Sheet
          </button>
        </div>

        <!-- New DPP Collapsible Form -->
        <div id="new-dpp-form" class="glass-card p-3 mb-4 d-none" style="background: var(--bg-surface-elevated); border: 1px solid var(--border-medium); border-radius: var(--radius-sm);">
          <h5 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem;">Create New Daily Practice Sheet</h5>
          <form onsubmit="KaviroxTeacher.handleCreateDpp(event)">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 0.75rem;">
              <div>
                <label class="form-label" style="font-size: 0.78rem;">Target Batch *</label>
                <select name="batchId" class="form-control" style="font-size: 0.82rem;" required>
                  ${assignedBatches.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="form-label" style="font-size: 0.78rem;">Sheet Title *</label>
                <input type="text" name="title" class="form-control" placeholder="e.g. DPP #25 - Rotational Dynamics" style="font-size: 0.82rem;" required />
              </div>
              <div>
                <label class="form-label" style="font-size: 0.78rem;">Total Questions *</label>
                <input type="number" name="questions" class="form-control" value="20" min="5" max="50" style="font-size: 0.82rem;" required />
              </div>
              <div>
                <label class="form-label" style="font-size: 0.78rem;">Submission Deadline *</label>
                <input type="date" name="dueDate" class="form-control" value="2026-10-28" style="font-size: 0.82rem;" required />
              </div>
            </div>
            <div class="d-flex justify-end gap-2">
              <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('new-dpp-form').classList.add('d-none')">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm">🚀 Publish DPP to Students</button>
            </div>
          </form>
        </div>

        <!-- DPP List -->
        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${dpps.map(d => `
            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1.15rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
              <div>
                <div class="d-flex items-center gap-2">
                  <span class="badge badge-accent font-mono" style="font-size: 0.72rem;">${d.id}</span>
                  <span class="badge badge-outline" style="font-size: 0.72rem;">${d.batchName}</span>
                  <span style="font-size: 0.8rem; color: #F59E0B; font-weight: 600;">📅 Due: ${d.dueDate}</span>
                </div>
                <h4 style="font-size: 1.05rem; font-weight: 700; margin: 0.4rem 0 0.2rem; color: var(--text-primary);">${d.title}</h4>
                <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0;">${d.totalQuestions} Questions • Assigned by ${d.assignedBy || 'Faculty'}</p>
              </div>

              <div class="d-flex items-center gap-3">
                <div style="text-align: right;">
                  <span style="font-size: 0.75rem; color: var(--text-secondary);">Submissions</span>
                  <div style="font-weight: 800; font-family: 'Outfit'; color: #34D399; font-size: 1.1rem;">${d.submissions || 24} / ${d.totalStudents || 30}</div>
                </div>
                <button class="btn btn-outline btn-sm" onclick="ApexPdfGenerator ? ApexPdfGenerator.download('${d.title || 'physics_dpp_18'}') : alert('Downloading ${d.title} solutions PDF...')">
                  📄 Solutions PDF
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  handleCreateDpp(e) {
    e.preventDefault();
    const form = e.target;
    const store = window.kaviroxStore;
    const batchId = form.batchId.value;
    const batch = store.getBatches().find(b => b.id === batchId);

    store.createAssignment({
      batchId: batchId,
      batchName: batch ? batch.name : 'Target JEE Batch',
      title: form.title.value,
      totalQuestions: Number(form.questions.value),
      dueDate: form.dueDate.value,
      assignedBy: "Vikram Aditya (HOD Physics)"
    });

    if (window.kaviroxApp) {
      window.kaviroxApp.showToast(`DPP "${form.title.value}" published to ${batch ? batch.name : 'batch'}!`, 'success');
      window.kaviroxApp.render();
    }
  },

  renderDoubtsTab(store) {
    const doubts = store.getDoubts();

    return `
      <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
        <div class="d-flex justify-between items-center mb-4 flex-wrap gap-3">
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0;">Student Academic Doubt Resolution Desk</h4>
            <span class="text-secondary" style="font-size: 0.82rem;">Answer questions submitted by students from class lectures & study material</span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${doubts.map(d => `
            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1.25rem;">
              <div class="d-flex justify-between items-start flex-wrap gap-2">
                <div>
                  <div class="d-flex items-center gap-2">
                    <span class="badge ${d.status === 'resolved' ? 'badge-success' : 'badge-danger'}">
                      ${d.status === 'resolved' ? '✓ Resolved' : '⏳ Pending Resolution'}
                    </span>
                    <strong style="color: var(--text-primary);">${d.studentName}</strong>
                    <span class="font-mono text-secondary" style="font-size: 0.78rem;">(${d.rollNo})</span>
                    <span class="badge badge-outline" style="font-size: 0.7rem;">${d.subject} • ${d.topic || 'General'}</span>
                  </div>
                  <p style="font-size: 0.95rem; font-weight: 600; margin: 0.6rem 0; color: var(--text-primary);">
                    "${d.question}"
                  </p>
                </div>
                <span class="text-secondary" style="font-size: 0.78rem;">📅 ${d.date}</span>
              </div>

              ${d.status === 'resolved' ? `
                <div style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10B981; padding: 0.75rem 1rem; border-radius: 4px; margin-top: 0.75rem;">
                  <span style="font-size: 0.75rem; font-weight: 700; color: #10B981;">Faculty Solution Note (by ${d.resolvedBy}):</span>
                  <p style="font-size: 0.85rem; margin: 0.25rem 0 0; color: var(--text-primary);">${d.resolution}</p>
                </div>
              ` : `
                <div style="margin-top: 0.75rem;">
                  <button class="btn btn-primary btn-sm" onclick="KaviroxTeacher.resolveDoubtPrompt('${d.id}')">
                    ✍️ Post Solution & Resolve Doubt
                  </button>
                </div>
              `}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  resolveDoubtPrompt(doubtId) {
    const sol = prompt("Enter solution note / reference for this student question:");
    if (sol && sol.trim()) {
      window.kaviroxStore.resolveDoubt(doubtId, sol.trim(), "Vikram Aditya (HOD Physics)");
      if (window.kaviroxApp) {
        window.kaviroxApp.showToast("Doubt resolved and explanation sent to student academic dossier!", "success");
        window.kaviroxApp.render();
      }
    }
  },

  renderBroadcastTab(store, assignedBatches) {
    return `
      <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium); max-width: 600px;">
        <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.4rem;">Post Batch Announcement</h4>
        <p class="text-secondary" style="font-size: 0.82rem; margin-bottom: 1.25rem;">Sends instantaneous notification alert to students and parents of the selected batch.</p>

        <form onsubmit="KaviroxTeacher.handlePostNotice(event)">
          <div class="form-group mb-3">
            <label class="form-label">Select Batch</label>
            <select id="teacher-notice-batch" class="form-control">
              ${assignedBatches.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group mb-3">
            <label class="form-label">Announcement Headline</label>
            <input type="text" id="teacher-notice-title" class="form-control" placeholder="e.g. Chapter 4 Electrostatics Formula Sheet Uploaded" required />
          </div>
          <div class="form-group mb-3">
            <label class="form-label">Detailed Content</label>
            <textarea id="teacher-notice-body" class="form-control" rows="3" placeholder="Enter message details for students and parents..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block">
            📢 Send Broadcast Alert Now →
          </button>
        </form>
      </div>
    `;
  },

  handlePostNotice(e) {
    e.preventDefault();
    const title = document.getElementById('teacher-notice-title').value;
    const content = document.getElementById('teacher-notice-body').value;
    const batchId = document.getElementById('teacher-notice-batch').value;

    window.kaviroxStore.createNotice({
      title: title,
      content: content,
      batchId: batchId,
      target: 'batch',
      author: "Vikram Aditya (Physics Faculty)"
    });

    if (window.kaviroxApp) {
      window.kaviroxApp.showToast(`Broadcast "${title}" published and sent to WhatsApp group!`, 'success');
      document.getElementById('teacher-notice-title').value = '';
      document.getElementById('teacher-notice-body').value = '';
    }
  }
};
