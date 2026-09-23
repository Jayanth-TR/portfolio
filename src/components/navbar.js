/**
 * Navigation Component
 * - Desktop: Sticky top navbar with active section indicators
 * - Mobile: Sleek Floating Bottom Glass Dock (modern native-app style) replacing the hamburger menu
 * - Active section highlighting via IntersectionObserver
 * - Smooth scroll on click
 */

const NAV_LINKS = [
  {
    label: 'Home',
    desktopLabel: 'Home',
    href: '#home',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
  },
  {
    label: 'About',
    desktopLabel: 'About',
    href: '#about',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>`
  },
  {
    label: 'Skills',
    desktopLabel: 'Skills',
    href: '#skills',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`
  },
  {
    label: 'Exp',
    desktopLabel: 'Experience',
    href: '#experience',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
  },
  {
    label: 'Work',
    desktopLabel: 'Projects',
    href: '#projects',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`
  },
  {
    label: 'Contact',
    desktopLabel: 'Contact',
    href: '#contact',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
  },
];

export function createNavbar() {
  const wrapper = document.createElement('div');
  wrapper.id = 'nav-wrapper';
  wrapper.innerHTML = `
    <!-- Top Bar -->
    <nav id="navbar">
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
              <a href="${l.href}" class="nav-link" role="menuitem" data-section="${l.href.slice(1)}">${l.desktopLabel || l.label}</a>
            </li>
          `).join('')}
        </ul>

        <div class="nav-actions">
          <a href="#contact" class="btn btn-primary btn-sm nav-cta" id="nav-cta">Hire Me</a>
        </div>
      </div>
    </nav>

    <!-- Mobile Floating Bottom Dock -->
    <nav class="mobile-dock" id="mobile-dock" aria-label="Mobile Navigation">
      ${NAV_LINKS.map(l => `
        <a href="${l.href}" class="mobile-dock-item" data-section="${l.href.slice(1)}" aria-label="${l.desktopLabel}">
          <span class="dock-icon">${l.icon}</span>
          <span class="dock-label">${l.label}</span>
        </a>
      `).join('')}
    </nav>
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
      justify-content: space-between;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      transition: opacity var(--transition-fast);
      text-decoration: none;
    }
    .nav-logo:hover { opacity: 0.85; }

    .nav-logo-text {
      display: flex;
      flex-direction: column;
      gap: 5px;
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
      font-size: 0.65rem;
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
      list-style: none;
    }

    .nav-link {
      position: relative;
      padding: var(--space-2) var(--space-3);
      font-size: var(--fs-sm);
      font-weight: var(--fw-medium);
      letter-spacing: 0.02em;
      color: var(--text-secondary);
      border-radius: var(--radius-sm);
      text-decoration: none;
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
    }

    /* ─── Mobile Floating Bottom Dock ──────────────────────── */
    .mobile-dock {
      display: none;
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none !important;
      }

      .nav-container {
        padding: 0 var(--space-4);
      }

      .nav-cta {
        padding: 0.45rem 0.95rem;
        font-size: var(--fs-xs);
      }

      .mobile-dock {
        display: flex;
        position: fixed;
        bottom: max(14px, env(safe-area-inset-bottom, 14px));
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        background: rgba(13, 18, 32, 0.88);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(245, 158, 11, 0.22);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65), 0 0 25px rgba(245, 158, 11, 0.15);
        border-radius: 9999px;
        padding: 5px 8px;
        gap: 3px;
        width: min(calc(100% - 24px), 430px);
        justify-content: space-around;
        align-items: center;
      }

      .mobile-dock-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        padding: 6px 4px;
        border-radius: 9999px;
        color: var(--text-secondary);
        text-decoration: none;
        transition: all var(--transition-fast);
        flex: 1;
        min-width: 0;
        position: relative;
      }

      .mobile-dock-item .dock-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
        transition: transform var(--transition-fast), color var(--transition-fast);
      }

      .mobile-dock-item .dock-label {
        font-size: 0.625rem;
        font-weight: var(--fw-medium);
        letter-spacing: 0.02em;
        white-space: nowrap;
        line-height: 1;
        transition: color var(--transition-fast);
      }

      .mobile-dock-item:hover,
      .mobile-dock-item.active {
        color: var(--accent-blue);
      }

      .mobile-dock-item.active {
        background: rgba(245, 158, 11, 0.12);
      }

      .mobile-dock-item.active .dock-icon {
        color: var(--accent-blue);
        transform: translateY(-1px) scale(1.1);
      }

      .mobile-dock-item.active .dock-label {
        color: var(--accent-blue);
        font-weight: var(--fw-bold);
      }
    }
  `;
  document.head.appendChild(style);

  return wrapper;
}

export function initNavbar() {
  // Scroll effect on top navbar
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Active section detection
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link[data-section]');
  const dockLinks = document.querySelectorAll('.mobile-dock-item[data-section]');

  // Initialize Home as active
  const initialHomeDesktop = document.querySelector('.nav-link[data-section="home"]');
  const initialHomeDock = document.querySelector('.mobile-dock-item[data-section="home"]');
  if (initialHomeDesktop) initialHomeDesktop.classList.add('active');
  if (initialHomeDock) initialHomeDock.classList.add('active');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          desktopLinks.forEach(l => l.classList.remove('active'));
          dockLinks.forEach(l => l.classList.remove('active'));

          const activeDesktop = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
          const activeDock = document.querySelector(`.mobile-dock-item[data-section="${entry.target.id}"]`);

          if (activeDesktop) activeDesktop.classList.add('active');
          if (activeDock) activeDock.classList.add('active');
        }
      });
    },
    { rootMargin: '-60px 0px -50% 0px' }
  );

  sections.forEach(s => observer.observe(s));
}
