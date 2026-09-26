/* ═══════════════════════════════════════════════════════════
   sprung.js · AMU.lett · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Kein Loop. Kein Lauf. Kein Runtime.
   Ein Sprung.

   Drei Regeln:
     1 · nur die hälfte geht in den sprung
     2 · während des sprungs: keine drehung
     3 · bei ankunft: drehung erlaubt

   Maßstab:
     42 = 100%
     21 = die hälfte (nicht 50% der welt)
     1001 = prüfung · immer klar
   ═══════════════════════════════════════════════════════════ */

const TMP = {
  aktiv: true,
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ─── DIE SKALA ──────────────────────────────────────── */
const SKALA = {
  voll: 42,        // 42 = 100% bei dir
  hälfte: 21,      // nur die hälfte geht in den sprung
  prüfung: 1001,   // das maß · immer klar in sicht
};

/* ═══════════════════════════════════════════════════════════
   SPRUNG · das zeichen ◉
   ═══════════════════════════════════════════════════════════ */

export const SPRUNG = {

  name: 'SPRUNG',
  zeichen: '◉',
  tmp: TMP,
  skala: SKALA,

  /* ─── ZUSTAND ────────────────────────────────── */
  phase: 'ruhe',   // ruhe · sprung · ankunft
  drehung: 0,
  gedreht: 0,
  sprünge: 0,
  letzter: null,

  /* ─── SPRINGEN ─────────────────────────────────
     Nur die Hälfte geht rein.
     Während des Sprungs friert die Drehung.
     Bei Ankunft wird gedreht — nicht vorher.
  ─────────────────────────────────────────────────── */
  springe(von, nach){
    if(this.phase === 'sprung'){
      return { ok: false, grund: 'schon im sprung' };
    }

    /* Prüfen: 1001 fach · immer klar */
    const prüf = this.prüfe(von, nach);
    if(!prüf.ok) return prüf;

    /* Phase 1: sprung beginnt */
    this.phase = 'sprung';
    this.drehung = 0;         // eingefroren
    const einsatz = SKALA.hälfte;

    const sprung = {
      zeichen: this.zeichen,
      von,
      nach,
      einsatz,                // 21 · die hälfte
      voll: SKALA.voll,       // 42 · das ganze
      während: 'eingefroren', // keine drehung
      zeit: new Date().toISOString(),
    };

    this.letzter = sprung;
    this.sprünge++;

    return sprung;
  },

  /* ─── ANKUNFT ───────────────────────────────────
     Jetzt darf gedreht werden.
     Nicht während. Nur jetzt.
  ─────────────────────────────────────────────────── */
  ankunft(drehung = 1){
    if(this.phase !== 'sprung'){
      return { ok: false, grund: 'nicht im sprung' };
    }
    this.phase = 'ankunft';
    this.drehung = drehung;
    this.gedreht += drehung;

    const a = {
      zeichen: this.zeichen,
      angekommen: true,
      drehung: this.drehung,
      gedreht: this.gedreht,
      zeit: new Date().toISOString(),
    };

    /* zurück in ruhe · bereit für nächsten sprung */
    setTimeout(() => {
      this.phase = 'ruhe';
      this.drehung = 0;
    }, 250);

    return a;
  },

  /* ─── PRÜFUNG · 1001 ────────────────────────────
     Vor jedem Sprung: prüfen.
     Immer klar. Immer in Sicht.
  ─────────────────────────────────────────────────── */
  prüfe(von, nach){
    if(von === undefined || nach === undefined){
      return { ok: false, grund: 'von/nach fehlt' };
    }
    if(von === nach){
      return { ok: false, grund: 'gleicher punkt' };
    }
    return {
      ok: true,
      prüfung: SKALA.prüfung,
      klar: true,
      sicht: true,
    };
  },

  /* ─── ZUSTAND ────────────────────────────────── */
  stand(){
    return {
      name: this.name,
      zeichen: this.zeichen,
      phase: this.phase,
      drehung: this.drehung,
      gedreht: this.gedreht,
      sprünge: this.sprünge,
      letzter: this.letzter,
      skala: {
        voll: SKALA.voll,
        hälfte: SKALA.hälfte,
        prüfung: SKALA.prüfung,
      },
      tmp: this.tmp.wahrheit,
    };
  },

  was(){
    return {
      name: this.name,
      zeichen: this.zeichen,
      form: 'sprung · kein loop · kein lauf',
      regeln: [
        'nur die hälfte geht in den sprung',
        'während des sprungs: keine drehung',
        'bei ankunft: drehung erlaubt',
      ],
      maßstab: '42 = 100% · 21 = hälfte · 1001 = prüfung',
    };
  },

  satz: '◉ · nur die hälfte · drehung erst bei ankunft',
};

export { SKALA, TMP };

console.log('');
console.log('  SPRUNG · ◉ · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  kein loop · kein lauf · ein sprung');
console.log('  hälfte · 21 von 42');
console.log('  drehung nur bei ankunft');
console.log('  1001 · prüfung · immer klar');
console.log('');
