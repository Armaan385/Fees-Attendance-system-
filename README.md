# 🎓 Fees & Attendance Management System (Apex Academy)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Modern_Responsive-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Armaan385/Fees-Attendance-system-/pulls)

A complete, enterprise-grade **Educational Institute & Coaching Academy Management Solution**. Designed for institutes, schools, and coaching centers to effortlessly manage **student admissions, fee collections, biometric/AI attendance, examination scorecards, and multi-role portals (Admin, Teacher, and Parent)**.

---

## 🌟 Key Highlights

- 💳 **Intelligent Fee Management & Invoicing**
  - Instant computerized PDF fee receipt generation powered by `jsPDF`
  - Automated installment tracking, overdue alerts, scholarship adjustments, and GST/Tax breakdown
  - Verifiable QR codes on official receipts

- 📋 **Smart Attendance Tracking & Biometric Simulation**
  - Rapid one-click roll-call system for batches and classes
  - Integrated AI/Biometric attendance simulator for hardware testing
  - Automatic calculation of attendance percentage and defaulter thresholds

- 📲 **WhatsApp Automation & Notification Desk**
  - Automated instant WhatsApp alert generation for student absenteeism
  - Fee payment reminders and overdue alerts sent directly to parent contacts
  - Exam scorecard dispatches with personalized templates

- 👥 **Role-Based Portals**
  - **Admin Dashboard (`admin.html`)**: Complete operational control, financial analytics, enrollment figures, and institute configurations.
  - **Faculty / Teacher Portal (`teacher-portal.html`)**: Batch-wise attendance marking, DPP assignments, and test score entry.
  - **Parent & Student Portal (`parent-portal.html`)**: Transparent view of fees paid, upcoming dues, attendance calendar, and progress reports.
  - **Unified Access Hub (`portal.html`)**: Seamless switcher between institutional personas.

- 📊 **Performance Analytics & Academic Asset Engine**
  - Automated test scorecard generation with comparative rankings and percentile distribution
  - Printable Student ID card generator with QR verification
  - Certificate generator for meritorious students
  - Daily Practice Problem (DPP) worksheet generator

- 🌐 **Modern Institutional Frontend**
  - Full-featured academy website with Courses (`courses.html`), Admissions (`admissions.html`), Results Showcase (`results.html`), and Contact Desk (`contact.html`)
  - **Adaptive Device Switcher**: Real-time simulator toggle between Laptop, Smartphone, and Auto-responsive viewports

---

## 🏗️ System Architecture & File Structure

```text
Fees-Attendance-system-/
├── css/
│   └── styles.css                  # Modern UI stylesheet with CSS variables & responsive grid
├── js/
│   ├── modules/
│   │   ├── admin.js                # Admin dashboard management logic
│   │   ├── attendance.js           # Core attendance tracking algorithms
│   │   ├── ai_attendance_simulator.js # Biometric & AI attendance simulator
│   │   ├── fees.js                 # Fee calculation, installment & receipt engine
│   │   ├── parent.js               # Parent portal data binding & reports
│   │   ├── teacher.js              # Faculty workflows & mark submissions
│   │   ├── scorecards.js           # Exam performance & scorecard generation
│   │   ├── whatsapp_automation.js  # WhatsApp message dispatch templates & hooks
│   │   ├── dpp_pdf_generator.js    # PDF question sheet & DPP maker
│   │   ├── idcards.js              # Student ID card rendering
│   │   ├── certificates.js         # Digital merit certificate creation
│   │   ├── chatbot.js              # Institutional AI helper widget
│   │   └── timetable.js            # Batch schedule & routine planner
│   ├── app.js                      # Application bootstrap & lifecycle management
│   ├── data.js                     # Seed datasets, multi-tenant records & schemas
│   ├── sound_fx.js                 # Interactive sound effects engine
│   └── scroll_animations.js        # Smooth viewport animation controllers
├── components/                     # Reusable React & Vanilla UI widgets
│   ├── AnimatedList.jsx            # Dynamic list animations
│   └── StarBorder.jsx              # Glowing border component
├── images/                         # Assets, student portraits, and badges
├── admin.html                      # Administrative Management Console
├── portal.html                     # Unified Role Switcher Hub
├── parent-portal.html              # Parent & Student Self-Service Portal
├── teacher-portal.html             # Faculty Academic Management Desk
├── index.html                      # Institute Landing Page
├── admissions.html                 # Student Enrollment & Onboarding Form
├── courses.html                    # Academic Programs & Curriculum Showcase
├── results.html                    # Exam Hall of Fame & Toppers Gallery
├── about.html                      # Institution Heritage & Faculty Profiles
├── contact.html                    # Campus Location, Helpdesk & Map
├── server.js                       # Lightweight Node.js static server
├── package.json                    # Project configuration and dependencies
└── README.md                       # System documentation
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Version 18 or above recommended)
- Modern web browser (Google Chrome, Firefox, Microsoft Edge, Safari)

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Armaan385/Fees-Attendance-system-.git
   cd Fees-Attendance-system-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local server:**
   ```bash
   npm start
   ```

4. **Open in your browser:**
   ```
   http://localhost:3000/
   ```

> *Tip: You can also open any `.html` file directly in a modern web browser, or serve it using any static server like VS Code Live Server or Python's `python -m http.server 3000`.*

---

## 💻 Tech Stack

- **Frontend Core:** HTML5, CSS3, Modern JavaScript (ES6+)
- **UI Components:** Modular React 19 integration (`@hugeicons/react`, custom components)
- **PDF Generation:** `jspdf` & `html2canvas`
- **Typography:** Google Fonts (*Outfit*, *Plus Jakarta Sans*, *JetBrains Mono*)
- **Backend / Delivery:** Node.js HTTP server with MIME detection and CORS protection

---

## 🛡️ Security & Privacy

- Client-side data isolation prevents cross-role data leaks.
- Path traversal protection configured in `server.js`.
- Local storage and session cache can be wiped with one click from the Admin Settings.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Armaan Chaudhary**  
- GitHub: [@Armaan385](https://github.com/Armaan385)  
- Email: [armaan11chaudhary@gmail.com](mailto:armaan11chaudhary@gmail.com)
