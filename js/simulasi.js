/* ============================================================
   Multrif — simulasi.js
   Komponen simulasi kode live (HTML/CSS editor + JS demo).
   ============================================================ */

/* ---------- Simulasi HTML (editor + iframe preview) ---------- */
function initSimulasiHTML() {
  const htmlEditor = document.getElementById('html-editor');
  const preview = document.getElementById('html-preview');
  const runBtn = document.getElementById('html-run');
  if (!htmlEditor || !preview) return;

  const defaultHTML = `<h1>Judul Contoh</h1>
<p>Halo! Coba ubah kode ini ya.</p>
<button>Klik aku</button>`;

  htmlEditor.value = defaultHTML;

  function updatePreview() {
    preview.srcdoc = htmlEditor.value;
  }

  // Live update saat mengetik
  htmlEditor.addEventListener('input', updatePreview);
  if (runBtn) runBtn.addEventListener('click', updatePreview);

  updatePreview();
}

/* ---------- Simulasi CSS (editor HTML + editor CSS + iframe) ---------- */
function initSimulasiCSS() {
  const htmlEditor = document.getElementById('css-html-editor');
  const cssEditor = document.getElementById('css-editor');
  const preview = document.getElementById('css-preview');
  const runBtn = document.getElementById('css-run');
  if (!htmlEditor || !cssEditor || !preview) return;

  const defaultHTML = `<h1>Judul Contoh</h1>
<p>Teks paragraf di sini.</p>
<div class="kotak">Kotak berwarna</div>`;

  const defaultCSS = `body { font-family: sans-serif; padding: 1rem; }
h1 { color: #4f46e5; }
.kotak {
  background: #14b8a6;
  color: white;
  padding: 1rem;
  border-radius: 8px;
}`;

  htmlEditor.value = defaultHTML;
  cssEditor.value = defaultCSS;

  function updatePreview() {
    const doc = `<html><head><style>${cssEditor.value}</style></head><body>${htmlEditor.value}</body></html>`;
    preview.srcdoc = doc;
  }

  htmlEditor.addEventListener('input', updatePreview);
  cssEditor.addEventListener('input', updatePreview);
  if (runBtn) runBtn.addEventListener('click', updatePreview);

  updatePreview();
}

/* ---------- Simulasi JavaScript (tombol demo + output) ---------- */
function initSimulasiJS() {
  const demoText = document.getElementById('demo-text');
  const demoBox = document.getElementById('demo-box');
  if (!demoText || !demoBox) return;

  // Tombol: Ubah Teks
  const btnText = document.getElementById('js-btn-text');
  if (btnText) {
    btnText.addEventListener('click', () => {
      const texts = ['Halo, dunia!', 'Sedang belajar JavaScript', 'Teks berubah!', 'Klik lagi ya'];
      const random = texts[Math.floor(Math.random() * texts.length)];
      demoText.textContent = random;
    });
  }

  // Tombol: Ubah Warna
  const btnColor = document.getElementById('js-btn-color');
  if (btnColor) {
    btnColor.addEventListener('click', () => {
      const colors = ['#4f46e5', '#14b8a6', '#f59e0b', '#16a34a', '#dc2626'];
      const random = colors[Math.floor(Math.random() * colors.length)];
      demoBox.style.background = random;
      demoBox.style.color = '#fff';
    });
  }

  // Tombol: Tampilkan Pesan
  const btnAlert = document.getElementById('js-btn-alert');
  if (btnAlert) {
    btnAlert.addEventListener('click', () => {
      const output = document.getElementById('js-output');
      if (output) {
        const now = new Date().toLocaleTimeString('id-ID');
        output.textContent = `[${now}] Pesan dari JavaScript: tombol berhasil diklik!`;
        output.style.display = 'block';
      }
    });
  }

  // Tombol: Reset
  const btnReset = document.getElementById('js-btn-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      demoText.textContent = 'Teks awal';
      demoBox.style.background = '';
      demoBox.style.color = '';
      const output = document.getElementById('js-output');
      if (output) { output.textContent = ''; output.style.display = 'none'; }
    });
  }
}

/* ---------- Init semua simulasi saat DOM ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initSimulasiHTML();
  initSimulasiCSS();
  initSimulasiJS();
});
