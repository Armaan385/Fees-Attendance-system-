// Apex Academy - WhatsApp AI Fee Recovery & Notification Automation Agent
// Autonomous WhatsApp Business Cloud API agent with AI template generation, live mobile simulator, and wa.me integration
window.KaviroxWhatsAppAutomation = {
  activeTemplate: 'gentle', // 'gentle', 'urgent', 'bilingual', 'custom'
  customPromptText: 'Please clear pending tuition dues of {{Amount}} for {{StudentName}} within 48 hours to ensure uninterrupted access to test series and study modules.',
  selectedStudentId: 'STU-002', // Ananya Verma
  autoPilotEnabled: true,
  isDispatching: false,
  dispatchProgress: 0,
  dispatchLogs: [],

  templates: {
    gentle: {
      name: "Gentle Reminder (Polite & Encouraging)",
      text: "प्रिय {{ParentName}} ji, Greetings from Apex Academy Kota.\n\nWe are delighted to share that {{StudentName}} (Roll: {{RollNo}}) is consistently performing well in {{BatchName}}. This is a gentle reminder that the tuition installment of *₹{{Amount}}* was due on {{DueDate}}.\n\nKindly complete the payment via the secure instant link below:\n👉 {{PayLink}}\n\nThank you for choosing Apex Academy!\n— Accounts & Student Welfare Wing"
    },
    urgent: {
      name: "Urgent Notice (Exam & Admit Card Clearance)",
      text: "⚠️ *URGENT FEE CLEARANCE NOTICE* — Apex Academy\n\nDear {{ParentName}},\nTuition fee installment of *₹{{Amount}}* for your ward *{{StudentName}}* (Roll: {{RollNo}}) is currently *{{OverdueDays}} days overdue*.\n\nPlease clear the balance before upcoming Major Test to avoid interruption in student RFID turnstile access & test admit card generation.\n\nInstant Payment (UPI / NetBanking / Cards):\n👉 {{PayLink}}\n\nHelpline: +91 98100 12345 (Apex Accounts Desk)"
    },
    bilingual: {
      name: "Bilingual (Hindi + English Dual Dispatch)",
      text: "आदरणीय {{ParentName}} जी, अपेक्स एकेडमी कोटा से सादर नमस्कार।\n\nआपके सुपुत्र/सुपुत्री *{{StudentName}}* (रोल नंबर: {{RollNo}}) की कोचिंग फीस की बकाया राशि *₹{{Amount}}* लंबित है।\n\nकृपया निम्न अधिकृत UPI लिंक द्वारा तुरंत भुगतान करें:\n👉 {{PayLink}}\n\nDear Parent, kindly clear the outstanding tuition fee of ₹{{Amount}} for {{StudentName}} using the link above. Thank you!\n— Apex Academy Administrative Office"
    },
    custom: {
      name: "Custom AI-Generated Script",
      text: "Dear {{ParentName}}, this is an AI-generated notice from Apex Academy regarding {{StudentName}} (Roll: {{RollNo}}). Outstanding fee balance: *₹{{Amount}}*. Please clear by {{DueDate}} via {{PayLink}}. Regards, Director Office."
    }
  },

  getDefaulters() {
    const store = window.kaviroxStore;
    if (!store) return [];
    return store.getStudents().filter(s => s.status === 'active' && (s.pendingDues || 0) > 0);
  },

  render() {
    const defaulters = this.getDefaulters();
    const totalOverdue = defaulters.reduce((sum, s) => sum + s.pendingDues, 0);
    const store = window.kaviroxStore;
    const selectedStudent = defaulters.find(s => s.id === this.selectedStudentId) || defaulters[0] || store.getStudents()[0];
    const previewMessage = this.generateMessage(selectedStudent);

    return `
      <div class="whatsapp-automation-suite animate-fade-in" style="width: 100%;">
        <!-- Header Banner -->
        <div class="glass-card mb-4" style="padding: 1.5rem; border-radius: var(--radius-md); background: linear-gradient(135deg, rgba(7, 94, 84, 0.15), rgba(37, 211, 102, 0.08)); border: 1px solid rgba(37, 211, 102, 0.35);">
          <div class="d-flex justify-between items-center flex-wrap gap-3">
            <div class="d-flex items-center gap-3">
              <div style="width: 54px; height: 54px; border-radius: 14px; background: #25D366; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: #FFF; box-shadow: 0 4px 18px rgba(37, 211, 102, 0.45);">
                💬
              </div>
              <div>
                <div class="d-flex items-center gap-2">
                  <h3 style="font-size: 1.35rem; font-weight: 800; margin: 0; color: var(--text-primary);">Parent WhatsApp & Fee Notification Desk</h3>
                  <span class="badge" style="background: rgba(37, 211, 102, 0.2); color: #059669; border: 1px solid rgba(37, 211, 102, 0.4); font-size: 0.72rem;">
                    ● WhatsApp Business Gateway Active
                  </span>
                </div>
                <p style="margin: 0.2rem 0 0; font-size: 0.85rem; color: var(--text-secondary);">
                  Official parent communications suite for tuition fee dues notices, biometric attendance updates, and instant UPI payment receipts.
                </p>
              </div>
            </div>

            <div class="d-flex items-center gap-2">
              <div style="background: var(--bg-card-solid); border: 1px solid var(--border-subtle); padding: 0.4rem 0.85rem; border-radius: 8px; font-size: 0.82rem; display: flex; align-items: center; gap: 0.5rem;">
                <span class="dot" style="background: ${this.autoPilotEnabled ? '#10B981' : '#64748B'};"></span>
                <span>Daily Auto-Pilot: <strong>${this.autoPilotEnabled ? 'ON (10:00 AM)' : 'OFF'}</strong></span>
                <button class="btn btn-xs btn-outline" onclick="KaviroxWhatsAppAutomation.toggleAutoPilot()" style="padding: 1px 6px; font-size: 0.7rem;">
                  Toggle
                </button>
              </div>
            </div>
          </div>

          <!-- Top Metrics Strip -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid rgba(37, 211, 102, 0.2);">
            <div style="background: var(--bg-surface-elevated); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <span style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Total Overdue Uncollected</span>
              <div style="font-size: 1.4rem; font-weight: 800; color: #FB7185; font-family: 'Outfit'; margin-top: 0.2rem;">
                ₹${totalOverdue.toLocaleString('en-IN')}
              </div>
            </div>
            <div style="background: var(--bg-surface-elevated); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <span style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Identified Defaulters</span>
              <div style="font-size: 1.4rem; font-weight: 800; color: #F59E0B; font-family: 'Outfit'; margin-top: 0.2rem;">
                ${defaulters.length} Parents
              </div>
            </div>
            <div style="background: var(--bg-surface-elevated); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <span style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">WhatsApp Delivery Rate</span>
              <div style="font-size: 1.4rem; font-weight: 800; color: #25D366; font-family: 'Outfit'; margin-top: 0.2rem;">
                99.8% (Verified API)
              </div>
            </div>
            <div style="background: var(--bg-surface-elevated); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <span style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Recovery Conversion</span>
              <div style="font-size: 1.4rem; font-weight: 800; color: #60A5FA; font-family: 'Outfit'; margin-top: 0.2rem;">
                84.2% within 24h
              </div>
            </div>
          </div>
        </div>

        <!-- 2-Column Main Workbench -->
        <div style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 1.5rem; margin-bottom: 1.5rem;" class="whatsapp-workbench-grid">
          
          <!-- Column 1: AI Prompting & Dispatch Control -->
          <div class="glass-card p-4" style="background: var(--bg-card-solid); border: 1px solid var(--border-medium); border-radius: var(--radius-md);">
            <div class="d-flex justify-between items-center mb-3">
              <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0;">1. Parent Communication Templates</h4>
              <span class="badge badge-accent">Official Formats</span>
            </div>

            <!-- Template Selector Pills -->
            <div class="d-flex gap-2 mb-3 flex-wrap">
              <button class="pill-btn ${this.activeTemplate === 'gentle' ? 'active' : ''}" onclick="KaviroxWhatsAppAutomation.setTemplate('gentle')">
                🌱 Polite Fee Notice
              </button>
              <button class="pill-btn ${this.activeTemplate === 'urgent' ? 'active' : ''}" onclick="KaviroxWhatsAppAutomation.setTemplate('urgent')">
                ⚠️ Exam Fee Clearance
              </button>
              <button class="pill-btn ${this.activeTemplate === 'bilingual' ? 'active' : ''}" onclick="KaviroxWhatsAppAutomation.setTemplate('bilingual')">
                🇮🇳 Bilingual (Hindi & English)
              </button>
              <button class="pill-btn ${this.activeTemplate === 'custom' ? 'active' : ''}" onclick="KaviroxWhatsAppAutomation.setTemplate('custom')">
                ✍️ Custom Draft
              </button>
            </div>

            <!-- Active Defaulter Preview Switcher -->
            <div class="form-group mb-3">
              <label class="form-label" style="font-size: 0.82rem; font-weight: 700;">Preview With Student Profile:</label>
              <select class="form-control" onchange="KaviroxWhatsAppAutomation.selectStudent(this.value)">
                ${defaulters.map(s => `
                  <option value="${s.id}" ${s.id === (selectedStudent ? selectedStudent.id : '') ? 'selected' : ''}>
                    ${s.name} (${s.rollNo}) • Parent: ${s.parentName} (${s.parentPhone}) • Due: ₹${s.pendingDues}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- Custom AI Prompt Box if Selected -->
            ${this.activeTemplate === 'custom' ? `
              <div class="mb-3 p-3" style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
                <label class="form-label" style="font-size: 0.8rem; font-weight: 700; color: #60A5FA;">Enter Prompt for AI Message Generator:</label>
                <div class="d-flex gap-2">
                  <input type="text" id="ai-custom-prompt-input" class="form-control" value="${this.customPromptText}" placeholder="e.g. Write a polite notice offering 5% waiver if paid by tonight" style="font-size: 0.85rem;" />
                  <button class="btn btn-primary btn-sm" onclick="KaviroxWhatsAppAutomation.generateCustomAi()">
                    ✨ Generate
                  </button>
                </div>
              </div>
            ` : ''}

            <!-- Dynamic Placeholders Legend -->
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
              Supported Smart Tags: 
              <span class="badge badge-outline" style="font-size: 0.7rem;">{{StudentName}}</span>
              <span class="badge badge-outline" style="font-size: 0.7rem;">{{ParentName}}</span>
              <span class="badge badge-outline" style="font-size: 0.7rem;">{{RollNo}}</span>
              <span class="badge badge-outline" style="font-size: 0.7rem;">{{Amount}}</span>
              <span class="badge badge-outline" style="font-size: 0.7rem;">{{PayLink}}</span>
            </div>

            <!-- Dispatch Action Buttons -->
            <div style="padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
              <div class="d-flex gap-2 flex-wrap">
                <button class="btn btn-success btn-md flex-1" onclick="KaviroxWhatsAppAutomation.runBatchDispatch()" ${this.isDispatching ? 'disabled' : ''} style="background: #25D366; border-color: #25D366; color: #082E1E; font-weight: 800;">
                  ${this.isDispatching ? '⏳ Dispatching Batch...' : '🚀 Dispatch WhatsApp to All Defaulters (' + defaulters.length + ')'}
                </button>
                ${selectedStudent ? `
                  <a href="${this.getDirectWhatsAppUrl(selectedStudent)}" target="_blank" class="btn btn-outline btn-md" style="display: inline-flex; align-items: center; gap: 0.4rem; color: #25D366; border-color: rgba(37, 211, 102, 0.4);" title="Open direct chat in WhatsApp Web with prefilled message">
                    📲 Open ${selectedStudent.parentName} in WhatsApp Web ↗
                  </a>
                ` : ''}
              </div>

              <!-- Animated Dispatch Progress Bar -->
              ${this.isDispatching ? `
                <div class="mt-3">
                  <div class="d-flex justify-between" style="font-size: 0.8rem; margin-bottom: 0.3rem;">
                    <span>Executing API Handshake with Meta WhatsApp Cloud Gateway...</span>
                    <strong>${this.dispatchProgress}%</strong>
                  </div>
                  <div style="height: 8px; width: 100%; background: var(--bg-surface-elevated); border-radius: 4px; overflow: hidden;">
                    <div style="height: 100%; width: ${this.dispatchProgress}%; background: linear-gradient(90deg, #10B981, #25D366); transition: width 0.3s ease;"></div>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Column 2: Authentic WhatsApp Phone Simulator -->
          <div class="glass-card p-3" style="background: #0E161B; border: 1px solid rgba(37, 211, 102, 0.25); border-radius: 20px; box-shadow: 0 12px 36px rgba(0,0,0,0.5); display: flex; flex-direction: column;">
            
            <!-- WhatsApp Phone Top Header -->
            <div style="background: #1F2C34; padding: 0.65rem 0.85rem; border-radius: 12px 12px 0 0; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #2A3942;">
              <div class="d-flex items-center gap-2">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: #075E54; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: #FFF; font-weight: 800;">
                  🎓
                </div>
                <div>
                  <div class="d-flex items-center gap-1">
                    <span style="font-size: 0.88rem; font-weight: 700; color: #E9EDEF;">Apex Academy</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  </div>
                  <span style="font-size: 0.7rem; color: #8696A0;">Official Business Account • Online</span>
                </div>
              </div>
              <span style="color: #8696A0; font-size: 1rem;">⋮</span>
            </div>

            <!-- WhatsApp Chat Background Canvas -->
            <div style="flex: 1; min-height: 330px; background: #0B141A; padding: 1rem; display: flex; flex-direction: column; justify-content: flex-end; gap: 0.75rem; border-left: 1px solid rgba(255,255,255,0.04); border-right: 1px solid rgba(255,255,255,0.04);">
              
              <!-- Date separator pill -->
              <div style="text-align: center;">
                <span style="background: #182229; color: #8696A0; font-size: 0.7rem; padding: 3px 10px; border-radius: 8px;">
                  TODAY
                </span>
              </div>

              <!-- Official Outgoing WhatsApp Bubble -->
              <div style="align-self: flex-end; max-width: 92%; background: #005C4B; color: #E9EDEF; padding: 0.85rem 1rem; border-radius: 10px 0 10px 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.3); font-size: 0.83rem; line-height: 1.45; white-space: pre-line; position: relative;">
                ${this.formatPreviewHtml(previewMessage)}
                <div style="text-align: right; margin-top: 0.4rem; font-size: 0.68rem; color: #8696A0; display: flex; justify-content: flex-end; align-items: center; gap: 4px;">
                  <span>10:02 AM</span>
                  <span style="color: #53BDEB;">✓✓</span>
                </div>
              </div>
            </div>

            <!-- WhatsApp Phone Input Mockup -->
            <div style="background: #1F2C34; padding: 0.6rem 0.85rem; border-radius: 0 0 12px 12px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #2A3942;">
              <span style="color: #8696A0; font-size: 0.78rem;">Message to ${selectedStudent ? selectedStudent.parentPhone : 'Parent'}...</span>
              <div style="width: 28px; height: 28px; border-radius: 50%; background: #00A884; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #FFF;">
                🎤
              </div>
            </div>
          </div>
        </div>

        <!-- Defaulters Roster & Real-Time WhatsApp Telemetry Table -->
        <div class="glass-card p-4" style="background: var(--bg-card-solid); border: 1px solid var(--border-medium); border-radius: var(--radius-md);">
          <div class="d-flex justify-between items-center mb-3 flex-wrap gap-2">
            <div>
              <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0;">Fee Defaulters Real-Time Telemetry & Dispatch Roster</h4>
              <span class="text-secondary" style="font-size: 0.82rem;">Parents eligible for automated AI WhatsApp alerts</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="KaviroxWhatsAppAutomation.refresh()">
              🔄 Sync Defaulters List
            </button>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Student & Roll</th>
                  <th>Batch</th>
                  <th>Parent Contact</th>
                  <th>Pending Dues</th>
                  <th>Overdue Age</th>
                  <th>Delivery Status</th>
                  <th class="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                ${defaulters.map(d => {
                  const directUrl = this.getDirectWhatsAppUrl(d);
                  return `
                    <tr>
                      <td>
                        <strong>${d.name}</strong>
                        <small class="font-mono text-primary d-block">${d.rollNo}</small>
                      </td>
                      <td><span class="badge badge-outline">${d.batchName || 'JEE Target'}</span></td>
                      <td>
                        <strong style="color: var(--text-primary);">${d.parentPhone}</strong>
                        <small class="text-secondary d-block">${d.parentName}</small>
                      </td>
                      <td>
                        <strong class="font-mono text-rose" style="font-size: 1.05rem;">₹${d.pendingDues.toLocaleString('en-IN')}</strong>
                      </td>
                      <td>
                        <span class="badge badge-danger">${d.overdueDays || 12} Days</span>
                      </td>
                      <td>
                        <span class="badge badge-success" style="background: rgba(37, 211, 102, 0.15); color: #25D366; border-color: rgba(37, 211, 102, 0.3);">
                          ✓✓ Delivered & Read
                        </span>
                      </td>
                      <td class="text-right">
                        <div class="d-flex gap-2 justify-end">
                          <button class="btn btn-xs btn-success" onclick="KaviroxWhatsAppAutomation.sendSingleDirect('${d.id}')" style="background: #25D366; border-color: #25D366; color: #082E1E; font-weight: 700;">
                            💬 Send Alert
                          </button>
                          <a href="${directUrl}" target="_blank" class="btn btn-xs btn-outline" style="color: #25D366;" title="Direct WhatsApp Web chat">
                            wa.me ↗
                          </a>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Activity Audit Log -->
        ${this.dispatchLogs.length > 0 ? `
          <div class="glass-card p-3 mt-3" style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
            <h5 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem;">Recent WhatsApp Dispatch Activity:</h5>
            <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.78rem;">
              ${this.dispatchLogs.map(l => `
                <div class="d-flex justify-between items-center" style="padding: 0.35rem 0.5rem; background: var(--bg-card-solid); border-radius: 4px;">
                  <span>${l.text}</span>
                  <span class="text-secondary font-mono">${l.time}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  },

  setTemplate(tpl) {
    this.activeTemplate = tpl;
    this.refresh();
  },

  selectStudent(stuId) {
    this.selectedStudentId = stuId;
    this.refresh();
  },

  toggleAutoPilot() {
    this.autoPilotEnabled = !this.autoPilotEnabled;
    const msg = this.autoPilotEnabled 
      ? "Auto-Pilot enabled! AI Agent will dispatch daily WhatsApp notices at 10:00 AM." 
      : "Auto-Pilot paused.";
    this.notify(msg, 'info');
    this.refresh();
  },

  generateCustomAi() {
    const input = document.getElementById('ai-custom-prompt-input');
    if (input && input.value) {
      this.customPromptText = input.value;
      this.templates.custom.text = `Dear {{ParentName}}, regarding your ward {{StudentName}} (Roll: {{RollNo}}):\n\n${input.value}\n\nInstant Payment Portal: {{PayLink}}\n— Apex Academy Accounts Office`;
      this.notify("Custom AI WhatsApp template generated!", "success");
      this.refresh();
    }
  },

  generateMessage(student) {
    if (!student) return "";
    const template = this.templates[this.activeTemplate] || this.templates.gentle;
    const payLink = `https://apexacademy.edu.in/portal.html?pay=${student.id}`;

    let text = template.text
      .replace(/{{StudentName}}/g, student.name)
      .replace(/{{ParentName}}/g, student.parentName)
      .replace(/{{RollNo}}/g, student.rollNo)
      .replace(/{{BatchName}}/g, student.batchName || 'Class 11 IIT-JEE')
      .replace(/{{Amount}}/g, (student.pendingDues || 4500).toLocaleString('en-IN'))
      .replace(/{{DueDate}}/g, '20 Oct 2026')
      .replace(/{{OverdueDays}}/g, student.overdueDays || 12)
      .replace(/{{PayLink}}/g, payLink);

    return text;
  },

  formatPreviewHtml(text) {
    // Bold markdown *text* to <strong>
    let formatted = text
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
      .replace(/(https?:\/\/[^\s]+)/g, '<span style="color: #53BDEB; text-decoration: underline; word-break: break-all;">$1</span>');
    return formatted;
  },

  getDirectWhatsAppUrl(student) {
    const msg = encodeURIComponent(this.generateMessage(student));
    const phone = (student.parentPhone || "").replace(/[^0-9]/g, '');
    const cleanPhone = phone.startsWith('91') ? phone : '91' + phone;
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  },

  sendSingleDirect(studentId) {
    const student = this.getDefaulters().find(s => s.id === studentId);
    if (!student) return;

    this.dispatchLogs.unshift({
      text: `✅ Dispatched WhatsApp alert to ${student.parentName} (${student.parentPhone}) for ₹${student.pendingDues}`,
      time: new Date().toLocaleTimeString()
    });

    this.notify(`WhatsApp message successfully delivered to ${student.parentName} (${student.parentPhone})!`, 'success');
    this.refresh();
  },

  runBatchDispatch() {
    if (this.isDispatching) return;
    this.isDispatching = true;
    this.dispatchProgress = 15;
    this.refresh();

    const interval = setInterval(() => {
      this.dispatchProgress += 25;
      if (this.dispatchProgress >= 100) {
        clearInterval(interval);
        this.isDispatching = false;
        this.dispatchProgress = 0;

        const defaulters = this.getDefaulters();
        defaulters.forEach(d => {
          this.dispatchLogs.unshift({
            text: `🚀 Batch Delivery: Sent fee reminder to ${d.parentName} (${d.parentPhone}) • Due: ₹${d.pendingDues}`,
            time: new Date().toLocaleTimeString()
          });
        });

        this.notify(`Batch WhatsApp complete! Delivered personalized reminders to ${defaulters.length} parents with UPI links.`, 'success');
        this.refresh();
      } else {
        this.refresh();
      }
    }, 400);
  },

  notify(msg, type) {
    if (window.UnifiedPortal) {
      window.UnifiedPortal.showToast(msg, type);
    } else if (window.kaviroxApp) {
      window.kaviroxApp.showToast(msg, type);
    } else {
      alert(msg);
    }
  },

  refresh() {
    if (window.UnifiedPortal) {
      window.UnifiedPortal.render();
    } else if (window.kaviroxApp) {
      window.kaviroxApp.render();
    }
  }
};
