/* ═══════════════════════════════════════════════════════════
   EFFECT.js · AMU.lett · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Einzelurteil. Kein Import.

   Evolution X   → puls · flash
   Evolution X²  → wirbel · blitz · implosion
   Evolution X³  → zweiSeiten · wirklichkeit
   REV           → alles zurück zu X

   Reihenfolge: UPG vor UPD vor REV
   ═══════════════════════════════════════════════════════════ */

const TMP = {
  aktiv: true,
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

export const EFFECT = {

  name: 'EFFECT',
  tmp: TMP,

  /* ─── X · die berührung ─────────────────────── */
  pulse(msg, tiefe = 0.5){
    return { msg, effect:'PULSE', stufe:'X',
             schicht:'berührung', tiefe,
             stamp: Date.now(), tmp: true };
  },

  flash(msg, dauer = 400){
    return { msg, effect:'FLASH', stufe:'X',
             schicht:'sichtbar', dauer,
             stamp: Date.now(), tmp: true };
  },

  /* ─── X² · die bewegung ─────────────────────── */
  wirbel(msg, richtung = 1, staerke = 0.5){
    return { msg, effect:'WIRBEL', stufe:'X²',
             schicht:'umlauf', richtung, staerke,
             stamp: Date.now(), tmp: true };
  },

  blitz(msg, von = null, nach = null){
    return { msg, effect:'BLITZ', stufe:'X²',
             schicht:'linie', von, nach,
             stamp: Date.now(), tmp: true };
  },

  implosion(msg, radius = 1.0){
    return { msg, effect:'IMPLOSION', stufe:'X²',
             schicht:'sammlung', richtung:'innen', radius,
             stamp: Date.now(), tmp: true };
  },

  /* ─── X³ · die deutung ──────────────────────── */
  zweiSeiten(a, b, rahmen){
    if(!rahmen) return { ok:false, grund:'ohne rahmen unsichtbar' };
    if(!a || !b) return { ok:false, grund:'beide seiten nötig' };
    if(a === b)  return { ok:false, grund:'eine seite ist keine zweiheit' };
    return { ok:true,
             a:{ name:a, rolle:'erste seite' },
             b:{ name:b, rolle:'zweite seite' },
             rahmen, sichtbar:true, bleibt:false,
             gemeinsam:'beide nicht auf normalen wegen erreichbar',
             stufe:'X³', zeit: Date.now() };
  },

  wirklichkeit(gesehen, gedeutet){
    if(!gesehen) return { ok:false, grund:'nichts gesehen' };
    return { gesehen, gedeutet: gedeutet || null,
             wirklichkeit_war: gesehen,
             wirklichkeit_wird: gedeutet || gesehen,
             wahl: gedeutet ? 'gedeutet' : 'ungedeutet',
             stufe:'X³', zeit: Date.now() };
  },

  /* ─── REV · die rückführung ─────────────────── */
  rev(effect){
    if(!effect || typeof effect !== 'object') return null;
    return { ...effect,
             rev: true,
             zurück_zu: 'X',
             zeit: Date.now() };
  },

  /* ─── EIN GANZER FALL · X → X² → X³ → REV ───── */
  fällt(msg){
    const stufen = [
      this.pulse(msg, 0.2),
      this.flash(msg, 300),
      this.wirbel(msg, +1, 0.4),
      this.blitz(msg, 'oben', 'mitte'),
      this.implosion(msg, 1.0),
    ];
    return { msg, stufen, tmp:true,
             anfang: Date.now(), ende: Date.now(),
             reihenfolge: 'UPG · UPD · REV' };
  },

  was(){
    return {
      name: this.name,
      tmp: this.tmp.wahrheit,
      form: 'einzelurteil · keine imports',
      stufen: {
        X:  ['pulse', 'flash'],
        X²: ['wirbel', 'blitz', 'implosion'],
        X³: ['zweiSeiten', 'wirklichkeit'],
        REV:['rev', 'fällt'],
      },
      regel: 'UPG vor UPD vor REV',
      satz: 'wirkung ist keine gewalt · wirkung ist ein rahmen',
    };
  },

  satz: 'X → X² → X³ → REV · UPG vor UPD vor REV',
};

console.log('');
console.log('  EFFECT · AMU.lett · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  X  · pulse · flash');
console.log('  X² · wirbel · blitz · implosion');
console.log('  X³ · zweiSeiten · wirklichkeit');
console.log('  REV · rückführung');
console.log('  UPG vor UPD vor REV');
console.log('');
