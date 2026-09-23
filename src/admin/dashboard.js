import { projectService } from '../services/projectService.js';
import { createAdminSidebar } from './sidebar.js';
import { toast } from '../components/toast.js';
import { getImageUrl } from '../components/projectCard.js';

export function createAdminDashboard() {
  const wrapper = document.createElement('div');
  wrapper.className = 'admin-layout';
  wrapper.id = 'admin-dashboard';

  const sidebar = createAdminSidebar('dashboard');
  wrapper.appendChild(sidebar);

  const main = document.createElement('main');
  main.className = 'admin-main';
  main.innerHTML = `
    <div class="admin-header">
      <div>
        <h1 class="admin-header__title">Dashboard</h1>
        <p class="admin-header__sub">Welcome back! Manage your portfolio content.</p>
      </div>
    </div>

    <div class="admin-stats-grid" id="admin-stats-grid">
      <div class="admin-stat-card">
        <div class="admin-stat-icon">📦</div>
        <div class="admin-stat-value" id="stat-total">—</div>
        <div class="admin-stat-label">Total Projects</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon">🟢</div>
        <div class="admin-stat-value" id="stat-published">—</div>
        <div class="admin-stat-label">Published</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon">⭐</div>
        <div class="admin-stat-value" id="stat-featured">—</div>
        <div class="admin-stat-label">Featured</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon">📝</div>
        <div class="admin-stat-value" id="stat-draft">—</div>
        <div class="admin-stat-label">Drafts</div>
      </div>
    </div>

    <div class="admin-section">
      <div class="admin-section__header">
        <h2 class="admin-section__title">Recent Projects</h2>
        <button class="btn btn-primary btn-sm" id="dash-add-project">+ Add Project</button>
      </div>
      <div id="dash-projects-list" class="admin-projects-table-wrapper">
        <div class="admin-loading"><div class="spinner"></div><span>Loading...</span></div>
      </div>
    </div>
  `;

  wrapper.appendChild(main);

  const style = document.createElement('style');
  style.textContent = `
    .admin-layout {
      display: flex;
      min-height: 100vh;
      background: var(--bg-primary);
    }

    .admin-main {
      flex: 1;
      padding: var(--space-8);
      overflow-y: auto;
      max-width: calc(100vw - 240px);
    }

    .admin-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-8);
      flex-wrap: wrap;
      gap: var(--space-4);
    }

    .admin-header__title {
      font-size: var(--fs-2xl);
      font-weight: var(--fw-black);
      color: var(--text-primary);
    }

    .admin-header__sub {
      font-size: var(--fs-sm);
      color: var(--text-muted);
      margin-top: 2px;
    }

    .admin-stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-4);
      margin-bottom: var(--space-8);
    }

    .admin-stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: var(--space-5);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      transition: all var(--transition-normal);
    }

    .admin-stat-card:hover {
      border-color: var(--border-color-hover);
      transform: translateY(-2px);
    }

    .admin-stat-icon { font-size: 1.5rem; }

    .admin-stat-value {
      font-size: var(--fs-3xl);
      font-weight: var(--fw-black);
      color: var(--text-primary);
      font-family: var(--font-mono);
    }

    .admin-stat-label {
      font-size: var(--fs-xs);
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .admin-section {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      overflow: hidden;
    }

    .admin-section__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-5) var(--space-6);
      border-bottom: 1px solid var(--border-color);
      flex-wrap: wrap;
      gap: var(--space-3);
    }

    .admin-section__title {
      font-size: var(--fs-lg);
      font-weight: var(--fw-bold);
      color: var(--text-primary);
    }

    .admin-projects-table-wrapper {
      overflow-x: auto;
    }

    .admin-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-3);
      padding: var(--space-12);
      color: var(--text-muted);
      font-size: var(--fs-sm);
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
    }

    .admin-table th {
      text-align: left;
      padding: var(--space-3) var(--space-4);
      font-size: var(--fs-xs);
      font-weight: var(--fw-semi);
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border-bottom: 1px solid var(--border-color);
      white-space: nowrap;
    }

    .admin-table td {
      padding: var(--space-4);
      border-bottom: 1px solid var(--border-color);
      font-size: var(--fs-sm);
      color: var(--text-secondary);
      vertical-align: middle;
    }

    .admin-table tr:last-child td { border-bottom: none; }

    .admin-table tr:hover td { background: var(--bg-glass-light); }

    .admin-table-title {
      font-weight: var(--fw-semi);
      color: var(--text-primary);
    }

    .admin-table-image {
      width: 50px;
      height: 40px;
      border-radius: var(--radius-sm);
      object-fit: cover;
      background: var(--bg-secondary);
    }

    .admin-table-placeholder {
      width: 50px;
      height: 40px;
      border-radius: var(--radius-sm);
      background: var(--bg-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .toggle-btn {
      padding: 0.25rem 0.6rem;
      border-radius: var(--radius-full);
      font-size: var(--fs-xs);
      font-weight: var(--fw-semi);
      cursor: pointer;
      border: 1px solid transparent;
      transition: all var(--transition-fast);
    }

    .toggle-btn--on {
      background: rgba(34,197,94,0.1);
      color: #86efac;
      border-color: rgba(34,197,94,0.2);
    }
    .toggle-btn--off {
      background: var(--bg-glass-light);
      color: var(--text-muted);
      border-color: var(--border-color);
    }
    .toggle-btn:hover { filter: brightness(1.2); }

    .admin-table-actions {
      display: flex;
      gap: var(--space-2);
      align-items: center;
      flex-wrap: wrap;
    }

    .admin-delete-btn {
      padding: 0.3rem 0.7rem;
      border-radius: var(--radius-sm);
      font-size: var(--fs-xs);
      background: rgba(239,68,68,0.1);
      color: #f87171;
      border: 1px solid rgba(239,68,68,0.2);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .admin-delete-btn:hover { background: rgba(239,68,68,0.2); }

    @media (max-width: 900px) {
      .admin-stats-grid { grid-template-columns: repeat(2, 1fr); }
      .admin-main { max-width: 100%; padding: var(--space-4); padding-bottom: 80px; }
    }

    @media (max-width: 480px) {
      .admin-stats-grid { grid-template-columns: 1fr 1fr; }
    }
  `;
  document.head.appendChild(style);

  return wrapper;
}

