/* ═══════════════════════════════════════════════════════════
   CONNECT.js · AMU.lett · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Einzelurteil. Kein Import.

   CONNECT ist kein Scanner.
   CONNECT ist Vorbereiter.

   Prefetch · Patch · Krümmung
   Drei Funktionen. Eine Kette.
   ═══════════════════════════════════════════════════════════ */

const TMP = {
  aktiv: true,
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ─── DIE SCHICHTEN ──────────────────────────────────── */
const SCHICHT = {
  lan:      'nah · kabel · eigenes haus',
  wlan:     'fern · funk · ohne kabel',
  gate:     'tor · wo alles ein und aus geht',
  wloch:    'durchgang · die route zwischen zwei punkten',
  allxall:  'alles zu allem · nur mit einigung',
};

/* ═══════════════════════════════════════════════════════════
   CONNECT
   ═══════════════════════════════════════════════════════════ */

export const CONNECT = {

  name: 'CONNECT',
  tmp: TMP,

  /* Zustand */
  lan: true,
  wlan: true,
  gate: 'WLAN-GATE',
  wloch: 'WLOCH-ROUTE',
  allxall: 'ALLXALL-CONNECT',

  /* Vorbereitete Räume — Prefetch-Speicher */
  prefetch: new Map(),

  /* Geflickte Stellen — Patch-Buch */
  patches: [],

  /* ─── PREFETCH · raum vorbereiten ──────────────
     Nicht laden. Vorbereiten.
     Der Zielraum wird warm, bevor jemand springt.
  ─────────────────────────────────────────────────── */
  prefetch_raum(raum){
    if(!raum) return { ok: false, grund: 'kein raum' };

    const eintrag = {
      raum,
      bereit: true,
      zeit: new Date().toISOString(),
      gate: this.gate,
      wloch: this.wloch,
    };

    this.prefetch.set(raum, eintrag);

    return {
      ok: true,
      raum,
      vorbereitet: true,
      über: this.wloch,
      durch: this.gate,
    };
  },

  /* ─── IST VORBEREITET? ─────────────────────────
     Prüft, ob ein Raum schon warm ist.
     Ohne Blick ins Prefetch: kein Sprung.
  ─────────────────────────────────────────────────── */
  istBereit(raum){
    const p = this.prefetch.get(raum);
    return !!(p && p.bereit);
  },

  /* ─── PATCH · lücke flicken ────────────────────
     Nach einer Krümmung ist eine Stelle offen.
     Patch macht sie tragfähig, ohne sie zu schließen.
  ─────────────────────────────────────────────────── */
  patche(raum, stelle){
    if(!raum || !stelle){
      return { ok: false, grund: 'raum und stelle nötig' };
    }

    const patch = {
      raum,
      stelle,
      tragfähig: true,
      zeit: new Date().toISOString(),
    };

    this.patches.push(patch);
    if(this.patches.length > 100) this.patches.shift();

    return patch;
  },

  /* ─── SCAN ROOM · sehen, nicht urteilen ────────
     Was ist im Raum?
     Nicht: ist es gut?
     Sondern: was liegt?
  ─────────────────────────────────────────────────── */
  scanRoom(raum){
    return {
      raum,
      via: this.wloch,
      mode: this.allxall,
      gate: this.gate,
      bereit: this.istBereit(raum),
      geflickt: this.patches.filter(p => p.raum === raum).length,
      status: this.istBereit(raum)
        ? 'ROOM-BEREIT'
        : 'ROOM-UNVORBEREITET',
    };
  },

  /* ─── MAP PIPE · die route zwischen zwei ───────
     Kein Loch. Eine Route.
  ─────────────────────────────────────────────────── */
  mapPipe(von, nach){
    return {
      pipe: `${von}→${nach}`,
      von, nach,
      link: (this.lan && this.wlan) ? 'LAN/WLAN' : this.lan ? 'LAN' : 'WLAN',
      gate: this.gate,
      route: this.wloch,
      mode: this.allxall,
      // nur wenn BEIDE seiten vorbereitet sind
      bereit: this.istBereit(von) && this.istBereit(nach),
      status: (this.istBereit(von) && this.istBereit(nach))
        ? 'PIPE-BEREIT'
        : 'PIPE-UNVORBEREITET',
    };
  },

  /* ─── KONSTELLATION · Prefetch + Patch ─────────
     Beide zusammen.
     Nicht einzeln. Immer im Paar.
  ─────────────────────────────────────────────────── */
  konstellation(raum, stelle){
    const p = this.prefetch_raum(raum);
    const pt = this.patche(raum, stelle);
    return {
      konstellation: 'PREFETCH-PATCH',
      raum,
      prefetch: p,
      patch: pt,
      bereit_für: 'KRÜMMUNG',
      zeit: new Date().toISOString(),
    };
  },

  /* ─── SELBSTAUSKUNFT ──────────────────────────── */
  was(){
    return {
      name: this.name,
      tmp: this.tmp.wahrheit,
      form: 'vorbereiter · kein scanner',
      schichten: SCHICHT,
      prefetch: this.prefetch.size,
      patches: this.patches.length,
      regel: 'prefetch · patch · krümmung',
    };
  },

  anmerkung(){
    return `${this.tmp.wahrheit} · seit ${this.tmp.seit}`;
  },

  satz: 'vorbereiten · flicken · krümmen',
};

/* ─── KONSOLE ────────────────────────────────────────── */
console.log('');
console.log('  CONNECT · AMU.lett · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  prefetch · patch · krümmung');
console.log('  vorbereiten statt warten');
console.log('');
