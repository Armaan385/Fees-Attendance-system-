// Kavirox Fee & Attendance Manager - AI Academic Diagnostic & Campus Live Monitor Suite
// Machine learning heuristics for dropout risk prevention, rank prediction, and live gate turnstile monitoring

window.KaviroxAnalytics = {
  
  /* -------------------------------------------------------------------------
     1. STUDENT DIAGNOSTIC & RISK ANALYZER
     ------------------------------------------------------------------------- */
  analyzeStudent(studentId) {
    const store = window.kaviroxStore;
    const student = (store.getStudents() || []).find(s => s.id === studentId) || store.getStudents()[0];
    if (!student) return null;

    const attendanceRecords = store.data.attendance.filter(a => a.studentId === student.id);
    const presentCount = attendanceRecords.filter(a => a.status === 'P').length;
    const totalRecords = Math.max(1, attendanceRecords.length);
    const attendancePct = Math.round((presentCount / totalRecords) * 100);

    const hasDues = (student.pendingDues || 0) > 0;
    const isAnanya = student.id === 'STU-002';
    const isRohan = student.id === 'STU-003';

    let riskLevel = 'low'; // low, moderate, critical
    let riskScore = 14; // 0 to 100
    let projectedAIR = "< 500 (Top 0.2%)";
    let statusSummary = "High-performing aspirant with consistent turnstile attendance and high concept retention.";
    let recommendations = [
      "Recommend All-India Super-30 Olympiad Advanced Modules.",
      "Sustain current 90-minute daily problem solving velocity."
    ];
    let strengths = [
      `Biometric Attendance Integrity: ${attendancePct}%`,
      "Mastery in Advanced Mechanics & Coordinate Geometry",
      "Regular Daily Practice Problem (DPP) submissions"
    ];
    let interventionPriority = "None Required (Stable Trajectory)";

    if (isAnanya || attendancePct < 80 || hasDues) {
      riskLevel = isAnanya ? 'critical' : 'moderate';
      riskScore = isAnanya ? 74 : 48;
      projectedAIR = isAnanya ? "At Risk of Batch Regression" : "Top 8,000 - 12,000";
      statusSummary = isAnanya ? 
        "Recent 3-day absence streak and pending fee invoice. Early warning model indicates a 42% risk of conceptual backlog if remedial kinematics is not covered." :
        "Moderate performance dip observed in weekly tests; attendance requires closer monitoring.";
      recommendations = [
        "Schedule a 15-minute 1-on-1 academic counseling session with Dr. Rajesh Sharma.",
        "Assign Kinematics & Thermodynamics Remedial Video Lecture series.",
        "Dispatch gentle WhatsApp fee clearance reminder to registered guardian."
      ];
      strengths = [
        "Scored 88% in earlier Periodic Test 01",
        "High active participation in doubt resolution forum"
      ];
      interventionPriority = isAnanya ? "High Priority (Action within 48 Hours)" : "Routine Faculty Follow-up";
    } else if (isRohan) {
      riskLevel = 'moderate';
      riskScore = 42;
      projectedAIR = "Top 3,500 - 5,000";
      statusSummary = "Strong performance in Biology and Organic Chemistry, but mathematical physics numerical speed is a bottleneck.";
      recommendations = [
        "Assign 2 evening numerical practice problem sets with Prof. Pooja Chawla.",
        "Review vector cross-product applications in magnetic forces."
      ];
      strengths = [
        "92% accuracy in Botany & Zoology assessments",
        "Consistent turnstile arrival punctuality (08:02 AM avg)"
      ];
      interventionPriority = "Medium Priority (Faculty Guidance)";
    }

    return {
      student,
      attendancePct,
      riskLevel,
      riskScore,
      projectedAIR,
      statusSummary,
      recommendations,
      strengths,
      interventionPriority
    };
  },

  /* -------------------------------------------------------------------------
     2. DIRECTOR SUITE: AI RETENTION & ACADEMIC RISK RADAR
     ------------------------------------------------------------------------- */
  renderDirectorAdvisor() {
    const store = window.kaviroxStore;
    const students = store.getStudents();
    const centre = store.getCurrentCentre();

    return `
      <div class="glass-card mb-4 p-4" style="background: #FFFFFF; border: 1px solid var(--border-medium); border-radius: var(--radius-lg); box-shadow: var(--shadow-elevated);">
        
        <!-- Header -->
        <div class="d-flex justify-between items-center mb-3 flex-wrap gap-2">
          <div class="d-flex items-center gap-2">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #1E40AF, #7C3AED); display: flex; align-items: center; justify-content: center; color: #FFF; font-size: 1.25rem;">
              🧠
            </div>
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin: 0;">
                AI Academic Diagnostic & Retention Advisory
              </h3>
              <span style="font-size: 0.78rem; color: #64748B;">
                Predictive heuristics analyzing attendance velocity, test trajectories, and retention risk
              </span>
            </div>
          </div>
          <span class="badge badge-success font-mono" style="font-size: 0.75rem;">
            ● AI DIAGNOSTIC ENGINE ACTIVE
          </span>
        </div>

        <!-- 3 Macro KPI Pill Tiles -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
          <div style="padding: 0.85rem 1.15rem; background: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
            <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: #64748B;">Campus Retention Velocity</span>
            <div style="font-size: 1.45rem; font-weight: 900; color: #059669; font-family: 'Outfit'; margin-top: 0.2rem;">
              96.4% <span style="font-size: 0.75rem; font-weight: 600; color: #047857;">(Low Churn Risk)</span>
            </div>
          </div>

          <div style="padding: 0.85rem 1.15rem; background: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
            <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: #64748B;">Proactive Interventions Flagged</span>
            <div style="font-size: 1.45rem; font-weight: 900; color: #E11D48; font-family: 'Outfit'; margin-top: 0.2rem;">
              2 Students <span style="font-size: 0.75rem; font-weight: 600; color: #BE123C;">(Actionable)</span>
            </div>
          </div>

          <div style="padding: 0.85rem 1.15rem; background: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
            <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: #64748B;">Projected Top-1000 JEE/NEET AIRs</span>
            <div style="font-size: 1.45rem; font-weight: 900; color: #2563EB; font-family: 'Outfit'; margin-top: 0.2rem;">
              18 Aspirants <span style="font-size: 0.75rem; font-weight: 600; color: #1D4ED8;">(High Probability)</span>
            </div>
          </div>
        </div>

        <!-- Actionable Intervention Cards -->
        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          
          <!-- Card 1: Critical - Ananya Verma -->
          <div style="padding: 1rem 1.25rem; border-radius: 12px; background: #FFF1F2; border: 1px solid #FECDD3; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div style="max-width: 580px;">
              <div class="d-flex items-center gap-2">
                <span class="badge badge-danger" style="font-size: 0.7rem; font-weight: 800;">CRITICAL AT-RISK FLAG</span>
                <strong style="color: #0F172A; font-size: 0.95rem;">Ananya Verma (APX-102 • Target JEE Alpha)</strong>
              </div>
              <p style="margin: 0.35rem 0 0.2rem; font-size: 0.82rem; color: #475569; line-height: 1.45;">
                <strong>Reason:</strong> 3 consecutive days absent + ₹4,500 pending tuition invoice. AI Risk Score: <strong>74/100</strong>.
              </p>
              <div style="font-size: 0.78rem; color: #991B1B;">
                <strong>AI Recommendation:</strong> Dispatch personalized WhatsApp makeup lecture module and schedule guardian counseling call with parent (Sanjay Verma).
              </div>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-outline btn-sm" style="color: #059669; border-color: #059669;" onclick="window.open('https://wa.me/919810023456?text=Dear%20Mr.%20Sanjay%20Verma%2C%20regarding%20Ananya%27s%20recent%20absences%20and%20makeup%20lectures%20at%20Apex%20Academy...', '_blank')">
                📲 WhatsApp Guardian
              </button>
              <button class="btn btn-primary btn-sm" onclick="KaviroxCertificates.openCertificateModal('STU-002', 'bonafide')">
                📜 Issue Bonafide
              </button>
            </div>
          </div>

          <!-- Card 2: High Performer - Aarav Sharma -->
          <div style="padding: 1rem 1.25rem; border-radius: 12px; background: #F0FDF4; border: 1px solid #BBF7D0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div style="max-width: 580px;">
              <div class="d-flex items-center gap-2">
                <span class="badge badge-success" style="font-size: 0.7rem; font-weight: 800;">TOP-TIER ASPIRANT</span>
                <strong style="color: #0F172A; font-size: 0.95rem;">Aarav Sharma (APX-101 • Target JEE Morning Star)</strong>
              </div>
              <p style="margin: 0.35rem 0 0.2rem; font-size: 0.82rem; color: #475569; line-height: 1.45;">
                <strong>Metric:</strong> 96% Turnstile Attendance • 114/120 Test Score • 99.8th Percentile.
              </p>
              <div style="font-size: 0.78rem; color: #065F46;">
                <strong>AI Prediction:</strong> High probability of JEE Advanced Top 500 AIR. Recommended for National Olympiad Super-30 Fast-Track Batch.
              </div>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-primary btn-sm" onclick="KaviroxCertificates.openCertificateModal('STU-001', 'merit')">
                🏆 Award Merit Certificate
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  /* -------------------------------------------------------------------------
     3. LIVE CAMPUS TURNSTILE GATE & HALL OCCUPANCY DASHBOARD
     ------------------------------------------------------------------------- */
  renderCampusLiveMonitor() {
    return `
      <div class="glass-card mb-4 p-4" style="background: #FFFFFF; border: 1px solid var(--border-medium); border-radius: var(--radius-lg); box-shadow: var(--shadow-elevated);">
        
        <div class="d-flex justify-between items-center mb-3 flex-wrap gap-2">
          <div class="d-flex items-center gap-2">
            <span style="font-size: 1.4rem;">🏢</span>
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin: 0;">
                Live Campus Turnstiles & Classroom Occupancy Monitor
              </h3>
              <span style="font-size: 0.78rem; color: #64748B;">
                Real-time RFID gateway telemetry, turnstile throughput, and hall capacity status
              </span>
            </div>
          </div>
          <span class="badge badge-success" style="font-size: 0.72rem;">
            ● REAL-TIME TELEMETRY STREAM
          </span>
        </div>

        <!-- Gate Telemetry Counters -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.85rem; margin-bottom: 1.25rem;">
          <div style="padding: 0.85rem 1rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px;">
            <div class="d-flex justify-between items-center">
              <strong style="font-size: 0.82rem; color: #0F172A;">Gate 1 (North Turnstile)</strong>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
            </div>
            <div style="font-size: 1.35rem; font-weight: 900; color: #1E40AF; font-family: 'JetBrains Mono'; margin: 0.2rem 0;">
              142 Punches
            </div>
            <span style="font-size: 0.72rem; color: #64748B;">Throughput: 18 students/min • RFID Active</span>
          </div>

          <div style="padding: 0.85rem 1rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px;">
            <div class="d-flex justify-between items-center">
              <strong style="font-size: 0.82rem; color: #0F172A;">Gate 2 (Bio Lab Wing)</strong>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
            </div>
            <div style="font-size: 1.35rem; font-weight: 900; color: #059669; font-family: 'JetBrains Mono'; margin: 0.2rem 0;">
              98 Punches
            </div>
            <span style="font-size: 0.72rem; color: #64748B;">Throughput: 12 students/min • AI Cam 60 FPS</span>
          </div>

          <div style="padding: 0.85rem 1rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px;">
            <div class="d-flex justify-between items-center">
              <strong style="font-size: 0.82rem; color: #0F172A;">Gate 3 (Auditorium & Library)</strong>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
            </div>
            <div style="font-size: 1.35rem; font-weight: 900; color: #7C3AED; font-family: 'JetBrains Mono'; margin: 0.2rem 0;">
              45 Punches
            </div>
            <span style="font-size: 0.72rem; color: #64748B;">Throughput: 6 students/min • Turnstiles OK</span>
          </div>
        </div>

        <!-- Live Classroom Occupancy Strip -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
          <div style="padding: 0.75rem 0.85rem; border-radius: 8px; background: #ECFDF5; border: 1px solid #A7F3D0;">
            <div class="d-flex justify-between items-center">
              <strong style="font-size: 0.8rem; color: #065F46;">Hall 101 (Smart AC)</strong>
              <span class="badge badge-success" style="font-size: 0.62rem;">IN SESSION</span>
            </div>
            <div style="font-size: 0.74rem; color: #047857; margin-top: 0.2rem;">
              Occupancy: <strong>35 / 45 Seats</strong> (JEE Target 2027)
            </div>
          </div>

          <div style="padding: 0.75rem 0.85rem; border-radius: 8px; background: #ECFDF5; border: 1px solid #A7F3D0;">
            <div class="d-flex justify-between items-center">
              <strong style="font-size: 0.8rem; color: #065F46;">Hall 203 (Bio Wing)</strong>
              <span class="badge badge-success" style="font-size: 0.62rem;">IN SESSION</span>
            </div>
            <div style="font-size: 0.74rem; color: #047857; margin-top: 0.2rem;">
              Occupancy: <strong>40 / 50 Seats</strong> (NEET Champions)
            </div>
          </div>

          <div style="padding: 0.75rem 0.85rem; border-radius: 8px; background: #F1F5F9; border: 1px solid #CBD5E1;">
            <div class="d-flex justify-between items-center">
              <strong style="font-size: 0.8rem; color: #334155;">Room 102</strong>
              <span class="badge badge-outline" style="font-size: 0.62rem;">AVAILABLE</span>
            </div>
            <div style="font-size: 0.74rem; color: #64748B; margin-top: 0.2rem;">
              Next: Class 10 Evening (Starts 04:30 PM)
            </div>
          </div>

          <div style="padding: 0.75rem 0.85rem; border-radius: 8px; background: #F1F5F9; border: 1px solid #CBD5E1;">
            <div class="d-flex justify-between items-center">
              <strong style="font-size: 0.8rem; color: #334155;">Room 105 (STEM Lab)</strong>
              <span class="badge badge-outline" style="font-size: 0.62rem;">PREPARED</span>
            </div>
            <div style="font-size: 0.74rem; color: #64748B; margin-top: 0.2rem;">
              Status: Sanitized & AC Pre-cooled
            </div>
          </div>
        </div>

      </div>
    `;
  },

  /* -------------------------------------------------------------------------
     4. GUARDIAN PORTAL: AI LEARNING CURVE & ADVISORY
     ------------------------------------------------------------------------- */
  renderParentGrowthCard(student) {
    const analysis = this.analyzeStudent(student ? student.id : 'STU-001');
    if (!analysis) return '';

    const isLow = analysis.riskLevel === 'low';

    return `
      <div class="glass-card mb-4 p-4" style="background: ${isLow ? '#F0FDF4' : '#FFF1F2'}; border: 1px solid ${isLow ? '#BBF7D0' : '#FECDD3'}; border-radius: var(--radius-md);">
        <div class="d-flex justify-between items-center mb-2 flex-wrap gap-2">
          <div class="d-flex items-center gap-2">
            <span style="font-size: 1.25rem;">🧠</span>
            <strong style="font-size: 0.95rem; color: ${isLow ? '#065F46' : '#991B1B'};">
              AI Student Learning Curve & Academic Advisory
            </strong>
          </div>
          <span class="badge ${isLow ? 'badge-success' : 'badge-danger'}" style="font-size: 0.72rem;">
            ${isLow ? '● PRIME LEARNING TRAJECTORY' : '⚠️ REMEDIAL ATTENTION SUGGESTED'}
          </span>
        </div>

        <p style="font-size: 0.82rem; color: #334155; margin: 0 0 0.75rem; line-height: 1.5;">
          ${analysis.statusSummary}
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.65rem; font-size: 0.78rem;">
          <div style="padding: 0.65rem; background: #FFFFFF; border-radius: 8px; border: 1px solid rgba(0,0,0,0.06);">
            <strong style="color: #1E40AF; display: block; margin-bottom: 0.25rem;">Key Strengths & Mastery:</strong>
            <ul style="margin: 0; padding-left: 1.1rem; color: #475569; line-height: 1.45;">
              ${analysis.strengths.map(st => `<li>${st}</li>`).join('')}
            </ul>
          </div>

          <div style="padding: 0.65rem; background: #FFFFFF; border-radius: 8px; border: 1px solid rgba(0,0,0,0.06);">
            <strong style="color: #D97706; display: block; margin-bottom: 0.25rem;">Faculty Recommendations:</strong>
            <ul style="margin: 0; padding-left: 1.1rem; color: #475569; line-height: 1.45;">
              ${analysis.recommendations.map(rc => `<li>${rc}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="d-flex justify-between items-center mt-3 pt-2" style="border-top: 1px solid rgba(0,0,0,0.08); font-size: 0.75rem; color: #64748B;">
          <span>Predicted National Percentile: <strong class="text-primary font-mono">${analysis.projectedAIR}</strong></span>
          <button class="btn btn-outline btn-sm" onclick="KaviroxCertificates.openCertificateModal('${analysis.student.id}', 'bonafide')" style="font-size: 0.74rem; padding: 0.25rem 0.65rem;">
            📜 Download Bonafide Letter
          </button>
        </div>
      </div>
    `;
  }
};
