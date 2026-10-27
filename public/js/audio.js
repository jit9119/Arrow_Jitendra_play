(function (root) {
  'use strict';

  const PENTATONIC = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];

  // Hidden iOS 17.4+ / iOS 18 Taptic Engine <input type="checkbox" switch> fallback!
  let iosSwitchLabel = null;
  function ensureIosTapticSwitch() {
    if (iosSwitchLabel || typeof document === 'undefined' || !document.body) return;
    try {
      const wrap = document.createElement('div');
      wrap.setAttribute('aria-hidden', 'true');
      wrap.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden;';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.id = '__snake_ios_taptic_sw';
      input.setAttribute('switch', '');
      const label = document.createElement('label');
      label.setAttribute('for', '__snake_ios_taptic_sw');
      wrap.appendChild(input);
      wrap.appendChild(label);
      document.body.appendChild(wrap);
      iosSwitchLabel = label;
    } catch (_) {}
  }

  const AudioFX = {
    ctx: null,
    soundEnabled: true,
    hapticsEnabled: false,
    hapticStrength: 'off', // Default OFF on mobile ('off' | 'medium' | 'strong')

    unlock() {
      ensureIosTapticSwitch();
      if (!this.soundEnabled && !this.hapticsEnabled) return;
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC({ latencyHint: 'interactive' });
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    },

    scalePattern(pattern) {
      const mult = this.hapticStrength === 'strong' ? 1.35 : 0.85;
      if (typeof pattern === 'number') {
        return Math.max(5, Math.round(pattern * mult));
      }
      if (Array.isArray(pattern)) {
        return pattern.map((v, idx) => (idx % 2 === 0 ? Math.max(5, Math.round(v * mult)) : v));
      }
      return pattern;
    },

    // Physical sub-bass speaker membrane thump (58Hz–78Hz) so even devices without vibrate API feel tactile!
    playTactileBodyPulse(freqHz, durationSec, peakGain) {
      if (!this.hapticsEnabled || this.hapticStrength === 'off') return;
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const boost = this.hapticStrength === 'strong' ? 1.25 : 0.75;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freqHz, now);
        osc.frequency.exponentialRampToValueAtTime(Math.max(36, freqHz * 0.62), now + durationSec);
        gain.gain.setValueAtTime(0.0008, now);
        gain.gain.linearRampToValueAtTime(Math.min(0.18, peakGain * boost), now + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + durationSec);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + durationSec + 0.01);
      } catch (_) {}
    },

    vibrate(pattern) {
      if (!this.hapticsEnabled || this.hapticStrength === 'off') return;
      const scaled = this.scalePattern(pattern);
      let usedNative = false;
      try {
        if (navigator && typeof navigator.vibrate === 'function') {
          usedNative = navigator.vibrate(scaled);
        }
      } catch (_) {}

      if (!usedNative) {
        ensureIosTapticSwitch();
        if (iosSwitchLabel) {
          try { iosSwitchLabel.click(); } catch (_) {}
        }
      }
    },

    playTap() {
      this.unlock();
      this.vibrate(10);
      this.playTactileBodyPulse(76, 0.022, 0.06);
      if (!this.soundEnabled || !this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.032);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.038);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.042);
    },

    playSlide(combo) {
      this.unlock();
      const c = Math.max(1, combo || 1);
      // Crisp double-pulse launch haptic that escalates on combos!
      this.vibrate(c >= 3 ? [14, 20, 12] : [12, 16, 7]);
      this.playTactileBodyPulse(68 + Math.min(24, c * 3), 0.038, 0.085);

      if (!this.soundEnabled || !this.ctx) return;

      const now = this.ctx.currentTime;
      const idx = Math.min(PENTATONIC.length - 1, Math.max(0, c - 1));
      const freq = PENTATONIC[idx] * 0.75;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.14, now + 0.095);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.072, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.145);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.155);
    },

    playBlocked() {
      this.unlock();
      // Heavy double-thud recoil haptic
      this.vibrate([32, 34, 28]);
      this.playTactileBodyPulse(54, 0.085, 0.13);

      if (!this.soundEnabled || !this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(175, now);
      osc.frequency.exponentialRampToValueAtTime(92, now + 0.15);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.095, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    },

    playHint() {
      this.unlock();
      this.vibrate([12, 22, 16]);
      this.playTactileBodyPulse(74, 0.032, 0.07);

      if (!this.soundEnabled || !this.ctx) return;

      const now = this.ctx.currentTime;
      [659.25, 987.77].forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.06);
        gain.gain.setValueAtTime(0.001, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.058, now + i * 0.06 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + i * 0.06 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.19);
      });
    },

    playWinReveal() {
      this.unlock();
      // Celebratory multi-wave haptic cascade!
      this.vibrate([18, 28, 20, 28, 24, 34, 46]);
      this.playTactileBodyPulse(64, 0.09, 0.11);

      if (!this.soundEnabled || !this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const t = now + i * 0.085;
        osc.frequency.setValueAtTime(f * 0.85, t);
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.078, t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0008, t + 0.42);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.44);
      });
    }
  };

  root.AudioFX = AudioFX;
})(typeof self !== 'undefined' ? self : this);
