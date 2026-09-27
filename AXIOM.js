// AXIOM.js  — die Klammer über ZOLL, MAINBOARD, evoMIND
export const AXIOM = {
  x: (v) => ({ axis: 'außen',      value: v, weight: 1.00 }), // Target, World
  y: (v) => ({ axis: 'innen',      value: v, weight: 1.00 }), // Pool, Memory
  q: (v) => ({ axis: 'wahrheit',   value: v, weight: 1.618 }), // respo, Fixpunkt (goldener Schnitt als Gewicht)
  c: (x, y, q) => Math.sqrt(x*x + y*y + q*q),                // Continuum-Norm
  plane: (x, y, q) => ({ ebene: 'xy', wert: q }),            // Wahrheits-Ebene: projiziert auf q
};
