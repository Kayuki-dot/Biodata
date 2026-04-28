// ============================
//  SCRIPT.JS — Dzaki's Website
// ============================

// --- Tombol Rahasia & Modal ---
const secretBtn    = document.getElementById('secretBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');


if (secretBtn) {
  secretBtn.addEventListener('click', () => {
    // Efek tombol klik
    secretBtn.style.transform = 'scale(0.85) rotate(144deg)';
    setTimeout(() => {
      secretBtn.style.transform = '';
      modalOverlay.classList.add('open');
    }, 250);
  });
}

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('open');
  });
}

// Klik luar modal = tutup
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  });
}

// --- Navbar aktif scroll ---
const navLinks = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top    = sec.offsetTop - 90;
    const height = sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.borderColor = '';
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.borderColor = 'var(--teal)';
      link.style.color = 'var(--teal)';
    }
  });
});

// --- Animasi masuk elemen saat scroll (Intersection Observer) ---
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elemen yang diobservasi
const animEls = document.querySelectorAll('.card, .book-card, .hobi-item');
animEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  observer.observe(el);
});

// --- Easter egg: ketik "dzaki" untuk efek konfeti teks ---
let typed = '';
document.addEventListener('keydown', (e) => {
  typed += e.key.toLowerCase();
  if (typed.includes('dzaki')) {
    typed = '';
    showEasterEgg();
  }
  if (typed.length > 20) typed = '';
});

function showEasterEgg() {
  const emojis = ['⚡', '🤖', '📚', '✨', '🎨', '💻'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `
      position: fixed;
      font-size: ${Math.random() * 24 + 16}px;
      left: ${Math.random() * 100}vw;
      top: -50px;
      z-index: 9999;
      pointer-events: none;
      animation: dropDown 1.8s ease forwards;
      animation-delay: ${Math.random() * 0.6}s;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }

  // Inject animasi kalau belum ada
  if (!document.getElementById('easterStyle')) {
    const style = document.createElement('style');
    style.id = 'easterStyle';
    style.textContent = `
      @keyframes dropDown {
        0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
        80%  { opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// --- Smooth Anchor scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
