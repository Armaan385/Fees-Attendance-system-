// Kavirox Fee & Attendance Manager - Reports & Financial Analytics
window.KaviroxReports = {
  activeReportType: 'collection', // collection, attendance, defaulters, statement
  selectedStudentForStatement: 'STU-001',

  render() {
    return `
      <div class="reports-container">
        <div class="page-header-row no-print">
          <div>
            <h2>📊 Analytics, Audits & Financial Reports</h2>
            <p class="text-muted">Exportable statements, collection trends, batch comparisons and defaulters aging</p>
          </div>

          <div class="header-controls">
            <div class="view-switch-pills">
              <button class="pill-btn ${this.activeReportType === 'collection' ? 'active' : ''}" onclick="KaviroxReports.setType('collection')">
                💰 Collection Summary
              </button>
              <button class="pill-btn ${this.activeReportType === 'defaulters' ? 'active' : ''}" onclick="KaviroxReports.setType('defaulters')">
                ⏳ Defaulters Aging
              </button>
              <button class="pill-btn ${this.activeReportType === 'attendance' ? 'active' : ''}" onclick="KaviroxReports.setType('attendance')">
                📈 Batch Attendance
              </button>
              <button class="pill-btn ${this.activeReportType === 'statement' ? 'active' : ''}" onclick="KaviroxReports.setType('statement')">
                📜 Student Statement
              </button>
            </div>
          </div>
        </div>

        <div class="reports-content mt-3">
          ${this.renderCurrentReport()}
        </div>
      </div>
    `;
  },

  setType(type) {
    this.activeReportType = type;
    window.kaviroxApp.render();
  },

  renderCurrentReport() {
    switch (this.activeReportType) {
      case 'collection':
        return this.renderCollectionReport();
      case 'defaulters':
        return this.renderDefaultersAgingReport();
      case 'attendance':
        return this.renderAttendanceComparisonReport();
      case 'statement':
        return this.renderStudentStatementReport();
      default:
        return this.renderCollectionReport();
    }
  },

  renderCollectionReport() {
    const store = window.kaviroxStore;
    const receipts = store.getReceipts().filter(r => r.status === 'valid');
    const totalCollected = receipts.reduce((sum, r) => sum + r.totalAmount, 0);

    const upiTotal = receipts.filter(r => r.paymentMode === 'UPI').reduce((sum, r) => sum + r.totalAmount, 0);
    const cashTotal = receipts.filter(r => r.paymentMode === 'Cash').reduce((sum, r) => sum + r.totalAmount, 0);
    const chequeTotal = receipts.filter(r => r.paymentMode === 'Cheque').reduce((sum, r) => sum + r.totalAmount, 0);
    const netTotal = receipts.filter(r => r.paymentMode === 'Net Banking').reduce((sum, r) => sum + r.totalAmount, 0);

    return `
      <div class="glass-card">
        <div class="section-header">
          <div>
            <h3>Fee Collection Breakdown (Current Academic Period)</h3>
            <span class="text-muted">Total Recorded Collection: <strong class="text-emerald">₹${totalCollected.toLocaleString('en-IN')}</strong> across ${receipts.length} transactions</span>
          </div>
          <button class="btn btn-outline btn-sm" onclick="KaviroxReports.exportCollectionCSV()">
            📥 Export CSV Ledger
          </button>
        </div>

        <div class="payment-splits-grid mt-4">
          <div class="split-card">
            <span class="split-label">UPI Payments</span>
            <div class="split-val text-primary">₹${upiTotal.toLocaleString('en-IN')}</div>
            <div class="progress-bar-wrap mt-2">
              <div class="progress-bar" style="width: ${totalCollected ? (upiTotal/totalCollected)*100 : 0}%"></div>
            </div>
            <small class="text-muted">${totalCollected ? Math.round((upiTotal/totalCollected)*100) : 0}% of collections</small>
          </div>

          <div class="split-card">
            <span class="split-label">Cash at Desk</span>
            <div class="split-val text-emerald">₹${cashTotal.toLocaleString('en-IN')}</div>
            <div class="progress-bar-wrap mt-2">
              <div class="progress-bar bg-success" style="width: ${totalCollected ? (cashTotal/totalCollected)*100 : 0}%"></div>
            </div>
            <small class="text-muted">${totalCollected ? Math.round((cashTotal/totalCollected)*100) : 0}% of collections</small>
          </div>

          <div class="split-card">
            <span class="split-label">Cheque Deposits</span>
            <div class="split-val text-amber">₹${chequeTotal.toLocaleString('en-IN')}</div>
            <div class="progress-bar-wrap mt-2">
              <div class="progress-bar bg-warning" style="width: ${totalCollected ? (chequeTotal/totalCollected)*100 : 0}%"></div>
            </div>
            <small class="text-muted">${totalCollected ? Math.round((chequeTotal/totalCollected)*100) : 0}% of collections</small>
          </div>

          <div class="split-card">
            <span class="split-label">Net Banking / NEFT</span>
            <div class="split-val text-purple">₹${netTotal.toLocaleString('en-IN')}</div>
            <div class="progress-bar-wrap mt-2">
              <div class="progress-bar bg-accent" style="width: ${totalCollected ? (netTotal/totalCollected)*100 : 0}%"></div>
            </div>
            <small class="text-muted">${totalCollected ? Math.round((netTotal/totalCollected)*100) : 0}% of collections</small>
          </div>
        </div>

        <div class="table-responsive mt-4">
          <table class="data-table">
            <thead>
              <tr>
                <th>Receipt #</th>
                <th>Date & Time</th>
                <th>Student</th>
                <th>Mode</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Period</th>
              </tr>
            </thead>
            <tbody>
              ${receipts.map(r => `
                <tr>
                  <td><strong>${r.receiptNo}</strong></td>
                  <td>${r.date} ${r.time}</td>
                  <td>${r.studentName}</td>
                  <td><span class="badge badge-outline">${r.paymentMode}</span></td>
                  <td><code>${r.transactionRef}</code></td>
                  <td class="font-bold text-success">₹${r.totalAmount.toLocaleString('en-IN')}</td>
                  <td>${r.forPeriod}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderDefaultersAgingReport() {
    const store = window.kaviroxStore;
    const defaulters = store.getStudents().filter(s => s.status === 'active' && (s.pendingDues || 0) > 0);
    const batches = store.getBatches();

    const bucket15 = defaulters.filter(d => (d.overdueDays || 0) <= 15);
    const bucket30 = defaulters.filter(d => (d.overdueDays || 0) > 15 && (d.overdueDays || 0) <= 30);
    const bucket60 = defaulters.filter(d => (d.overdueDays || 0) > 30);

    return `
      <div class="glass-card">
        <div class="section-header">
          <div>
            <h3>Defaulters Aging Analysis</h3>
            <span class="text-muted">Breakdown of pending fees by aging brackets to target collection efforts</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="alert('Batch WhatsApp reminders dispatched to all overdue accounts!')">
            📲 Broadcast Reminders to All
          </button>
        </div>

        <div class="aging-summary-grid mt-3">
          <div class="aging-bracket-card">
            <h4>1 - 15 Days Overdue</h4>
            <div class="aging-val text-amber">₹${bucket15.reduce((sum, d) => sum + d.pendingDues, 0).toLocaleString('en-IN')}</div>
            <span class="text-muted">${bucket15.length} Students (Low Risk)</span>
          </div>
          <div class="aging-bracket-card">
            <h4>16 - 30 Days Overdue</h4>
            <div class="aging-val text-rose">₹${bucket30.reduce((sum, d) => sum + d.pendingDues, 0).toLocaleString('en-IN')}</div>
            <span class="text-muted">${bucket30.length} Students (Medium Risk)</span>
          </div>
          <div class="aging-bracket-card">
            <h4>30+ Days Overdue</h4>
            <div class="aging-val text-rose" style="font-size: 1.8rem;">₹${bucket60.reduce((sum, d) => sum + d.pendingDues, 0).toLocaleString('en-IN')}</div>
            <span class="text-muted">${bucket60.length} Students (Critical Follow-up)</span>
          </div>
        </div>

        <div class="table-responsive mt-4">
          <table class="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Batch</th>
                <th>Parent Contact</th>
                <th>Pending Amount</th>
                <th>Days Overdue</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${defaulters.map(d => {
                const b = batches.find(bt => bt.id === d.batchId);
                return `
                  <tr>
                    <td><strong>${d.name}</strong></td>
                    <td>${d.rollNo}</td>
                    <td>${b ? b.code : 'N/A'}</td>
                    <td>${d.parentPhone} (${d.parentName})</td>
                    <td class="font-bold text-rose">₹${d.pendingDues.toLocaleString('en-IN')}</td>
                    <td><span class="badge badge-danger">${d.overdueDays || 15} Days</span></td>
                    <td>
                      <button class="btn btn-sm btn-outline" onclick="KaviroxFees.sendSingleReminder('${d.id}')">
                        Remind Parent
                      </button>
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

  renderAttendanceComparisonReport() {
    const store = window.kaviroxStore;
    const batches = store.getBatches();
    const students = store.getStudents().filter(s => s.status === 'active');

    return `
      <div class="glass-card">
        <div class="section-header">
          <div>
            <h3>Batch-Wise Attendance Benchmark</h3>
            <span class="text-muted">Compare attendance regularity and absentee rates across all batches</span>
          </div>
        </div>

        <div class="batch-benchmarks-list mt-3">
          ${batches.map(b => {
            const batchStudents = students.filter(s => s.batchId === b.id);
            // Simulated realistic batch percentages
            let pct = 92;
            if (b.code === 'JEE-M1') pct = 94;
            if (b.code === 'NEET-D1') pct = 88;
            if (b.code === 'C10-EVE') pct = 96;
            if (b.code === 'OLY-SAT') pct = 100;

            return `
              <div class="benchmark-row">
                <div class="bench-left">
                  <h4>${b.name} (${b.code})</h4>
                  <small class="text-muted">Faculty: ${b.teacherName} • ${batchStudents.length} Students</small>
                </div>
                <div class="bench-center">
                  <div class="progress-bar-wrap">
                    <div class="progress-bar ${pct >= 90 ? 'bg-success' : 'bg-warning'}" style="width: ${pct}%"></div>
                  </div>
                </div>
                <div class="bench-right">
                  <span class="pct-val font-bold ${pct >= 90 ? 'text-success' : 'text-amber'}">${pct}% Average</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  renderStudentStatementReport() {
    const store = window.kaviroxStore;
    const students = store.getStudents();
    const selectedStudent = students.find(s => s.id === this.selectedStudentForStatement) || students[0];
    const receipts = store.getReceipts().filter(r => r.studentId === selectedStudent.id);
    const batch = store.getBatches().find(b => b.id === selectedStudent.batchId);
    const centre = store.getCurrentCentre();

    return `
      <div class="student-statement-container">
        <div class="filter-bar no-print glass-card mb-4">
          <label>Select Student to View Full Statement / Ledger:</label>
          <select class="form-control" style="width: auto; display: inline-block; margin-left: 0.5rem;" onchange="KaviroxReports.changeStatementStudent(this.value)">
            ${students.map(s => `
              <option value="${s.id}" ${s.id === selectedStudent.id ? 'selected' : ''}>
                ${s.rollNo} • ${s.name} (${batch ? batch.code : ''})
              </option>
            `).join('')}
          </select>
          <button class="btn btn-primary btn-sm ml-auto" onclick="window.print()">
            🖨️ Print Student Statement
          </button>
        </div>

        <div class="printable-statement-card glass-card">
          <div class="statement-header">
            <div>
              <h2>${centre.name}</h2>
              <p class="text-muted">${centre.address} • Ph: ${centre.phone}</p>
              <h3 class="mt-2">STUDENT FINANCIAL LEDGER & STATEMENT</h3>
            </div>
            <div class="statement-logo">${centre.logo}</div>
          </div>

          <div class="student-summary-strip mt-3">
            <div><strong>Student Name:</strong> ${selectedStudent.name}</div>
            <div><strong>Roll Number:</strong> ${selectedStudent.rollNo}</div>
            <div><strong>Batch:</strong> ${batch ? batch.name : 'General'}</div>
            <div><strong>Admission Date:</strong> ${selectedStudent.admissionDate}</div>
            <div><strong>Parent Contact:</strong> ${selectedStudent.parentName} (${selectedStudent.parentPhone})</div>
            <div><strong>Current Balance Due:</strong> <span class="text-rose font-bold">₹${selectedStudent.pendingDues || 0}</span></div>
          </div>

          <table class="data-table mt-3">
            <thead>
              <tr>
                <th>Date</th>
                <th>Receipt #</th>
                <th>Description</th>
                <th>Payment Mode</th>
                <th>Ref ID</th>
                <th class="text-right">Credit / Paid (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${receipts.map(r => `
                <tr>
                  <td>${r.date}</td>
                  <td><strong>${r.receiptNo}</strong></td>
                  <td>Fees for ${r.forPeriod}</td>
                  <td>${r.paymentMode}</td>
                  <td><code>${r.transactionRef}</code></td>
                  <td class="text-right text-success font-bold">₹${r.totalAmount.toLocaleString('en-IN')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="statement-footer mt-4">
            <p class="text-muted"><small>${centre.receiptFooter}</small></p>
            <div class="text-right mt-3">
              <p><strong>Accounts Office, ${centre.shortName}</strong></p>
              <small>Generated on: ${new Date().toLocaleDateString()}</small>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  changeStatementStudent(id) {
    this.selectedStudentForStatement = id;
    window.kaviroxApp.render();
  },

  exportCollectionCSV() {
    const store = window.kaviroxStore;
    const receipts = store.getReceipts();
    let csv = "ReceiptNo,Date,Time,StudentName,RollNo,Period,Amount,PaymentMode,Ref,Cashier\n";
    receipts.forEach(r => {
      csv += `${r.receiptNo},${r.date},${r.time},"${r.studentName}",${r.rollNo},"${r.forPeriod}",${r.totalAmount},${r.paymentMode},"${r.transactionRef}","${r.collectedBy}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kavirox_collection_ledger_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.kaviroxApp.showToast("Collection ledger exported to CSV!", "success");
  }
};
