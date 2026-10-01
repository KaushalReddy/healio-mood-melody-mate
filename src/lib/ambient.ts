// Generates calming ambient soundscapes in the browser (royalty-free, no downloads).
export type SoundKind = "rain" | "ocean" | "forest" | "drone" | "piano";

export class AmbientEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private nodes: AudioNode[] = [];
  private timers: number[] = [];

  setVolume(v: number) {
    if (this.master) this.master.gain.value = v;
  }

  private noise(ctx: AudioContext, color: "white" | "pink" | "brown") {
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      let b0 = 0, b1 = 0, b2 = 0, last = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        if (color === "white") d[i] = w * 0.3;
        else if (color === "brown") { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
        else { b0 = 0.997 * b0 + w * 0.029; b1 = 0.985 * b1 + w * 0.032; b2 = 0.95 * b2 + w * 0.048; d[i] = (b0 + b1 + b2 + w * 0.05) * 0.5; }
      }
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    return src;
  }

  play(kind: SoundKind, volume: number) {
    this.stop();
    const ctx = (this.ctx ??= new AudioContext());
    void ctx.resume();
    const master = ctx.createGain();
    master.gain.value = volume;
    master.connect(ctx.destination);
    this.master = master;
    const t = ctx.currentTime;

    const lfo = (target: AudioParam, rate: number, depth: number) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = rate;
      g.gain.value = depth;
      o.connect(g).connect(target);
      o.start();
      this.nodes.push(o);
    };

    if (kind === "rain" || kind === "ocean" || kind === "forest") {
      const n = this.noise(ctx, kind === "ocean" ? "brown" : "pink");
      const f = ctx.createBiquadFilter();
      f.type = kind === "rain" ? "highpass" : "lowpass";
      f.frequency.value = kind === "rain" ? 900 : kind === "ocean" ? 600 : 1800;
      const g = ctx.createGain();
      g.gain.value = kind === "ocean" ? 0.5 : 0.35;
      n.connect(f).connect(g).connect(master);
      if (kind === "ocean") lfo(g.gain, 0.08, 0.4);
      if (kind === "forest") lfo(g.gain, 0.15, 0.1);
      n.start();
      this.nodes.push(n);
      if (kind === "forest") {
        const chirp = () => {
          const o = ctx.createOscillator();
          const eg = ctx.createGain();
          const s = ctx.currentTime;
          const base = 2500 + Math.random() * 1500;
          o.frequency.setValueAtTime(base, s);
          o.frequency.exponentialRampToValueAtTime(base * 1.4, s + 0.12);
          eg.gain.setValueAtTime(0, s);
          eg.gain.linearRampToValueAtTime(0.05, s + 0.02);
          eg.gain.exponentialRampToValueAtTime(0.0001, s + 0.18);
          o.connect(eg).connect(master);
          o.start(s);
          o.stop(s + 0.2);
          this.timers.push(window.setTimeout(chirp, 800 + Math.random() * 3000));
        };
        chirp();
      }
    }

    if (kind === "drone") {
      [110, 164.8, 220, 277.2].forEach((freq, i) => {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.value = 0.08;
        o.connect(g).connect(master);
        lfo(g.gain, 0.05 + i * 0.03, 0.05);
        o.start(t);
        this.nodes.push(o);
      });
    }

    if (kind === "piano") {
      const scale = [261.6, 293.7, 329.6, 392, 440, 523.3, 587.3, 659.3];
      const note = () => {
        const s = ctx.currentTime;
        const freq = scale[Math.floor(Math.random() * scale.length)];
        [1, 2].forEach((h) => {
          const o = ctx.createOscillator();
          o.type = h === 1 ? "triangle" : "sine";
          o.frequency.value = freq * h;
          const eg = ctx.createGain();
          eg.gain.setValueAtTime(0, s);
          eg.gain.linearRampToValueAtTime(0.12 / h, s + 0.02);
          eg.gain.exponentialRampToValueAtTime(0.0001, s + 3.5);
          o.connect(eg).connect(master);
          o.start(s);
          o.stop(s + 3.6);
        });
        this.timers.push(window.setTimeout(note, 900 + Math.random() * 1400));
      };
      note();
    }
  }

  stop() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.nodes.forEach((n) => { try { (n as AudioScheduledSourceNode).stop(); } catch { /* noop */ } n.disconnect(); });
    this.nodes = [];
    this.master?.disconnect();
    this.master = null;
  }
}
