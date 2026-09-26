/* ═══════════════════════════════════════════════════════════
   serie.js · iki1uc · kader · amiga-scene-format
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Vierzehn stationen. Eine kette.
   Jede mit nummer. Jede mit kurz-name. Jede mit rolle.
   move ist ein befehl. keine bewegung.
   ═══════════════════════════════════════════════════════════ */

export const SERIE = [

  { n: 1,  id: 'kader',      rolle: 'das fundament',        zeichen: '◉' },
  { n: 2,  id: 'NOAH',       rolle: 'der kaiser · vier könige', zeichen: '☰' },
  { n: 3,  id: 'call.ME',    rolle: 'evoMIND · engine',     zeichen: '☎' },
  { n: 4,  id: 'AMU.lett',   rolle: 'bios · amulett · takt', zeichen: '◈' },
  { n: 5,  id: 'SPRUNG',     rolle: 'krümmung · kein loop', zeichen: '✦' },
  { n: 6,  id: 'LIVE-BRIDGE',rolle: 'präsentation · puls',  zeichen: 'φ' },
  { n: 7,  id: 'MEmory',     rolle: 'hdf · 9×9 · 81',       zeichen: '▣' },
  { n: 8,  id: 'inBOOT',     rolle: 'selbstboot · heilung', zeichen: '⚕' },
  { n: 9,  id: 'banka',      rolle: 'zustand · V=Z×T×W',    zeichen: '◎' },
  { n: 10, id: 'RAWATOR',    rolle: 'hologramm · shuffle',  zeichen: '❖' },
  { n: 11, id: 'SLI.raw',    rolle: 'schach · axiome',      zeichen: '△' },
  { n: 12, id: 'seeu',       rolle: 'sicht · 360°',         zeichen: '◎' },
  { n: 13, id: 'icyFIRE',    rolle: 'proton · neutron · elektron', zeichen: '❄' },
  { n: 14, id: 'HDF',        rolle: 'operationsachse',      zeichen: '◆' },

];

/* ─── HILFSFUNKTIONEN ─────────────────────────────── */

export function hole(n){
  return SERIE.find(s => s.n === n) || null;
}

export function kette(){
  return SERIE.map(s => s.zeichen).join(' → ');
}

export function liste(){
  return SERIE.map(s =>
    `${String(s.n).padStart(2,'0')}  ${s.zeichen}  ${s.id}`
  ).join('\n');
}

export function was(){
  return {
    anzahl: SERIE.length,
    kette: kette(),
    erster: SERIE[0].id,
    letzter: SERIE[SERIE.length-1].id,
  };
}

/* ─── AUSGABE ─────────────────────────────────────── */
console.log('');
console.log('  SERIE · iki1uc · kader');
console.log('  ─────────────────────────────────');
console.log(liste());
console.log('');
console.log('  kette · ' + kette());
console.log('  vierzehn · ein strang');
console.log('');
