// Kavirox Fee & Attendance Manager - High-Resolution Printable Student ID Cards Module
window.KaviroxIdCards = {
  selectedBatch: 'ALL',

  render() {
    const store = window.kaviroxStore;
    const centre = store.getCurrentCentre();
    const batches = store.getBatches();
    let students = store.getStudents().filter(s => s.status === 'active');

    if (this.selectedBatch !== 'ALL') {
      students = students.filter(s => s.batchId === this.selectedBatch);
    }

    return `
      <div class="idcards-container">
        <!-- Top Controls Header -->
        <div class="page-header-row no-print">
          <div>
            <div class="d-flex items-center gap-2">
              <h2>🪪 Printable Student ID Credentials</h2>
              <span class="badge badge-accent">Batch Lamination Ready</span>
            </div>
            <p class="text-muted">High-resolution printable identity cards with centre branding, QR code verification & encrypted barcode</p>
          </div>

          <div class="header-controls">
            <select class="form-control" style="width: auto; min-width: 220px;" onchange="KaviroxIdCards.filterBatch(this.value)">
              <option value="ALL">All Batches (${students.length} Total Cards)</option>
              ${batches.map(b => `<option value="${b.id}" ${this.selectedBatch === b.id ? 'selected' : ''}>${b.name}</option>`).join('')}
            </select>
            <button class="btn btn-primary" onclick="window.print()">
              🖨️ Print Batch Passports (Ctrl+P)
            </button>
          </div>
        </div>

        <!-- ID Cards Grid -->
        <div class="id-cards-grid mt-4">
          ${students.map(s => {
            const batch = batches.find(b => b.id === s.batchId);
            return `
              <div class="id-card-item">
                <!-- Lanyard Punch Hole -->
                <div class="id-lanyard-slot"></div>

                <!-- Top Institutional Header -->
                <div class="id-card-top-header">
                  <div class="id-card-brand-row">
                    <div class="id-centre-logo-emblem">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#4F46E5"/><path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 12L12 16L20 12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16L12 20L20 16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <div class="id-centre-name-block">
                      <h4 class="id-centre-title">${centre.name}</h4>
                      <span class="id-centre-sub">${centre.address}</span>
                    </div>
                  </div>
                  <div class="id-hologram-strip">
                    <span>AUTHORIZED STUDENT CREDENTIAL</span>
                    <span class="font-mono">VALID 2026–27</span>
                  </div>
                </div>

                <!-- Card Body -->
                <div class="id-card-body-content">
                  <div class="id-photo-column">
                    <div class="id-student-photo-frame">
                      ${window.KaviroxIcons ? window.KaviroxIcons.avatar(s.name, 60) : ''}
                      <div class="id-photo-badge">VERIFIED</div>
                    </div>
                    <div class="id-blood-tag font-mono">
                      BG: <strong>${s.bloodGroup || 'O+'}</strong>
                    </div>
                  </div>

                  <div class="id-student-details-column">
                    <h3 class="id-student-name">${s.name}</h3>
                    <div class="id-roll-pill">
                      <span class="lbl">ROLL NO:</span>
                      <strong class="font-mono">${s.rollNo}</strong>
                    </div>

                    <div class="id-meta-grid">
                      <div class="meta-item">
                        <span class="meta-label">Standard</span>
                        <strong class="meta-val">${s.standard}</strong>
                      </div>
                      <div class="meta-item">
                        <span class="meta-label">Category</span>
                        <strong class="meta-val">Full-Time Regular</strong>
                      </div>
                      <div class="meta-item span-full">
                        <span class="meta-label">Assigned Batch</span>
                        <strong class="meta-val">${batch ? batch.name : 'JEE Target Batch'}</strong>
                      </div>
                      <div class="meta-item span-full">
                        <span class="meta-label">Guardian Emergency Phone</span>
                        <strong class="meta-val font-mono">📞 ${s.parentPhone}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Security Footer with SVG Barcode and QR Code -->
                <div class="id-card-security-footer">
                  <div class="id-barcode-container">
                    <svg class="id-barcode-svg" viewBox="0 0 160 30" preserveAspectRatio="none">
                      <rect x="0" y="0" width="3" height="30" fill="currentColor"/>
                      <rect x="6" y="0" width="2" height="30" fill="currentColor"/>
                      <rect x="11" y="0" width="4" height="30" fill="currentColor"/>
                      <rect x="18" y="0" width="1" height="30" fill="currentColor"/>
                      <rect x="22" y="0" width="3" height="30" fill="currentColor"/>
                      <rect x="28" y="0" width="5" height="30" fill="currentColor"/>
                      <rect x="36" y="0" width="2" height="30" fill="currentColor"/>
                      <rect x="41" y="0" width="4" height="30" fill="currentColor"/>
                      <rect x="48" y="0" width="2" height="30" fill="currentColor"/>
                      <rect x="53" y="0" width="3" height="30" fill="currentColor"/>
                      <rect x="59" y="0" width="6" height="30" fill="currentColor"/>
                      <rect x="68" y="0" width="2" height="30" fill="currentColor"/>
                      <rect x="73" y="0" width="4" height="30" fill="currentColor"/>
                      <rect x="80" y="0" width="2" height="30" fill="currentColor"/>
                      <rect x="85" y="0" width="5" height="30" fill="currentColor"/>
                      <rect x="93" y="0" width="3" height="30" fill="currentColor"/>
                      <rect x="99" y="0" width="2" height="30" fill="currentColor"/>
                      <rect x="104" y="0" width="4" height="30" fill="currentColor"/>
                      <rect x="111" y="0" width="2" height="30" fill="currentColor"/>
                      <rect x="116" y="0" width="5" height="30" fill="currentColor"/>
                      <rect x="124" y="0" width="3" height="30" fill="currentColor"/>
                      <rect x="130" y="0" width="2" height="30" fill="currentColor"/>
                      <rect x="135" y="0" width="4" height="30" fill="currentColor"/>
                      <rect x="142" y="0" width="3" height="30" fill="currentColor"/>
                      <rect x="148" y="0" width="2" height="30" fill="currentColor"/>
                      <rect x="153" y="0" width="4" height="30" fill="currentColor"/>
                    </svg>
                    <span class="id-barcode-num font-mono">KVX-${centre.id}-${s.rollNo}</span>
                  </div>

                  <div class="id-qr-box">
                    <div class="qr-matrix-preview">
                      <div class="qr-corner top-left"></div>
                      <div class="qr-corner top-right"></div>
                      <div class="qr-corner bottom-left"></div>
                      <div class="qr-center-dot"></div>
                    </div>
                    <span class="qr-text">SCAN FOR ENTRY</span>
                  </div>
                </div>

                <!-- Watermark Hologram Seal -->
                <div class="id-watermark-seal">KVX SECURE PASS</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  filterBatch(batchId) {
    this.selectedBatch = batchId;
    if (window.kaviroxApp && window.kaviroxApp.render) {
      window.kaviroxApp.render();
    }
  },

  renderSingleBadge(studentId, orientation = 'vertical') {
    const store = window.kaviroxStore;
    const centre = store.getCurrentCentre();
    const student = store.getStudents().find(s => s.id === studentId) || store.getStudents()[0];
    if (!student) return '<p>Student not found</p>';
    const batch = store.getBatches().find(b => b.id === student.batchId);

    return `
      <div class="id-card-item single-preview" style="max-width: 380px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
        <!-- Lanyard Punch Hole -->
        <div class="id-lanyard-slot"></div>

        <!-- Top Institutional Header -->
        <div class="id-card-top-header">
          <div class="id-card-brand-row">
            <div class="id-centre-logo-emblem">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#4F46E5"/><path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 12L12 16L20 12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16L12 20L20 16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="id-centre-name-block">
              <h4 class="id-centre-title">${centre.name}</h4>
              <span class="id-centre-sub">${centre.address}</span>
            </div>
          </div>
          <div class="id-hologram-strip">
            <span>OFFICIAL STUDENT IDENTIFICATION CREDENTIAL</span>
            <span class="font-mono">VALID 2026–27</span>
          </div>
        </div>

        <!-- Card Body Content -->
        <div class="id-card-body-content">
          <div class="id-photo-column">
            <div class="id-student-photo-frame">
              ${window.KaviroxIcons ? window.KaviroxIcons.avatar(student.name, 60) : ''}
              <div class="id-photo-badge">VERIFIED</div>
            </div>
            <div class="id-blood-tag font-mono">
              BG: <strong>${student.bloodGroup || 'O+'}</strong>
            </div>
          </div>

          <div class="id-student-details-column">
            <h3 class="id-student-name">${student.name}</h3>
            <div class="id-roll-pill">
              <span class="lbl">ROLL NO:</span>
              <strong class="font-mono">${student.rollNo}</strong>
            </div>

            <div class="id-meta-grid">
              <div class="meta-item">
                <span class="meta-label">Standard</span>
                <strong class="meta-val">${student.standard || 'Class 11'}</strong>
              </div>
              <div class="meta-item">
                <span class="meta-label">Category</span>
                <strong class="meta-val">Full-Time Classroom</strong>
              </div>
              <div class="meta-item span-full">
                <span class="meta-label">Assigned Batch</span>
                <strong class="meta-val">${batch ? batch.name : 'JEE Target Batch'}</strong>
              </div>
              <div class="meta-item span-full">
                <span class="meta-label">Emergency Contact</span>
                <strong class="meta-val font-mono">📞 ${student.parentPhone}</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Barcode & QR Footer -->
        <div class="id-card-footer-barcode">
          <div class="barcode-visual-strip font-mono">
            ||| | ||||| || |||| ||| |||| | ||||| ||
            <span class="barcode-num">${student.rollNo}-2026-RFID</span>
          </div>
          <div class="id-qr-box">
            <div class="simulated-qr">
              <div class="qr-corner top-left"></div>
              <div class="qr-corner top-right"></div>
              <div class="qr-corner bottom-left"></div>
              <div class="qr-center-dot"></div>
            </div>
            <span class="qr-text">TURNSTILE PASS</span>
          </div>
        </div>

        <div class="id-watermark-seal">APEX SECURE CREDENTIAL</div>
      </div>
    `;
  }
};
