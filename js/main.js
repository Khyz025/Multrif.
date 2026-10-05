/* ============================================================
   Multrif — main.js
   Shared JS: navbar toggle, AOS init, typing effect, scroll-reveal,
   active subtopic highlight, collapsible, progress tracker.
   ============================================================ */

/* ---------- Navbar hamburger toggle ---------- */
function initNavbar() {
  const toggle = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.navbar-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const expanded = menu.classList.contains('open');
    toggle.setAttribute('aria-expanded', expanded);
  });

  // Close menu when clicking a link (mobile)
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });
}

/* ---------- Typing effect (Beranda hero tagline) ---------- */
function initTypingEffect() {
  const el = document.getElementById('typing-tagline');
  if (!el) return;

  const text = el.dataset.text || 'Belajar HTML, CSS, & JavaScript dari nol.';
  let i = 0;
  el.textContent = '';

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 55);
    }
  }
  type();
}

/* ---------- Collapsible (audio placeholder) ---------- */
function initCollapsibles() {
  document.querySelectorAll('.collapsible-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.nextElementSibling;
      if (target && target.classList.contains('collapsible-content')) {
        target.classList.toggle('open');
      }
    });
  });
}

/* ---------- Active subtopic highlight on scroll ---------- */
function initSubtopicSpy() {
  const navLinks = document.querySelectorAll('.subtopic-nav a');
  const sections = document.querySelectorAll('.subtopic');
  if (!navLinks.length || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { rootMargin: '-130px 0px -60% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ---------- Progress tracker (sederhana, pakai localStorage) ---------- */
function getProgress() {
  try {
    return JSON.parse(localStorage.getItem('multrif-progress') || '{}');
  } catch {
    return {};
  }
}

function markMateriVisited(key) {
  const p = getProgress();
  p[key] = true;
  try {
    localStorage.setItem('multrif-progress', JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

/* ---------- Init AOS if loaded ---------- */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 80 });
  }
}

/* ---------- Run on DOM ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingEffect();
  initCollapsibles();
  initSubtopicSpy();
  initAOS();
});
