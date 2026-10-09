// JENU'S Kashmiri Soundscape & Micro-interactions using Web Audio API

class KashmirAudio {
  constructor() {
    this.ctx = null;
    this.isAmbiencePlaying = false;
    this.ambienceGain = null;
    this.oscillators = [];
    this.isScrolling = false;
    this.scrollTimeout = null;

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolling = true;
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
          this.isScrolling = false;
        }, 350);
      }, { passive: true });
    }
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Click sound effects disabled as requested
  playSantoorNote(freq = 523.25) {
    // Sound effects on click removed
    return;
  }

  // Celebration sound effect disabled
  playCelebrationChime() {
    // Sound effects on click removed
    return;
  }

  // Ambient gentle Kashmir valley breeze + warm harmonic drone
  toggleAmbience() {
    this.init();
    if (!this.ctx) return false;

    if (this.isAmbiencePlaying) {
      this.stopAmbience();
      return false;
    } else {
      this.startAmbience();
      return true;
    }
  }

  startAmbience() {
    try {
      this.init();
      if (!this.ctx) return;

      this.ambienceGain = this.ctx.createGain();
      this.ambienceGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.ambienceGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2);
      this.ambienceGain.connect(this.ctx.destination);

      // Warm Himalayan drone chords (F# major / Kashmiri modal scale: F#3, C#4, A#4)
      const freqs = [185.0, 277.18, 370.0, 466.16];

      this.oscillators = freqs.map((f, i) => {
        const osc = this.ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime);

        // subtle frequency wobble for organic wind feeling
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 0.2 + (i * 0.1);
        lfoGain.gain.value = 2.0;
        lfo.connect(osc.frequency);
        lfo.start();

        const nodeGain = this.ctx.createGain();
        nodeGain.gain.value = 0.25;
        osc.connect(nodeGain);
        nodeGain.connect(this.ambienceGain);

        osc.start();
        return { osc, lfo };
      });

      this.isAmbiencePlaying = true;
    } catch (e) {
      console.warn("Could not start ambient audio:", e);
    }
  }

  stopAmbience() {
    if (this.ambienceGain && this.ctx) {
      this.ambienceGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1);
      setTimeout(() => {
        this.oscillators.forEach(({ osc, lfo }) => {
          try {
            osc.stop();
            lfo.stop();
          } catch(e){}
        });
        this.oscillators = [];
        this.isAmbiencePlaying = false;
      }, 1000);
    }
  }
}

export const kashmirAudio = new KashmirAudio();
