// B&B Complex: wspólne skrypty
lucide.createIcons();

// Nagłówek: tło po przewinięciu
const header = document.getElementById('site-header');
const setHeader = () => header.classList.toggle('is-solid', window.scrollY > 40);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

// Mobilne menu
const menuBtn = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
if (menuBtn && menu) {
  const toggle = (open) => {
    menu.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    header.classList.toggle('is-solid', open || window.scrollY > 40);
  };
  menuBtn.addEventListener('click', () => toggle(!menu.classList.contains('is-open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));
}

// Pojawianie sekcji
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Dzisiejszy dzień w godzinach otwarcia
const today = new Date().getDay();
document.querySelectorAll('.hours-row').forEach((row) => {
  if (Number(row.dataset.day) === today) row.classList.add('is-today');
});

// Lightbox galerii
const lb = document.getElementById('lightbox');
if (lb) {
  const items = [...document.querySelectorAll('.gallery-item')];
  const img = lb.querySelector('img');
  let idx = 0;
  let lastFocus = null;
  const show = (i) => {
    idx = (i + items.length) % items.length;
    const src = items[idx].querySelector('img');
    img.src = src.src;
    img.alt = src.alt;
  };
  const open = (i) => {
    lastFocus = document.activeElement;
    show(i);
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  };
  const close = () => {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };
  items.forEach((el, i) => el.addEventListener('click', () => open(i)));
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
}

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
