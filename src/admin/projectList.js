import { projectService } from '../services/projectService.js';
import { createAdminSidebar } from './sidebar.js';
import { toast } from '../components/toast.js';
import { getImageUrl } from '../components/projectCard.js';

export function createProjectList() {
  const wrapper = document.createElement('div');
  wrapper.className = 'admin-layout';
  wrapper.id = 'admin-project-list';

  const sidebar = createAdminSidebar('projects');
  wrapper.appendChild(sidebar);

  const main = document.createElement('main');
  main.className = 'admin-main';
  main.innerHTML = `
    <div class="admin-header">
      <div>
        <h1 class="admin-header__title">Projects</h1>
        <p class="admin-header__sub">Manage your portfolio projects</p>
      </div>
      <button class="btn btn-primary" id="pl-add-project">+ Add New Project</button>
    </div>

    <div class="admin-section">
      <div class="admin-projects-table-wrapper" id="pl-table-wrapper">
        <div class="admin-loading"><div class="spinner"></div><span>Loading projects...</span></div>
      </div>
    </div>
  `;

  wrapper.appendChild(main);
  return wrapper;
}

export async function initProjectList(navigate) {
  document.getElementById('pl-add-project')?.addEventListener('click', () => navigate('add-project'));
  await loadProjectList(navigate);
}

async function loadProjectList(navigate) {
  const wrapper = document.getElementById('pl-table-wrapper');
  if (!wrapper) return;

  try {
    const data = await projectService.getAllProjects();
    const projects = data.data || [];

    if (!projects.length) {
      wrapper.innerHTML = `
        <div class="admin-loading">
          <span>No projects yet.</span>
          <button class="btn btn-primary btn-sm" id="pl-add-empty">+ Add Your First Project</button>
        </div>`;
      document.getElementById('pl-add-empty')?.addEventListener('click', () => navigate('add-project'));
      return;
    }

    wrapper.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Preview</th>
            <th>Title</th>
            <th>Category</th>
            <th>Technologies</th>
            <th>Status</th>
            <th>Featured</th>
            <th>Order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="pl-table-body"></tbody>
      </table>
    `;

    const tbody = document.getElementById('pl-table-body');
    projects.forEach(p => {
      const row = document.createElement('tr');
      row.setAttribute('data-id', p._id);
      const img = getImageUrl(p.imageUrl);
      const techDisplay = (p.technologies || []).slice(0, 3).join(', ');

      row.innerHTML = `
        <td>${img ? `<img class="admin-table-image" src="${img}" alt="${p.title}" loading="lazy"/>` : `<div class="admin-table-placeholder">🤖</div>`}</td>
        <td><span class="admin-table-title">${p.title}</span></td>
        <td><span class="badge badge-blue">${p.category || 'AI'}</span></td>
        <td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${techDisplay || '—'}</td>
        <td>
          <button class="toggle-btn toggle-btn--${p.published ? 'on' : 'off'}" data-id="${p._id}" data-type="publish">
            ${p.published ? '🟢 Published' : '⚪ Draft'}
          </button>
        </td>
        <td>
          <button class="toggle-btn toggle-btn--${p.featured ? 'on' : 'off'}" data-id="${p._id}" data-type="feature">
            ${p.featured ? '⭐ Yes' : 'No'}
          </button>
        </td>
        <td style="font-family:var(--font-mono);font-size:var(--fs-xs)">${p.order ?? 0}</td>
        <td>
          <div class="admin-table-actions">
            <button class="btn btn-ghost btn-sm" data-id="${p._id}" data-action="edit">✏️ Edit</button>
            <button class="admin-delete-btn" data-id="${p._id}" data-action="delete">🗑️ Delete</button>
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
          await loadProjectList(navigate);
        } catch { toast.error('Update failed'); }
        return;
      }

      const actionBtn = e.target.closest('[data-action]');
      if (actionBtn) {
        const { id, action } = actionBtn.dataset;
        if (action === 'edit') { navigate('edit-project', id); return; }
        if (action === 'delete') {
          if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            try {
              await projectService.deleteProject(id);
              toast.success('Project deleted');
              await loadProjectList(navigate);
            } catch { toast.error('Delete failed'); }
          }
        }
      }
    });
  } catch (err) {
    wrapper.innerHTML = `
      <div class="admin-loading" style="color:var(--text-muted)">
        ⚠️ Could not load projects. Make sure the backend is running.
      </div>`;
  }
}
