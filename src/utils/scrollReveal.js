/**
 * Scroll Reveal Utility
 * Uses IntersectionObserver to add 'revealed' class
 */
let observer = null;

export function initScrollReveal() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  // Observe all reveal elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Observe newly added elements (for dynamically rendered sections)
 */
export function observeReveal(container) {
  if (!observer) initScrollReveal();
  container.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
}
