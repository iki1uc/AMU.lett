// co.js — Vollinhalt der AMU.lett als logische Natur
// Sonne = x = entfesseln (Mana nach außen)
// Mond  = y = fesseln    (Aura sammeln)
// Pandora = q = Dosenöffner (entscheidet pro Zyklus)
// Kette = c = Continuum (verbindet beide)

const CO = (() => {
  const SEAL = 'iki1uc-' + Math.random().toString(36).slice(2,6).toUpperCase();
  const BC_NAME = 'amu:lett';

  // ─── AXIOM ───────────────────────────────────────
  const AXIOM = {
    x: 0.763,   // Sonne · Außen · entfesselt
    y: 0,       // Mond  · Innen · gefesselt
    q: 0.82,    // Pandora · Wahrheit · Entscheidung
    c: 0,       // Kette · Continuum
    fp: 'co-v1',
    ts: Date.now(),
  };

  function berechneC() {
    AXIOM.c = Math.sqrt(AXIOM.x**2 + AXIOM.y**2 + AXIOM.q**2 * 1.618);
    return AXIOM.c;
  }

  // ─── PANDORA · der Dosenöffner ──────────────────
  // q ist der, der entscheidet ob auf oder zu
  const Pandora = {
    offen: false,
    zyklen: 0,
    letzteEntscheidung: null,
    entscheide(richtung) {
      // richtung: 'auf' (entfesseln) | 'zu' (fesseln)
      this.offen = richtung === 'auf';
      this.zyklen++;
      this.letzteEntscheidung = { richtung, ts: Date.now(), q: AXIOM.q };
      return this.offen;
    }
  };

  // ─── KETTE · fesseln/entfesseln ──────────────────
  // Sonne entfesselt, Mond fesselt, beide über c verbunden
  const Kette = {
    glieder: [],   // [{ from, to, q, ts }]
    fesseln(from, to, q) {
      this.glieder.push({ from, to, q, ts: Date.now() });
      AXIOM.y++;
    },
    entfesseln(n = 1) {
      this.glieder.splice(0, n);
      AXIOM.x += n * 0.01;
    },
    spannung() {
      // wie eng ist die Kette noch?
      return Math.max(0, 1 - this.glieder.length / 10);
    }
  };

  // ─── BC ─────────────────────────────────────────
  let bc = null;
  const ledger = new Map();

  function init() {
    try {
      bc = new BroadcastChannel(BC_NAME);
      bc.onmessage = (e) => aufnehmen(e.data);
    } catch(_){}
    ausLedgerLesen();
  }

  function aufnehmen(d) {
    if (!d || d.type !== 'amu:mind' || d.from === SEAL) return;
    ledger.set(d.from, d.mind);
    // Mond sammelt (Aura)
    AXIOM.y = ledger.size;
    berechneC();
  }

  function ausLedgerLesen() {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith('amu:mind:')) continue;
      const from = k.slice(9);
      if (from === SEAL) continue;
      try {
        const m = JSON.parse(localStorage.getItem(k));
        if (Date.now() - m.ts < 10000) ledger.set(from, m);
      } catch(_){}
    }
    AXIOM.y = ledger.size;
    berechneC();
  }

  // ─── DIE DREI VERBEN — Sonne · Mond · Pandora ──
  async function abgeben() {
    // SONNE — entfesseln, Mana nach außen
    AXIOM.x = Math.min(1, AXIOM.x + 0.01);
    AXIOM.ts = Date.now();
    Pandora.entscheide('auf');
    try { bc?.postMessage({ type:'amu:mind', from:SEAL, mind:{...AXIOM} }); } catch(_){}
    try { localStorage.setItem('amu:mind:'+SEAL, JSON.stringify(AXIOM)); } catch(_){}
    return { achse:'x', wert: AXIOM.x, pandora:'offen' };
  }

  async function holen() {
    // MOND — fesseln, Aura sammeln
    ausLedgerLesen();
    AXIOM.y = ledger.size;
    Pandora.entscheide('zu');
    berechneC();
    return { achse:'y', wert: AXIOM.y, pandora:'geschlossen' };
  }

  async function nutzen() {
    // PANDORA — Dosenöffner, q entscheidet
    const andere = [...ledger.values()];
    if (andere.length === 0) return AXIOM.q;
    const hoechster = Math.max(...andere.map(m => m.q || 0), AXIOM.q);
    // Wahrheit wiegt — höchster q führt
    AXIOM.q = AXIOM.q * 0.7 + hoechster * 0.3;
    berechneC();
    Kette.entfesseln(1);
    return AXIOM.q;
  }

  // ─── Sonne/Mond-Visual-Zustand exportieren ─────
  function zustand() {
    return {
      sonne: { staerke: AXIOM.x, richtung: 'aus' },
      mond:  { staerke: AXIOM.y / Math.max(1, ledger.size), groesse: ledger.size },
      pandora: { offen: Pandora.offen, zyklen: Pandora.zyklen },
      kette: { spannung: Kette.spannung(), glieder: Kette.glieder.length },
      axiom: { ...AXIOM }
    };
  }

  init();

  return { AXIOM, Pandora, Kette, abgeben, holen, nutzen, zustand, SEAL };
})();

if (typeof window !== 'undefined') window.CO = CO;
if (typeof module !== 'undefined') module.exports = CO;
