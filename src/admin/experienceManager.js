import { experienceService } from '../services/experienceService.js';
import { createAdminSidebar } from './sidebar.js';
import { toast } from '../components/toast.js';

export function createExperienceManager() {
  const wrapper = document.createElement('div');
  wrapper.className = 'admin-layout';
  wrapper.id = 'admin-experience-manager';

  const sidebar = createAdminSidebar('experience');
  wrapper.appendChild(sidebar);

  const main = document.createElement('main');
  main.className = 'admin-main';
  main.innerHTML = `
    <div class="admin-header">
      <div>
        <h1 class="admin-header__title">Experience</h1>
        <p class="admin-header__sub">Manage work history, internships, and key achievements</p>
      </div>
      <button class="btn btn-primary" id="em-add-btn">+ Add Experience</button>
    </div>

    <!-- Add / Edit Modal -->
    <div id="em-form-modal" class="admin-modal" style="display:none;">
      <div class="admin-modal-content" style="max-width:640px;max-height:90vh;overflow-y:auto;">
        <div class="admin-modal-header">
          <h3 id="em-modal-title">Add Work Experience</h3>
          <button type="button" class="btn btn-ghost btn-sm" id="em-modal-close">✕</button>
        </div>
        <form id="em-form" style="display:flex;flex-direction:column;gap:var(--space-4);margin-top:var(--space-4);">
          <input type="hidden" id="em-edit-id" value="" />
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);">
            <div class="form-group">
              <label class="form-label" for="em-title">Job Title *</label>
              <input class="form-input" id="em-title" placeholder="e.g. AI Engineer" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="em-company">Company Name *</label>
              <input class="form-input" id="em-company" placeholder="e.g. Beats Production Pvt Ltd" required />
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);">
            <div class="form-group">
              <label class="form-label" for="em-period">Period *</label>
              <input class="form-input" id="em-period" placeholder="e.g. May 2025 – Present" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="em-location">Location</label>
              <input class="form-input" id="em-location" placeholder="e.g. Bengaluru, India" value="Bengaluru, India" />
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);align-items:center;">
            <div class="form-group">
              <label class="form-label" for="em-type">Job Type</label>
              <input class="form-input" id="em-type" placeholder="e.g. Full-time / Internship" value="Full-time" />
            </div>
            <div class="form-group" style="margin-top:var(--space-4);">
              <label style="display:flex;align-items:center;gap:var(--space-2);cursor:pointer;">
                <input type="checkbox" id="em-current" />
                <span style="font-size:var(--fs-sm);font-weight:var(--fw-medium);">Current Role</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="em-highlights">Key Highlights & Achievements (One per line)</label>
            <textarea class="form-textarea" id="em-highlights" rows="4" placeholder="• Built AI-powered photobooth application&#10;• Integrated Google Gemini and OpenAI APIs&#10;• Deployed to AWS with Docker"></textarea>
          </div>

          <div class="form-group">
            <label class="form-label" for="em-tags">Skills & Tech Stack Tags (Comma-separated)</label>
            <input class="form-input" id="em-tags" placeholder="Generative AI, FastAPI, Python, Docker, AWS" />
          </div>

          <div class="form-group">
            <label class="form-label" for="em-order">Display Order</label>
            <input class="form-input" type="number" id="em-order" value="0" style="max-width:120px;" />
          </div>

          <div style="display:flex;gap:var(--space-3);justify-content:flex-end;margin-top:var(--space-2);">
            <button type="button" class="btn btn-outline" id="em-cancel-btn">Cancel</button>
            <button type="submit" class="btn btn-primary" id="em-save-btn">Save Experience</button>
          </div>
        </form>
      </div>
    </div>

    <div class="admin-section">
      <div class="admin-projects-table-wrapper" id="em-table-wrapper">
        <div class="admin-loading"><div class="spinner"></div><span>Loading experience records...</span></div>
      </div>
    </div>
  `;

  wrapper.appendChild(main);
  return wrapper;
}

