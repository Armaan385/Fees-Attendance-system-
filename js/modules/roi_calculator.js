// ==========================================================================
// Apex Campus OS - Institutional ROI & Fee Recovery Calculator
// Interactive Financial Impact Engine for School & College Decision Makers
// ==========================================================================
(function() {
  'use strict';

  window.KaviroxRoiCalculator = {
    students: 850,
    monthlyFee: 4500,
    facultyCount: 32,

    init(containerId = 'roi-calculator-root') {
      const el = document.getElementById(containerId);
      if (!el) return;
      this.container = el;
      this.render();
    },

    updateValues(students, monthlyFee) {
      if (students !== undefined) this.students = parseInt(students);
      if (monthlyFee !== undefined) this.monthlyFee = parseInt(monthlyFee);
      this.facultyCount = Math.max(8, Math.round(this.students / 28));
      this.render();
      if (window.playFxSound) window.playFxSound('click');
    },

    calculate() {
      const annualTuition = this.students * this.monthlyFee * 12;
      // Industry benchmark: 7.8% fee leakage in unrecovered dues/delays
      const unmanagedLeakage = annualTuition * 0.078;
      // Apex AI WhatsApp automated recovery recovers 82% of typical uncollected dues
      const recoveredFeeDues = Math.round(unmanagedLeakage * 0.82);

      // Teacher roll call time savings: 12 minutes saved per day per faculty across 220 academic days
      const hoursSavedPerFaculty = Math.round((12 * 220) / 60); // ~44 hours/faculty/year
      const totalHoursSaved = hoursSavedPerFaculty * this.facultyCount;
      // Valued at average ₹450/hour faculty compensation
      const facultyProductivityValue = Math.round(totalHoursSaved * 450);

      // Paper, receipt printing, physical registers, plastic ID card vendor markups saved
      const physicalPaperSaved = Math.round(this.students * 145); // ₹145/student/year

      const totalAnnualBenefit = recoveredFeeDues + facultyProductivityValue + physicalPaperSaved;

      return {
        annualTuition,
        recoveredFeeDues,
        totalHoursSaved,
        facultyProductivityValue,
        physicalPaperSaved,
        totalAnnualBenefit
      };
    },

    render() {
      if (!this.container) return;
      const c = this.calculate();

      this.container.innerHTML = `
        <div class="glass-card roi-calculator-card scroll-reveal-scale" style="background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(28px) saturate(190%); -webkit-backdrop-filter: blur(28px); border: 1px solid rgba(255, 255, 255, 0.15); border-top: 1.5px solid rgba(255, 255, 255, 0.35); border-left: 1.5px solid rgba(255, 255, 255, 0.22); border-radius: var(--radius-lg); padding: 2.25rem 2.5rem; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15);">
          
          <!-- Header Banner -->
          <div class="d-flex justify-between items-center flex-wrap gap-3 mb-4 pb-3" style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
            <div>
              <div class="d-flex items-center gap-2 mb-1">
                <span class="badge badge-accent font-mono" style="font-size: 0.72rem; letter-spacing: 0.05em; background: rgba(56, 189, 248, 0.15); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.3);">
                  INSTITUTIONAL FINANCIAL PROJECTION
                </span>
                <span class="badge badge-success" style="font-size: 0.7rem; background: rgba(52, 211, 153, 0.15); color: #34D399; border: 1px solid rgba(52, 211, 153, 0.3);">● Verified Multipliers</span>
              </div>
              <h3 style="font-size: 1.45rem; font-weight: 800; color: #F8FAFC; margin: 0; font-family: 'Outfit', sans-serif;">
                Institutional ROI & Bad-Debt Recovery Calculator
              </h3>
              <p style="font-size: 0.85rem; color: #94A3B8; margin: 0.25rem 0 0;">
                Calculate estimated revenue recovery and faculty operational hours saved when deploying Apex Campus OS.
              </p>
            </div>

            <div style="text-align: right;">
              <span style="font-size: 0.74rem; color: #94A3B8; text-transform: uppercase; font-weight: 700; letter-spacing: 0.04em;">Projected Net Institutional Gain</span>
              <div style="font-size: 2.1rem; font-weight: 900; color: #34D399; font-family: 'Outfit', sans-serif; text-shadow: 0 0 20px rgba(52, 211, 153, 0.35);">
                ₹${(c.totalAnnualBenefit / 100000).toFixed(2)} Lakhs<span style="font-size: 0.95rem; font-weight: 600; color: #94A3B8;">/year</span>
              </div>
            </div>
          </div>

          <!-- Interactive Sliders Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
            
            <!-- Slider 1: Student Count -->
            <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-top: 1.5px solid rgba(255, 255, 255, 0.25); border-radius: 14px; padding: 1.25rem 1.5rem; backdrop-filter: blur(16px);">
              <div class="d-flex justify-between items-center mb-2">
                <label style="font-size: 0.86rem; font-weight: 800; color: #F8FAFC;">
                  🎓 Total Enrolled Students
                </label>
                <span class="font-mono font-bold" style="font-size: 1.15rem; color: #38BDF8; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); padding: 2px 10px; border-radius: 6px;">
                  ${this.students.toLocaleString('en-IN')} Students
                </span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="3500" 
                step="50" 
                value="${this.students}" 
                style="width: 100%; accent-color: #38BDF8; cursor: pointer; height: 6px;"
                oninput="KaviroxRoiCalculator.updateValues(this.value, undefined)"
              />
              <div class="d-flex justify-between items-center mt-1" style="font-size: 0.72rem; color: #94A3B8;">
                <span>100 (Single Branch)</span>
                <span>1,500 (Mid-Size School)</span>
                <span>3,500+ (Multi-Campus)</span>
              </div>
            </div>

            <!-- Slider 2: Average Monthly Fee -->
            <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-top: 1.5px solid rgba(255, 255, 255, 0.25); border-radius: 14px; padding: 1.25rem 1.5rem; backdrop-filter: blur(16px);">
              <div class="d-flex justify-between items-center mb-2">
                <label style="font-size: 0.86rem; font-weight: 800; color: #F8FAFC;">
                  💳 Avg. Monthly Tuition Fee / Student
                </label>
                <span class="font-mono font-bold" style="font-size: 1.15rem; color: #34D399; background: rgba(52, 211, 153, 0.15); border: 1px solid rgba(52, 211, 153, 0.3); padding: 2px 10px; border-radius: 6px;">
                  ₹${this.monthlyFee.toLocaleString('en-IN')}
                </span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="12000" 
                step="250" 
                value="${this.monthlyFee}" 
                style="width: 100%; accent-color: #34D399; cursor: pointer; height: 6px;"
                oninput="KaviroxRoiCalculator.updateValues(undefined, this.value)"
              />
              <div class="d-flex justify-between items-center mt-1" style="font-size: 0.72rem; color: #94A3B8;">
                <span>₹1,000/mo</span>
                <span>₹5,000/mo</span>
                <span>₹12,000/mo</span>
              </div>
            </div>

          </div>

          <!-- 4 Pillars Impact Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            
            <!-- Metric 1: Recovered Dues -->
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.05)); border: 1px solid rgba(52, 211, 153, 0.3); border-top: 1.5px solid rgba(52, 211, 153, 0.5); border-radius: 12px; padding: 1.15rem; backdrop-filter: blur(12px);">
              <span style="font-size: 0.7rem; color: #34D399; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;">1. Fee Leakage Recovered</span>
              <div style="font-size: 1.45rem; font-weight: 900; color: #34D399; font-family: 'Outfit'; margin: 0.25rem 0 0.15rem; text-shadow: 0 0 15px rgba(52, 211, 153, 0.3);">
                +₹${(c.recoveredFeeDues / 100000).toFixed(2)} Lakhs
              </div>
              <p style="font-size: 0.74rem; color: #94A3B8; margin: 0; line-height: 1.35;">
                Recovered via automated 1-tap WhatsApp fee reminders with UPI payment links.
              </p>
            </div>

            <!-- Metric 2: Faculty Hours Saved -->
            <div style="background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(30, 64, 175, 0.05)); border: 1px solid rgba(56, 189, 248, 0.3); border-top: 1.5px solid rgba(56, 189, 248, 0.5); border-radius: 12px; padding: 1.15rem; backdrop-filter: blur(12px);">
              <span style="font-size: 0.7rem; color: #38BDF8; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;">2. Faculty Hours Reclaimed</span>
              <div style="font-size: 1.45rem; font-weight: 900; color: #38BDF8; font-family: 'Outfit'; margin: 0.25rem 0 0.15rem; text-shadow: 0 0 15px rgba(56, 189, 248, 0.3);">
                ${c.totalHoursSaved.toLocaleString('en-IN')} Hours
              </div>
              <p style="font-size: 0.74rem; color: #94A3B8; margin: 0; line-height: 1.35;">
                30-second digital batch roll calls eliminate manual registers across ${this.facultyCount} teachers.
              </p>
            </div>

            <!-- Metric 3: Teacher Productivity Value -->
            <div style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(124, 58, 237, 0.05)); border: 1px solid rgba(192, 132, 252, 0.3); border-top: 1.5px solid rgba(192, 132, 252, 0.5); border-radius: 12px; padding: 1.15rem; backdrop-filter: blur(12px);">
              <span style="font-size: 0.7rem; color: #C084FC; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;">3. Teaching Time Value</span>
              <div style="font-size: 1.45rem; font-weight: 900; color: #C084FC; font-family: 'Outfit'; margin: 0.25rem 0 0.15rem; text-shadow: 0 0 15px rgba(192, 132, 252, 0.3);">
                +₹${(c.facultyProductivityValue / 100000).toFixed(2)} Lakhs
              </div>
              <p style="font-size: 0.74rem; color: #94A3B8; margin: 0; line-height: 1.35;">
                Productive time redirected to student doubt clearance and competitive mentoring.
              </p>
            </div>

            <!-- Metric 4: Paper & Printing Slashed -->
            <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.05)); border: 1px solid rgba(251, 191, 36, 0.3); border-top: 1.5px solid rgba(251, 191, 36, 0.5); border-radius: 12px; padding: 1.15rem; backdrop-filter: blur(12px);">
              <span style="font-size: 0.7rem; color: #FBBF24; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;">4. Printing & Stationary Saved</span>
              <div style="font-size: 1.45rem; font-weight: 900; color: #FBBF24; font-family: 'Outfit'; margin: 0.25rem 0 0.15rem; text-shadow: 0 0 15px rgba(251, 191, 36, 0.3);">
                +₹${(c.physicalPaperSaved / 1000).toFixed(0)}k Saved
              </div>
              <p style="font-size: 0.74rem; color: #94A3B8; margin: 0; line-height: 1.35;">
                Zero printed fee books, zero manual notice circulars, digital verifiable bonafides.
              </p>
            </div>

          </div>

          <!-- Bottom Action Bar for Presenter -->
          <div class="d-flex justify-between items-center flex-wrap gap-3 p-3" style="background: rgba(15, 23, 42, 0.85); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.12); border-top: 1.5px solid rgba(255, 255, 255, 0.25);">
            <div style="font-size: 0.82rem; color: #CBD5E1;">
              ⚡ <strong style="color: #F8FAFC;">Client Selling Point:</strong> Apex Campus OS typically achieves <strong style="color: #34D399;">100% software payback within 3 weeks</strong> solely through recovered delinquent tuition fees.
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-outline btn-sm" onclick="KaviroxRoiCalculator.downloadReport()" style="font-size: 0.8rem; font-weight: 700; border-color: rgba(255, 255, 255, 0.25); color: #F8FAFC;">
                📄 Download ROI Analysis PDF
              </button>
              <a href="contact.html" class="btn btn-primary btn-sm" style="font-size: 0.8rem; font-weight: 700;">
                Schedule Campus Deployment →
              </a>
            </div>
          </div>

        </div>
      `;
    },

    downloadReport() {
      if (window.playFxSound) window.playFxSound('success');
      window.print();
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    KaviroxRoiCalculator.init();
  });
})();
