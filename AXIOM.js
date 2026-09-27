// AXIOM.js  — die Klammer über ZOLL, MAINBOARD, evoMIND
export const AXIOM = {
  x: (v) => ({ axis: 'außen',      value: v, weight: 1.00 }), // Target, World
  y: (v) => ({ axis: 'innen',      value: v, weight: 1.00 }), // Pool, Memory
  q: (v) => ({ axis: 'wahrheit',   value: v, weight: 1.618 }), // respo, Fixpunkt (goldener Schnitt als Gewicht)
  c: (x, y, q) => Math.sqrt(x*x + y*y + q*q),                // Continuum-Norm
  plane: (x, y, q) => ({ ebene: 'xy', wert: q }),            // Wahrheits-Ebene: projiziert auf q
};
// FARBE AUS AXIOM
function farbeAusQ(q) {
  // q ∈ [0,1] → hue ∈ [0°, 60°]  (rot → gold)
  // nie blau, nie grün — q ist warm
  return `hsl(${q * 60}, ${70 + q * 30}%, ${40 + q * 20}%)`;
}

function farbeAusC(c) {
  // c ist Continuum — es darf kalt sein
  // c ∈ [0,∞] → hue ∈ [180°, 280°]  (cyan → violett)
  const norm = Math.min(1, c / 2);
  return `hsl(${180 + norm * 100}, 60%, 50%)`;
}
