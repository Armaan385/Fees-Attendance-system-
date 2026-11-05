// Kavirox Fee & Attendance Manager - Class Timetable & Availability Suite
// Full institutional schedule management for Teachers, Guardians & Students

window.KaviroxTimetable = {
  activeDayFilter: 'Today', // 'Today', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'ALL'
  activeBatchFilter: 'ALL',
  viewMode: 'cards', // 'cards' | 'matrix'

  DAYS: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],

  getTodayDayName() {
    const dayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
    const map = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return map[dayIndex];
  },

  getSubjectColor(subject) {
    const s = (subject || '').toLowerCase();
    if (s.includes('physic')) return { bg: 'rgba(37, 99, 235, 0.08)', border: '#2563EB', text: '#1E40AF', badge: 'badge-primary' };
    if (s.includes('chem')) return { bg: 'rgba(5, 150, 105, 0.08)', border: '#059669', text: '#065F46', badge: 'badge-success' };
    if (s.includes('math') || s.includes('olympiad')) return { bg: 'rgba(124, 58, 237, 0.08)', border: '#7C3AED', text: '#5B21B6', badge: 'badge-accent' };
    if (s.includes('bio')) return { bg: 'rgba(225, 29, 72, 0.08)', border: '#E11D48', text: '#9F1239', badge: 'badge-danger' };
    return { bg: 'rgba(217, 119, 6, 0.08)', border: '#D97706', text: '#92400E', badge: 'badge-warning' };
  },

  /* -------------------------------------------------------------------------
     1. STUDENT & GUARDIAN VIEW (Read-Only Class Timetable)
     ------------------------------------------------------------------------- */
  renderForStudent(student) {
    const store = window.kaviroxStore;
    if (!student) {
      student = store.getStudents()[0];
    }

    const batch = store.getBatches().find(b => b.id === student?.batchId) || store.getBatches()[0];
    const todayName = this.getTodayDayName();
    const effectiveDay = this.activeDayFilter === 'Today' ? todayName : this.activeDayFilter;

    // Filter slots for this student's batch
    let slots = store.getTimetable(batch.id);
    if (effectiveDay !== 'ALL') {
      slots = slots.filter(s => s.day.toLowerCase() === effectiveDay.toLowerCase());
    }

    // Sort by day index, then start time
    slots.sort((a, b) => (a.dayIndex || 1) - (b.dayIndex || 1));

    return `
      <div class="timetable-student-container">
        <!-- Top Schedule Header Strip -->
        <div class="d-flex justify-between items-center mb-4 flex-wrap gap-3">
          <div>
            <div class="d-flex items-center gap-2">
              <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0;">
                Weekly Academic Class Timetable
              </h3>
              <span class="badge badge-primary font-mono" style="font-size: 0.72rem;">${batch.code || 'BATCH'}</span>
            </div>
            <p class="text-secondary" style="font-size: 0.82rem; margin: 0.25rem 0 0;">
              Enrolled Course: <strong>${batch.name}</strong> • Classroom: <strong>${batch.room || 'Hall 101'}</strong>
            </p>
          </div>

          <div class="d-flex items-center gap-2">
            <button class="btn btn-outline btn-sm no-print" onclick="KaviroxTimetable.toggleViewMode()">
              ${this.viewMode === 'cards' ? '📊 Weekly Grid Matrix' : '📋 Day Cards View'}
            </button>
            <button class="btn btn-primary btn-sm no-print" onclick="window.print()">
              🖨️ Print Timetable
            </button>
          </div>
        </div>

        <!-- Day Selector Navigation Pills -->
        <div class="d-flex gap-2 mb-4 flex-wrap no-print" style="overflow-x: auto; padding-bottom: 0.25rem;">
          <button class="pill-btn ${this.activeDayFilter === 'Today' ? 'active' : ''}" onclick="KaviroxTimetable.setDayFilter('Today')">
            🌟 Today (${todayName})
          </button>
          ${this.DAYS.slice(0, 6).map(day => `
            <button class="pill-btn ${this.activeDayFilter === day ? 'active' : ''}" onclick="KaviroxTimetable.setDayFilter('${day}')">
              ${day} ${day === todayName ? '<span style="color:#10B981; font-weight:800;">●</span>' : ''}
            </button>
          `).join('')}
          <button class="pill-btn ${this.activeDayFilter === 'ALL' ? 'active' : ''}" onclick="KaviroxTimetable.setDayFilter('ALL')">
            📅 All Week
          </button>
        </div>

        <!-- Render Content based on viewMode -->
        ${this.viewMode === 'matrix' ? this.renderWeeklyMatrix(batch, student) : this.renderSlotsList(slots, todayName, false, student)}
      </div>
    `;
  },

  /* -------------------------------------------------------------------------
     2. TEACHER & FACULTY WORKSTATION VIEW (Add/Edit Timetable)
     ------------------------------------------------------------------------- */
  renderForTeacher(teacherUser, assignedBatches) {
    const store = window.kaviroxStore;
    const todayName = this.getTodayDayName();
    const effectiveDay = this.activeDayFilter === 'Today' ? todayName : this.activeDayFilter;

    // Filter slots for teacher's batches
    const batchIds = assignedBatches.map(b => b.id);
    let slots = store.getTimetable();

    // If teacher selected a specific batch
    if (this.activeBatchFilter !== 'ALL') {
      slots = slots.filter(s => s.batchId === this.activeBatchFilter);
    } else {
      slots = slots.filter(s => batchIds.includes(s.batchId) || s.teacherId === teacherUser.id);
    }

    if (effectiveDay !== 'ALL') {
      slots = slots.filter(s => s.day.toLowerCase() === effectiveDay.toLowerCase());
    }

    slots.sort((a, b) => (a.dayIndex || 1) - (b.dayIndex || 1));

    return `
      <div class="timetable-teacher-container">
        <!-- Faculty Timetable Command Strip -->
        <div class="glass-card p-4 mb-4" style="background: var(--bg-card-solid); border: 1px solid var(--border-medium); border-radius: var(--radius-md);">
          <div class="d-flex justify-between items-center flex-wrap gap-3">
            <div>
              <div class="d-flex items-center gap-2">
                <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin: 0;">
                  Class Timetable & Availability Manager
                </h4>
                <span class="badge badge-success" style="font-size: 0.72rem;">● Live Scheduling</span>
              </div>
              <p class="text-secondary" style="font-size: 0.82rem; margin: 0.25rem 0 0;">
                Schedule lectures according to student availability, take lecture-wise attendance, and prevent classroom double-booking.
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="d-flex gap-2 flex-wrap">
              <select class="form-control" style="font-size: 0.82rem; padding: 0.45rem 0.85rem; width: auto;" onchange="KaviroxTimetable.setBatchFilter(this.value)">
                <option value="ALL">All My Assigned Batches</option>
                ${assignedBatches.map(b => `
                  <option value="${b.id}" ${this.activeBatchFilter === b.id ? 'selected' : ''}>${b.name}</option>
                `).join('')}
              </select>

              <button class="btn btn-primary btn-sm" onclick="KaviroxTimetable.openAddSlotModal('${this.activeBatchFilter !== 'ALL' ? this.activeBatchFilter : (assignedBatches[0]?.id || 'BAT-001')}', '${effectiveDay !== 'ALL' ? effectiveDay : 'Monday'}')">
                ➕ Schedule Class Slot
              </button>
            </div>
          </div>
        </div>

        <!-- Day Selector Navigation Pills -->
        <div class="d-flex gap-2 mb-4 flex-wrap no-print" style="overflow-x: auto; padding-bottom: 0.25rem;">
          <button class="pill-btn ${this.activeDayFilter === 'Today' ? 'active' : ''}" onclick="KaviroxTimetable.setDayFilter('Today')">
            🌟 Today (${todayName})
          </button>
          ${this.DAYS.slice(0, 6).map(day => `
            <button class="pill-btn ${this.activeDayFilter === day ? 'active' : ''}" onclick="KaviroxTimetable.setDayFilter('${day}')">
              ${day} ${day === todayName ? '<span style="color:#10B981; font-weight:800;">●</span>' : ''}
            </button>
          `).join('')}
          <button class="pill-btn ${this.activeDayFilter === 'ALL' ? 'active' : ''}" onclick="KaviroxTimetable.setDayFilter('ALL')">
            📅 All Week
          </button>
        </div>

        <!-- Slots List for Teacher with Edit / Delete / Conflict Status -->
        ${this.renderSlotsList(slots, todayName, true)}

        <!-- Classroom Allocation & Capacity Guide -->
        <div class="glass-card p-4 mt-4" style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
          <h5 style="font-size: 0.95rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.75rem;">
            🏢 Campus Hall Availability & Equipment Matrix
          </h5>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; font-size: 0.8rem;">
            <div style="padding: 0.75rem; background: var(--bg-card-solid); border-radius: 8px; border: 1px solid var(--border-subtle);">
              <strong style="color: #2563EB;">Hall 101 (Smart AC)</strong>
              <div class="text-secondary" style="font-size: 0.74rem; margin-top: 0.2rem;">Capacity: 45 Students • Interactive 4K Flat Panel • Best for JEE Batches</div>
            </div>
            <div style="padding: 0.75rem; background: var(--bg-card-solid); border-radius: 8px; border: 1px solid var(--border-subtle);">
              <strong style="color: #059669;">Hall 203 (Bio Lab Wing)</strong>
              <div class="text-secondary" style="font-size: 0.74rem; margin-top: 0.2rem;">Capacity: 50 Students • Microscope Benches & Projection • Best for NEET Batches</div>
            </div>
            <div style="padding: 0.75rem; background: var(--bg-card-solid); border-radius: 8px; border: 1px solid var(--border-subtle);">
              <strong style="color: #7C3AED;">Room 102 (Evening Wing)</strong>
              <div class="text-secondary" style="font-size: 0.74rem; margin-top: 0.2rem;">Capacity: 35 Students • Dual Whiteboard • Best for Class 10 Foundation</div>
            </div>
            <div style="padding: 0.75rem; background: var(--bg-card-solid); border-radius: 8px; border: 1px solid var(--border-subtle);">
              <strong style="color: #D97706;">Room 105 (STEM Lab)</strong>
              <div class="text-secondary" style="font-size: 0.74rem; margin-top: 0.2rem;">Capacity: 30 Students • Modular Desks • Best for Olympiads & Weekends</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* -------------------------------------------------------------------------
     3. RENDER SLOTS CARDS LIST (WITH TIMETABLE-BASED ATTENDANCE)
     ------------------------------------------------------------------------- */
  renderSlotsList(slots, todayName, isTeacherView = false, student = null) {
    const store = window.kaviroxStore;

    if (!slots || slots.length === 0) {
      return `
        <div class="glass-card text-center p-5" style="background: var(--bg-card-solid); border: 1px dashed var(--border-medium); border-radius: var(--radius-md);">
          <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🏖️</div>
          <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.35rem;">
            No Scheduled Classes for this Day
          </h4>
          <p class="text-secondary" style="font-size: 0.85rem; max-width: 420px; margin: 0 auto 1rem;">
            ${isTeacherView ? 'No lectures have been scheduled for this batch on this date. Click below to add a class based on classroom availability.' : 'No lectures scheduled today. Aspirants can utilize this time for self-study and DPP assignment revisions.'}
          </p>
          ${isTeacherView ? `
            <button class="btn btn-primary btn-sm" onclick="KaviroxTimetable.openAddSlotModal()">
              ➕ Add Class Slot
            </button>
          ` : ''}
        </div>
      `;
    }

    const currentChild = student || (store.getStudents ? store.getStudents()[0] : null);

    return `
      <div style="display: flex; flex-direction: column; gap: 0.9rem;">
        ${slots.map(slot => {
          const colors = this.getSubjectColor(slot.subject);
          const isToday = slot.day.toLowerCase() === todayName.toLowerCase();

          // Teacher Roll Call Status for this Slot
          const slotRecords = store.data.attendance.filter(a => 
            (a.slotId === slot.id || (a.batchId === slot.batchId && a.subject === slot.subject)) && 
            a.date === '2026-10-25'
          );
          const isRollCallTaken = slotRecords.length > 0;
          const pBatchCount = slotRecords.filter(a => a.status === 'P').length;

          // Student Attendance Status for this Slot
          let attBadge = '';
          if (!isTeacherView && currentChild) {
            const attRecord = store.getStudentSlotAttendance ? store.getStudentSlotAttendance(currentChild.id, slot.id, '2026-10-25') : null;
            
            if (isToday) {
              if (attRecord && attRecord.status === 'P') {
                attBadge = `
                  <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); padding: 0.35rem 0.65rem; border-radius: 8px; display: inline-flex; align-items: center; gap: 0.35rem;">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
                    <strong style="color: #065F46; font-size: 0.76rem;">✓ Attended (Present)</strong>
                    <span style="color: #047857; font-size: 0.68rem; font-family: 'JetBrains Mono';">• ${attRecord.recordedAt || '08:05 AM'} RFID</span>
                  </div>
                `;
              } else if (attRecord && attRecord.status === 'A') {
                attBadge = `
                  <div style="background: rgba(225, 29, 72, 0.1); border: 1px solid rgba(225, 29, 72, 0.3); padding: 0.35rem 0.65rem; border-radius: 8px; display: inline-flex; align-items: center; gap: 0.35rem;">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background: #E11D48; display: inline-block;"></span>
                    <strong style="color: #991B1B; font-size: 0.76rem;">✗ Absent in Class</strong>
                    <span style="color: #BE123C; font-size: 0.68rem;">• Parent Alert Sent</span>
                  </div>
                `;
              } else if (attRecord && attRecord.status === 'L') {
                attBadge = `
                  <div style="background: rgba(217, 119, 6, 0.1); border: 1px solid rgba(217, 119, 6, 0.3); padding: 0.35rem 0.65rem; border-radius: 8px; display: inline-flex; align-items: center; gap: 0.35rem;">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background: #D97706; display: inline-block;"></span>
                    <strong style="color: #92400E; font-size: 0.76rem;">⏰ Late Entry (15m)</strong>
                  </div>
                `;
              } else {
                attBadge = `
                  <div style="background: rgba(37, 99, 235, 0.08); border: 1px solid rgba(37, 99, 235, 0.2); padding: 0.35rem 0.65rem; border-radius: 8px; display: inline-flex; align-items: center; gap: 0.35rem;">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background: #2563EB; display: inline-block;"></span>
                    <span style="color: #1E40AF; font-size: 0.76rem; font-weight: 700;">Upcoming Lecture Today</span>
                  </div>
                `;
              }
            } else {
              attBadge = `
                <span class="badge badge-outline" style="font-size: 0.72rem;">
                  📅 Scheduled Class
                </span>
              `;
            }
          }

          return `
            <div class="timetable-slot-card animate-slide-in" style="background: var(--bg-card-solid); border: 1px solid var(--border-subtle); border-left: 5px solid ${colors.border}; border-radius: var(--radius-sm); padding: 1.15rem 1.35rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);">
              
              <!-- Left: Timing & Day Pill -->
              <div style="min-width: 170px;">
                <div class="d-flex items-center gap-2">
                  <span style="font-size: 0.92rem; font-weight: 800; color: #1E3A8A; font-family: 'JetBrains Mono';">
                    ${slot.startTime} - ${slot.endTime}
                  </span>
                </div>
                <div class="d-flex items-center gap-1 mt-1">
                  <span class="badge ${isToday ? 'badge-success' : 'badge-outline'}" style="font-size: 0.7rem; font-weight: 700;">
                    ${slot.day} ${isToday ? '• TODAY' : ''}
                  </span>
                  <span style="font-size: 0.72rem; color: var(--text-tertiary); font-family: 'JetBrains Mono';">
                    90 min
                  </span>
                </div>
              </div>

              <!-- Center: Subject, Topic, Faculty & Attendance Status -->
              <div style="flex: 1; min-width: 250px;">
                <div class="d-flex items-center gap-2 flex-wrap">
                  <span class="badge ${colors.badge}" style="font-size: 0.72rem; font-weight: 800; letter-spacing: 0.02em;">
                    ${slot.subject.toUpperCase()}
                  </span>
                  <span class="badge badge-outline" style="font-size: 0.72rem;">
                    🚪 ${slot.room}
                  </span>
                  <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600;">
                    ${slot.batchName}
                  </span>
                  ${isTeacherView ? `
                    <span class="badge ${isRollCallTaken ? 'badge-success' : 'badge-warning'}" style="font-size: 0.68rem;">
                      ${isRollCallTaken ? `✓ Roll Call Saved (${pBatchCount} Present)` : '⚠️ Roll Call Pending'}
                    </span>
                  ` : ''}
                </div>

                <h4 style="font-size: 0.98rem; font-weight: 800; color: var(--text-primary); margin: 0.4rem 0 0.2rem; line-height: 1.4;">
                  ${slot.topic}
                </h4>

                <div class="d-flex items-center gap-3 flex-wrap" style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.25rem;">
                  <span>👨‍🏫 Faculty: <strong>${slot.teacherName}</strong></span>
                  ${!isTeacherView && attBadge ? attBadge : ''}
                </div>
              </div>

              <!-- Right: Status & Actions -->
              <div class="d-flex items-center gap-2">
                ${isTeacherView ? `
                  <button class="btn btn-primary btn-sm" onclick="KaviroxAttendance.openLectureAttendance('${slot.id}', '${slot.batchId}', '${slot.subject}', '${slot.startTime} - ${slot.endTime}')" title="Take Roll Call for this Lecture">
                    ⚡ Take Roll Call
                  </button>
                  <button class="btn btn-outline btn-sm" onclick="KaviroxTimetable.openEditSlotModal('${slot.id}')" title="Edit / Reschedule Slot">
                    ✏️ Edit
                  </button>
                  <button class="btn btn-outline btn-sm" style="color: #E11D48; border-color: rgba(225, 29, 72, 0.3);" onclick="KaviroxTimetable.deleteSlot('${slot.id}')" title="Cancel Lecture">
                    🗑️
                  </button>
                ` : `
                  <button class="btn btn-outline btn-sm" onclick="KaviroxTimetable.showClassNotice('${slot.subject}', '${slot.teacherName}', '${slot.startTime}')">
                    🔔 Set Reminder
                  </button>
                `}
              </div>

            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  /* -------------------------------------------------------------------------
     4. RENDER WEEKLY MATRIX TABLE (WITH ATTENDANCE)
     ------------------------------------------------------------------------- */
  renderWeeklyMatrix(batch, student = null) {
    const store = window.kaviroxStore;
    const allSlots = store.getTimetable(batch.id);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentChild = student || (store.getStudents ? store.getStudents()[0] : null);

    return `
      <div class="glass-card p-3" style="background: var(--bg-card-solid); border: 1px solid var(--border-medium); border-radius: var(--radius-md); overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; min-width: 680px; font-size: 0.82rem;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-medium); background: var(--bg-surface-elevated); text-align: left;">
              <th style="padding: 0.75rem 1rem; width: 120px; font-weight: 800; color: var(--text-primary);">Day</th>
              <th style="padding: 0.75rem 1rem; font-weight: 800; color: var(--text-primary);">Scheduled Lecture 1</th>
              <th style="padding: 0.75rem 1rem; font-weight: 800; color: var(--text-primary);">Scheduled Lecture 2</th>
              <th style="padding: 0.75rem 1rem; font-weight: 800; color: var(--text-primary);">Room & Venue</th>
            </tr>
          </thead>
          <tbody>
            ${days.map(day => {
              const daySlots = allSlots.filter(s => s.day.toLowerCase() === day.toLowerCase());
              const isToday = day.toLowerCase() === this.getTodayDayName().toLowerCase();

              const renderSlotCell = (s) => {
                if (!s) return '<span class="text-tertiary">—</span>';
                let attStatusBadge = '';
                if (currentChild && isToday) {
                  const rec = store.getStudentSlotAttendance ? store.getStudentSlotAttendance(currentChild.id, s.id, '2026-10-25') : null;
                  if (rec && rec.status === 'P') {
                    attStatusBadge = '<span class="badge badge-success" style="font-size:0.62rem; margin-left:4px;">✓ Present</span>';
                  } else if (rec && rec.status === 'A') {
                    attStatusBadge = '<span class="badge badge-danger" style="font-size:0.62rem; margin-left:4px;">✗ Absent</span>';
                  }
                }

                return `
                  <div class="d-flex items-center gap-1">
                    <span class="badge ${this.getSubjectColor(s.subject).badge}" style="font-size: 0.68rem;">${s.subject}</span>
                    ${attStatusBadge}
                  </div>
                  <div style="font-size: 0.78rem; font-weight: 700; margin-top: 0.2rem;">${s.startTime} - ${s.endTime}</div>
                  <div style="font-size: 0.74rem; color: var(--text-secondary);">${s.topic}</div>
                `;
              };

              return `
                <tr style="border-bottom: 1px solid var(--border-subtle); background: ${isToday ? 'rgba(37, 99, 235, 0.03)' : 'transparent'};">
                  <td style="padding: 0.85rem 1rem; font-weight: 700; color: ${isToday ? '#2563EB' : 'var(--text-primary)'};">
                    ${day} ${isToday ? '<span class="badge badge-success" style="font-size: 0.62rem; margin-left: 4px;">TODAY</span>' : ''}
                  </td>
                  <td style="padding: 0.85rem 1rem;">
                    ${renderSlotCell(daySlots[0])}
                  </td>
                  <td style="padding: 0.85rem 1rem;">
                    ${renderSlotCell(daySlots[1])}
                  </td>
                  <td style="padding: 0.85rem 1rem; font-size: 0.78rem; color: var(--text-secondary);">
                    ${daySlots[0]?.room || batch.room || 'Hall 101'}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  /* -------------------------------------------------------------------------
     5. MODAL: ADD CLASS SLOT (WITH CONFLICT DETECTION)
     ------------------------------------------------------------------------- */
  openAddSlotModal(prefillBatchId = 'BAT-001', prefillDay = 'Monday') {
    const store = window.kaviroxStore;
    const batches = store.getBatches();
    const teachers = store.data.users.filter(u => u.role === 'teacher' || u.role === 'owner');

    let modal = document.getElementById('timetable-action-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'timetable-action-modal';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-backdrop open" style="display: flex; align-items: center; justify-content: center; z-index: 9999;">
        <div class="glass-card animate-slide-in p-4" style="background: #FFFFFF !important; color: #0F172A !important; max-width: 560px; width: 95%; border-radius: var(--radius-md); box-shadow: var(--shadow-modal);">
          
          <div class="d-flex justify-between items-center pb-3 mb-3 border-bottom">
            <div>
              <span class="badge badge-primary">FACULTY SCHEDULING DESK</span>
              <h3 style="margin-top: 0.35rem; font-size: 1.25rem; font-weight: 800; color: #0F172A;">
                Schedule New Class Slot
              </h3>
            </div>
            <button onclick="KaviroxTimetable.closeModal()" style="font-size: 1.4rem; cursor: pointer; background: none; border: none; color: #64748B;">✕</button>
          </div>

          <form id="timetable-add-form" onsubmit="KaviroxTimetable.submitAddSlot(event)">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 0.85rem;">
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">
                  Target Batch *
                </label>
                <select id="tt-form-batch" class="form-control" style="font-size: 0.82rem; background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; padding: 0.5rem;" required>
                  ${batches.map(b => `
                    <option value="${b.id}" ${b.id === prefillBatchId ? 'selected' : ''}>${b.name}</option>
                  `).join('')}
                </select>
              </div>

              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">
                  Day of Week *
                </label>
                <select id="tt-form-day" class="form-control" style="font-size: 0.82rem; background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; padding: 0.5rem;" onchange="KaviroxTimetable.checkFormConflict()" required>
                  ${this.DAYS.map(d => `
                    <option value="${d}" ${d.toLowerCase() === prefillDay.toLowerCase() ? 'selected' : ''}>${d}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 0.85rem;">
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">
                  Start Time *
                </label>
                <select id="tt-form-start" class="form-control" style="font-size: 0.82rem; background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; padding: 0.5rem;" onchange="KaviroxTimetable.checkFormConflict()" required>
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:45 AM">09:45 AM</option>
                  <option value="11:45 AM">11:45 AM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                  <option value="06:30 PM">06:30 PM</option>
                </select>
              </div>

              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">
                  End Time *
                </label>
                <select id="tt-form-end" class="form-control" style="font-size: 0.82rem; background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; padding: 0.5rem;" onchange="KaviroxTimetable.checkFormConflict()" required>
                  <option value="09:30 AM">09:30 AM (90 mins)</option>
                  <option value="11:15 AM">11:15 AM (90 mins)</option>
                  <option value="01:15 PM">01:15 PM (90 mins)</option>
                  <option value="03:00 PM">03:00 PM (90 mins)</option>
                  <option value="06:30 PM">06:30 PM (120 mins)</option>
                  <option value="08:00 PM">08:00 PM (90 mins)</option>
                </select>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 0.85rem;">
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">
                  Subject *
                </label>
                <select id="tt-form-subject" class="form-control" style="font-size: 0.82rem; background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; padding: 0.5rem;" required>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                  <option value="Science">Science (Physics & Chem)</option>
                  <option value="Olympiad Mathematics">Olympiad Mathematics</option>
                </select>
              </div>

              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">
                  Faculty Instructor *
                </label>
                <select id="tt-form-teacher" class="form-control" style="font-size: 0.82rem; background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; padding: 0.5rem;" required>
                  ${teachers.map(t => `
                    <option value="${t.id}" data-name="${t.name}">${t.name} (${t.title.split(' ')[0]})</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <div style="margin-bottom: 0.85rem;">
              <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">
                Classroom / Lecture Hall *
              </label>
              <select id="tt-form-room" class="form-control" style="font-size: 0.82rem; background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; padding: 0.5rem;" onchange="KaviroxTimetable.checkFormConflict()" required>
                <option value="Hall 101 (Smart AC)">Hall 101 (Smart AC - 45 Seats)</option>
                <option value="Hall 203 (Bio Lab Wing)">Hall 203 (Bio Lab Wing - 50 Seats)</option>
                <option value="Room 102">Room 102 (35 Seats)</option>
                <option value="Room 105">Room 105 (STEM Lab - 30 Seats)</option>
                <option value="Exam Hall A">Exam Hall A (Auditorium - 100 Seats)</option>
              </select>
            </div>

            <!-- Conflict warning banner target -->
            <div id="tt-conflict-alert" style="display: none; padding: 0.65rem 0.85rem; border-radius: 8px; font-size: 0.78rem; margin-bottom: 0.85rem; background: #FEF2F2; border: 1px solid #FCA5A5; color: #991B1B;">
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">
                Class Topic & Learning Objectives *
              </label>
              <input type="text" id="tt-form-topic" class="form-control" placeholder="e.g. Rotational Dynamics & Center of Mass Problems" style="font-size: 0.85rem; background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; padding: 0.55rem;" required>
            </div>

            <div class="d-flex justify-end gap-2">
              <button type="button" class="btn btn-outline btn-sm" onclick="KaviroxTimetable.closeModal()" style="color: #475569; border-color: #CBD5E1;">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary btn-sm">
                💾 Confirm & Save Schedule Slot
              </button>
            </div>
          </form>

        </div>
      </div>
    `;
  },

  checkFormConflict() {
    const store = window.kaviroxStore;
    const roomEl = document.getElementById('tt-form-room');
    const dayEl = document.getElementById('tt-form-day');
    const startEl = document.getElementById('tt-form-start');
    const endEl = document.getElementById('tt-form-end');
    const alertEl = document.getElementById('tt-conflict-alert');

    if (!roomEl || !dayEl || !startEl || !endEl || !alertEl) return;

    const res = store.checkRoomAvailability(roomEl.value, dayEl.value, startEl.value, endEl.value);
    if (!res.available) {
      alertEl.style.display = 'block';
      alertEl.innerHTML = `⚠️ <strong>Room Booking Warning:</strong> ${res.message}`;
    } else {
      alertEl.style.display = 'none';
    }
  },

  submitAddSlot(e) {
    e.preventDefault();
    const store = window.kaviroxStore;
    const batchId = document.getElementById('tt-form-batch').value;
    const day = document.getElementById('tt-form-day').value;
    const startTime = document.getElementById('tt-form-start').value;
    const endTime = document.getElementById('tt-form-end').value;
    const subject = document.getElementById('tt-form-subject').value;
    const teacherSelect = document.getElementById('tt-form-teacher');
    const teacherId = teacherSelect.value;
    const teacherName = teacherSelect.options[teacherSelect.selectedIndex].getAttribute('data-name') || teacherSelect.options[teacherSelect.selectedIndex].text;
    const room = document.getElementById('tt-form-room').value;
    const topic = document.getElementById('tt-form-topic').value.trim();

    store.addTimetableSlot({
      batchId,
      day,
      startTime,
      endTime,
      subject,
      teacherId,
      teacherName,
      room,
      topic,
      status: 'scheduled'
    });

    if (window.CampusSoundFX) window.CampusSoundFX.play('success');
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast(`Class scheduled: ${subject} (${day} ${startTime}) in ${room}`, 'success');
    }

    this.closeModal();
    this.refreshCurrentView();
  },

  /* -------------------------------------------------------------------------
     6. MODAL: EDIT / RESCHEDULE SLOT
     ------------------------------------------------------------------------- */
  openEditSlotModal(slotId) {
    const store = window.kaviroxStore;
    const slot = (store.data.timetable || []).find(t => t.id === slotId);
    if (!slot) return;

    let modal = document.getElementById('timetable-action-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'timetable-action-modal';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-backdrop open" style="display: flex; align-items: center; justify-content: center; z-index: 9999;">
        <div class="glass-card animate-slide-in p-4" style="background: #FFFFFF !important; color: #0F172A !important; max-width: 540px; width: 95%; border-radius: var(--radius-md); box-shadow: var(--shadow-modal);">
          <div class="d-flex justify-between items-center pb-3 mb-3 border-bottom">
            <div>
              <span class="badge badge-accent">RESCHEDULE CLASS</span>
              <h3 style="margin-top: 0.35rem; font-size: 1.25rem; font-weight: 800; color: #0F172A;">
                Edit Lecture Slot
              </h3>
            </div>
            <button onclick="KaviroxTimetable.closeModal()" style="font-size: 1.4rem; cursor: pointer; background: none; border: none; color: #64748B;">✕</button>
          </div>

          <form onsubmit="KaviroxTimetable.submitEditSlot(event, '${slot.id}')">
            <div style="margin-bottom: 0.85rem;">
              <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">
                Batch: <strong>${slot.batchName}</strong> (${slot.subject})
              </label>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 0.85rem;">
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">Day</label>
                <select id="tt-edit-day" class="form-control" style="font-size: 0.82rem; background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; padding: 0.5rem;">
                  ${this.DAYS.map(d => `
                    <option value="${d}" ${d.toLowerCase() === slot.day.toLowerCase() ? 'selected' : ''}>${d}</option>
                  `).join('')}
                </select>
              </div>

              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">Classroom</label>
                <select id="tt-edit-room" class="form-control" style="font-size: 0.82rem; background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; padding: 0.5rem;">
                  <option value="Hall 101 (Smart AC)" ${slot.room.includes('101') ? 'selected' : ''}>Hall 101 (Smart AC)</option>
                  <option value="Hall 203 (Bio Lab Wing)" ${slot.room.includes('203') ? 'selected' : ''}>Hall 203 (Bio Lab Wing)</option>
                  <option value="Room 102" ${slot.room.includes('102') ? 'selected' : ''}>Room 102</option>
                  <option value="Room 105" ${slot.room.includes('105') ? 'selected' : ''}>Room 105</option>
                  <option value="Exam Hall A" ${slot.room.includes('Exam') ? 'selected' : ''}>Exam Hall A</option>
                </select>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 0.85rem;">
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">Timing</label>
                <input type="text" id="tt-edit-timing" class="form-control" value="${slot.startTime} - ${slot.endTime}" style="font-size: 0.85rem; background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; padding: 0.5rem;">
              </div>
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">Status</label>
                <select id="tt-edit-status" class="form-control" style="font-size: 0.82rem; background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; padding: 0.5rem;">
                  <option value="scheduled" ${slot.status === 'scheduled' ? 'selected' : ''}>Scheduled</option>
                  <option value="live" ${slot.status === 'live' ? 'selected' : ''}>Live Now</option>
                  <option value="completed" ${slot.status === 'completed' ? 'selected' : ''}>Completed</option>
                  <option value="rescheduled" ${slot.status === 'rescheduled' ? 'selected' : ''}>Rescheduled</option>
                </select>
              </div>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <label style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.25rem;">Topic</label>
              <input type="text" id="tt-edit-topic" class="form-control" value="${slot.topic}" style="font-size: 0.85rem; background: #F8FAFC; color: #0F172A; border: 1px solid #CBD5E1; padding: 0.5rem;">
            </div>

            <div class="d-flex justify-end gap-2">
              <button type="button" class="btn btn-outline btn-sm" onclick="KaviroxTimetable.closeModal()" style="color: #475569; border-color: #CBD5E1;">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary btn-sm">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  submitEditSlot(e, slotId) {
    e.preventDefault();
    const store = window.kaviroxStore;
    const day = document.getElementById('tt-edit-day').value;
    const room = document.getElementById('tt-edit-room').value;
    const timing = document.getElementById('tt-edit-timing').value.split('-');
    const startTime = timing[0] ? timing[0].trim() : "08:00 AM";
    const endTime = timing[1] ? timing[1].trim() : "09:30 AM";
    const status = document.getElementById('tt-edit-status').value;
    const topic = document.getElementById('tt-edit-topic').value.trim();

    store.updateTimetableSlot(slotId, {
      day,
      room,
      startTime,
      endTime,
      status,
      topic
    });

    if (window.CampusSoundFX) window.CampusSoundFX.play('success');
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast("Schedule slot updated successfully.", "success");
    }

    this.closeModal();
    this.refreshCurrentView();
  },

  deleteSlot(slotId) {
    if (!confirm("Are you sure you want to remove this scheduled lecture slot?")) return;
    const store = window.kaviroxStore;
    store.deleteTimetableSlot(slotId);

    if (window.CampusSoundFX) window.CampusSoundFX.play('click');
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast("Class slot removed.", "info");
    }

    this.refreshCurrentView();
  },

  closeModal() {
    const modal = document.getElementById('timetable-action-modal');
    if (modal) modal.innerHTML = '';
  },

  setDayFilter(day) {
    this.activeDayFilter = day;
    if (window.CampusSoundFX) window.CampusSoundFX.play('click');
    this.refreshCurrentView();
  },

  setBatchFilter(batchId) {
    this.activeBatchFilter = batchId;
    if (window.CampusSoundFX) window.CampusSoundFX.play('click');
    this.refreshCurrentView();
  },

  toggleViewMode() {
    this.viewMode = this.viewMode === 'cards' ? 'matrix' : 'cards';
    if (window.CampusSoundFX) window.CampusSoundFX.play('click');
    this.refreshCurrentView();
  },

  showClassNotice(subject, teacher, time) {
    if (window.CampusSoundFX) window.CampusSoundFX.play('success');
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast(`Reminder active: ${subject} lecture by ${teacher} at ${time}. Notification scheduled!`, 'success');
    }
  },

  refreshCurrentView() {
    if (window.UnifiedPortal) {
      window.UnifiedPortal.render();
    } else if (window.KaviroxParent && window.KaviroxParent.currentSession) {
      window.KaviroxParent.update();
    } else if (window.kaviroxApp) {
      window.kaviroxApp.render();
    }
  }
};
