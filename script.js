const tabs = document.querySelector('[data-tabs]');
if (tabs) {
  tabs.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      tabs.querySelectorAll('[data-tab]').forEach((b) => b.classList.remove('active'));
      tabs.querySelectorAll('[data-panel]').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      tabs.querySelector(`[data-panel="${btn.dataset.tab}"]`).classList.add('active');
    });
  });
}

const copyButton = document.getElementById('copyBib');
if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const text = document.getElementById('bibtexBlock').innerText;
    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = 'Copied!';
      setTimeout(() => (copyButton.textContent = 'Copy BibTeX'), 1400);
    } catch (err) {
      copyButton.textContent = 'Select text to copy';
    }
  });
}

const canvas = document.getElementById('accuracyChart');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const labels = ['G1','G2','G3','G4','G5','G6','G7','G8'];
  const values = [58.58, 65.53, 76.92, 78.49, 81.53, 80.57, 85.73, 39.09];
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0,0,w,h);
  ctx.font = '18px system-ui, sans-serif';
  ctx.fillStyle = '#0d1b2a';
  ctx.fillText('Generalized classifier accuracy by channel group', 36, 42);
  const left = 64, top = 72, bottom = h - 58, right = w - 36;
  const maxVal = 100;
  ctx.strokeStyle = '#d9e5ef';
  ctx.lineWidth = 1;
  for (let i=0;i<=5;i++) {
    const y = bottom - (bottom-top) * (i*20/maxVal);
    ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(right, y); ctx.stroke();
    ctx.fillStyle = '#506075'; ctx.font = '13px system-ui, sans-serif';
    ctx.fillText(`${i*20}%`, 18, y+4);
  }
  const gap = 18;
  const barW = (right-left - gap*(values.length-1)) / values.length;
  values.forEach((v, i) => {
    const x = left + i*(barW+gap);
    const y = bottom - (bottom-top) * (v/maxVal);
    const grd = ctx.createLinearGradient(0, y, 0, bottom);
    grd.addColorStop(0, '#2563eb');
    grd.addColorStop(1, '#1f9aa5');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, bottom-y, 8);
    ctx.fill();
    ctx.fillStyle = '#0d1b2a';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText(labels[i], x + barW/2 - 10, bottom + 25);
    ctx.fillText(v.toFixed(1), x + barW/2 - 18, y - 8);
  });
}
