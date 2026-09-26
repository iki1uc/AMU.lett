(function(){
  const cv = document.getElementById('cv');
  const ctx = cv.getContext('2d');
  let W, H;
  
  function resize(){
    W = cv.width = innerWidth;
    H = cv.height = innerHeight;
  }
  resize();
  addEventListener('resize', resize);
  
  // PLASMA at low res
  const PW = 160, PH = 90;
  const plasmaCv = document.createElement('canvas');
  plasmaCv.width = PW;
  plasmaCv.height = PH;
  const pctx = plasmaCv.getContext('2d');
  const pImg = pctx.createImageData(PW, PH);
  const pData = pImg.data;
  
  // STARFIELD
  const stars = [];
  for (let i = 0; i < 300; i++){
    stars.push({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
    });
  }
  
  // COPPER BARS
  const bars = [
    { y: 0.2, speed: 0.10, colors: [0x000000, 0xff6600, 0xffcc00, 0xffffff, 0xffcc00, 0xff6600, 0x000000] },
    { y: 0.5, speed: 0.15, colors: [0x000000, 0x0066ff, 0x00ccff, 0xffffff, 0x00ccff, 0x0066ff, 0x000000] },
    { y: 0.8, speed: 0.20, colors: [0x000000, 0xcc00cc, 0xff66ff, 0xffffff, 0xff66ff, 0xcc00cc, 0x000000] },
  ];
  
  // SCROLLER
  const scrollerText = "  GREETINGS · KADER · NOAH · CALL.ME · AMU.LETT · SPRUNG · LIVE-BRIDGE · MEMORY · INBOOT · BANKA · RAWATOR · SLI.RAW · SEEU · ICYFIRE · HDF ······ iki1uc 2026 · 14 KÖRPER · 250MS TAKT ······ ";
  let scrollX = 0;
  
  // LOGO
  const logo = "evoMIND";
  
  let t = 0;
  let last = performance.now();
  let fps = 0, frames = 0, fpsLast = performance.now();
  
  function drawPlasma(t){
    for (let y = 0; y < PH; y++){
      for (let x = 0; x < PW; x++){
        const v = 
          Math.sin(x * 0.05 + t * 0.7) +
          Math.sin(y * 0.07 + t * 0.9) +
          Math.sin((x + y) * 0.04 + t * 1.1) +
          Math.sin(Math.sqrt(x*x + y*y) * 0.06 + t * 0.5);
        const idx = (y * PW + x) * 4;
        // palette - deep blue to cyan to magenta
        const n = (v + 4) / 8; // 0..1
        pData[idx]     = Math.floor(20 + n * 80);
        pData[idx + 1] = Math.floor(20 + n * 100);
        pData[idx + 2] = Math.floor(60 + n * 120);
        pData[idx + 3] = 255;
      }
    }
    pctx.putImageData(pImg, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(plasmaCv, 0, 0, W, H);
  }
  
  // ... etc
})();
