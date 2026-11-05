// ==========================================================================
// Apex Campus OS - Tactile Haptic Audio FX Engine
// Calibrated, Soft & Velvety Mechanical Micro-Feedback (Gentle Volume)
// ==========================================================================
(function() {
  'use strict';

  let audioCtx = null;
  let isSoundEnabled = localStorage.getItem('kavirox_sound_fx') !== 'false';
  // Soft, velvety calibrated master volume (prevents loudness fatigue)
  const MASTER_GAIN = 0.038;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Synthesize soft, non-intrusive procedural haptic feedback
  window.playFxSound = function(type = 'click') {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Master low-pass filter to remove any harsh treble/piercing frequencies
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(0.7, now);
      filter.connect(ctx.destination);

      if (type === 'click' || type === 'tap') {
        // Soft tactile mechanical tap (like Apple trackpad haptic)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.028);

        gain.gain.setValueAtTime(MASTER_GAIN, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

        osc.connect(gain);
        gain.connect(filter);

        osc.start(now);
        osc.stop(now + 0.029);
      } 
      else if (type === 'tab' || type === 'switch') {
        // Soft dual-tone ceramic blip
        const osc1 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(360, now);
        osc1.frequency.exponentialRampToValueAtTime(540, now + 0.04);

        gain.gain.setValueAtTime(MASTER_GAIN * 0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

        osc1.connect(gain);
        gain.connect(filter);

        osc1.start(now);
        osc1.stop(now + 0.046);
      } 
      else if (type === 'success' || type === 'chime') {
        // Gentle warm harmonic triad (soft acoustic harp warmth)
        const freqs = [440, 554.37, 659.25];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.035);

          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.setValueAtTime(MASTER_GAIN * 0.85, now + idx * 0.035);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.035 + 0.14);

          osc.connect(gain);
          gain.connect(filter);

          osc.start(now + idx * 0.035);
          osc.stop(now + idx * 0.035 + 0.15);
        });
      }
      else if (type === 'toggle' || type === 'select') {
        // Delicate soft droplet sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.03);

        gain.gain.setValueAtTime(MASTER_GAIN * 0.75, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

        osc.connect(gain);
        gain.connect(filter);

        osc.start(now);
        osc.stop(now + 0.036);
      }
    } catch (e) {
      // AudioContext policy safe fallback
    }
  };

  // Toggle Sound FX on/off
  window.toggleSoundFx = function() {
    isSoundEnabled = !isSoundEnabled;
    localStorage.setItem('kavirox_sound_fx', isSoundEnabled ? 'true' : 'false');
    updateSoundBtnState();
    if (isSoundEnabled) {
      window.playFxSound('success');
    }
  };

  function updateSoundBtnState() {
    const btns = document.querySelectorAll('.sound-fx-toggle-btn');
    btns.forEach(b => {
      b.innerHTML = isSoundEnabled ? '🔊 Soft FX' : '🔇 Muted';
      b.setAttribute('title', isSoundEnabled ? 'Click to Mute FX Audio' : 'Click to Enable FX Audio');
      if (isSoundEnabled) {
        b.classList.add('sound-active');
      } else {
        b.classList.remove('sound-active');
      }
    });
  }

  // Global Click Listener for all interactive elements
  function initGlobalSoundTriggers() {
    document.addEventListener('click', function(e) {
      const target = e.target.closest(
        'button, .btn, .pill-btn, .inst-nav-link, .auth-tab-btn, .quick-demo-pill, ' +
        '.filter-chip, .nav-tab-btn, .scroll-down-cue-wrap, .back-to-top-fab, ' +
        'input[type="checkbox"], input[type="radio"], select, .dropdown-item, .utility-link'
      );

      if (!target) return;

      // Resume AudioContext on first user interaction gesture
      getAudioContext();

      // Determine sound type from attributes or class hints
      if (target.dataset && target.dataset.sound) {
        window.playFxSound(target.dataset.sound);
      } else if (target.classList.contains('auth-tab-btn') || target.classList.contains('pill-btn') || target.classList.contains('nav-tab-btn') || target.classList.contains('filter-chip')) {
        window.playFxSound('tab');
      } else if (target.innerText && (target.innerText.includes('Pay') || target.innerText.includes('Enroll') || target.innerText.includes('Submit') || target.innerText.includes('Save') || target.innerText.includes('Sign In'))) {
        window.playFxSound('success');
      } else if (target.classList.contains('sound-fx-toggle-btn')) {
        // Handled by onclick
      } else {
        window.playFxSound('click');
      }
    }, true);

    updateSoundBtnState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalSoundTriggers);
  } else {
    initGlobalSoundTriggers();
  }
})();
