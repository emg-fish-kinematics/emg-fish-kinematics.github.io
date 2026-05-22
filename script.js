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
