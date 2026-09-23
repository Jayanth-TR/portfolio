/**
 * Sticky Navigation Component
 * - Active section highlighting via IntersectionObserver
 * - Hamburger menu for mobile
 * - Smooth scroll on click
 */

const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
];

export function createNavbar() {
  const nav = document.createElement('nav');
  nav.id = 'navbar';
  nav.innerHTML = `
    <div class="nav-container">
      <a href="#home" class="nav-logo" aria-label="Jayanth T R - Home">
        <div class="nav-logo-text">
          <span class="logo-name"><span class="logo-text">JAYANTH</span> <span class="logo-accent">T R</span></span>
          <span class="logo-role">AI Engineer</span>
        </div>
      </a>

      <ul class="nav-links" id="nav-links" role="menubar">
        ${NAV_LINKS.map(l => `
          <li role="none">
            <a href="${l.href}" class="nav-link" role="menuitem" data-section="${l.href.slice(1)}">${l.label}</a>
          </li>
        `).join('')}
      </ul>

      <div class="nav-actions">
        <a href="#contact" class="btn btn-primary btn-sm nav-cta" id="nav-cta">Hire Me</a>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  `;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: var(--nav-height);
      background: rgba(8, 12, 20, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-color);
      transition: background var(--transition-normal), box-shadow var(--transition-normal);
    }

    #navbar.scrolled {
      background: rgba(8, 12, 20, 0.95);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
    }

    .nav-container {
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 var(--space-6);
      height: 100%;
      display: flex;
      align-items: center;
      gap: var(--space-8);
    }

    .nav-logo {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      transition: opacity var(--transition-fast);
    }
    .nav-logo:hover { opacity: 0.85; }

    .nav-logo-text {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .logo-name {
      font-size: 1rem;
      font-weight: var(--fw-bold);
      letter-spacing: 0.06em;
      line-height: 1;
    }

    .logo-text  { color: var(--text-primary); }
    .logo-accent {
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .logo-role {
      font-size: 0.6rem;
      font-weight: var(--fw-medium);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--text-muted);
      line-height: 1;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: var(--space-1);
      margin-left: auto;
    }

    .nav-link {
      position: relative;
      padding: var(--space-2) var(--space-3);
      font-size: var(--fs-sm);
      font-weight: var(--fw-medium);
      letter-spacing: 0.02em;
      color: var(--text-secondary);
      border-radius: var(--radius-sm);
      transition: color var(--transition-fast), background var(--transition-fast);
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: var(--gradient-primary);
      border-radius: 2px;
      transition: width var(--transition-normal);
    }

    .nav-link:hover { color: var(--text-primary); }
    .nav-link:hover::after { width: 60%; }

    .nav-link.active {
      color: var(--accent-blue);
    }
    .nav-link.active::after { width: 60%; }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-left: var(--space-4);
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      width: 32px;
      height: 32px;
      padding: 6px;
      border-radius: var(--radius-sm);
      background: var(--bg-glass-light);
      border: 1px solid var(--border-color);
      transition: background var(--transition-fast);
    }
    .hamburger:hover { background: rgba(59, 130, 246, 0.1); }
    .hamburger span {
      display: block;
      height: 2px;
      background: var(--text-secondary);
      border-radius: 2px;
      transition: all var(--transition-normal);
    }
    .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

    @media (max-width: 768px) {
      .hamburger { display: flex; }
      .nav-cta { display: none; }

      .nav-links {
        position: fixed;
        top: var(--nav-height);
        left: 0;
        right: 0;
        flex-direction: column;
        background: rgba(8, 12, 20, 0.98);
        backdrop-filter: blur(20px);
        padding: var(--space-6);
        gap: var(--space-2);
        border-bottom: 1px solid var(--border-color);
        transform: translateY(-100%);
        opacity: 0;
        pointer-events: none;
        transition: transform var(--transition-normal), opacity var(--transition-normal);
        z-index: 999;
      }
      .nav-links.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
      }
      .nav-link {
        padding: var(--space-3) var(--space-4);
        width: 100%;
        font-size: var(--fs-base);
      }
      .nav-link::after { display: none; }
      .nav-link.active { background: var(--accent-blue-glow-sm); color: var(--accent-blue); border-radius: var(--radius-md); }
    }
  `;
  document.head.appendChild(style);

  return nav;
}

export function initNavbar() {
  // Scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    const open = !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  // Close on link click (mobile)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Active section detection
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link[data-section]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '70')}px 0px -60% 0px` }
  );

  sections.forEach(s => observer.observe(s));
}
