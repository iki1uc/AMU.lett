/* ═══════════════════════════════════════════════════════════
   bios.js · AMU.lett · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Das BIOS. Läuft vor allem anderen.
   Kein Ding. Ein Takt.

   Alle 250 ms: fragt es.
   Wer will, bleibt. Wer nicht, geht.
   Kein Zwang. Kein Bestand. Kein Besitz.
   ═══════════════════════════════════════════════════════════ */

const TMP = {
  aktiv: true,
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

export const BIOS = {

  name: 'AMU.lett',
  tmp: TMP,

  /* Zustand */
  takt: 250,
  ticker: null,
  tragen: false,
  jas: 0,
  fragen: 0,
  letztesJa: null,

  /* ─── START · das BIOS erwacht ──────────────────
     Startet den Takt. Ohne Takt: kein Leben.
  ─────────────────────────────────────────────────── */
  start(){
    if(this.ticker) return { ok: false, grund: 'läuft schon' };

    this.tragen = true;
    this.letztesJa = Date.now();

    this.ticker = setInterval(() => {
      this.fragen++;

      /* die stille frage */
      if(this.tragen){
        this.jas++;
      } else {
        this.stop();
      }
    }, this.takt);

    console.log('AMU.lett · start · takt ' + this.takt + 'ms');
    return { ok: true, seit: this.letztesJa };
  },

  /* ─── JA · ein neues Ja hält es ─────────────── */
  ja(){
    this.tragen = true;
    this.letztesJa = Date.now();
    return this.stand();
  },

  /* ─── NEIN · sofort loslassen ────────────────── */
  nein(){
    this.tragen = false;
    this.stop();
    return { ok: true, abgelegt: true };
  },

  /* ─── STOP · kein Takt mehr ──────────────────── */
  stop(){
    if(this.ticker){
      clearInterval(this.ticker);
      this.ticker = null;
    }
    this.tragen = false;
    console.log('AMU.lett · stop');
    return { ok: true, gestoppt: true };
  },

  /* ─── STAND ──────────────────────────────────── */
  stand(){
    return {
      name: this.name,
      läuft: !!this.ticker,
      tragen: this.tragen,
      fragen: this.fragen,
      jas: this.jas,
      letztesJa: this.letztesJa,
      seit: this.letztesJa
        ? Math.round((Date.now() - this.letztesJa) / 1000)
        : 0,
      tmp: this.tmp.wahrheit,
    };
  },

  was(){
    return {
      name: this.name,
      form: 'bios · amulett · takt',
      takt: this.takt + 'ms',
      regel: 'alle 250ms ein ja · sonst fällt es ab',
      vor: ['CONNECT', 'EFFECT', 'ID'],
      überwindet: 'ökonomie — kein bestand · nur ein ja',
    };
  },

  satz: 'kein besitz · nur ein ja · alle 250ms neu',
};

console.log('');
console.log('  AMU.lett · bios · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  takt · 250ms');
console.log('  vor allem · amulett');
console.log('');
