import { skillsService } from '../services/skillsService.js';
import { createAdminSidebar } from './sidebar.js';
import { toast } from '../components/toast.js';

export function createSkillsManager() {
  const wrapper = document.createElement('div');
  wrapper.className = 'admin-layout';
  wrapper.id = 'admin-skills-manager';

  const sidebar = createAdminSidebar('skills');
  wrapper.appendChild(sidebar);

  const main = document.createElement('main');
  main.className = 'admin-main';
  main.innerHTML = `
    <div class="admin-header">
      <div>
        <h1 class="admin-header__title">Skills</h1>
        <p class="admin-header__sub">Manage technical skill categories and technologies</p>
      </div>
      <button class="btn btn-primary" id="sm-add-btn">+ Add Skill Category</button>
    </div>

    <!-- Add / Edit Modal / Form Drawer -->
    <div id="sm-form-modal" class="admin-modal" style="display:none;">
      <div class="admin-modal-content">
        <div class="admin-modal-header">
          <h3 id="sm-modal-title">Add Skill Category</h3>
          <button type="button" class="btn btn-ghost btn-sm" id="sm-modal-close">✕</button>
        </div>
        <form id="sm-form" style="display:flex;flex-direction:column;gap:var(--space-4);margin-top:var(--space-4);">
          <input type="hidden" id="sm-edit-id" value="" />
          <div class="form-group">
            <label class="form-label" for="sm-category">Category Title *</label>
            <input class="form-input" id="sm-category" placeholder="e.g. Generative AI" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="sm-icon">Icon Emoji</label>
            <input class="form-input" id="sm-icon" placeholder="🤖" value="⚡" style="max-width:120px;" />
          </div>
          <div class="form-group">
            <label class="form-label" for="sm-skills">Skills (Comma-separated) *</label>
            <textarea class="form-textarea" id="sm-skills" rows="3" placeholder="e.g. Large Language Models, RAG Systems, ChromaDB, Prompt Engineering" required></textarea>
            <span style="font-size:var(--fs-xs);color:var(--text-muted);">Separate each skill tag with a comma.</span>
          </div>
          <div class="form-group">
            <label class="form-label" for="sm-order">Display Order</label>
            <input class="form-input" type="number" id="sm-order" value="0" style="max-width:120px;" />
          </div>
          <div style="display:flex;gap:var(--space-3);justify-content:flex-end;margin-top:var(--space-2);">
            <button type="button" class="btn btn-outline" id="sm-cancel-btn">Cancel</button>
            <button type="submit" class="btn btn-primary" id="sm-save-btn">Save Category</button>
          </div>
        </form>
      </div>
    </div>

    <div class="admin-section">
      <div class="admin-projects-table-wrapper" id="sm-table-wrapper">
        <div class="admin-loading"><div class="spinner"></div><span>Loading skills...</span></div>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .admin-modal {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(6px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-4);
    }
    .admin-modal-content {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: var(--space-6);
      max-width: 520px;
      width: 100%;
      box-shadow: var(--shadow-lg);
    }
    .admin-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: var(--space-3);
    }
  `;
  document.head.appendChild(style);

  wrapper.appendChild(main);
  return wrapper;
}

export async function initSkillsManager(navigate) {
  const modal = document.getElementById('sm-form-modal');
  const addBtn = document.getElementById('sm-add-btn');
  const closeBtn = document.getElementById('sm-modal-close');
  const cancelBtn = document.getElementById('sm-cancel-btn');
  const form = document.getElementById('sm-form');

  const openModal = (skill = null) => {
    if (skill) {
      document.getElementById('sm-modal-title').textContent = 'Edit Skill Category';
      document.getElementById('sm-edit-id').value = skill._id || skill.id;
      document.getElementById('sm-category').value = skill.category;
      document.getElementById('sm-icon').value = skill.icon || '⚡';
      document.getElementById('sm-skills').value = (skill.skills || []).join(', ');
      document.getElementById('sm-order').value = skill.order ?? 0;
    } else {
      document.getElementById('sm-modal-title').textContent = 'Add Skill Category';
      form.reset();
      document.getElementById('sm-edit-id').value = '';
      document.getElementById('sm-icon').value = '⚡';
      document.getElementById('sm-order').value = 0;
    }
    modal.style.display = 'flex';
  };

  const closeModal = () => {
    modal.style.display = 'none';
  };

  addBtn?.addEventListener('click', () => openModal(null));
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('sm-edit-id').value;
    const category = document.getElementById('sm-category').value.trim();
    const icon = document.getElementById('sm-icon').value.trim() || '⚡';
    const skills = document.getElementById('sm-skills').value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const order = parseInt(document.getElementById('sm-order').value || '0', 10);

    const saveBtn = document.getElementById('sm-save-btn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';

    try {
      if (id) {
        await skillsService.updateSkill(id, { category, icon, skills, order });
        toast.success('Skill category updated!');
      } else {
        await skillsService.createSkill({ category, icon, skills, order });
        toast.success('Skill category added!');
      }
      closeModal();
      await loadSkillsList(openModal);
    } catch (err) {
      toast.error(err.message || 'Failed to save skill category');
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save Category';
    }
  });

  await loadSkillsList(openModal);
}

async function loadSkillsList(openModal) {
  const wrapper = document.getElementById('sm-table-wrapper');
  if (!wrapper) return;

  try {
    const res = await skillsService.getSkills();
    const skills = res.data || [];

    if (!skills.length) {
      wrapper.innerHTML = `
        <div class="admin-loading">
          <span>No skills in database yet.</span>
        </div>`;
      return;
    }

    wrapper.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th style="width:60px;">Icon</th>
            <th>Category</th>
            <th>Skills</th>
            <th style="width:80px;">Order</th>
            <th style="width:140px;">Actions</th>
          </tr>
        </thead>
        <tbody id="sm-table-body"></tbody>
      </table>
    `;

    const tbody = document.getElementById('sm-table-body');
    skills.forEach(skill => {
      const row = document.createElement('tr');
      const tagsHtml = (skill.skills || []).map(s => `<span class="badge badge-blue" style="margin:2px;">${s}</span>`).join(' ');

      row.innerHTML = `
        <td style="font-size:1.5rem;text-align:center;">${skill.icon || '⚡'}</td>
        <td><strong>${skill.category}</strong></td>
        <td><div style="display:flex;flex-wrap:wrap;gap:4px;">${tagsHtml}</div></td>
        <td style="font-family:var(--font-mono);font-size:var(--fs-xs);">${skill.order ?? 0}</td>
        <td>
          <div style="display:flex;gap:var(--space-2);">
            <button class="btn btn-outline btn-sm sm-edit-btn" type="button">✏️ Edit</button>
            <button class="btn btn-ghost btn-sm sm-del-btn" style="color:#f87171;" type="button">🗑️</button>
          </div>
        </td>
      `;

      row.querySelector('.sm-edit-btn')?.addEventListener('click', () => openModal(skill));
      row.querySelector('.sm-del-btn')?.addEventListener('click', async () => {
        if (confirm(`Delete category "${skill.category}"?`)) {
          try {
            await skillsService.deleteSkill(skill._id || skill.id);
            toast.success('Skill category deleted');
            await loadSkillsList(openModal);
          } catch (err) {
            toast.error(err.message || 'Failed to delete');
          }
        }
      });

      tbody.appendChild(row);
    });
  } catch (err) {
    wrapper.innerHTML = `<div class="admin-loading"><span style="color:#f87171;">Failed to load skills: ${err.message}</span></div>`;
  }
}
