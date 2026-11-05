// Kavirox Fee & Attendance Manager - State Manager & Multi-Tenant Store
class KaviroxStore {
  constructor() {
    this.STORAGE_KEY = "kavirox_store_v1";
    this.LANG_KEY = "kavirox_lang_preference";
    this.ROLE_KEY = "kavirox_active_role";
    this.CENTRE_KEY = "kavirox_active_centre";
    
    this.currentLanguage = localStorage.getItem(this.LANG_KEY) || "en";
    this.activeRole = localStorage.getItem(this.ROLE_KEY) || "owner"; // owner, accountant, teacher, parent, superadmin, widget
    this.activeCentreId = localStorage.getItem(this.CENTRE_KEY) || "CTR-001";
    
    // Parent portal specific state
    this.parentPhone = "9810012345"; // Default demo parent (Aarav's father)
    this.activeChildId = "STU-001";
    
    // Teacher portal specific state
    this.activeTeacherId = "USR-003"; // Pooja Chawla
    this.selectedBatchId = "BAT-001";
    
    this.listeners = [];
    this.initData();
  }

  initData() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) {
      try {
        this.data = JSON.parse(raw);
        // Ensure timetable exists even if loaded from older localStorage
        if (!this.data.timetable || !Array.isArray(this.data.timetable) || this.data.timetable.length === 0) {
          this.data.timetable = JSON.parse(JSON.stringify(window.KAVIROX_INITIAL_DATA.timetable || []));
          this.save();
        }
      } catch (e) {
        console.error("Corrupted local data, reinitializing seed:", e);
        this.resetToSeed();
      }
    } else {
      this.resetToSeed();
    }
  }

  resetToSeed() {
    this.data = JSON.parse(JSON.stringify(window.KAVIROX_INITIAL_DATA));
    this.save();
  }

  save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this));
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem(this.LANG_KEY, lang);
    this.notify();
  }

  t(key) {
    const dict = window.KAVIROX_I18N[this.currentLanguage] || window.KAVIROX_I18N.en;
    return dict[key] || window.KAVIROX_I18N.en[key] || key;
  }

  setActiveRole(role) {
    this.activeRole = role;
    localStorage.setItem(this.ROLE_KEY, role);
    this.notify();
  }

  setActiveCentre(centreId) {
    this.activeCentreId = centreId;
    localStorage.setItem(this.CENTRE_KEY, centreId);
    this.notify();
  }

  // Multi-tenancy scoped getters
  getCurrentCentre() {
    return this.data.centres.find(c => c.id === this.activeCentreId) || this.data.centres[0];
  }

  getStudents() {
    return this.data.students.filter(s => s.centreId === this.activeCentreId);
  }

  getBatches() {
    return this.data.batches.filter(b => b.centreId === this.activeCentreId);
  }

  getFeePlans() {
    return this.data.feePlans.filter(f => f.centreId === this.activeCentreId);
  }

  getReceipts() {
    return this.data.receipts.filter(r => r.centreId === this.activeCentreId);
  }

  getAttendanceRecords(date = null) {
    let records = this.data.attendance.filter(a => a.centreId === this.activeCentreId);
    if (date) {
      records = records.filter(a => a.date === date);
    }
    return records;
  }

  getNotices() {
    return this.data.notices.filter(n => n.centreId === this.activeCentreId);
  }

  getTimetable(batchId = null, day = null) {
    if (!this.data.timetable) {
      this.data.timetable = JSON.parse(JSON.stringify(window.KAVIROX_INITIAL_DATA.timetable || []));
    }
    let list = this.data.timetable.filter(t => t.centreId === this.activeCentreId);
    if (batchId && batchId !== 'ALL') {
      list = list.filter(t => t.batchId === batchId);
    }
    if (day && day !== 'ALL') {
      list = list.filter(t => t.day.toLowerCase() === day.toLowerCase());
    }
    return list;
  }

  getAuditLogs() {
    return this.data.auditLogs.filter(a => a.centreId === this.activeCentreId);
  }

  // Super Admin view
  getAllCentres() {
    return this.data.centres;
  }

  // Mutations with audit logging
  logAudit(action, details, userName = "System User", role = this.activeRole) {
    const log = {
      id: "LOG-" + Date.now().toString().slice(-6),
      centreId: this.activeCentreId,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      userName: userName,
      role: role,
      action: action,
      details: details,
      ip: "103.21.244." + Math.floor(Math.random() * 80 + 10)
    };
    this.data.auditLogs.unshift(log);
    if (this.data.auditLogs.length > 100) this.data.auditLogs.pop();
  }

  addStudent(studentData) {
    const newId = "STU-" + (this.data.students.length + 1).toString().padStart(3, "0");
    const rollNo = (this.getCurrentCentre().receiptPrefix || "APX-") + (100 + this.data.students.length + 1);
    
    const newStudent = {
      id: newId,
      centreId: this.activeCentreId,
      rollNo: rollNo,
      status: "active",
      pendingDues: 0,
      admissionDate: new Date().toISOString().split("T")[0],
      ...studentData
    };

    this.data.students.push(newStudent);
    this.logAudit("STUDENT_ENROLLED", `Enrolled new student: ${newStudent.name} (${newStudent.rollNo}) in batch ${newStudent.batchId}`);
    this.save();
    return newStudent;
  }

  updateStudent(studentId, updates) {
    const idx = this.data.students.findIndex(s => s.id === studentId);
    if (idx !== -1) {
      this.data.students[idx] = { ...this.data.students[idx], ...updates };
      this.logAudit("STUDENT_UPDATED", `Updated student record for ${this.data.students[idx].name}`);
      this.save();
      return this.data.students[idx];
    }
    return null;
  }

  markStudentLeft(studentId, reason) {
    const student = this.data.students.find(s => s.id === studentId);
    if (student) {
      student.status = "left";
      student.leftDate = new Date().toISOString().split("T")[0];
      student.leftReason = reason || "Left Academy";
      this.logAudit("STUDENT_ARCHIVED", `Marked student ${student.name} as left. Reason: ${student.leftReason}`);
      this.save();
    }
  }

  recordBatchAttendance(batchId, date, statusMap, markedBy, slotId = null, subject = null, timing = null) {
    // statusMap is { [studentId]: 'P' | 'A' | 'L' | 'Leave' }
    let presentCount = 0;
    let absentCount = 0;

    Object.keys(statusMap).forEach(stuId => {
      const status = statusMap[stuId];
      if (status === "P") presentCount++;
      if (status === "A") absentCount++;

      // Check existing record
      const existingIdx = this.data.attendance.findIndex(
        a => a.centreId === this.activeCentreId && a.batchId === batchId && a.studentId === stuId && a.date === date && (slotId ? a.slotId === slotId : true)
      );

      const record = {
        centreId: this.activeCentreId,
        batchId: batchId,
        slotId: slotId || null,
        subject: subject || null,
        timing: timing || null,
        studentId: stuId,
        date: date,
        status: status,
        markedBy: markedBy || "Staff User",
        alertSent: status === "A",
        recordedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      if (existingIdx !== -1) {
        this.data.attendance[existingIdx] = record;
      } else {
        this.data.attendance.push(record);
      }
    });

    const batch = this.data.batches.find(b => b.id === batchId);
    const batchName = batch ? batch.name : batchId;
    const lectureInfo = subject ? ` for ${subject} (${timing})` : '';
    this.logAudit(
      "ATTENDANCE_SAVED",
      `Saved attendance for ${batchName}${lectureInfo} on ${date} (${presentCount} Present, ${absentCount} Absent)`
    );
    this.save();
  }

  getStudentSlotAttendance(studentId, slotId, date = '2026-10-25') {
    if (!this.data.attendance) return null;
    const directMatch = this.data.attendance.find(a => 
      a.studentId === studentId && a.slotId === slotId && (!date || a.date === date)
    );
    if (directMatch) return directMatch;

    // Fallback to day's general attendance for that student
    return this.data.attendance.find(a => 
      a.studentId === studentId && (!date || a.date === date)
    ) || null;
  }

  issueFeeReceipt(paymentData) {
    const centre = this.getCurrentCentre();
    const count = this.data.receipts.filter(r => r.centreId === this.activeCentreId).length + 1043;
    const receiptNo = `${centre.receiptPrefix || "KVR-2026-"}${count}`;

    const newReceipt = {
      id: "REC-" + Date.now().toString().slice(-6),
      centreId: this.activeCentreId,
      receiptNo: receiptNo,
      studentId: paymentData.studentId,
      studentName: paymentData.studentName,
      rollNo: paymentData.rollNo,
      batchName: paymentData.batchName,
      parentName: paymentData.parentName,
      parentPhone: paymentData.parentPhone,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      forPeriod: paymentData.forPeriod || "October 2026",
      items: paymentData.items,
      discount: Number(paymentData.discount || 0),
      lateFee: Number(paymentData.lateFee || 0),
      totalAmount: Number(paymentData.totalAmount),
      paymentMode: paymentData.paymentMode || "Cash",
      transactionRef: paymentData.transactionRef || "TXN-" + Math.floor(Math.random() * 900000 + 100000),
      collectedBy: paymentData.collectedBy || "Sunil Verma (Accountant)",
      status: "valid",
      cancelReason: null
    };

    this.data.receipts.unshift(newReceipt);

    // Update student pending dues
    const student = this.data.students.find(s => s.id === paymentData.studentId);
    if (student) {
      student.pendingDues = Math.max(0, (student.pendingDues || 0) - newReceipt.totalAmount);
      student.lastPaymentDate = newReceipt.date;
    }

    this.logAudit(
      "FEE_COLLECTED",
      `Issued Receipt #${receiptNo} of ₹${newReceipt.totalAmount} for ${newReceipt.studentName} via ${newReceipt.paymentMode}`
    );

    this.save();
    return newReceipt;
  }

  cancelReceipt(receiptId, reason) {
    const receipt = this.data.receipts.find(r => r.id === receiptId);
    if (receipt) {
      receipt.status = "cancelled";
      receipt.cancelReason = reason || "Voided by Manager";
      
      // Reinstate dues
      const student = this.data.students.find(s => s.id === receipt.studentId);
      if (student) {
        student.pendingDues = (student.pendingDues || 0) + receipt.totalAmount;
      }

      this.logAudit(
        "RECEIPT_CANCELLED",
        `Receipt #${receipt.receiptNo} of ₹${receipt.totalAmount} cancelled. Reason: ${receipt.cancelReason}`
      );
      this.save();
    }
  }

  createNotice(noticeData) {
    const newNotice = {
      id: "NOT-" + Date.now().toString().slice(-6),
      centreId: this.activeCentreId,
      date: new Date().toISOString().split("T")[0],
      author: noticeData.author || "Director",
      ...noticeData
    };
    this.data.notices.unshift(newNotice);
    this.logAudit("NOTICE_PUBLISHED", `Published notice: "${newNotice.title}"`);
    this.save();
    return newNotice;
  }

  toggleCentreStatus(centreId, newStatus) {
    const centre = this.data.centres.find(c => c.id === centreId);
    if (centre) {
      centre.status = newStatus;
      this.logAudit("CENTRE_STATUS_CHANGED", `Centre ${centre.name} status updated to ${newStatus}`, "Super Admin", "superadmin");
      this.save();
    }
  }

  // Advanced Teacher & Exam Methods
  getExams() {
    return this.data.exams || window.KAVIROX_INITIAL_DATA.exams || [];
  }

  getAssignments() {
    return this.data.assignments || window.KAVIROX_INITIAL_DATA.assignments || [];
  }

  getDoubts() {
    return this.data.doubts || window.KAVIROX_INITIAL_DATA.doubts || [];
  }

  getWebhooks() {
    return this.data.apiWebhooks || window.KAVIROX_INITIAL_DATA.apiWebhooks || [];
  }

  createAssignment(assignment) {
    if (!this.data.assignments) this.data.assignments = [];
    const newA = {
      id: "DPP-" + Math.floor(100 + Math.random() * 900),
      status: "Active",
      submissions: 0,
      totalStudents: 30,
      ...assignment
    };
    this.data.assignments.unshift(newA);
    this.logAudit("DPP_ASSIGNED", `Assigned ${newA.title} to batch ${newA.batchName}`);
    this.save();
    return newA;
  }

  resolveDoubt(doubtId, resolutionText, teacherName) {
    if (!this.data.doubts) this.data.doubts = [];
    const d = this.data.doubts.find(x => x.id === doubtId);
    if (d) {
      d.status = "resolved";
      d.resolution = resolutionText;
      d.resolvedBy = teacherName || "Vikram Aditya (Faculty)";
      this.logAudit("DOUBT_RESOLVED", `Resolved academic query ${doubtId} for ${d.studentName}`);
      this.save();
    }
  }

  recordExamMarks(examId, studentMarksMap) {
    if (!this.data.exams) this.data.exams = [];
    const exam = this.data.exams.find(e => e.id === examId);
    if (exam) {
      Object.keys(studentMarksMap).forEach(stuId => {
        const res = exam.results.find(r => r.studentId === stuId);
        if (res) {
          res.marks = Number(studentMarksMap[stuId]);
        }
      });
      // Recalculate ranks & percentiles
      exam.results.sort((a, b) => b.marks - a.marks);
      exam.results.forEach((r, idx) => {
        r.rank = idx + 1;
        r.percentile = Math.max(50, Math.round((1 - (idx / Math.max(1, exam.results.length))) * 1000) / 10);
      });
      this.logAudit("EXAM_SCORES_UPDATED", `Updated test marks for ${exam.title}`);
      this.save();
    }
  }

  // Timetable & Class Schedule Mutations
  addTimetableSlot(slotData) {
    if (!this.data.timetable) this.data.timetable = [];
    const newId = "TT-" + Date.now().toString().slice(-6);
    const dayMap = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6, "Sunday": 7 };
    
    const batch = this.data.batches.find(b => b.id === slotData.batchId);
    const batchName = batch ? batch.name : (slotData.batchName || "Target Batch");

    const newSlot = {
      id: newId,
      centreId: this.activeCentreId,
      batchId: slotData.batchId,
      batchName: batchName,
      day: slotData.day || "Monday",
      dayIndex: dayMap[slotData.day] || 1,
      startTime: slotData.startTime || "08:00 AM",
      endTime: slotData.endTime || "09:30 AM",
      subject: slotData.subject || "Physics",
      teacherId: slotData.teacherId || "USR-003",
      teacherName: slotData.teacherName || "Faculty Member",
      room: slotData.room || "Hall 101 (Smart AC)",
      topic: slotData.topic || "Classroom Lecture & Problem Solving",
      status: slotData.status || "scheduled"
    };

    this.data.timetable.push(newSlot);
    this.logAudit("TIMETABLE_SLOT_ADDED", `Scheduled ${newSlot.subject} class for ${batchName} on ${newSlot.day} (${newSlot.startTime} - ${newSlot.endTime}) in ${newSlot.room}`);
    this.save();
    return newSlot;
  }

  updateTimetableSlot(slotId, updates) {
    if (!this.data.timetable) this.data.timetable = [];
    const idx = this.data.timetable.findIndex(t => t.id === slotId);
    if (idx !== -1) {
      if (updates.day) {
        const dayMap = { "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6, "Sunday": 7 };
        updates.dayIndex = dayMap[updates.day] || 1;
      }
      this.data.timetable[idx] = { ...this.data.timetable[idx], ...updates };
      const slot = this.data.timetable[idx];
      this.logAudit("TIMETABLE_SLOT_UPDATED", `Updated schedule slot for ${slot.subject} (${slot.batchName}) on ${slot.day}`);
      this.save();
      return slot;
    }
    return null;
  }

  deleteTimetableSlot(slotId) {
    if (!this.data.timetable) return;
    const idx = this.data.timetable.findIndex(t => t.id === slotId);
    if (idx !== -1) {
      const removed = this.data.timetable.splice(idx, 1)[0];
      this.logAudit("TIMETABLE_SLOT_DELETED", `Removed schedule slot for ${removed.subject} on ${removed.day} (${removed.room})`);
      this.save();
      return true;
    }
    return false;
  }

  checkRoomAvailability(room, day, startTime, endTime, excludeSlotId = null) {
    if (!this.data.timetable) return { available: true };
    const conflicts = this.data.timetable.filter(t => 
      t.centreId === this.activeCentreId &&
      t.room.toLowerCase().trim() === room.toLowerCase().trim() &&
      t.day.toLowerCase().trim() === day.toLowerCase().trim() &&
      t.id !== excludeSlotId &&
      (t.startTime === startTime || t.endTime === endTime)
    );
    if (conflicts.length > 0) {
      return {
        available: false,
        conflict: conflicts[0],
        message: `Conflict: ${room} is already booked for ${conflicts[0].batchName} (${conflicts[0].subject} by ${conflicts[0].teacherName}) at ${conflicts[0].startTime} - ${conflicts[0].endTime}.`
      };
    }
    return { available: true };
  }

  // Developer Platform & Export/Import Methods
  exportDatabaseJson() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `apex_academy_db_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.logAudit("DATABASE_EXPORTED", "Complete JSON database backup exported");
  }

  importDatabaseJson(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.students && parsed.centres) {
        this.data = parsed;
        this.save();
        this.logAudit("DATABASE_RESTORED", "Database successfully restored from JSON backup");
        return { success: true };
      }
      return { success: false, error: "Invalid backup schema: missing core student or centre tables." };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}

// Global singleton instance
window.kaviroxStore = new KaviroxStore();
