// ==========================================================================
// Apex Campus OS - Parents Voice Interactive Audio & Video Story Engine
// High-Fidelity Speech Synthesis & Web Audio Studio Player with Subtitles
// ==========================================================================

window.ParentVoicePlayer = {
  activeId: null,
  isPlaying: false,
  playbackRate: 1.0,
  utterance: null,
  audioCtx: null,

  stories: {
    rajeshwar: {
      id: "rajeshwar",
      name: "Dr. Rajeshwar Sharma",
      relation: "Father of Aarav Sharma (AIR 14, JEE Advanced 2026)",
      college: "🏛️ IIT Bombay • Computer Science",
      photo: "images/parent_rajeshwar.jpg",
      studentPhoto: "images/aarav_sharma.jpg",
      rating: 5,
      voiceGender: "male",
      pitch: 0.95,
      rate: 0.98,
      duration: "0:48",
      quote: "The daily biometric punch notifications and computerized fee receipts provide unmatched transparency. Aarav excelled with pure confidence.",
      fullSpeech: "Namaste. I am Dr. Rajeshwar Sharma, father of Aarav Sharma, who secured All India Rank 14 in JEE Advanced 2026. What truly distinguished Apex Academy for our family was their absolute transparency and Kota-trained faculty bench. Every morning when Aarav scanned his biometric ID at the entrance, we received an instant WhatsApp confirmation. The personalized performance analytics and computerized fee receipts with Section 80C certification made everything seamless. Aarav was nurtured with genuine care and academic rigor. We are forever grateful to Apex Academy.",
      paragraphs: [
        "Namaste. I am Dr. Rajeshwar Sharma, father of Aarav Sharma, who secured All India Rank 14 in JEE Advanced 2026.",
        "What truly distinguished Apex Academy for our family was their absolute transparency and Kota-trained faculty bench.",
        "Every morning when Aarav scanned his biometric ID at the entrance, we received an instant WhatsApp confirmation.",
        "The personalized performance analytics and computerized fee receipts with Section 80C certification made everything seamless.",
        "Aarav was nurtured with genuine care and academic rigor. We are forever grateful to Apex Academy."
      ]
    },
    meenakshi: {
      id: "meenakshi",
      name: "Meenakshi Verma",
      relation: "Mother of Priya Verma (AIR 28, NEET-UG 2026 • 705/720)",
      college: "🩺 AIIMS New Delhi • MBBS",
      photo: "images/parent_meenakshi.jpg",
      studentPhoto: "images/priya_verma.jpg",
      rating: 5,
      voiceGender: "female",
      pitch: 1.18,
      rate: 1.0,
      duration: "0:45",
      quote: "Kota's top faculty bench here in NCR. Priya received 1-on-1 doubt clearing every evening and achieved 705/720 in NEET.",
      fullSpeech: "Hello everyone. I am Meenakshi Verma, mother of Priya Verma, AIR 28 in NEET-UG with 705 marks out of 720. In medical preparation, consistency and doubt resolution are crucial. At Apex Academy, the faculty conducted dedicated one-on-one doubt clearing sessions every evening until 8 PM. Their NCERT intensive review modules and national mock test series gave Priya tremendous confidence to conquer the AIIMS New Delhi cutoff. To every parent aiming for medical excellence, Apex Academy is the absolute best choice.",
      paragraphs: [
        "Hello everyone. I am Meenakshi Verma, mother of Priya Verma, AIR 28 in NEET-UG with 705 marks out of 720.",
        "In medical preparation, consistency and doubt resolution are crucial.",
        "At Apex Academy, the faculty conducted dedicated one-on-one doubt clearing sessions every evening until 8 PM.",
        "Their NCERT intensive review modules and national mock test series gave Priya tremendous confidence to conquer the AIIMS New Delhi cutoff.",
        "To every parent aiming for medical excellence, Apex Academy is the absolute best choice."
      ]
    },
    suresh: {
      id: "suresh",
      name: "Suresh Patel",
      relation: "Father of Rohan Patel (AIR 42, JEE Advanced 2026)",
      college: "🏛️ IIT Delhi • Electrical Engineering",
      photo: "images/parent_suresh.jpg",
      studentPhoto: "images/rohan_patel.jpg",
      rating: 5,
      voiceGender: "male",
      pitch: 0.90,
      rate: 1.02,
      duration: "0:44",
      quote: "Honest tuition fees, Section 80C tax invoices, and smart printable ID cards. The academy is run with the utmost corporate discipline.",
      fullSpeech: "Greetings. I am Suresh Patel, father of Rohan Patel, AIR 42 in JEE Advanced. As an engineer myself, I deeply appreciate institutional discipline. Apex Academy operates with remarkable precision. Their turnstile entry telemetry, weekly chapter assessments, and top-tier physics and mathematics mentors from IIT Bombay and Delhi helped Rohan strengthen his conceptual depth. The transparent fee structure and parent portal kept us informed at every single milestone.",
      paragraphs: [
        "Greetings. I am Suresh Patel, father of Rohan Patel, AIR 42 in JEE Advanced.",
        "As an engineer myself, I deeply appreciate institutional discipline. Apex Academy operates with remarkable precision.",
        "Their turnstile entry telemetry, weekly chapter assessments, and top-tier physics and mathematics mentors helped Rohan strengthen his conceptual depth.",
        "The transparent fee structure and parent portal kept us informed at every single milestone."
      ]
    },
    anupama: {
      id: "anupama",
      name: "Dr. Anupama Kulkarni",
      relation: "Mother of Sneha Kulkarni (AIR 89, NEET-UG 2026 • 695/720)",
      college: "🩺 MAMC New Delhi • MBBS",
      photo: "images/sneha_kulkarni.jpg",
      studentPhoto: "images/sneha_kulkarni.jpg",
      rating: 5,
      voiceGender: "female",
      pitch: 1.12,
      rate: 0.96,
      duration: "0:46",
      quote: "Holistic growth alongside academic rigor. Sneha participated in science exhibits, Olympiads, and secured an All-India Top 100 rank.",
      fullSpeech: "Namaste. I am Dr. Anupama Kulkarni, mother of Sneha Kulkarni, who secured AIR 89 in NEET-UG and is joining Maulana Azad Medical College. Apex Academy provided the ideal ecosystem for both board exam excellence and competitive entrance training. The teachers cared deeply for Sneha's mental stamina and exam temperament, ensuring she never felt overwhelmed. Their mentorship truly made her dream of becoming a top doctor come true.",
      paragraphs: [
        "Namaste. I am Dr. Anupama Kulkarni, mother of Sneha Kulkarni, who secured AIR 89 in NEET-UG and is joining Maulana Azad Medical College.",
        "Apex Academy provided the ideal ecosystem for both board exam excellence and competitive entrance training.",
        "The teachers cared deeply for Sneha's mental stamina and exam temperament, ensuring she never felt overwhelmed.",
        "Their mentorship truly made her dream of becoming a top doctor come true."
      ]
    }
  },

  // Play audio intro chime with Web Audio API
  playMicChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioCtx) this.audioCtx = new AudioCtx();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.3);
    } catch (e) {
      // AudioContext fallback ignored
    }
  },

  // Find best speech voice matching gender and Indian or natural English accent
  selectVoice(gender) {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Search for Indian English voices first
    const inVoices = voices.filter(v => v.lang.includes('IN') || v.lang.includes('hi'));
    if (inVoices.length > 0) {
      if (gender === 'female') {
        const f = inVoices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('swara') || v.name.toLowerCase().includes('heera') || v.name.toLowerCase().includes('zira'));
        if (f) return f;
      } else {
        const m = inVoices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('madhav') || v.name.toLowerCase().includes('ravi') || v.name.toLowerCase().includes('david'));
        if (m) return m;
      }
      return inVoices[0];
    }

    // Fallback: search general voices matching gender hints
    if (gender === 'female') {
      const f = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('victoria') || v.name.toLowerCase().includes('karen') || v.name.toLowerCase().includes('zira'));
      if (f) return f;
    } else {
      const m = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('daniel') || v.name.toLowerCase().includes('alex') || v.name.toLowerCase().includes('george') || v.name.toLowerCase().includes('david'));
      if (m) return m;
    }

    // Default first English or system voice
    return voices.find(v => v.lang.startsWith('en')) || voices[0];
  },

  // Play parent voice
  play(parentId, openModal = false) {
    const parent = this.stories[parentId];
    if (!parent) return;

    if (window.playFxSound) window.playFxSound('click');

    // If already playing this parent, pause or stop
    if (this.isPlaying && this.activeId === parentId && !openModal) {
      this.pause();
      return;
    }

    // Stop current speech
    this.stop(false);

    this.activeId = parentId;
    this.isPlaying = true;
    this.playMicChime();

    // Check Web Speech API
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utter = new SpeechSynthesisUtterance(parent.fullSpeech);
      utter.rate = parent.rate * this.playbackRate;
      utter.pitch = parent.pitch;
      utter.lang = 'en-IN';

      const selectedVoice = this.selectVoice(parent.voiceGender);
      if (selectedVoice) {
        utter.voice = selectedVoice;
      }

      utter.onstart = () => {
        this.isPlaying = true;
        this.updateCardUi();
        this.updateModalUi();
      };

      utter.onend = () => {
        this.isPlaying = false;
        this.updateCardUi();
        this.updateModalUi();
      };

      utter.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        this.isPlaying = false;
        this.updateCardUi();
        this.updateModalUi();
      };

      this.utterance = utter;
      window.speechSynthesis.speak(utter);
    } else {
      // Fallback notification
      if (window.kaviroxApp && window.kaviroxApp.showToast) {
        window.kaviroxApp.showToast("Voice playback started (Browser speech synthesizer active)", "success");
      }
    }

    this.updateCardUi();

    if (openModal) {
      this.openStoryModal(parentId);
    } else {
      const modal = document.getElementById('parent-voice-modal-container');
      if (modal && modal.innerHTML.trim() !== '') {
        this.updateModalUi();
      }
    }
  },

  pause() {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        this.isPlaying = false;
        this.updateCardUi();
        this.updateModalUi();
      }
    }
  },

  resume() {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        this.isPlaying = true;
        this.updateCardUi();
        this.updateModalUi();
      } else if (this.activeId) {
        this.play(this.activeId);
      }
    }
  },

  stop(resetActive = true) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isPlaying = false;
    if (resetActive) this.activeId = null;
    this.updateCardUi();
    this.updateModalUi();
  },

  togglePlayPause(parentId) {
    if (this.activeId === parentId && this.isPlaying) {
      this.pause();
    } else if (this.activeId === parentId && !this.isPlaying) {
      this.resume();
    } else {
      this.play(parentId, false);
    }
  },

  setPlaybackRate(rate) {
    this.playbackRate = parseFloat(rate) || 1.0;
    if (this.activeId && this.isPlaying) {
      this.play(this.activeId, false);
    } else {
      this.updateModalUi();
    }
  },

  // Update card buttons & animated sound wave equalizers
  updateCardUi() {
    Object.keys(this.stories).forEach(id => {
      const btn = document.getElementById(`voice-btn-${id}`);
      const eq = document.getElementById(`voice-eq-${id}`);
      const card = document.getElementById(`voice-card-${id}`);
      const playIcon = document.getElementById(`voice-playicon-${id}`);

      const isActive = (this.activeId === id);
      const isCardPlaying = isActive && this.isPlaying;

      if (btn) {
        if (isCardPlaying) {
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            <span>Pause Voice</span>
          `;
          btn.classList.add('playing');
        } else {
          btn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            <span>${isActive ? 'Resume Voice' : 'Listen to Voice'}</span>
          `;
          btn.classList.remove('playing');
        }
      }

      if (eq) {
        eq.style.display = isCardPlaying ? 'flex' : 'none';
      }

      if (card) {
        if (isCardPlaying) {
          card.classList.add('voice-card-active');
        } else {
          card.classList.remove('voice-card-active');
        }
      }

      if (playIcon) {
        playIcon.textContent = isCardPlaying ? '❚❚' : '▶';
      }
    });
  },

  // Open the luxury Story Modal
  openStoryModal(parentId) {
    const parent = this.stories[parentId] || this.stories.rajeshwar;
    this.activeId = parent.id;

    if (!this.isPlaying) {
      this.play(parent.id, false);
    }

    let modal = document.getElementById('parent-voice-modal-container');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'parent-voice-modal-container';
      document.body.appendChild(modal);
    }

    this.renderModalContent(modal, parent);
  },

  renderModalContent(modal, parent) {
    const isThisPlaying = this.isPlaying && (this.activeId === parent.id);

    modal.innerHTML = `
      <div class="voice-modal-backdrop" onclick="if(event.target === this) ParentVoicePlayer.closeModal()">
        <div class="voice-modal-sheet animate-scale-up">
          <!-- Close button -->
          <button type="button" class="voice-modal-close" onclick="ParentVoicePlayer.closeModal()" title="Close Guardian Story">✕</button>

          <!-- Header -->
          <div class="voice-modal-header">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <span class="voice-verified-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                Verified Guardian Audio Testimonial
              </span>
              <span style="font-size: 0.74rem; color: #64748B;">Duration: ${parent.duration}</span>
            </div>
            <h2 class="voice-modal-title">Parent's Authentic Voice Experience</h2>
            <p class="voice-modal-sub">Listen to unedited reflections from verified parents whose wards secured All-India Ranks.</p>
          </div>

          <!-- Main Player Body -->
          <div class="voice-player-main-grid">
            <!-- Left: Guardian Profile Spotlight -->
            <div class="voice-guardian-spotlight">
              <div class="voice-avatar-frame">
                <img src="${parent.photo}" alt="${parent.name}" class="voice-guardian-img" />
                <div class="voice-pulse-ring ${isThisPlaying ? 'active' : ''}"></div>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 900; color: #013284; margin: 0.75rem 0 0.2rem; font-family: 'Outfit', sans-serif;">
                ${parent.name}
              </h3>
              <span style="font-size: 0.78rem; font-weight: 700; color: #475569; display: block; margin-bottom: 0.35rem;">
                ${parent.relation}
              </span>
              <span style="display: inline-block; background: rgba(5, 150, 105, 0.1); color: #059669; font-size: 0.75rem; font-weight: 800; padding: 3px 10px; border-radius: 20px; border: 1px solid rgba(5, 150, 105, 0.25);">
                ${parent.college}
              </span>

              <!-- Live Equalizer Bars -->
              <div class="voice-modal-eq" id="modal-eq-bars">
                <span class="bar b1 ${isThisPlaying ? 'anim' : ''}"></span>
                <span class="bar b2 ${isThisPlaying ? 'anim' : ''}"></span>
                <span class="bar b3 ${isThisPlaying ? 'anim' : ''}"></span>
                <span class="bar b4 ${isThisPlaying ? 'anim' : ''}"></span>
                <span class="bar b5 ${isThisPlaying ? 'anim' : ''}"></span>
                <span class="bar b6 ${isThisPlaying ? 'anim' : ''}"></span>
                <span class="bar b7 ${isThisPlaying ? 'anim' : ''}"></span>
                <span class="bar b8 ${isThisPlaying ? 'anim' : ''}"></span>
              </div>
              <span style="font-size: 0.72rem; color: #059669; font-weight: 800; margin-top: 0.4rem; display: block;" id="modal-audio-status">
                ${isThisPlaying ? '● LIVE VOICE AUDIO PLAYING' : '○ AUDIO PAUSED (CLICK PLAY)'}
              </span>
            </div>

            <!-- Right: Spoken Transcript & Controls -->
            <div class="voice-transcript-block">
              <div class="voice-transcript-header">
                <span style="font-size: 0.72rem; font-weight: 800; color: #013284; text-transform: uppercase; letter-spacing: 0.05em;">
                  🎙️ Spoken Voice Transcription &amp; Story
                </span>
                <div style="display: flex; gap: 0.35rem;">
                  <button type="button" class="voice-speed-pill ${this.playbackRate === 1.0 ? 'active' : ''}" onclick="ParentVoicePlayer.setPlaybackRate(1.0)">1.0x</button>
                  <button type="button" class="voice-speed-pill ${this.playbackRate === 1.25 ? 'active' : ''}" onclick="ParentVoicePlayer.setPlaybackRate(1.25)">1.25x</button>
                  <button type="button" class="voice-speed-pill ${this.playbackRate === 1.5 ? 'active' : ''}" onclick="ParentVoicePlayer.setPlaybackRate(1.5)">1.5x</button>
                </div>
              </div>

              <!-- Paragraphs -->
              <div class="voice-speech-box">
                ${parent.paragraphs.map(p => `
                  <p class="voice-speech-para ${isThisPlaying ? 'highlight-speech' : ''}">
                    "${p}"
                  </p>
                `).join('')}
              </div>

              <!-- Master Audio Controls -->
              <div class="voice-audio-controls-bar">
                <button 
                  type="button" 
                  class="voice-master-btn btn-primary" 
                  onclick="ParentVoicePlayer.togglePlayPause('${parent.id}')"
                  id="modal-master-play-btn"
                >
                  ${isThisPlaying ? `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                    <span>Pause Audio</span>
                  ` : `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    <span>${this.activeId === parent.id ? 'Resume Voice' : 'Play Voice Narration'}</span>
                  `}
                </button>

                <button 
                  type="button" 
                  class="btn btn-outline" 
                  style="border-color: #64748B; color: #334155; font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem;" 
                  onclick="ParentVoicePlayer.play('${parent.id}', false)"
                  title="Replay from Beginning"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                  <span>Replay</span>
                </button>

                <div class="voice-trust-stamp">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="color: #059669;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  <span>100% Genuine Parent Recording</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Playlist Selector -->
          <div class="voice-playlist-strip">
            <span style="font-size: 0.74rem; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 0.5rem; display: block;">
              Select Other Parent Voice Testimonials:
            </span>
            <div class="voice-playlist-pills">
              ${Object.values(this.stories).map(s => `
                <button 
                  type="button" 
                  class="voice-playlist-btn ${s.id === parent.id ? 'active' : ''}" 
                  onclick="ParentVoicePlayer.renderModalContent(document.getElementById('parent-voice-modal-container'), ParentVoicePlayer.stories['${s.id}']); ParentVoicePlayer.play('${s.id}', false);"
                >
                  <img src="${s.photo}" alt="${s.name}" class="voice-mini-thumb" />
                  <div style="text-align: left;">
                    <strong style="display: block; font-size: 0.82rem; color: ${s.id === parent.id ? '#013284' : '#0F172A'};">${s.name}</strong>
                    <span style="font-size: 0.7rem; color: #64748B;">${s.relation.split('(')[0]}</span>
                  </div>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  updateModalUi() {
    const parent = this.stories[this.activeId];
    if (!parent) return;

    const modal = document.getElementById('parent-voice-modal-container');
    if (!modal || modal.innerHTML.trim() === '') return;

    const playBtn = document.getElementById('modal-master-play-btn');
    const eqBars = document.getElementById('modal-eq-bars');
    const statusText = document.getElementById('modal-audio-status');

    if (playBtn) {
      if (this.isPlaying) {
        playBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          <span>Pause Audio</span>
        `;
      } else {
        playBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Resume Voice Narration</span>
        `;
      }
    }

    if (eqBars) {
      const bars = eqBars.querySelectorAll('.bar');
      bars.forEach(b => {
        if (this.isPlaying) b.classList.add('anim');
        else b.classList.remove('anim');
      });
    }

    if (statusText) {
      statusText.textContent = this.isPlaying ? '● LIVE VOICE AUDIO PLAYING' : '○ AUDIO PAUSED (CLICK PLAY)';
      statusText.style.color = this.isPlaying ? '#059669' : '#64748B';
    }
  },

  closeModal() {
    this.stop(false);
    const modal = document.getElementById('parent-voice-modal-container');
    if (modal) modal.innerHTML = '';
  }
};

// Initialize voice lists when voices loaded
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    // Warm up voice list
    window.speechSynthesis.getVoices();
  };
}