export async function initAdminDashboard(navigate) {
  // Wire add project button
  const addBtn = document.getElementById('dash-add-project');
  if (addBtn) {
    addBtn.addEventListener('click', () => navigate('add-project'));
  }

  // Load stats and project list
  try {
    const data = await projectService.getAllProjects();
    const projects = data.data || [];

    const total = projects.length;
    const published = projects.filter(p => p.published).length;
    const featured = projects.filter(p => p.featured).length;
    const drafts = projects.filter(p => !p.published).length;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-published').textContent = published;
    document.getElementById('stat-featured').textContent = featured;
    document.getElementById('stat-draft').textContent = drafts;

    renderDashboardTable(projects.slice(0, 5), navigate);
  } catch {
    document.getElementById('stat-total').textContent = '—';
    document.getElementById('dash-projects-list').innerHTML = `
      <div class="admin-loading" style="color:var(--text-muted)">
        <span>⚠️ Could not connect to backend. Start the server to manage projects.</span>
      </div>`;
  }
}

function renderDashboardTable(projects, navigate) {
  const container = document.getElementById('dash-projects-list');
  if (!projects.length) {
    container.innerHTML = `<div class="admin-loading"><span>No projects yet. <button class="btn btn-primary btn-sm" onclick="">Add one!</button></span></div>`;
    return;
  }

  container.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Preview</th>
          <th>Title</th>
          <th>Category</th>
          <th>Status</th>
          <th>Featured</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="dash-table-body"></tbody>
    </table>
  `;

  const tbody = document.getElementById('dash-table-body');
  projects.forEach(p => {
    const row = document.createElement('tr');
    const img = getImageUrl(p.imageUrl);
    row.innerHTML = `
      <td>${img ? `<img class="admin-table-image" src="${img}" alt="${p.title}" loading="lazy"/>` : `<div class="admin-table-placeholder">🤖</div>`}</td>
      <td><span class="admin-table-title">${p.title}</span></td>
      <td>${p.category || '—'}</td>
      <td>
        <button class="toggle-btn toggle-btn--${p.published ? 'on' : 'off'}" data-id="${p._id}" data-type="publish">
          ${p.published ? 'Published' : 'Draft'}
        </button>
      </td>
      <td>
        <button class="toggle-btn toggle-btn--${p.featured ? 'on' : 'off'}" data-id="${p._id}" data-type="feature">
          ${p.featured ? '⭐ Yes' : 'No'}
        </button>
      </td>
      <td>
        <div class="admin-table-actions">
          <button class="btn btn-ghost btn-sm" data-id="${p._id}" data-action="edit">Edit</button>
          <button class="admin-delete-btn" data-id="${p._id}" data-action="delete">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Event delegation
  tbody.addEventListener('click', async (e) => {
    const toggleBtn = e.target.closest('[data-type]');
    if (toggleBtn) {
      const { id, type } = toggleBtn.dataset;
      try {
        if (type === 'publish') await projectService.togglePublish(id);
        else await projectService.toggleFeatured(id);
        toast.success('Updated!');
        initAdminDashboard(navigate);
      } catch { toast.error('Update failed'); }
      return;
    }

    const actionBtn = e.target.closest('[data-action]');
    if (actionBtn) {
      const { id, action } = actionBtn.dataset;
      if (action === 'edit') navigate('edit-project', id);
      if (action === 'delete') {
        if (confirm('Delete this project? This cannot be undone.')) {
          try {
            await projectService.deleteProject(id);
            toast.success('Project deleted');
            initAdminDashboard(navigate);
          } catch { toast.error('Delete failed'); }
        }
      }
    }
  });
}
