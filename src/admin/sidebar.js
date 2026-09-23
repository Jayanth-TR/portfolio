import { authService } from '../services/authService.js';

export function createAdminSidebar(activePage = 'dashboard') {
  const nav = document.createElement('aside');
  nav.className = 'admin-sidebar';
  nav.id = 'admin-sidebar';

  const links = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', page: 'dashboard' },
    { id: 'projects', icon: '🗂️', label: 'Projects', page: 'projects' },
    { id: 'add-project', icon: '➕', label: 'Add Project', page: 'add-project' },
    { id: 'skills', icon: '⚡', label: 'Skills', page: 'skills' },
    { id: 'experience', icon: '💼', label: 'Experience', page: 'experience' },
    { id: 'messages', icon: '💬', label: 'Messages', page: 'messages' },
  ];

  nav.innerHTML = `
    <div class="admin-sidebar__brand">
      <span class="admin-sidebar__logo">JTR</span>
      <div>
        <div class="admin-sidebar__title">Admin Panel</div>
        <div class="admin-sidebar__sub">Portfolio Manager</div>
      </div>
    </div>

    <nav class="admin-sidebar__nav" aria-label="Admin navigation">
      ${links.map(l => `
        <button class="admin-nav-link ${l.page === activePage ? 'active' : ''}"
                data-page="${l.page}" id="admin-nav-${l.id}" type="button">
          <span class="admin-nav-link__icon">${l.icon}</span>
          <span>${l.label}</span>
        </button>
      `).join('')}
    </nav>

    <div class="admin-sidebar__footer">
      <a href="#home" class="admin-nav-link" id="admin-nav-portfolio">
        <span class="admin-nav-link__icon">🌐</span>
        <span>View Portfolio</span>
      </a>
      <button class="admin-nav-link admin-nav-link--danger" id="admin-logout" type="button">
        <span class="admin-nav-link__icon">🚪</span>
        <span>Logout</span>
      </button>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .admin-sidebar {
      width: 240px;
      min-height: 100vh;
      background: var(--bg-secondary);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
    }

    .admin-sidebar__brand {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-6) var(--space-5);
      border-bottom: 1px solid var(--border-color);
    }

    .admin-sidebar__logo {
      width: 40px;
      height: 40px;
      background: var(--gradient-primary);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: var(--fw-black);
      font-size: var(--fs-sm);
      color: white;
      flex-shrink: 0;
      font-family: var(--font-mono);
    }

    .admin-sidebar__title {
      font-size: var(--fs-sm);
      font-weight: var(--fw-bold);
      color: var(--text-primary);
    }

    .admin-sidebar__sub {
      font-size: var(--fs-xs);
      color: var(--text-muted);
    }

    .admin-sidebar__nav {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: var(--space-4);
      flex: 1;
    }

    .admin-nav-link {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-md);
      font-size: var(--fs-sm);
      font-weight: var(--fw-medium);
      color: var(--text-secondary);
      transition: all var(--transition-fast);
      width: 100%;
      text-align: left;
    }

    .admin-nav-link:hover {
      background: var(--bg-glass-light);
      color: var(--text-primary);
    }

    .admin-nav-link.active {
      background: var(--accent-blue-glow-sm);
      color: var(--accent-blue);
      border: 1px solid rgba(59,130,246,0.2);
    }

    .admin-nav-link--danger:hover {
      background: rgba(239, 68, 68, 0.1);
      color: #f87171;
    }

    .admin-nav-link__icon { font-size: 1rem; flex-shrink: 0; }

    .admin-sidebar__footer {
      padding: var(--space-4);
      border-top: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    @media (max-width: 768px) {
      .admin-sidebar {
        width: 60px;
        min-height: unset;
        height: auto;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        flex-direction: row;
        align-items: center;
        border-right: none;
        border-top: 1px solid var(--border-color);
        z-index: 900;
        min-height: 60px;
      }
      .admin-sidebar__brand { display: none; }
      .admin-sidebar__nav { flex-direction: row; padding: var(--space-2); gap: 0; flex: 1; justify-content: space-around; }
      .admin-sidebar__footer { flex-direction: row; padding: var(--space-2); }
      .admin-nav-link span:last-child { display: none; }
      .admin-nav-link { justify-content: center; padding: var(--space-2); }
    }
  `;
  document.head.appendChild(style);

  // Logout handler
  setTimeout(() => {
    const logoutBtn = document.getElementById('admin-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        authService.logout();
        window.location.hash = '#admin/login';
      });
    }
  }, 0);

  return nav;
}
