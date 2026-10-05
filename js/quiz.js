/* ============================================================
   Multrif — quiz.js
   Mesin kuis reusable (pilihan ganda, feedback instan, skor).
   Dipakai oleh kuis mini per-materi DAN evaluasi akhir.
   ============================================================ */

/**
 * @typedef {Object} QuizQuestion
 * @property {string}   question  — teks pertanyaan
 * @property {string[]} options   — array 4 pilihan
 * @property {number}   answer    — index jawaban benar (0-3)
 * @property {string}   explain  — penjelasan feedback
 */

/**
 * Render kuis mini (instan feedback per soal).
 * @param {string}      containerId — id elemen pembungkus
 * @param {QuizQuestion[]} questions
 */
function renderMiniQuiz(containerId, questions) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Gerbang mulai: soal tidak langsung tampil saat halaman dibuka
  container.innerHTML = `
    <div class="quiz-intro card">
      <p class="intro-text">Ada ${questions.length} soal singkat di bagian ini. Pilih jawabanmu satu per satu, feedback-nya langsung muncul.</p>
      <button class="btn btn-primary" id="${containerId}-start"><i data-lucide="play"></i> Mulai Latihan</button>
    </div>
  `;
  if (typeof lucide !== 'undefined') lucide.createIcons();

  document.getElementById(`${containerId}-start`).addEventListener('click', () => {
    buildMiniQuizQuestions(containerId, questions);
  });
}

function buildMiniQuizQuestions(containerId, questions) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  let score = 0;

  questions.forEach((q, qIdx) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'quiz-question';
    qDiv.innerHTML = `
      <div class="q-num">Soal ${qIdx + 1} dari ${questions.length}</div>
      <div class="q-text">${q.question}</div>
      <div class="quiz-options"></div>
      <div class="quiz-feedback"></div>
    `;
    container.appendChild(qDiv);

    const optWrap = qDiv.querySelector('.quiz-options');
    const feedback = qDiv.querySelector('.quiz-feedback');

    q.options.forEach((opt, oIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.innerHTML = `<span class="opt-label">${String.fromCharCode(65 + oIdx)}</span><span>${opt}</span>`;
      btn.addEventListener('click', () => {
        // Disable all options in this question
        optWrap.querySelectorAll('.quiz-option').forEach((o) => o.classList.add('disabled'));

        if (oIdx === q.answer) {
          btn.classList.add('correct');
          feedback.className = 'quiz-feedback show correct';
          feedback.innerHTML = 'Benar! ' + q.explain;
          score++;
        } else {
          btn.classList.add('incorrect');
          // Tandai jawaban benar
          const correctBtn = optWrap.children[q.answer];
          if (correctBtn) correctBtn.classList.add('correct');
          feedback.className = 'quiz-feedback show incorrect';
          feedback.innerHTML = 'Hampir tepat, coba tinjau lagi ya! ' + q.explain;
        }
        updateMiniScore();
      });
      optWrap.appendChild(btn);
    });
  });

  // Score display
  const scoreDiv = document.createElement('div');
  scoreDiv.className = 'quiz-score';
  scoreDiv.id = containerId + '-score';
  scoreDiv.innerHTML = `<p class="score-num">0 / ${questions.length}</p><p>Skor sementara</p>`;
  container.appendChild(scoreDiv);

  function updateMiniScore() {
    const el = document.getElementById(containerId + '-score');
    if (el) el.querySelector('.score-num').textContent = `${score} / ${questions.length}`;
  }
}

/* ---------- Evaluasi akhir (navigasi soal, progress bar, hasil) ---------- */

/**
 * Render evaluasi akhir dengan navigasi soal & hasil akhir.
 * @param {string}      containerId
 * @param {QuizQuestion[]} questions — 15 soal
 * @param {string[]}     topics — topik per soal ('HTML'|'CSS'|'JS') untuk rekomendasi
 */
