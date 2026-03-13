/* ============================================================
   UMKM Admin — Landing Page JavaScript
   ============================================================ */

// ── Navbar scroll effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Mobile menu toggle ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('a');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
  // Animate hamburger → X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ── Screenshot tabs ───────────────────────────────────────────
const tabBtns = document.querySelectorAll('.tab-btn');
const panels  = document.querySelectorAll('.screenshot-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// ── FAQ accordion ─────────────────────────────────────────────
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const q = item.querySelector('.faq-q');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all
    faqItems.forEach(i => i.classList.remove('open'));
    // Open clicked (if it wasn't open)
    if (!isOpen) item.classList.add('open');
  });
});

// ── Scroll reveal ─────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Counter animation ─────────────────────────────────────────
function animateCounter(el, target, duration = 1800) {
  const start = 0;
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target).toLocaleString('id-ID');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('id-ID');
  };
  let startTime = null;
  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el  = entry.target;
      const val = parseInt(el.dataset.count);
      animateCounter(el, val);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));
