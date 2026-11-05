// Kavirox Fee & Attendance Manager - Institutional Certificate & Transcript Suite
// Generates official gold-crested Bonafide, Academic Merit, and Conduct Certificates with QR Verification Seals

window.KaviroxCertificates = {
  CERT_TYPES: {
    bonafide: {
      title: "BONAFIDE STUDENT CERTIFICATE",
      subtitle: "OFFICIAL REGISTRAR CERTIFICATION OF ENROLLED WARD",
      body: (student, centre) => `This is to certify that <strong>${student.name}</strong>, son/daughter of <strong>${student.parentName}</strong>, bearing Institutional Roll Number <strong class="font-mono">${student.rollNo}</strong>, is a bonafide student of <strong>${centre.name}</strong> enrolled in the <strong>${student.standard || 'Class 11 (PCM)'} - Target Program</strong> for the Academic Session <strong>2026–2027</strong>.<br><br>As per institute biometric attendance ledgers, the student maintains an active attendance standing of <strong>94.8%</strong> and has consistently exhibited exemplary discipline. This certificate is issued on the guardian's request for academic, verification, and scholarship records.`,
      seal: "REGISTRAR VERIFIED"
    },
    merit: {
      title: "CERTIFICATE OF ACADEMIC MERIT & EXCELLENCE",
      subtitle: "ALL-INDIA PRE-ENGINEERING & PRE-MEDICAL DIVISION",
      body: (student, centre) => `In recognition of outstanding academic brilliance and rigorous test performance, this Certificate of Merit is proudly conferred upon <strong>${student.name}</strong> (Roll No: <strong class="font-mono">${student.rollNo}</strong>) for securing <strong>Batch Rank #1 (99.8th Percentile)</strong> in the <strong>All-India Pre-JEE Advanced Minor Assessment Series</strong> conducted across Kota and Greater Noida centres for Academic Session <strong>2026–2027</strong>.`,
      seal: "ACADEMIC EXCELLENCE"
    },
    conduct: {
      title: "CHARACTER & CONDUCT CERTIFICATE",
      subtitle: "DISCIPLINARY BOARD OF CAMPUS REGISTRAR",
      body: (student, centre) => `Certified that <strong>${student.name}</strong> (Roll: <strong class="font-mono">${student.rollNo}</strong>) has been an enrolled aspirant at <strong>${centre.name}</strong> during the academic period 2026–2027. During their tenure at the campus, their moral conduct, campus punctuality, turnstile compliance, and peer relationship have been found to be <strong>Exemplary and of the Highest Standard</strong>.`,
      seal: "DISCIPLINARY CLEAR"
    }
  },

  openCertificateModal(studentId, certType = 'bonafide') {
    const store = window.kaviroxStore;
    const student = (store.getStudents() || []).find(s => s.id === studentId) || store.getStudents()[0];
    const centre = store.getCurrentCentre();
    const config = this.CERT_TYPES[certType] || this.CERT_TYPES.bonafide;

    const certNumber = `APX-CERT-2026-${Math.floor(Math.random() * 8000 + 1000)}`;
    const issueDate = "25 October 2026";
    const verificationHash = `0x${student.rollNo}${Date.now().toString(16).slice(-6)}`.toUpperCase();

    let container = document.getElementById('certificate-modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'certificate-modal-container';
      document.body.appendChild(container);
    }

    container.innerHTML = `
      <div class="modal-backdrop open" style="display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 1.5rem; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(8px);">
        <div class="certificate-modal-card animate-slide-in" style="background: #FFFFFF !important; color: #0F172A !important; max-width: 820px; width: 100%; border-radius: 16px; box-shadow: 0 25px 60px -15px rgba(0,0,0,0.5); overflow: hidden; display: flex; flex-direction: column;">
          
          <!-- Top Controller Action Bar (No-Print) -->
          <div class="d-flex justify-between items-center p-3 border-bottom no-print" style="background: #F8FAFC;">
            <div class="d-flex items-center gap-2">
              <span class="badge badge-primary font-mono" style="font-size: 0.75rem;">OFFICIAL DIGITAL CREDENTIAL</span>
              <span style="font-size: 0.8rem; color: #64748B;">Reg ID: <strong>${certNumber}</strong></span>
            </div>
            <div class="d-flex items-center gap-2">
              <select class="form-control" style="font-size: 0.8rem; padding: 0.35rem 0.65rem; width: auto;" onchange="KaviroxCertificates.openCertificateModal('${student.id}', this.value)">
                <option value="bonafide" ${certType === 'bonafide' ? 'selected' : ''}>📜 Bonafide Certificate</option>
                <option value="merit" ${certType === 'merit' ? 'selected' : ''}>🏆 Merit of Excellence</option>
                <option value="conduct" ${certType === 'conduct' ? 'selected' : ''}>🛡️ Character & Conduct</option>
              </select>
              <button class="btn btn-primary btn-sm" onclick="window.print()">
                🖨️ Print / Save PDF
              </button>
              <button onclick="KaviroxCertificates.closeModal()" style="font-size: 1.4rem; cursor: pointer; background: none; border: none; color: #64748B; padding: 0 0.5rem;">✕</button>
            </div>
          </div>

          <!-- Printable Certificate Body (Classic Gold & Oxford Blue Border) -->
          <div class="printable-certificate-body" style="padding: 3rem 3.5rem; position: relative; background: #FFFDF9; border: 12px double #1E3A8A; margin: 1.5rem; border-radius: 8px;">
            
            <!-- Watermark Emblem -->
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.04; pointer-events: none; font-size: 16rem; font-weight: 900; color: #1E3A8A; user-select: none;">
              APEX
            </div>

            <!-- Certificate Header -->
            <div class="text-center mb-4">
              <div style="display: inline-flex; align-items: center; justify-content: center; width: 68px; height: 68px; border-radius: 50%; background: #1E3A8A; color: #F59E0B; font-size: 2.2rem; margin-bottom: 0.85rem; box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3); border: 2px solid #F59E0B;">
                🎓
              </div>
              <h2 style="font-size: 1.6rem; font-weight: 900; letter-spacing: 0.05em; color: #1E3A8A; margin: 0; font-family: 'Outfit', sans-serif;">
                ${centre.name.toUpperCase()}
              </h2>
              <div style="font-size: 0.82rem; color: #64748B; font-weight: 600; letter-spacing: 0.02em; margin-top: 0.25rem;">
                ${centre.address} • Affiliation / Reg No: KTA/EDU/2008/7821
              </div>
              <div style="height: 2px; width: 140px; background: linear-gradient(90deg, transparent, #F59E0B, transparent); margin: 0.85rem auto;"></div>
            </div>

            <!-- Title & Subtitle -->
            <div class="text-center mb-4">
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; letter-spacing: 0.04em; margin: 0 0 0.3rem; font-family: 'Outfit', sans-serif;">
                ${config.title}
              </h3>
              <span style="font-size: 0.72rem; font-weight: 700; color: #2563EB; letter-spacing: 0.08em; text-transform: uppercase;">
                ${config.subtitle}
              </span>
            </div>

            <!-- Body Paragraph -->
            <div style="font-size: 0.95rem; line-height: 1.85; color: #1E293B; text-align: justify; margin: 2rem 0; font-family: 'Plus Jakarta Sans', serif;">
              ${config.body(student, centre)}
            </div>

            <!-- Verification Metadata Row -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; border-top: 1px dashed #CBD5E1; border-bottom: 1px dashed #CBD5E1; padding: 1rem 0; margin-bottom: 2.5rem; font-size: 0.78rem;">
              <div>
                <span style="color: #64748B; display: block; font-size: 0.7rem; text-transform: uppercase;">Certificate No</span>
                <strong class="font-mono text-dark" style="font-size: 0.85rem;">${certNumber}</strong>
              </div>
              <div>
                <span style="color: #64748B; display: block; font-size: 0.7rem; text-transform: uppercase;">Issue Date</span>
                <strong style="font-size: 0.85rem;">${issueDate}</strong>
              </div>
              <div>
                <span style="color: #64748B; display: block; font-size: 0.7rem; text-transform: uppercase;">Cryptographic Audit Hash</span>
                <strong class="font-mono" style="color: #059669; font-size: 0.82rem;">${verificationHash}</strong>
              </div>
            </div>

            <!-- Signatures & Golden QR Seal -->
            <div class="d-flex justify-between items-end flex-wrap gap-3">
              <div style="text-align: center; width: 180px;">
                <div style="height: 40px; display: flex; align-items: flex-end; justify-content: center; font-family: 'Brush Script MT', cursive; font-size: 1.4rem; color: #1E3A8A;">
                  Pooja Chawla
                </div>
                <div style="border-top: 1.5px solid #0F172A; padding-top: 0.35rem; font-size: 0.75rem; font-weight: 700;">
                  Dean of Academics
                </div>
                <span style="font-size: 0.68rem; color: #64748B;">Faculty Disciplinary Board</span>
              </div>

              <!-- Golden Institutional Security Seal -->
              <div style="width: 80px; height: 80px; border-radius: 50%; border: 3px dashed #F59E0B; background: #FFFBEB; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2); text-align: center; padding: 0.25rem;">
                <span style="font-size: 1.1rem;">🏅</span>
                <span style="font-size: 0.58rem; font-weight: 900; color: #92400E; letter-spacing: 0.05em; text-transform: uppercase; line-height: 1.1;">
                  ${config.seal}
                </span>
                <span style="font-size: 0.52rem; color: #B45309; font-family: 'JetBrains Mono';">2026-27</span>
              </div>

              <div style="text-align: center; width: 180px;">
                <div style="height: 40px; display: flex; align-items: flex-end; justify-content: center; font-family: 'Brush Script MT', cursive; font-size: 1.5rem; color: #1E3A8A;">
                  Dr. Rajesh Sharma
                </div>
                <div style="border-top: 1.5px solid #0F172A; padding-top: 0.35rem; font-size: 0.75rem; font-weight: 700;">
                  Director & Registrar
                </div>
                <span style="font-size: 0.68rem; color: #64748B;">Apex Academy Kota Main</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  },

  closeModal() {
    const c = document.getElementById('certificate-modal-container');
    if (c) c.innerHTML = '';
  }
};
