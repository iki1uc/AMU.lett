const AMU = {
  seal: 'iki1uc-' + tabId,
  mind: { q: 0.763, fp: ownFingerprint, ts: Date.now() },
  
  abgeben() {  // post + persist
    bc.postMessage({ type: 'amu:mind', payload: this.mind });
    localStorage.setItem('amu:mind:' + this.seal, JSON.stringify(this.mind));
  },
  
  holen() {  // listen + read others
    const others = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.startsWith('amu:mind:') && k !== 'amu:mind:' + this.seal) {
        const m = JSON.parse(localStorage.getItem(k));
        if (Date.now() - m.ts < 10000) others.push(m);
      }
    }
    return others;
  },
  
  nutzen(minds) {  // q-weighted decision
    const totalQ = minds.reduce((s, m) => s + m.q, 0) + this.mind.q;
    this.mind.q = totalQ / (minds.length + 1);  // mean q
    // oder: leader = mind mit höchstem q
    return this.mind.q;
  }
};
