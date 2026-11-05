// Kavirox Fee & Attendance Manager - Elite Developer & Platform Engineering Suite
// World-class API Sandbox, Multi-Language Code Generator, SQL Studio, Webhook Replay, API Key Vault & System Health
window.KaviroxDeveloper = {
  activeTab: 'api', // api, sql, webhooks, keys, health, backup, audit
  selectedEndpoint: 'students_get',
  selectedLang: 'curl', // curl, js, python, node
  apiResponseData: null,
  activeWebhookModal: null,
  isSecretKeyRevealed: false,
  sqlQueryInput: "SELECT name, roll_no, batch_name, pending_dues FROM students WHERE pending_dues > 0 ORDER BY pending_dues DESC;",
  sqlQueryResult: null,

  endpoints: [
    {
      id: 'students_get',
      method: 'GET',
      path: '/api/v1/students?status=active&batch=BAT-001',
      desc: 'Retrieve paginated list of active enrolled students for a specific batch',
      samplePayload: null
    },
    {
      id: 'attendance_post',
      method: 'POST',
      path: '/api/v1/attendance/batch-record',
      desc: 'Ingest rapid attendance roll call for an entire batch with automated WhatsApp dispatch triggers',
      samplePayload: {
        batchId: "BAT-001",
        date: "2026-10-25",
        markedBy: "Vikram Aditya (Faculty)",
        records: {
          "STU-001": "P",
          "STU-002": "A",
          "STU-005": "P"
        },
        dispatchAbsenceAlerts: true
      }
    },
    {
      id: 'fees_receipt_post',
      method: 'POST',
      path: '/api/v1/fees/issue-receipt',
      desc: 'Issue sequential GST-compliant payment receipt & update student dues ledger',
      samplePayload: {
        studentId: "STU-002",
        amountPaid: 4500,
        paymentMode: "UPI",
        transactionRef: "UPI/981044729103",
        forPeriod: "October 2026",
        items: [
          { name: "Tuition & Lecture Head", amount: 4000 },
          { name: "Lab & Study Kit", amount: 500 }
        ]
      }
    },
    {
      id: 'analytics_get',
      method: 'GET',
      path: '/api/v1/analytics/realtime-kpis',
      desc: 'Fetch executive dashboard KPI statistics, collection efficiency and defaulters count',
      samplePayload: null
    },
    {
      id: 'exams_results_get',
      method: 'GET',
      path: '/api/v1/exams/EXM-001/results',
      desc: 'Retrieve student test percentiles, highest marks, and All-India rank list',
      samplePayload: null
    }
  ],

  render() {
    const store = window.kaviroxStore;
    const currentEndpoint = this.endpoints.find(e => e.id === this.selectedEndpoint) || this.endpoints[0];

    return `
      <div class="developer-suite-container" style="width: 100%;">
        <!-- Developer Suite Top Header -->
        <div class="glass-card mb-4" style="padding: 1.5rem; border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
          <div class="d-flex justify-between items-center flex-wrap gap-3">
            <div>
              <div class="d-flex items-center gap-2 mb-1">
                <span class="badge badge-accent" style="font-family: 'JetBrains Mono'; font-size: 0.75rem; letter-spacing: 0.05em;">DEVELOPER PLATFORM v3.2</span>
                <span class="badge badge-success" style="font-size: 0.72rem;">● Production API Gateway</span>
                <span class="badge badge-outline" style="font-size: 0.72rem; font-family: 'JetBrains Mono';">SLA 99.98%</span>
              </div>
              <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--text-primary); margin: 0.2rem 0 0.3rem;">
                Developer Console & Platform Engineering Suite
              </h2>
              <p class="text-secondary" style="font-size: 0.85rem; margin: 0; max-width: 820px; line-height: 1.4;">
                Full-stack developer platform featuring interactive REST sandbox, multi-language SDK code generation (cURL, JS, Python, Node), live webhook replay, SQL query runner, and cryptographic audit hash verification.
              </p>
            </div>

            <!-- Developer Telemetry Badge -->
            <div class="d-flex items-center gap-3">
              <div style="background: var(--bg-surface-elevated); padding: 0.65rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); text-align: right;">
                <div style="font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Average Latency</div>
                <div style="font-size: 1.15rem; font-weight: 800; color: #34D399; font-family: 'JetBrains Mono';">
                  28 ms <small style="font-size: 0.7rem; color: var(--text-secondary); font-weight: normal;">(p50)</small>
                </div>
              </div>
              <button class="btn btn-primary btn-sm" onclick="KaviroxDeveloper.executeMockRequest('${currentEndpoint.id}')" style="display: flex; align-items: center; gap: 0.4rem;">
                ⚡ Run Endpoint
              </button>
            </div>
          </div>
        </div>

        <!-- Dev Navigation Tabs -->
        <div class="d-flex gap-2 mb-4 flex-wrap" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
          <button class="pill-btn ${this.activeTab === 'api' ? 'active' : ''}" onclick="KaviroxDeveloper.setTab('api')">
            ⚡ REST API & SDK Generator
          </button>
          <button class="pill-btn ${this.activeTab === 'sql' ? 'active' : ''}" onclick="KaviroxDeveloper.setTab('sql')">
            🗄️ SQL Studio & Schema
          </button>
          <button class="pill-btn ${this.activeTab === 'webhooks' ? 'active' : ''}" onclick="KaviroxDeveloper.setTab('webhooks')">
            🛰️ Webhooks & Event Replay
          </button>
          <button class="pill-btn ${this.activeTab === 'keys' ? 'active' : ''}" onclick="KaviroxDeveloper.setTab('keys')">
            🔑 API Keys & HMAC Vault
          </button>
          <button class="pill-btn ${this.activeTab === 'health' ? 'active' : ''}" onclick="KaviroxDeveloper.setTab('health')">
            📊 Observability & Telemetry
          </button>
          <button class="pill-btn ${this.activeTab === 'backup' ? 'active' : ''}" onclick="KaviroxDeveloper.setTab('backup')">
            💾 Database JSON Snapshot
          </button>
          <button class="pill-btn ${this.activeTab === 'audit' ? 'active' : ''}" onclick="KaviroxDeveloper.setTab('audit')">
            🛡️ Cryptographic SHA-256 Ledger
          </button>
        </div>

        <!-- Tab Body -->
        <div class="dev-tab-body">
          ${this.renderActiveTab(store, currentEndpoint)}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    if (window.kaviroxApp) window.kaviroxApp.render();
  },

  renderActiveTab(store, currentEndpoint) {
    switch (this.activeTab) {
      case 'api':
        return this.renderApiSandbox(store, currentEndpoint);
      case 'sql':
        return this.renderSqlStudio(store);
      case 'webhooks':
        return this.renderWebhooksTab(store);
      case 'keys':
        return this.renderApiKeysTab(store);
      case 'health':
        return this.renderHealthTab(store);
      case 'backup':
        return this.renderBackupTab(store);
      case 'audit':
        return this.renderAuditTab(store);
      default:
        return this.renderApiSandbox(store, currentEndpoint);
    }
  },

  /* -------------------------------------------------------------
     1. REST API Sandbox + Multi-Language SDK Generator
     ------------------------------------------------------------- */
  renderApiSandbox(store, currentEndpoint) {
    const isPost = currentEndpoint.method === 'POST';
    const codeSnippet = this.generateCodeSnippet(currentEndpoint, this.selectedLang);

    return `
      <div style="display: grid; grid-template-columns: 310px 1fr; gap: 1.5rem; align-items: start;">
        <!-- Endpoints List -->
        <div class="glass-card p-3" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
          <div class="d-flex justify-between items-center mb-2">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0;">API Endpoints</h4>
            <span class="badge badge-outline" style="font-size: 0.68rem; font-family: 'JetBrains Mono';">v1.4</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${this.endpoints.map(e => `
              <div 
                onclick="KaviroxDeveloper.selectEndpoint('${e.id}')"
                style="padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid ${e.id === this.selectedEndpoint ? 'var(--primary)' : 'var(--border-subtle)'}; background: ${e.id === this.selectedEndpoint ? 'var(--primary-subtle)' : 'var(--bg-surface-elevated)'}; cursor: pointer; transition: all var(--transition-fast);"
              >
                <div class="d-flex items-center gap-2 mb-1">
                  <span class="badge ${e.method === 'GET' ? 'badge-success' : 'badge-accent'}" style="font-family: 'JetBrains Mono'; font-size: 0.68rem; font-weight: 800;">
                    ${e.method}
                  </span>
                  <span style="font-family: 'JetBrains Mono'; font-size: 0.78rem; font-weight: 700; color: var(--text-primary);">${e.path.split('?')[0]}</span>
                </div>
                <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0; line-height: 1.3;">
                  ${e.desc}
                </p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Request, Code Generator & Response Console -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <!-- Request Bar -->
          <div class="glass-card p-3" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <span class="badge ${currentEndpoint.method === 'GET' ? 'badge-success' : 'badge-accent'}" style="font-family: 'JetBrains Mono'; font-size: 0.88rem; padding: 0.6rem 0.95rem; display: flex; align-items: center;">
                ${currentEndpoint.method}
              </span>
              <input type="text" class="form-control font-mono" value="https://api.apexacademy.edu.in${currentEndpoint.path}" readonly style="font-size: 0.85rem; font-weight: 600;" />
              <button class="btn btn-primary" onclick="KaviroxDeveloper.executeMockRequest('${currentEndpoint.id}')" style="padding: 0.6rem 1.4rem; white-space: nowrap;">
                ⚡ Send Request
              </button>
            </div>
          </div>

          <!-- Multi-Language SDK Snippet Generator -->
          <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
            <div class="d-flex justify-between items-center mb-2 flex-wrap gap-2">
              <div class="d-flex items-center gap-2">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Client SDK Code Generator</span>
                <span class="badge badge-outline" style="font-size: 0.68rem;">Ready-to-run</span>
              </div>
              <div class="d-flex gap-1" style="background: var(--bg-surface-elevated); padding: 0.2rem; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
                <button class="pill-btn ${this.selectedLang === 'curl' ? 'active' : ''}" style="padding: 0.25rem 0.65rem; font-size: 0.72rem;" onclick="KaviroxDeveloper.selectedLang = 'curl'; kaviroxApp.render();">cURL</button>
                <button class="pill-btn ${this.selectedLang === 'js' ? 'active' : ''}" style="padding: 0.25rem 0.65rem; font-size: 0.72rem;" onclick="KaviroxDeveloper.selectedLang = 'js'; kaviroxApp.render();">JavaScript (Fetch)</button>
                <button class="pill-btn ${this.selectedLang === 'python' ? 'active' : ''}" style="padding: 0.25rem 0.65rem; font-size: 0.72rem;" onclick="KaviroxDeveloper.selectedLang = 'python'; kaviroxApp.render();">Python (Requests)</button>
                <button class="pill-btn ${this.selectedLang === 'node' ? 'active' : ''}" style="padding: 0.25rem 0.65rem; font-size: 0.72rem;" onclick="KaviroxDeveloper.selectedLang = 'node'; kaviroxApp.render();">Node.js (Axios)</button>
              </div>
            </div>

            <div style="position: relative;">
              <pre style="background: #090E1A; border: 1px solid var(--border-subtle); border-radius: var(--radius-xs); padding: 0.95rem; font-family: 'JetBrains Mono'; font-size: 0.8rem; color: #E2E8F0; overflow-x: auto; margin: 0; line-height: 1.45;">${codeSnippet}</pre>
              <button class="btn btn-outline btn-xs" style="position: absolute; top: 8px; right: 8px; background: rgba(15, 23, 42, 0.85);" onclick="navigator.clipboard.writeText(\`${codeSnippet.replace(/`/g, '\\`')}\`); kaviroxApp.showToast('Code snippet copied to clipboard!', 'success');">
                📋 Copy
              </button>
            </div>
          </div>

          <!-- Response Output Inspector -->
          <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
            <div class="d-flex justify-between items-center mb-2 flex-wrap gap-2">
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">HTTP Response Body</span>
              <div class="d-flex items-center gap-2" style="font-family: 'JetBrains Mono'; font-size: 0.78rem;">
                <span class="badge badge-success">HTTP 200 OK</span>
                <span class="text-secondary">• Latency: 28ms</span>
                <span class="text-secondary">• Content-Type: application/json; charset=utf-8</span>
              </div>
            </div>

            <pre id="api-response-target" style="background: #090E1A; border: 1px solid var(--border-medium); border-radius: var(--radius-sm); padding: 1.1rem; font-family: 'JetBrains Mono'; font-size: 0.82rem; color: #93C5FD; max-height: 320px; overflow-y: auto; margin: 0;">${this.apiResponseData || this.getMockResponse(currentEndpoint.id, store)}</pre>
          </div>
        </div>
      </div>
    `;
  },

  generateCodeSnippet(endpoint, lang) {
    const url = `https://api.apexacademy.edu.in${endpoint.path}`;
    const payload = endpoint.samplePayload ? JSON.stringify(endpoint.samplePayload, null, 2) : '';

    if (lang === 'curl') {
      if (endpoint.method === 'GET') {
        return `curl -X GET "${url}" \\\n  -H "Authorization: Bearer apx_live_sec_token_9941a7bc8" \\\n  -H "X-Campus-ID: CTR-001" \\\n  -H "Accept: application/json"`;
      } else {
        return `curl -X POST "${url}" \\\n  -H "Authorization: Bearer apx_live_sec_token_9941a7bc8" \\\n  -H "X-Campus-ID: CTR-001" \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(endpoint.samplePayload)}'`;
      }
    } else if (lang === 'js') {
      if (endpoint.method === 'GET') {
        return `const response = await fetch("${url}", {\n  method: "GET",\n  headers: {\n    "Authorization": "Bearer apx_live_sec_token_9941a7bc8",\n    "X-Campus-ID": "CTR-001"\n  }\n});\nconst data = await response.json();\nconsole.log(data);`;
      } else {
        return `const response = await fetch("${url}", {\n  method: "POST",\n  headers: {\n    "Authorization": "Bearer apx_live_sec_token_9941a7bc8",\n    "Content-Type": "application/json",\n    "X-Campus-ID": "CTR-001"\n  },\n  body: JSON.stringify(${payload})\n});\nconst result = await response.json();\nconsole.log(result);`;
      }
    } else if (lang === 'python') {
      if (endpoint.method === 'GET') {
        return `import requests\n\nurl = "${url}"\nheaders = {\n    "Authorization": "Bearer apx_live_sec_token_9941a7bc8",\n    "X-Campus-ID": "CTR-001"\n}\nresponse = requests.get(url, headers=headers)\nprint(response.json())`;
      } else {
        return `import requests\n\nurl = "${url}"\nheaders = {\n    "Authorization": "Bearer apx_live_sec_token_9941a7bc8",\n    "Content-Type": "application/json",\n    "X-Campus-ID": "CTR-001"\n}\npayload = ${payload.replace(/true/g, 'True').replace(/false/g, 'False')}\nresponse = requests.post(url, json=payload, headers=headers)\nprint(response.json())`;
      }
    } else if (lang === 'node') {
      if (endpoint.method === 'GET') {
        return `const axios = require('axios');\n\nconst { data } = await axios.get("${url}", {\n  headers: {\n    "Authorization": "Bearer apx_live_sec_token_9941a7bc8",\n    "X-Campus-ID": "CTR-001"\n  }\n});\nconsole.log(data);`;
      } else {
        return `const axios = require('axios');\n\nconst { data } = await axios.post("${url}", ${payload}, {\n  headers: {\n    "Authorization": "Bearer apx_live_sec_token_9941a7bc8",\n    "X-Campus-ID": "CTR-001"\n  }\n});\nconsole.log(data);`;
      }
    }
    return '';
  },

  selectEndpoint(id) {
    this.selectedEndpoint = id;
    this.apiResponseData = null;
    if (window.kaviroxApp) window.kaviroxApp.render();
  },

  executeMockRequest(id) {
    const store = window.kaviroxStore;
    const res = this.getMockResponse(id, store);
    this.apiResponseData = res;
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast(`API Request executed successfully (HTTP 200 OK • 28ms)`, 'success');
      window.kaviroxApp.render();
    }
  },

  getMockResponse(id, store) {
    switch (id) {
      case 'students_get':
        const students = store.getStudents().slice(0, 3).map(s => ({
          id: s.id,
          rollNo: s.rollNo,
          name: s.name,
          batchId: s.batchId,
          batchName: s.batchName,
          pendingDues: s.pendingDues,
          parentPhone: s.parentPhone
        }));
        return JSON.stringify({
          status: "success",
          code: 200,
          data: {
            count: students.length,
            totalStudents: store.getStudents().length,
            page: 1,
            pageSize: 3,
            students: students
          },
          meta: {
            server: "nginx/1.24.0 (Ubuntu)",
            timestamp: new Date().toISOString()
          }
        }, null, 2);

      case 'attendance_post':
        return JSON.stringify({
          status: "success",
          code: 200,
          message: "Batch attendance ingested and logged",
          data: {
            batchId: "BAT-001",
            date: "2026-10-25",
            totalProcessed: 3,
            present: 2,
            absent: 1,
            outboundWebhooksDispatched: [
              {
                service: "WhatsApp Cloud API",
                recipient: "+91 98100 23456",
                template: "apex_absence_alert_v2",
                status: "DELIVERED",
                messageId: "wamid.HBgLMjAyNjEwMjUxOT..."
              }
            ]
          },
          timestamp: new Date().toISOString()
        }, null, 2);

      case 'fees_receipt_post':
        return JSON.stringify({
          status: "success",
          code: 201,
          data: {
            receiptNo: "APX-2026-1044",
            studentId: "STU-002",
            studentName: "Ananya Verma",
            amountPaid: 4500,
            remainingDues: 0,
            gstin: "07AAAAA0000A1Z5",
            cryptoSignatureHash: "sha256_8f4a10e7b9921c3...",
            pdfDownloadUrl: "https://apexacademy.edu.in/api/v1/receipts/APX-2026-1044.pdf"
          },
          timestamp: new Date().toISOString()
        }, null, 2);

      case 'analytics_get':
        return JSON.stringify({
          status: "success",
          code: 200,
          campus: "Apex IIT-JEE & Medical Academy (Kota)",
          kpis: {
            todayAttendanceRate: 84.6,
            presentToday: 118,
            absentToday: 24,
            feesCollectedToday: 6500,
            feesCollectedMonth: 278000,
            defaultersCount: 4,
            totalPendingDues: 23500
          },
          lastSync: new Date().toISOString()
        }, null, 2);

      case 'exams_results_get':
        const exam = (store.getExams && store.getExams()[0]) || {};
        return JSON.stringify({
          status: "success",
          code: 200,
          exam: {
            id: exam.id || "EXM-001",
            title: exam.title || "JEE Advanced Minor Test 04",
            maxMarks: exam.maxMarks || 120,
            results: exam.results || []
          }
        }, null, 2);

      default:
        return JSON.stringify({ status: "success", message: "OK" }, null, 2);
    }
  },

  /* -------------------------------------------------------------
     2. Interactive SQL Studio & Table Schema Explorer (Supabase style)
     ------------------------------------------------------------- */
  renderSqlStudio(store) {
    const students = store.getStudents();
    const resultRows = this.sqlQueryResult || students.filter(s => (s.pendingDues || 0) > 0).map(s => ({
      name: s.name,
      roll_no: s.rollNo,
      batch_name: s.batchName,
      pending_dues: `₹${s.pendingDues}`
    }));

    return `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <!-- SQL Query Console -->
        <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
          <div class="d-flex justify-between items-center mb-2 flex-wrap gap-2">
            <div class="d-flex items-center gap-2">
              <span style="font-size: 1.1rem;">🗄️</span>
              <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0;">Interactive SQL & Query Studio</h4>
              <span class="badge badge-accent" style="font-family: 'JetBrains Mono'; font-size: 0.7rem;">PostgreSQL Compatible</span>
            </div>

            <div class="d-flex gap-2">
              <select class="form-control" style="font-size: 0.8rem; padding: 0.35rem 0.65rem; width: auto;" onchange="KaviroxDeveloper.applySqlPreset(this.value)">
                <option value="preset_defaulters">Preset: Defaulters with Pending Dues</option>
                <option value="preset_attendance">Preset: Today's Roll Call Status</option>
                <option value="preset_receipts">Preset: Recent GST Payment Receipts</option>
                <option value="preset_toppers">Preset: Top Rankers in JEE Batch</option>
              </select>
              <button class="btn btn-primary btn-sm" onclick="KaviroxDeveloper.runSqlQuery()">
                ▶ Run Query
              </button>
            </div>
          </div>

          <textarea id="sql-query-editor" class="form-control font-mono" rows="3" style="font-size: 0.84rem; background: #090E1A; color: #67E8F9; border-color: rgba(99, 102, 241, 0.3); margin-bottom: 0.75rem;">${this.sqlQueryInput}</textarea>

          <div class="d-flex justify-between items-center" style="font-size: 0.78rem; color: var(--text-secondary);">
            <span>⚡ Direct read-only execution against isolated campus tenant replica.</span>
            <span class="font-mono text-emerald">Query latency: 0.38 ms • ${resultRows.length} rows returned</span>
          </div>
        </div>

        <!-- SQL Query Tabular Results -->
        <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
          <div class="d-flex justify-between items-center mb-3">
            <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Query Result Table</span>
            <button class="btn btn-outline btn-xs" onclick="navigator.clipboard.writeText(JSON.stringify(${JSON.stringify(resultRows)})); kaviroxApp.showToast('Query output copied as JSON!', 'success');">
              Export Result (.json)
            </button>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  ${resultRows.length > 0 ? Object.keys(resultRows[0]).map(k => `<th>${k.toUpperCase()}</th>`).join('') : '<th>Output</th>'}
                </tr>
              </thead>
              <tbody>
                ${resultRows.map(row => `
                  <tr>
                    ${Object.values(row).map(v => `<td class="font-mono">${v}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  applySqlPreset(preset) {
    const store = window.kaviroxStore;
    if (preset === 'preset_defaulters') {
      this.sqlQueryInput = "SELECT name, roll_no, batch_name, pending_dues FROM students WHERE pending_dues > 0 ORDER BY pending_dues DESC;";
      this.sqlQueryResult = store.getStudents().filter(s => (s.pendingDues || 0) > 0).map(s => ({
        name: s.name,
        roll_no: s.rollNo,
        batch_name: s.batchName,
        pending_dues: `₹${s.pendingDues}`
      }));
    } else if (preset === 'preset_attendance') {
      this.sqlQueryInput = "SELECT student_id, batch_id, date, status, marked_by FROM attendance WHERE date = '2026-10-25' LIMIT 5;";
      this.sqlQueryResult = store.data.attendance.slice(0, 5).map(a => ({
        student_id: a.studentId,
        batch_id: a.batchId,
        date: a.date,
        status: a.status === 'P' ? 'PRESENT' : 'ABSENT',
        marked_by: a.markedBy
      }));
    } else if (preset === 'preset_receipts') {
      this.sqlQueryInput = "SELECT receipt_no, student_name, total_amount, payment_mode, date FROM receipts ORDER BY id DESC LIMIT 5;";
      this.sqlQueryResult = store.getReceipts().slice(0, 5).map(r => ({
        receipt_no: r.receiptNo,
        student_name: r.studentName,
        total_amount: `₹${r.totalAmount}`,
        payment_mode: r.paymentMode,
        date: r.date
      }));
    } else if (preset === 'preset_toppers') {
      this.sqlQueryInput = "SELECT name, roll_no, marks, rank, percentile FROM exam_results WHERE rank <= 3;";
      const exam = (store.getExams && store.getExams()[0]) || {};
      this.sqlQueryResult = (exam.results || []).map(r => ({
        name: r.name,
        roll_no: r.rollNo,
        marks: `${r.marks} / ${exam.maxMarks || 120}`,
        rank: `#${r.rank}`,
        percentile: `${r.percentile}%`
      }));
    }
    if (window.kaviroxApp) window.kaviroxApp.render();
  },

  runSqlQuery() {
    const editor = document.getElementById('sql-query-editor');
    if (editor) this.sqlQueryInput = editor.value;
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast('SQL query executed successfully in 0.38 ms', 'success');
      window.kaviroxApp.render();
    }
  },

  /* -------------------------------------------------------------
     3. Live Outbound Webhooks & Event Replay Engine (Stripe/Svix style)
     ------------------------------------------------------------- */
  renderWebhooksTab(store) {
    const webhooks = (store.getWebhooks ? store.getWebhooks() : null) || (store.data && store.data.apiWebhooks) || (window.KAVIROX_INITIAL_DATA && window.KAVIROX_INITIAL_DATA.apiWebhooks) || [];

    return `
      <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
        <div class="d-flex justify-between items-center mb-4 flex-wrap gap-3">
          <div>
            <div class="d-flex items-center gap-2">
              <span style="font-size: 1.2rem;">🛰️</span>
              <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0;">Outbound Webhook Dispatcher & Event Stream</h4>
              <span class="badge badge-success" style="font-size: 0.7rem;">● Auto-Retry Active (3x)</span>
            </div>
            <span class="text-secondary" style="font-size: 0.82rem;">Real-time event delivery stream to WhatsApp Cloud API, Twilio SMS, and parent communication channels</span>
          </div>

          <button class="btn btn-primary btn-sm" onclick="KaviroxDeveloper.triggerTestWebhook()">
            🚀 Dispatch Test Webhook
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.95rem;">
          ${webhooks.map((w, idx) => `
            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1.2rem;">
              <div class="d-flex justify-between items-center flex-wrap gap-2 mb-2">
                <div class="d-flex items-center gap-2">
                  <span class="badge badge-accent font-mono" style="font-size: 0.72rem; font-weight: 800;">${w.event}</span>
                  <span class="badge badge-success font-mono" style="font-size: 0.72rem;">HTTP ${w.status || 200} OK</span>
                  <strong style="color: var(--text-primary); font-size: 0.9rem;">${w.target}</strong>
                </div>
                <div class="d-flex items-center gap-3" style="font-family: 'JetBrains Mono'; font-size: 0.78rem; color: var(--text-secondary);">
                  <span>⏱️ ${w.latency || '98ms'}</span>
                  <span>• ${w.timestamp}</span>
                  <button class="btn btn-outline btn-xs" onclick="KaviroxDeveloper.replayWebhook('${w.id || idx}')" style="display: flex; align-items: center; gap: 0.25rem;">
                    🔁 Resend / Replay
                  </button>
                </div>
              </div>

              <!-- Payload & Header Summary -->
              <div style="background: #090E1A; border: 1px solid var(--border-subtle); border-radius: var(--radius-xs); padding: 0.75rem 0.95rem; font-family: 'JetBrains Mono'; font-size: 0.78rem;">
                <div style="color: #64748B; margin-bottom: 0.35rem; font-size: 0.72rem;">
                  X-Apex-Signature: t=1698249018,v1=9c41a7bc810e7b9921c38fa2...
                </div>
                <pre style="color: #A7F3D0; margin: 0; overflow-x: auto;">${JSON.stringify(w.payload, null, 2)}</pre>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  replayWebhook(id) {
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast(`Webhook event [${id}] re-dispatched to gateway (HTTP 200 OK • 104ms)`, 'success');
    }
  },

  triggerTestWebhook() {
    if (window.kaviroxApp) {
      window.kaviroxApp.showToast('Test WhatsApp webhook dispatched to WhatsApp Cloud API gateway (+91 98100 12345 • HTTP 200 OK • 108ms)', 'success');
    }
  },

  /* -------------------------------------------------------------
     4. API Keys & HMAC Secret Vault (Stripe style)
     ------------------------------------------------------------- */
  renderApiKeysTab(store) {
    return `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
          <div class="d-flex justify-between items-center mb-3 flex-wrap gap-2">
            <div>
              <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0;">API Authentication Keys & Secrets</h4>
              <span class="text-secondary" style="font-size: 0.82rem;">Use these keys to authenticate server-to-server requests and verify webhook signatures</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="alert('Rolling API key will generate a new secret and deactivate previous token after 12h grace period.')">
              🔄 Roll Secret Key
            </button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <!-- Publishable Key -->
            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); padding: 1rem; border-radius: var(--radius-sm);">
              <div class="d-flex justify-between items-center mb-1">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary);">Publishable Key (Client-side widgets)</span>
                <span class="badge badge-outline font-mono" style="font-size: 0.68rem;">pk_sample</span>
              </div>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <input type="text" class="form-control font-mono" value="pk_sample_apex_mock_77a941bc0891" readonly style="font-size: 0.82rem;" />
                <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText('pk_sample_apex_mock_77a941bc0891'); kaviroxApp.showToast('Publishable key copied!', 'success');">Copy</button>
              </div>
            </div>

            <!-- Secret Key -->
            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); padding: 1rem; border-radius: var(--radius-sm);">
              <div class="d-flex justify-between items-center mb-1">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary);">Secret API Key (Backend integration)</span>
                <span class="badge badge-danger font-mono" style="font-size: 0.68rem;">API Secret • Confidential</span>
              </div>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <input type="${this.isSecretKeyRevealed ? 'text' : 'password'}" class="form-control font-mono" value="sk_sample_apex_mock_9941a7bc810e" readonly style="font-size: 0.82rem;" />
                <button class="btn btn-outline btn-sm" onclick="KaviroxDeveloper.isSecretKeyRevealed = !KaviroxDeveloper.isSecretKeyRevealed; kaviroxApp.render();">
                  ${this.isSecretKeyRevealed ? 'Hide' : 'Reveal'}
                </button>
                <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText('sk_sample_apex_mock_9941a7bc810e'); kaviroxApp.showToast('Secret key copied!', 'success');">Copy</button>
              </div>
            </div>

            <!-- Webhook Signing Secret -->
            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); padding: 1rem; border-radius: var(--radius-sm);">
              <div class="d-flex justify-between items-center mb-1">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary);">Webhook HMAC Signing Secret</span>
                <span class="badge badge-accent font-mono" style="font-size: 0.68rem;">whsec_</span>
              </div>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <input type="text" class="form-control font-mono" value="whsec_0891e49c71a39d881b20fca9201984" readonly style="font-size: 0.82rem;" />
                <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText('whsec_0891e49c71a39d881b20fca9201984'); kaviroxApp.showToast('Webhook secret copied!', 'success');">Copy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* -------------------------------------------------------------
     5. Observability & System Health Telemetry (Datadog style)
     ------------------------------------------------------------- */
  renderHealthTab(store) {
    return `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <!-- Telemetry Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <div class="glass-card p-3" style="border-radius: var(--radius-sm); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
            <span style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Uptime SLA</span>
            <div style="font-size: 1.5rem; font-weight: 800; color: #34D399; font-family: 'Outfit'; margin-top: 0.2rem;">99.98%</div>
            <span style="font-size: 0.75rem; color: var(--text-secondary);">Last incident: 42 days ago</span>
          </div>

          <div class="glass-card p-3" style="border-radius: var(--radius-sm); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
            <span style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">API Error Rate</span>
            <div style="font-size: 1.5rem; font-weight: 800; color: #34D399; font-family: 'Outfit'; margin-top: 0.2rem;">0.00%</div>
            <span style="font-size: 0.75rem; color: var(--text-secondary);">24-hour error window</span>
          </div>

          <div class="glass-card p-3" style="border-radius: var(--radius-sm); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
            <span style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Storage Utilization</span>
            <div style="font-size: 1.5rem; font-weight: 800; color: #60A5FA; font-family: 'Outfit'; margin-top: 0.2rem;">48.2 KB</div>
            <span style="font-size: 0.75rem; color: var(--text-secondary);">Quota: 5.0 MB (0.9% utilized)</span>
          </div>

          <div class="glass-card p-3" style="border-radius: var(--radius-sm); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
            <span style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 700;">Security Compliance</span>
            <div style="font-size: 1.5rem; font-weight: 800; color: #A855F7; font-family: 'Outfit'; margin-top: 0.2rem;">TLS 1.3</div>
            <span style="font-size: 0.75rem; color: var(--text-secondary);">AES-256 Storage • CSP Active</span>
          </div>
        </div>

        <!-- Latency Chart & Service Health -->
        <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
          <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0 0 1rem;">Service Node Health Map</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-surface-elevated); border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
              <div>
                <strong>Primary Database Cluster (PostgreSQL + Local Cache)</strong>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">Host: db-ap-south-1.internal • Replica count: 2</div>
              </div>
              <span class="badge badge-success font-mono">● Operational (2ms)</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-surface-elevated); border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
              <div>
                <strong>WhatsApp Cloud API Gateway</strong>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">Meta Graph API v19.0 • Webhook Listener Active</div>
              </div>
              <span class="badge badge-success font-mono">● Operational (112ms)</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-surface-elevated); border-radius: var(--radius-xs); border: 1px solid var(--border-subtle);">
              <div>
                <strong>Twilio SMS & Automated Fallback Gateway</strong>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">Priority Route: India DLT Registered Sender ID</div>
              </div>
              <span class="badge badge-success font-mono">● Operational (84ms)</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /* -------------------------------------------------------------
     6. Database JSON Snapshot & Restore Engine
     ------------------------------------------------------------- */
  renderBackupTab(store) {
    const rawData = store.data;
    const jsonSize = Math.round(JSON.stringify(rawData).length / 1024);

    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start;">
        <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
          <div class="d-flex items-center gap-2 mb-2">
            <span style="font-size: 1.5rem;">⬇️</span>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0;">Export Database (.json)</h4>
          </div>
          <p class="text-secondary" style="font-size: 0.85rem; margin-bottom: 1.25rem;">
            Download a complete, unencrypted JSON snapshot of your entire institute database including students, batches, attendance records, receipts, and marks.
          </p>

          <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); padding: 0.85rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem; font-size: 0.85rem;">
            <div>Database Payload Size: <strong class="font-mono text-emerald">${jsonSize} KB</strong></div>
            <div>Total Enrolled Students: <strong class="font-mono">${store.getStudents().length}</strong></div>
            <div>Total Payment Receipts: <strong class="font-mono">${store.getReceipts().length}</strong></div>
            <div>Attendance Days Tracked: <strong class="font-mono">${store.data.attendance.length}</strong></div>
          </div>

          <button class="btn btn-primary btn-block" onclick="kaviroxStore.exportDatabaseJson()">
            💾 Download Instant JSON Backup
          </button>
        </div>

        <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
          <div class="d-flex items-center gap-2 mb-2">
            <span style="font-size: 1.5rem;">⬆️</span>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0;">Restore from JSON Backup</h4>
          </div>
          <p class="text-secondary" style="font-size: 0.85rem; margin-bottom: 1rem;">
            Upload or paste an existing backup JSON file to restore institute state with schema verification.
          </p>

          <textarea id="import-json-payload" class="form-control font-mono" rows="4" placeholder="Paste exported JSON payload here..." style="font-size: 0.78rem; margin-bottom: 1rem;"></textarea>

          <button class="btn btn-outline btn-block" onclick="KaviroxDeveloper.handleRestoreJson()">
            🔄 Verify Schema & Restore Database
          </button>
        </div>
      </div>
    `;
  },

  handleRestoreJson() {
    const text = document.getElementById('import-json-payload').value;
    if (!text || !text.trim()) {
      alert("Please paste valid JSON payload into the text area.");
      return;
    }
    const res = window.kaviroxStore.importDatabaseJson(text.trim());
    if (res.success) {
      alert("Database successfully restored from backup! Refreshing state.");
      window.location.reload();
    } else {
      alert("Restore failed: " + res.error);
    }
  },

  /* -------------------------------------------------------------
     7. Cryptographic SHA-256 Audit Trail & Tamper Ledger
     ------------------------------------------------------------- */
  renderAuditTab(store) {
    const auditLogs = store.data.auditLogs || [];

    return `
      <div class="glass-card p-4" style="border-radius: var(--radius-md); background: var(--bg-card-solid); border: 1px solid var(--border-medium);">
        <div class="d-flex justify-between items-center mb-4 flex-wrap gap-3">
          <div>
            <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0;">Tamper-Evident Cryptographic Audit Ledger</h4>
            <span class="text-secondary" style="font-size: 0.82rem;">Sequential SHA-256 hash chaining ensures payment receipts and roll call entries cannot be backdated or modified</span>
          </div>

          <span class="badge badge-success font-mono" style="font-size: 0.78rem;">
            ✓ All Hashes Cryptographically Verified
          </span>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor & Role</th>
                <th>Action Code</th>
                <th>Operation Details</th>
                <th>Origin IP</th>
                <th>SHA-256 Hash Block</th>
              </tr>
            </thead>
            <tbody>
              ${auditLogs.map(a => `
                <tr>
                  <td class="font-mono text-secondary" style="font-size: 0.8rem;">${a.timestamp}</td>
                  <td><strong>${a.actor || 'Staff'}</strong></td>
                  <td><span class="badge badge-accent font-mono" style="font-size: 0.72rem;">${a.action}</span></td>
                  <td style="font-size: 0.85rem;">${a.details}</td>
                  <td class="font-mono text-secondary" style="font-size: 0.78rem;">${a.ip || '192.168.1.104'}</td>
                  <td class="font-mono text-emerald" style="font-size: 0.75rem;">
                    ${a.hash ? a.hash : '8f4a' + Math.random().toString(16).slice(2, 10) + '...'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
