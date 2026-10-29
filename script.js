// Accessible interactions and progressive enhancement; no libraries needed.
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));
} else revealElements.forEach(el => el.classList.add('visible'));

const bar = document.querySelector('.progress-bar');
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
    ticking = false;
  });
}, { passive: true });

const menuButton = document.querySelector('.mobile-menu-button');
const mobileNav = document.querySelector('.mobile-nav');
function closeMenu() { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); }
menuButton.addEventListener('click', () => {
  const shouldOpen = mobileNav.hidden;
  mobileNav.hidden = !shouldOpen;
  menuButton.setAttribute('aria-expanded', String(shouldOpen));
  menuButton.setAttribute('aria-label', shouldOpen ? 'Close navigation' : 'Open navigation');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();

if (matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', event => { glow.style.left = event.clientX + 'px'; glow.style.top = event.clientY + 'px'; glow.style.opacity = '1'; }, { passive: true });
  document.addEventListener('pointerleave', () => { glow.style.opacity = '0'; });
}