function renderEval(containerId, questions, topics) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let current = 0;
  let answers = new Array(questions.length).fill(null);

  // Gerbang mulai: soal tidak langsung tampil saat halaman dibuka
  container.innerHTML = `
    <div class="eval-intro card" data-aos="fade-up">
      <h3 style="margin-bottom:0.75rem;"><i data-lucide="clipboard-list" style="vertical-align:middle;color:var(--color-primary);"></i> Siap Memulai Evaluasi?</h3>
      <p class="intro-text">Evaluasi ini terdiri dari ${questions.length} soal pilihan ganda yang mencakup materi HTML, CSS, dan JavaScript. Jawab setiap soal satu per satu, dan hasil akhirnya baru muncul setelah soal terakhir dijawab.</p>
      <button class="btn btn-primary" id="eval-start"><i data-lucide="play"></i> Mulai Evaluasi</button>
    </div>
  `;
  if (typeof lucide !== 'undefined') lucide.createIcons();
  document.getElementById('eval-start').addEventListener('click', startEval);

  function startEval() {
    container.innerHTML = `
      <div class="eval-progress-wrap">
        <div class="eval-progress-bar"><div class="eval-progress-fill" id="eval-progress-fill"></div></div>
        <div class="eval-progress-label">
          <span id="eval-progress-text">Soal 1 dari ${questions.length}</span>
          <span id="eval-answered-count">0 terjawab</span>
        </div>
      </div>
      <div id="eval-question-area"></div>
      <div class="eval-nav">
        <button class="btn btn-outline" id="eval-prev">‹ Sebelumnya</button>
        <span class="eval-question-counter" id="eval-counter">1 / ${questions.length}</span>
        <button class="btn btn-primary" id="eval-next">Berikutnya ›</button>
      </div>
    `;
    bindEvalUI();
    renderQuestion();
    updateProgress();
  }

  let qArea, prevBtn, nextBtn, counter, progressFill, progressText, answeredCount;

  function bindEvalUI() {
    qArea = document.getElementById('eval-question-area');
    prevBtn = document.getElementById('eval-prev');
    nextBtn = document.getElementById('eval-next');
    counter = document.getElementById('eval-counter');
    progressFill = document.getElementById('eval-progress-fill');
    progressText = document.getElementById('eval-progress-text');
    answeredCount = document.getElementById('eval-answered-count');

    prevBtn.addEventListener('click', () => {
      if (current > 0) { current--; renderQuestion(); updateProgress(); }
    });

    nextBtn.addEventListener('click', () => {
      if (current < questions.length - 1) {
        current++;
        renderQuestion();
        updateProgress();
      } else {
        showHasil();
      }
    });
  }

  function renderQuestion() {
    const q = questions[current];
    qArea.innerHTML = `
      <div class="quiz-question">
        <div class="q-num">Soal ${current + 1}</div>
        <div class="q-text">${q.question}</div>
        <div class="quiz-options"></div>
        <div class="quiz-feedback" id="eval-feedback-${current}"></div>
      </div>
    `;

    const optWrap = qArea.querySelector('.quiz-options');
    const feedback = qArea.querySelector('.quiz-feedback');

    q.options.forEach((opt, oIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      if (answers[current] !== null) btn.classList.add('disabled');
      if (answers[current] === oIdx) btn.classList.add('selected');
      btn.innerHTML = `<span class="opt-label">${String.fromCharCode(65 + oIdx)}</span><span>${opt}</span>`;
      btn.addEventListener('click', () => {
        if (answers[current] !== null) return; // sudah dijawab
        answers[current] = oIdx;
        optWrap.querySelectorAll('.quiz-option').forEach((o) => o.classList.add('disabled'));
        btn.classList.add('selected');

        if (oIdx === q.answer) {
          btn.classList.add('correct');
          feedback.className = 'quiz-feedback show correct';
          feedback.innerHTML = 'Benar! ' + q.explain;
        } else {
          btn.classList.add('incorrect');
          const correctBtn = optWrap.children[q.answer];
          if (correctBtn) correctBtn.classList.add('correct');
          feedback.className = 'quiz-feedback show incorrect';
          feedback.innerHTML = 'Hampir tepat, coba tinjau lagi ya! ' + q.explain;
        }
        updateProgress();
      });
      optWrap.appendChild(btn);
    });

    // Restore feedback if already answered
    if (answers[current] !== null) {
      if (answers[current] === q.answer) {
        feedback.className = 'quiz-feedback show correct';
        feedback.innerHTML = 'Benar! ' + q.explain;
      } else {
        feedback.className = 'quiz-feedback show incorrect';
        feedback.innerHTML = 'Hampir tepat, coba tinjau lagi ya! ' + q.explain;
      }
    }

    counter.textContent = `${current + 1} / ${questions.length}`;
    progressText.textContent = `Soal ${current + 1} dari ${questions.length}`;
    prevBtn.style.visibility = current === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = current === questions.length - 1 ? 'Lihat Hasil' : 'Berikutnya ›';
  }

  function updateProgress() {
    const pct = ((current + 1) / questions.length) * 100;
    progressFill.style.width = pct + '%';
    const answered = answers.filter((a) => a !== null).length;
    answeredCount.textContent = `${answered} terjawab`;
  }

  function showHasil() {
    let benar = 0;
    const topicWrong = { HTML: 0, CSS: 0, JS: 0 };

    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        benar++;
      } else {
        const t = topics[idx];
        if (topicWrong[t] !== undefined) topicWrong[t]++;
      }
    });

    const salah = questions.length - benar;
    const nilai = Math.round((benar / questions.length) * 100);

    let kategori, kategoriClass, feedbackText;
    if (nilai >= 85) {
      kategori = 'Sangat Baik';
      kategoriClass = 'background: var(--color-success-light); color: var(--color-success);';
      feedbackText = 'Luar biasa! Kamu menunjukkan pemahaman yang sangat baik terhadap HTML, CSS, dan JavaScript. Kamu bisa lanjut ke materi lanjutan atau mencoba membangun halaman web sederhana secara mandiri.';
    } else if (nilai >= 70) {
      kategori = 'Baik';
      kategoriClass = 'background: var(--color-primary-light); color: var(--color-primary);';
      feedbackText = 'Kerja bagus! Pemahamanmu terhadap materi sudah cukup solid. Ada beberapa bagian yang masih bisa diperkuat, coba tinjau kembali soal yang belum terjawab benar.';
    } else if (nilai >= 55) {
      kategori = 'Cukup';
      kategoriClass = 'background: var(--color-warning-light); color: var(--color-warning);';
      feedbackText = 'Kamu sudah memahami sebagian besar konsep dasar, namun beberapa bagian penting masih perlu diperkuat. Disarankan meninjau kembali materi terkait sebelum melanjutkan.';
    } else {
      kategori = 'Perlu Mengulang';
      kategoriClass = 'background: var(--color-error-light); color: var(--color-error);';
      feedbackText = 'Sepertinya beberapa konsep dasar masih perlu dipelajari kembali. Jangan berkecil hati, ulangi dulu materi yang direkomendasikan di bawah ini, lalu coba lagi evaluasinya.';
    }

    // Rekomendasi: materi yang paling banyak salah
    let rekomendasiHtml = '';
    const sortedTopics = Object.entries(topicWrong).sort((a, b) => b[1] - a[1]);
    const topWrong = sortedTopics[0];
    if (topWrong && topWrong[1] > 0) {
      rekomendasiHtml = `
        <div class="hasil-rekomendasi">
          <h4>Rekomendasi Pengulangan</h4>
          <p>Kamu paling banyak salah di materi <strong>${topWrong[0]}</strong> (${topWrong[1]} soal salah).
          Saran: ulangi materi ${topWrong[0]} dulu ya, lalu coba evaluasi lagi.</p>
        </div>
      `;
    } else {
      rekomendasiHtml = `
        <div class="hasil-rekomendasi">
          <h4>Rekomendasi Pengulangan</h4>
          <p>Hebat! Kamu menjawab semua materi dengan benar. Tetap semangat belajar!</p>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="hasil-card" data-aos="fade-up">
        <h3>Hasil Evaluasi</h3>
        <div class="hasil-score" id="hasil-score-num">${nilai}</div>
        <div class="hasil-category" style="${kategoriClass}">${kategori}</div>
        <p class="hasil-feedback">${feedbackText}</p>
        <div class="hasil-stats">
          <div class="hasil-stat">
            <div class="stat-num" style="color: var(--color-success)">${benar}</div>
            <div class="stat-label">Benar</div>
          </div>
          <div class="hasil-stat">
            <div class="stat-num" style="color: var(--color-error)">${salah}</div>
            <div class="stat-label">Salah</div>
          </div>
          <div class="hasil-stat">
            <div class="stat-num" style="color: var(--color-primary)">${nilai}%</div>
            <div class="stat-label">Persentase</div>
          </div>
        </div>
        ${rekomendasiHtml}
        <div class="hasil-actions">
          <button class="btn btn-primary" onclick="location.reload()"><i data-lucide="rotate-ccw"></i> Ulangi Kuis</button>
          <a href="materi.html" class="btn btn-outline"><i data-lucide="book-open"></i> Kembali ke Materi</a>
          <a href="index.html" class="btn btn-ghost"><i data-lucide="check-circle"></i> Selesai</a>
        </div>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Confetti untuk nilai bagus
    if (nilai >= 85) {
      launchConfetti();
    }

    // Animate score number
    setTimeout(() => {
      const numEl = document.getElementById('hasil-score-num');
      if (numEl) {
        let n = 0;
        const target = nilai;
        const interval = setInterval(() => {
          n += Math.ceil(target / 30);
          if (n >= target) { n = target; clearInterval(interval); }
          numEl.textContent = n;
        }, 30);
      }
    }, 100);
  }

  function launchConfetti() {
    const colors = ['#4f46e5', '#14b8a6', '#f59e0b', '#16a34a', '#dc2626'];
    for (let i = 0; i < 50; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 1 + 's';
      piece.style.animationDuration = (2 + Math.random() * 2) + 's';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 5000);
    }
  }
}
