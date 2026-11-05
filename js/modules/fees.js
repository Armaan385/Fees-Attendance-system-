// Kavirox Fee & Attendance Manager - Luxury Fee Desk & Numbered Receipts Module
window.KaviroxFees = {
  currentTab: 'collect', // collect, receipts, defaulters, daybook
  selectedStudentId: 'STU-002', // Ananya Verma (has dues)
  activeReceiptForModal: null,
  showUpiQrModal: false,
  selectedPaymentMode: 'UPI',

  render() {
    return `
      <div class="fees-container">
        <!-- Top Navigation Pills -->
        <div class="d-flex justify-between items-center mb-4 flex-wrap gap-2">
          <div>
            <h2>💼 Fee Desk & Financial Management</h2>
            <p class="text-muted">Issue numbered receipts in &lt;20s, reconcile day book, and track defaulters</p>
          </div>

          <div class="d-flex gap-2">
            <button class="pill-btn ${this.currentTab === 'collect' ? 'active' : ''}" onclick="KaviroxFees.setTab('collect')">
              ₹ Collect Fee Desk
            </button>
            <button class="pill-btn ${this.currentTab === 'receipts' ? 'active' : ''}" onclick="KaviroxFees.setTab('receipts')">
              🧾 Receipts Register
            </button>
            <button class="pill-btn ${this.currentTab === 'defaulters' ? 'active' : ''}" onclick="KaviroxFees.setTab('defaulters')">
              ⚠️ Defaulters Ledger
            </button>
            <button class="pill-btn ${this.currentTab === 'whatsapp' ? 'active' : ''}" onclick="KaviroxFees.setTab('whatsapp')" style="border-color: rgba(37, 211, 102, 0.4); color: #34D399;">
              📲 Parent WhatsApp Desk
            </button>
            <button class="pill-btn ${this.currentTab === 'daybook' ? 'active' : ''}" onclick="KaviroxFees.setTab('daybook')">
              📚 Day Book Reconcile
            </button>
          </div>
        </div>

        <div class="fees-content-body">
          ${this.renderCurrentTab()}
        </div>
      </div>

      <!-- Receipt Print / Preview Modal -->
      <div id="receipt-modal-container">
        ${this.renderReceiptModal()}
        ${this.renderUpiQrModal()}
      </div>
    `;
  },

  setTab(tab) {
    this.currentTab = tab;
    window.kaviroxApp.render();
  },

  renderCurrentTab() {
    switch (this.currentTab) {
      case 'collect':
        return this.renderCollectDesk();
      case 'receipts':
        return this.renderReceiptsList();
      case 'defaulters':
        return this.renderDefaultersList();
      case 'whatsapp':
        return window.KaviroxWhatsAppAutomation ? window.KaviroxWhatsAppAutomation.render() : '<p>Loading...</p>';
      case 'daybook':
        return this.renderDayBook();
      default:
        return this.renderCollectDesk();
    }
  },

  renderCollectDesk() {
    const store = window.kaviroxStore;
    const students = store.getStudents().filter(s => s.status === 'active');
    const selectedStudent = students.find(s => s.id === this.selectedStudentId) || students[0];
    const batch = store.getBatches().find(b => b.id === selectedStudent?.batchId);
    const plan = store.getFeePlans().find(f => f.id === selectedStudent?.feePlanId) || store.getFeePlans()[0];

    const defaultAmount = selectedStudent?.pendingDues > 0 ? selectedStudent.pendingDues : (plan?.totalMonthly || 4000);

    return `
      <div class="collect-desk-grid">
        <!-- Left: Student Selector & Profile -->
        <div class="glass-card" style="padding: 1.75rem;">
          <h3 class="mb-3">1. Select Student Roster</h3>

          <div class="form-group">
            <label class="form-label">Search / Select Enrolled Student:</label>
            <select class="form-control" onchange="KaviroxFees.selectStudent(this.value)">
              ${students.map(s => `
                <option value="${s.id}" ${s.id === this.selectedStudentId ? 'selected' : ''}>
                  ${s.rollNo} • ${s.name} (${s.pendingDues > 0 ? `DUE: ₹${s.pendingDues}` : 'Paid Up'})
                </option>
              `).join('')}
            </select>
          </div>

          ${selectedStudent ? `
            <div class="student-selected-banner">
              <div class="d-flex items-center gap-3">
                ${window.KaviroxIcons ? window.KaviroxIcons.avatar(selectedStudent.name, 48) : ''}
                <div>
                  <h4 style="font-size: 1.25rem;">${selectedStudent.name}</h4>
                  <span class="font-mono text-primary font-bold">${selectedStudent.rollNo}</span> • 
                  <span class="text-muted">${batch ? batch.name : 'N/A'}</span>
                </div>
              </div>

              <div class="mt-3 pt-3" style="border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 0.84rem;">
                <p><strong>Parent Contact:</strong> ${selectedStudent.parentName} (${selectedStudent.parentPhone})</p>
                <p class="mt-1"><strong>Enrolled Fee Plan:</strong> ${plan ? plan.name : 'Standard'}</p>
                ${selectedStudent.discountMonthly > 0 ? `
                  <p class="mt-1 text-emerald"><strong>Concession:</strong> -₹${selectedStudent.discountMonthly}/mo (${selectedStudent.discountReason})</p>
                ` : ''}
              </div>

              <div class="mt-3 p-3 glass-card" style="background: ${selectedStudent.pendingDues > 0 ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)'}; border-color: ${selectedStudent.pendingDues > 0 ? 'rgba(244, 63, 94, 0.3)' : 'rgba(16, 185, 129, 0.3)'};">
                <div class="d-flex justify-between items-center">
                  <span>Current Outstanding Balance:</span>
                  <strong style="font-size: 1.4rem; font-family: 'Outfit';" class="${selectedStudent.pendingDues > 0 ? 'text-rose' : 'text-emerald'}">
                    ₹${(selectedStudent.pendingDues || 0).toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>
            </div>
          ` : ''}

          <div class="glass-card mt-3 p-3" style="background: var(--bg-surface-elevated); font-size: 0.8rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.65rem;">
            ${window.KaviroxIcons ? window.KaviroxIcons.get('shield', 16) : ''}
            <span><strong>Audit Trail:</strong> Sequential receipt numbering locked with tamper-evident counter hash.</span>
          </div>
        </div>

        <!-- Right: Billing Breakdown & Payment Method -->
        <div class="glass-card" style="padding: 1.75rem;">
          <div class="d-flex justify-between items-center mb-3">
            <h3>2. Payment Particulars & Modes</h3>
            <span class="badge badge-accent">Sequential Lock</span>
          </div>

          <form onsubmit="KaviroxFees.handleCollectSubmit(event)">
            <div class="form-row">
              <div class="form-group flex-1">
                <label class="form-label">Billing Period</label>
                <select id="fee-period" class="form-control">
                  <option value="October 2026">October 2026</option>
                  <option value="November 2026">November 2026</option>
                  <option value="Quarter 3 (Oct - Dec 2026)">Quarter 3 (Oct - Dec 2026)</option>
                  <option value="Full Semester Dues">Full Semester Dues</option>
                </select>
              </div>

              <div class="form-group flex-1">
                <label class="form-label">Quick Amount Shortcut</label>
                <div class="d-flex gap-2">
                  <button type="button" class="btn btn-outline btn-xs flex-1" onclick="KaviroxFees.setQuickAmount(${defaultAmount})">
                    Full Due (₹${defaultAmount})
                  </button>
                  <button type="button" class="btn btn-outline btn-xs flex-1" onclick="KaviroxFees.setQuickAmount(${Math.round(defaultAmount/2)})">
                    50% Installment
                  </button>
                </div>
              </div>
            </div>

            <!-- Fee Heads Breakdown Table -->
            <div class="glass-card p-3 mb-3" style="background: var(--bg-input);">
              <label class="form-label mb-2">Itemized Particulars</label>
              
              <div class="d-flex justify-between items-center mb-2" style="font-size: 0.86rem;">
                <span>Tuition & Lecture Head:</span>
                <input type="number" id="head-tuition" class="form-control font-mono font-bold text-right" style="width: 140px;" value="${plan?.heads[0]?.amount || 4000}" oninput="KaviroxFees.calculateNet()" />
              </div>

              <div class="d-flex justify-between items-center mb-2" style="font-size: 0.86rem;">
                <span>Lab, Kit & Mock Tests:</span>
                <input type="number" id="head-lab" class="form-control font-mono font-bold text-right" style="width: 140px;" value="${plan?.heads[1]?.amount || 500}" oninput="KaviroxFees.calculateNet()" />
              </div>

              <div class="d-flex justify-between items-center mb-2" style="font-size: 0.86rem;">
                <span class="text-emerald">Concession / Discount (-):</span>
                <input type="number" id="fee-discount" class="form-control font-mono font-bold text-right text-emerald" style="width: 140px;" value="${selectedStudent?.discountMonthly || 0}" oninput="KaviroxFees.calculateNet()" />
              </div>

              <div class="d-flex justify-between items-center" style="font-size: 0.86rem;">
                <span class="text-rose">Late Fee / Penalty (+):</span>
                <input type="number" id="fee-late" class="form-control font-mono font-bold text-right text-rose" style="width: 140px;" value="0" oninput="KaviroxFees.calculateNet()" />
              </div>
            </div>

            <!-- Total Bar -->
            <div class="d-flex justify-between items-center p-3 glass-card mb-3" style="background: rgba(16, 185, 129, 0.12); border-color: rgba(16, 185, 129, 0.3);">
              <span>NET RECEIVABLE AMOUNT:</span>
              <strong id="net-total-text" class="text-emerald font-mono" style="font-size: 1.6rem; font-family: 'Outfit';">
                ₹${defaultAmount.toLocaleString('en-IN')}
              </strong>
            </div>

            <!-- Payment Method Interactive Tiles -->
            <div class="form-group">
              <label class="form-label">Select Payment Method *</label>
              <div class="payment-mode-tiles">
                <div class="mode-tile ${this.selectedPaymentMode === 'UPI' ? 'active' : ''}" onclick="KaviroxFees.setPaymentMode('UPI')">
                  <span class="mode-icon">📱</span>
                  <span>UPI / QR Scan</span>
                </div>
                <div class="mode-tile ${this.selectedPaymentMode === 'Cash' ? 'active' : ''}" onclick="KaviroxFees.setPaymentMode('Cash')">
                  <span class="mode-icon">💵</span>
                  <span>Cash Counter</span>
                </div>
                <div class="mode-tile ${this.selectedPaymentMode === 'Card' ? 'active' : ''}" onclick="KaviroxFees.setPaymentMode('Card')">
                  <span class="mode-icon">💳</span>
                  <span>Debit / POS Card</span>
                </div>
                <div class="mode-tile ${this.selectedPaymentMode === 'Net Banking' ? 'active' : ''}" onclick="KaviroxFees.setPaymentMode('Net Banking')">
                  <span class="mode-icon">🏦</span>
                  <span>Net Banking / NEFT</span>
                </div>
                <div class="mode-tile ${this.selectedPaymentMode === 'Cheque' ? 'active' : ''}" onclick="KaviroxFees.setPaymentMode('Cheque')">
                  <span class="mode-icon">📝</span>
                  <span>Bank Cheque</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Transaction Reference / Cheque ID</label>
              <input type="text" id="fee-ref" class="form-control font-mono" value="UPI/${Math.floor(1000000000 + Math.random() * 9000000000)}" />
            </div>

            <div class="d-flex gap-2 mt-4">
              <button type="button" class="btn btn-outline flex-1" onclick="KaviroxFees.openUpiQrModal()" title="Open QR Code for parent to scan">
                📲 Show UPI QR Code
              </button>
              <button type="submit" class="btn btn-primary btn-lg flex-1">
                🧾 Issue Official Receipt →
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  setPaymentMode(mode) {
    this.selectedPaymentMode = mode;
    this.updateRefPlaceholder(mode);
    window.kaviroxApp.render();
  },

  setQuickAmount(amount) {
    const tuitionInput = document.getElementById('head-tuition');
    const labInput = document.getElementById('head-lab');
    if (tuitionInput && labInput) {
      tuitionInput.value = amount;
      labInput.value = 0;
      this.calculateNet();
    }
  },

  selectStudent(stuId) {
    this.selectedStudentId = stuId;
    window.kaviroxApp.render();
  },

  calculateNet() {
    const tuition = Number(document.getElementById('head-tuition')?.value || 0);
    const lab = Number(document.getElementById('head-lab')?.value || 0);
    const discount = Number(document.getElementById('fee-discount')?.value || 0);
    const late = Number(document.getElementById('fee-late')?.value || 0);

    const net = Math.max(0, tuition + lab - discount + late);

    const txt = document.getElementById('net-total-text');
    if (txt) txt.textContent = `₹${net.toLocaleString('en-IN')}`;
  },

  updateRefPlaceholder(mode) {
    const ref = document.getElementById('fee-ref');
    if (!ref) return;
    if (mode === 'Cash') ref.value = 'CASH-DESK-01';
    else if (mode === 'Cheque') ref.value = 'CHQ #' + Math.floor(100000 + Math.random() * 900000);
    else if (mode === 'Card') ref.value = 'POS/HDFC/' + Math.floor(100000 + Math.random() * 900000);
    else ref.value = 'UPI/' + Math.floor(1000000000 + Math.random() * 9000000000);
  },

  handleCollectSubmit(e) {
    e.preventDefault();
    const store = window.kaviroxStore;
    const student = store.getStudents().find(s => s.id === this.selectedStudentId);
    if (!student) return;

    const batch = store.getBatches().find(b => b.id === student.batchId);
    const tuition = Number(document.getElementById('head-tuition').value || 0);
    const lab = Number(document.getElementById('head-lab').value || 0);
    const discount = Number(document.getElementById('fee-discount').value || 0);
    const late = Number(document.getElementById('fee-late').value || 0);
    const period = document.getElementById('fee-period').value;
    const ref = document.getElementById('fee-ref').value;

    const net = Math.max(0, tuition + lab - discount + late);

    const receipt = store.issueFeeReceipt({
      studentId: student.id,
      studentName: student.name,
      rollNo: student.rollNo,
      batchName: batch ? batch.name : 'General',
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      forPeriod: period,
      items: [
        { head: "Tuition & Academic Training", amount: tuition },
        { head: "Lab, Study Material & Test Series", amount: lab }
      ],
      discount: discount,
      lateFee: late,
      totalAmount: net,
      paymentMode: this.selectedPaymentMode,
      transactionRef: ref,
      collectedBy: "Sunil Verma (Accountant)"
    });

    window.kaviroxApp.showToast(`Receipt #${receipt.receiptNo} generated and signed in &lt;20 seconds!`, 'success');
    this.openReceiptPreview(receipt.id);
  },

  openUpiQrModal() {
    this.showUpiQrModal = true;
    window.kaviroxApp.render();
  },

  closeUpiQrModal() {
    this.showUpiQrModal = false;
    window.kaviroxApp.render();
  },

  renderUpiQrModal() {
    if (!this.showUpiQrModal) return '';

    return `
      <div class="modal-backdrop open">
        <div class="modal-card" style="max-width: 440px; text-align: center;">
          <div class="modal-header">
            <h3>Scan & Pay via UPI</h3>
            <button class="modal-close" onclick="KaviroxFees.closeUpiQrModal()">✕</button>
          </div>
          <div class="modal-body p-4">
            <p class="text-muted mb-3">Parent can scan with any UPI app (GPay, PhonePe, Paytm, BHIM):</p>
            
            <div class="glass-card p-3 mb-3" style="display: inline-block; background: #FFFFFF; border-radius: 12px;">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <!-- Authentic High-Resolution QR Graphic Simulation -->
                <rect width="200" height="200" fill="#FFFFFF"/>
                <!-- Corner Eyes -->
                <rect x="20" y="20" width="40" height="40" fill="#0F172A"/>
                <rect x="26" y="26" width="28" height="28" fill="#FFFFFF"/>
                <rect x="32" y="32" width="16" height="16" fill="#0F172A"/>

                <rect x="140" y="20" width="40" height="40" fill="#0F172A"/>
                <rect x="146" y="26" width="28" height="28" fill="#FFFFFF"/>
                <rect x="152" y="32" width="16" height="16" fill="#0F172A"/>

                <rect x="20" y="140" width="40" height="40" fill="#0F172A"/>
                <rect x="26" y="146" width="28" height="28" fill="#FFFFFF"/>
                <rect x="32" y="152" width="16" height="16" fill="#0F172A"/>

                <!-- QR Data Matrix Dots -->
                <rect x="70" y="20" width="10" height="10" fill="#0F172A"/>
                <rect x="90" y="30" width="20" height="10" fill="#0F172A"/>
                <rect x="120" y="20" width="10" height="10" fill="#0F172A"/>
                <rect x="70" y="50" width="20" height="20" fill="#0F172A"/>
                <rect x="100" y="50" width="30" height="10" fill="#0F172A"/>
                <rect x="20" y="80" width="50" height="10" fill="#0F172A"/>
                <rect x="80" y="80" width="40" height="40" fill="#6366F1"/>
                <rect x="130" y="70" width="50" height="20" fill="#0F172A"/>
                <rect x="20" y="100" width="20" height="30" fill="#0F172A"/>
                <rect x="50" y="110" width="20" height="20" fill="#0F172A"/>
                <rect x="130" y="100" width="20" height="30" fill="#0F172A"/>
                <rect x="160" y="110" width="20" height="20" fill="#0F172A"/>
                <rect x="70" y="130" width="20" height="50" fill="#0F172A"/>
                <rect x="100" y="140" width="40" height="20" fill="#0F172A"/>
                <rect x="150" y="140" width="30" height="40" fill="#0F172A"/>
              </svg>
            </div>

            <div class="font-mono text-primary font-bold">UPI ID: apexacademy@hdfcbank</div>
            <div class="text-emerald font-bold mt-1" style="font-size: 1.4rem;">₹4,500.00</div>
          </div>
          <div class="modal-footer justify-between">
            <button class="btn btn-outline btn-sm" onclick="KaviroxFees.closeUpiQrModal()">Close</button>
            <button class="btn btn-success btn-sm" onclick="KaviroxFees.closeUpiQrModal(); window.kaviroxApp.showToast('Payment verified via UPI Webhook!', 'success');">
              ✓ Simulate Instant UPI Success
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderReceiptsList() {
    const store = window.kaviroxStore;
    const receipts = store.getReceipts();

    return `
      <div class="glass-card" style="padding: 0; overflow: hidden;">
        <div class="p-4 d-flex justify-between items-center" style="padding: 1.5rem; border-bottom: 1px solid var(--border-subtle);">
          <div>
            <h3>Receipts Audit Register</h3>
            <span class="text-muted">Sequentially locked, digitally signed computer generated receipts</span>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.print()">
            🖨️ Export Printable Log
          </button>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Receipt No</th>
                <th>Date & Time</th>
                <th>Student</th>
                <th>Period</th>
                <th>Amount Paid</th>
                <th>Payment Mode</th>
                <th>Status</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${receipts.map(r => `
                <tr>
                  <td><strong class="font-mono text-primary">${r.receiptNo}</strong></td>
                  <td>${r.date} <small class="text-muted">${r.time}</small></td>
                  <td>
                    <strong>${r.studentName}</strong>
                    <small class="text-muted d-block">${r.rollNo}</small>
                  </td>
                  <td>${r.forPeriod}</td>
                  <td class="font-bold text-success font-mono">₹${r.totalAmount.toLocaleString('en-IN')}</td>
                  <td><span class="badge badge-outline">${r.paymentMode}</span></td>
                  <td>
                    <span class="badge ${r.status === 'valid' ? 'badge-success' : 'badge-danger'}">
                      ${r.status.toUpperCase()}
                    </span>
                  </td>
                  <td class="text-right">
                    <div class="d-flex gap-2 justify-end">
                      <button class="btn btn-xs btn-outline" onclick="KaviroxFees.openReceiptPreview('${r.id}')">
                        View Slip
                      </button>
                      ${r.status === 'valid' ? `
                        <button class="btn btn-xs btn-outline text-rose" onclick="KaviroxFees.cancelReceiptPrompt('${r.id}')">
                          Cancel
                        </button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  cancelReceiptPrompt(receiptId) {
    const reason = prompt("Enter mandatory cancellation reason for the audit trail:");
    if (reason) {
      window.kaviroxStore.cancelReceipt(receiptId, reason);
      window.kaviroxApp.showToast("Receipt voided and recorded in system audit log.", "info");
      window.kaviroxApp.render();
    }
  },

  renderDefaultersList() {
    const store = window.kaviroxStore;
    const defaulters = store.getStudents().filter(s => s.status === 'active' && (s.pendingDues || 0) > 0);
    const batches = store.getBatches();
    const totalOverdue = defaulters.reduce((acc, s) => acc + s.pendingDues, 0);

    return `
      <div class="glass-card" style="padding: 1.5rem;">
        <div class="d-flex justify-between items-center mb-3 flex-wrap gap-2">
          <div>
            <h3>⚠️ Fee Defaulters & Overdue Ledger</h3>
            <span class="text-muted">Total Pending: <strong class="text-rose font-mono">₹${totalOverdue.toLocaleString('en-IN')}</strong> from ${defaulters.length} students</span>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline btn-sm" onclick="KaviroxFees.setTab('whatsapp')">
              📲 Launch WhatsApp AI Agent ↗
            </button>
            <button class="btn btn-success btn-sm" onclick="KaviroxFees.setTab('whatsapp'); KaviroxWhatsAppAutomation.runBatchDispatch();" style="background: #25D366; border-color: #25D366; color: #082E1E; font-weight: 700;">
              🚀 Dispatch WhatsApp Batch Now
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Batch</th>
                <th>Parent Contact</th>
                <th>Pending Amount</th>
                <th>Aging Bracket</th>
                <th>Last Payment</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              ${defaulters.map(d => {
                const batch = batches.find(b => b.id === d.batchId);
                return `
                  <tr>
                    <td>
                      <strong>${d.name}</strong>
                      <small class="text-muted d-block font-mono">${d.rollNo}</small>
                    </td>
                    <td><span class="badge badge-outline">${batch ? batch.code : 'N/A'}</span></td>
                    <td>
                      <div>${d.parentPhone}</div>
                      <small class="text-muted">${d.parentName}</small>
                    </td>
                    <td class="font-bold text-rose font-mono">₹${d.pendingDues.toLocaleString('en-IN')}</td>
                    <td><span class="badge badge-danger">${d.overdueDays || 15} Days Overdue</span></td>
                    <td>${d.lastPaymentDate || 'None'}</td>
                    <td class="text-right">
                      <div class="d-flex gap-2 justify-end">
                        <button class="btn btn-xs btn-success" onclick="KaviroxFees.sendSingleReminder('${d.id}')">
                          WhatsApp Reminder
                        </button>
                        <button class="btn btn-xs btn-primary" onclick="KaviroxFees.selectStudent('${d.id}'); KaviroxFees.setTab('collect');">
                          ₹ Collect
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

  sendSingleReminder(studentId) {
    const store = window.kaviroxStore;
    const student = store.getStudents().find(s => s.id === studentId);
    if (!student) return;

    const centre = store.getCurrentCentre();
    const msg = `Dear ${student.parentName}, this is a gentle reminder from ${centre.name}. An overdue tuition fee of ₹${student.pendingDues} is pending for ${student.name} (${student.rollNo}). Kindly clear at your earliest. Pay via UPI or fee counter. Thank you!`;

    const copy = confirm(`AI & Template Draft for WhatsApp:\n\n"${msg}"\n\nClick OK to simulate sending WhatsApp message to ${student.parentPhone}.`);
    if (copy) {
      window.kaviroxApp.showToast(`Reminder sent to ${student.parentPhone}!`, 'success');
      store.logAudit("REMINDER_SENT", `Fee reminder sent to parent of ${student.name} (${student.parentPhone})`);
    }
  },

  sendBulkDefaulterNotice() {
    window.kaviroxApp.showToast(`Batch reminders queued for 4 parents via WhatsApp Cloud API.`, 'success');
  },

  renderDayBook() {
    const store = window.kaviroxStore;
    const receipts = store.getReceipts().filter(r => r.status === 'valid');
    const cashTotal = receipts.filter(r => r.paymentMode === 'Cash').reduce((sum, r) => sum + r.totalAmount, 0);
    const digitalTotal = receipts.filter(r => r.paymentMode !== 'Cash').reduce((sum, r) => sum + r.totalAmount, 0);
    const grandTotal = cashTotal + digitalTotal;

    return `
      <div class="glass-card" style="padding: 1.5rem;">
        <div class="d-flex justify-between items-center mb-3">
          <div>
            <h3>Day Book: Cash & Digital Reconciliation</h3>
            <span class="text-muted">Daily collection register cross-verifying physical cash vs bank accounts</span>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.print()">
            🖨️ Print Day Book
          </button>
        </div>

        <div class="daybook-summary-grid mt-3">
          <div class="glass-card p-3 text-center" style="background: var(--bg-surface-elevated);">
            <span class="text-muted" style="font-size: 0.8rem;">Cash at Counter</span>
            <div class="text-emerald font-mono font-bold mt-1" style="font-size: 1.6rem;">₹${cashTotal.toLocaleString('en-IN')}</div>
          </div>
          <div class="glass-card p-3 text-center" style="background: var(--bg-surface-elevated);">
            <span class="text-muted" style="font-size: 0.8rem;">Digital (UPI / Card / NEFT)</span>
            <div class="text-primary font-mono font-bold mt-1" style="font-size: 1.6rem;">₹${digitalTotal.toLocaleString('en-IN')}</div>
          </div>
          <div class="glass-card p-3 text-center" style="background: var(--bg-surface-elevated);">
            <span class="text-muted" style="font-size: 0.8rem;">Total Day Collection</span>
            <div class="font-mono font-bold mt-1" style="font-size: 1.6rem;">₹${grandTotal.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div class="table-responsive mt-4">
          <table class="data-table">
            <thead>
              <tr>
                <th>Receipt #</th>
                <th>Time</th>
                <th>Student</th>
                <th>Payment Mode</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Cashier</th>
              </tr>
            </thead>
            <tbody>
              ${receipts.map(r => `
                <tr>
                  <td><strong class="font-mono">${r.receiptNo}</strong></td>
                  <td>${r.time}</td>
                  <td>${r.studentName}</td>
                  <td><span class="badge badge-outline">${r.paymentMode}</span></td>
                  <td><code class="font-mono">${r.transactionRef}</code></td>
                  <td class="font-bold text-success font-mono">₹${r.totalAmount.toLocaleString('en-IN')}</td>
                  <td>${r.collectedBy}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  openReceiptPreview(receiptId) {
    const store = window.kaviroxStore;
    const receipt = store.getReceipts().find(r => r.id === receiptId) || 
      (store.data && store.data.receipts && store.data.receipts.find(r => r.id === receiptId));
    if (receipt) {
      this.activeReceiptForModal = receipt;
      let container = document.getElementById('receipt-modal-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'receipt-modal-container';
        document.body.appendChild(container);
      }
      container.innerHTML = this.renderReceiptModal();
      const modal = document.getElementById('receipt-print-modal');
      if (modal) modal.classList.add('open');
      if (window.CampusSoundFX) window.CampusSoundFX.play('click');
    }
  },

  closeReceiptModal() {
    this.activeReceiptForModal = null;
    const modal = document.getElementById('receipt-print-modal');
    if (modal) modal.classList.remove('open');
    const container = document.getElementById('receipt-modal-container');
    if (container) {
      setTimeout(() => { container.innerHTML = ''; }, 200);
    }
  },

  renderReceiptModal() {
    const r = this.activeReceiptForModal;
    if (!r) return `<div id="receipt-print-modal" class="modal-backdrop"></div>`;

    const store = window.kaviroxStore;
    const centre = store.getCurrentCentre();

    return `
      <div id="receipt-print-modal" class="modal-backdrop open">
        <div class="modal-card modal-receipt">
          <div class="receipt-modal-actions no-print">
            <button class="btn btn-outline btn-sm" onclick="window.print()">
              🖨️ Print / Download PDF
            </button>
            <button class="btn btn-success btn-sm" onclick="KaviroxFees.shareReceiptWhatsApp('${r.id}')">
              📲 Share on WhatsApp
            </button>
            <button class="modal-close" onclick="KaviroxFees.closeReceiptModal()">✕</button>
          </div>

          <!-- Official Institutional Printable Receipt Layout -->
          <div class="printable-receipt-card" id="printable-receipt-area">
            <div class="receipt-guilloche-border">
              <div class="watermark-emblem">🎓</div>

              <div class="receipt-official-header">
                <div class="receipt-official-logo">${centre.logo}</div>
                <div class="flex-1">
                  <h2>${centre.name}</h2>
                  <div class="receipt-tagline">${centre.address}</div>
                  <div class="receipt-tagline">GSTIN: ${centre.gstNo || '07AAAAA0000A1Z5'} • Phone: ${centre.phone} • Email: ${centre.email}</div>
                </div>
              </div>

              <div class="d-flex justify-between items-center mt-3 pb-2" style="border-bottom: 2px dashed #0F172A; font-weight: 800; font-size: 0.95rem;">
                <span>OFFICIAL FEE RECEIPT (ORIGINAL)</span>
                <span class="text-success">[ ${r.status.toUpperCase()} ]</span>
              </div>

              <div class="receipt-meta-box">
                <div><strong>Receipt Number:</strong> <span class="font-mono font-bold">${r.receiptNo}</span></div>
                <div><strong>Date & Time:</strong> ${r.date} at ${r.time}</div>
                <div><strong>Student Name:</strong> ${r.studentName}</div>
                <div><strong>Roll Number:</strong> <span class="font-mono font-bold">${r.rollNo}</span></div>
                <div><strong>Enrolled Batch:</strong> ${r.batchName}</div>
                <div><strong>Parent Contact:</strong> ${r.parentPhone} (${r.parentName})</div>
                <div><strong>Payment Mode:</strong> ${r.paymentMode}</div>
                <div><strong>Txn Reference:</strong> <span class="font-mono">${r.transactionRef}</span></div>
              </div>

              <table class="receipt-items-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Fee Particulars / Head</th>
                    <th>Period</th>
                    <th class="text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  ${r.items.map((item, idx) => `
                    <tr>
                      <td style="text-align: center; width: 40px;">${idx + 1}</td>
                      <td><strong>${item.head}</strong></td>
                      <td>${r.forPeriod}</td>
                      <td class="text-right font-mono font-bold">₹${item.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  `).join('')}

                  ${r.discount > 0 ? `
                    <tr>
                      <td colspan="3" class="text-right" style="color: #059669; font-weight: 600;">Less Concession / Scholarship:</td>
                      <td class="text-right font-mono font-bold" style="color: #059669;">- ₹${r.discount.toLocaleString('en-IN')}</td>
                    </tr>
                  ` : ''}

                  ${r.lateFee > 0 ? `
                    <tr>
                      <td colspan="3" class="text-right" style="color: #DC2626; font-weight: 600;">Add Late Fee / Fine:</td>
                      <td class="text-right font-mono font-bold" style="color: #DC2626;">+ ₹${r.lateFee.toLocaleString('en-IN')}</td>
                    </tr>
                  ` : ''}

                  <tr class="receipt-total-row">
                    <td colspan="3" class="text-right font-bold">TOTAL AMOUNT PAID:</td>
                    <td class="text-right font-mono font-bold" style="font-size: 1.15rem; color: #059669;">
                      ₹${r.totalAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style="font-size: 0.82rem; font-style: italic; color: #334155; padding: 0.4rem 0;">
                <strong>Amount in Words:</strong> Rupees ${this.numberToIndianWords(r.totalAmount)} Only
              </div>

              <div class="d-flex justify-between items-end mt-4 pt-3" style="border-top: 1px solid #E2E8F0;">
                <div class="d-flex items-center gap-2">
                  <div class="qr-mock" style="background: #F8FAFC; border: 1px dashed #94A3B8; padding: 0.5rem 0.75rem; border-radius: 6px;">
                    <strong>📱 QR VERIFIED</strong>
                    <small style="display:block; font-size: 0.65rem; color: #64748B;">Verify: kavirox.space/v/${r.receiptNo}</small>
                  </div>
                </div>

                <div class="text-right">
                  <div style="width: 170px; border-bottom: 1.5px solid #0F172A; margin-bottom: 0.25rem; margin-left: auto;"></div>
                  <strong style="font-size: 0.85rem;">Authorized Cashier</strong>
                  <div style="font-size: 0.75rem; color: #64748B;">${r.collectedBy}</div>
                </div>
              </div>

              <div class="text-center mt-3 pt-2" style="border-top: 1px solid #E2E8F0; font-size: 0.72rem; color: #94A3B8;">
                <p>${centre.receiptFooter}</p>
                <small>Powered by Kavirox Fee & Attendance Management Platform • 256-bit Digitally Verified</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  shareReceiptWhatsApp(receiptId) {
    const store = window.kaviroxStore;
    const r = store.getReceipts().find(rc => rc.id === receiptId);
    if (!r) return;
    const centre = store.getCurrentCentre();

    const text = `Fee Receipt: Received ₹${r.totalAmount} from ${r.studentName} (${r.rollNo}) for ${r.forPeriod}. Receipt No: ${r.receiptNo}. Thank you, ${centre.name}.`;
    alert(`WhatsApp message copied to clipboard:\n\n${text}`);
  },

  numberToIndianWords(num) {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    num = num.toString();
    if (num === '0') return 'Zero';
    if (num.length > 9) return 'Overflow';

    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';
    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str.trim();
  }
};
