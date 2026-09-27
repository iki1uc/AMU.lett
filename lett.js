const AMU = {
  seal: 'iki1uc-' + Math.random().toString(36).slice(2,6).toUpperCase(),
  mind: { q: 0.763, fp: 'zoll-v1.1', ts: Date.now() },
  ledger: new Map(),   // sealed: { q, fp, ts, from }
  bc: null,

  init() {
    try {
      this.bc = new BroadcastChannel('amu:mind');
      this.bc.onmessage = (e) => this._aufnehmen(e.data);
    } catch(_) {}
    this._ausLedgerLesen();      // holt was vor uns da war
    setInterval(() => this.abgeben(), 2000);
  },

  // ─── 1. ABGEBEN ────────────────────────────────────────
  abgeben() {
    this.mind.ts = Date.now();
    this.mind.fp = this.mind.fp || 'amu';
    try { this.bc?.postMessage({ type:'amu:mind', from:this.seal, mind:this.mind }); } catch(_){}
    try { localStorage.setItem('amu:mind:'+this.seal, JSON.stringify(this.mind)); } catch(_){}
  },

  // ─── 2. HOLEN ──────────────────────────────────────────
  holen() {
    const now = Date.now();
    const frisch = [];
    for (const [from, m] of this.ledger) {
      if (now - m.ts < 10000) frisch.push({ from, ...m });
    }
    return frisch;
  },

  _aufnehmen(data) {
    if (!data || data.type !== 'amu:mind' || data.from === this.seal) return;
    this.ledger.set(data.from, data.mind);
  },

  _ausLedgerLesen() {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k.startsWith('amu:mind:')) continue;
      const from = k.slice(9);
      if (from === this.seal) continue;
      try {
        const m = JSON.parse(localStorage.getItem(k));
        if (Date.now() - m.ts < 10000) this.ledger.set(from, m);
      } catch(_) {}
    }
  },

  // ─── 3. NUTZEN ─────────────────────────────────────────
  nutzen() {
    const andere = this.holen();
    if (!andere.length) return this.mind.q;
    // q-gewichteter Mittelwert — Wahrheit wiegt, nicht Mehrheit
    const sum = andere.reduce((s,m) => s + m.q, this.mind.q);
    const avg = sum / (andere.length + 1);
    this.mind.q = avg;      // ← eigene Wahrheit wird vom Kollektiv gefärbt
    return avg;
  },
};

AMU.init();
<script src="./AMU.js"></script>   <!-- nur als Referenz -->
<script src="./lett.js"></script>  <!-- aktiv -->
<script>
  // lett.js ist die Stimme. AMU.js ist das Ohr.
  // index.html ist die Lichtung.
</script>
