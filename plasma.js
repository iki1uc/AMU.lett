// Plasma
const plasma = (x, y, t) => {
  let v = Math.sin(x * 0.05 + t);
  v += Math.sin(y * 0.07 + t * 1.3);
  v += Math.sin((x + y) * 0.04 + t * 0.7);
  v += Math.sin(Math.sqrt(x*x + y*y) * 0.06 + t * 1.1);
  return v / 4;
};

// Copper bar - one horizontal bar with gradient
function drawCopperBar(ctx, y, height, colors) {
  const grad = ctx.createLinearGradient(0, y - height/2, 0, y + height/2);
  colors.forEach((c, i) => grad.addColorStop(i / (colors.length-1), c));
  ctx.fillStyle = grad;
  ctx.fillRect(0, y - height/2, ctx.canvas.width, height);
}
