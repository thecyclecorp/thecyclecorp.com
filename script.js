/* ── nav state on scroll ─────────────────── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('stuck', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ── mobile menu ─────────────────────────── */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

/* ── scroll reveal ───────────────────────── */
const reveal = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      reveal.unobserve(e.target);
    }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.sec-head, .metric, .stance, .layer, .loop-note, .verts li, .channels, .promises li, .partners-grid > div, .contact-grid > *'
).forEach((el, i) => {
  el.classList.add('rv');
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  reveal.observe(el);
});

/* ── contact form ─────────────────────────
   Real submission via Formspree.
   Replace REPLACE_ID in index.html with your form ID
   (free at formspree.io). Until then it fails loudly
   rather than pretending to send.
   ──────────────────────────────────────── */
const form = document.getElementById('form');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;

  if (form.action.includes('REPLACE_ID')) {
    status.textContent = 'Form endpoint not configured yet.';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending…';
  status.textContent = '';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      form.reset();
      status.textContent = 'Message sent. We\'ll be in touch.';
    } else {
      status.textContent = 'Something went wrong. Email us directly instead.';
    }
  } catch {
    status.textContent = 'Connection failed. Email us directly instead.';
  } finally {
    btn.disabled = false;
    btn.textContent = original;
  }
});

/* ── year ─────────────────────────────────── */
const y = document.getElementById('year');
if (y) y.textContent = `© ${new Date().getFullYear()} Cycle. All rights reserved.`;