export async function initExperienceManager(navigate) {
  const modal = document.getElementById('em-form-modal');
  const addBtn = document.getElementById('em-add-btn');
  const closeBtn = document.getElementById('em-modal-close');
  const cancelBtn = document.getElementById('em-cancel-btn');
  const form = document.getElementById('em-form');

  const openModal = (exp = null) => {
    if (exp) {
      document.getElementById('em-modal-title').textContent = 'Edit Experience';
      document.getElementById('em-edit-id').value = exp._id || exp.id;
      document.getElementById('em-title').value = exp.title;
      document.getElementById('em-company').value = exp.company;
      document.getElementById('em-period').value = exp.period;
      document.getElementById('em-location').value = exp.location || 'Bengaluru, India';
      document.getElementById('em-type').value = exp.type || 'Full-time';
      document.getElementById('em-current').checked = Boolean(exp.current);
      document.getElementById('em-highlights').value = (exp.highlights || []).join('\n');
      document.getElementById('em-tags').value = (exp.tags || []).join(', ');
      document.getElementById('em-order').value = exp.order ?? 0;
    } else {
      document.getElementById('em-modal-title').textContent = 'Add Work Experience';
      form.reset();
      document.getElementById('em-edit-id').value = '';
      document.getElementById('em-location').value = 'Bengaluru, India';
      document.getElementById('em-type').value = 'Full-time';
      document.getElementById('em-order').value = 0;
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
    const id = document.getElementById('em-edit-id').value;
    const title = document.getElementById('em-title').value.trim();
    const company = document.getElementById('em-company').value.trim();
    const period = document.getElementById('em-period').value.trim();
    const location = document.getElementById('em-location').value.trim();
    const type = document.getElementById('em-type').value.trim();
    const current = document.getElementById('em-current').checked;
    const highlights = document.getElementById('em-highlights').value
      .split('\n')
      .map(h => h.trim())
      .filter(Boolean);
    const tags = document.getElementById('em-tags').value
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    const order = parseInt(document.getElementById('em-order').value || '0', 10);

    const saveBtn = document.getElementById('em-save-btn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';

    try {
      if (id) {
        await experienceService.updateExperience(id, { title, company, period, location, type, current, highlights, tags, order });
        toast.success('Experience record updated!');
      } else {
        await experienceService.createExperience({ title, company, period, location, type, current, highlights, tags, order });
        toast.success('Experience record added!');
      }
      closeModal();
      await loadExperienceList(openModal);
    } catch (err) {
      toast.error(err.message || 'Failed to save experience');
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save Experience';
    }
  });

  await loadExperienceList(openModal);
}

async function loadExperienceList(openModal) {
  const wrapper = document.getElementById('em-table-wrapper');
  if (!wrapper) return;

  try {
    const res = await experienceService.getExperience();
    const experiences = res.data || [];

    if (!experiences.length) {
      wrapper.innerHTML = `
        <div class="admin-loading">
          <span>No experience records in database yet.</span>
        </div>`;
      return;
    }

    wrapper.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Role & Company</th>
            <th>Period</th>
            <th>Location / Type</th>
            <th>Key Tags</th>
            <th style="width:140px;">Actions</th>
          </tr>
        </thead>
        <tbody id="em-table-body"></tbody>
      </table>
    `;

    const tbody = document.getElementById('em-table-body');
    experiences.forEach(exp => {
      const row = document.createElement('tr');
      const tagsHtml = (exp.tags || []).slice(0, 4).map(t => `<span class="badge badge-blue">${t}</span>`).join(' ');

      row.innerHTML = `
        <td>
          <strong>${exp.title}</strong>
          <div style="color:var(--accent-blue);font-size:var(--fs-xs);">${exp.company} ${exp.current ? '🟢 (Current)' : ''}</div>
        </td>
        <td><span style="font-size:var(--fs-xs);">${exp.period}</span></td>
        <td><span style="font-size:var(--fs-xs);color:var(--text-muted);">${exp.location} • ${exp.type}</span></td>
        <td><div style="display:flex;flex-wrap:wrap;gap:4px;">${tagsHtml}</div></td>
        <td>
          <div style="display:flex;gap:var(--space-2);">
            <button class="btn btn-outline btn-sm em-edit-btn" type="button">✏️ Edit</button>
            <button class="btn btn-ghost btn-sm em-del-btn" style="color:#f87171;" type="button">🗑️</button>
          </div>
        </td>
      `;

      row.querySelector('.em-edit-btn')?.addEventListener('click', () => openModal(exp));
      row.querySelector('.em-del-btn')?.addEventListener('click', async () => {
        if (confirm(`Delete experience record "${exp.title} at ${exp.company}"?`)) {
          try {
            await experienceService.deleteExperience(exp._id || exp.id);
            toast.success('Experience record deleted');
            await loadExperienceList(openModal);
          } catch (err) {
            toast.error(err.message || 'Failed to delete');
          }
        }
      });

      tbody.appendChild(row);
    });
  } catch (err) {
    wrapper.innerHTML = `<div class="admin-loading"><span style="color:#f87171;">Failed to load experience: ${err.message}</span></div>`;
  }
}
