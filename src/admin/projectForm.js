import { projectService } from '../services/projectService.js';
import { createAdminSidebar } from './sidebar.js';
import { toast } from '../components/toast.js';
import { getImageUrl } from '../components/projectCard.js';

export function createProjectForm(projectData = null, navigate) {
  const isEdit = !!projectData;
  const wrapper = document.createElement('div');
  wrapper.className = 'admin-layout';
  wrapper.id = 'admin-project-form';

  const sidebar = createAdminSidebar(isEdit ? 'projects' : 'add-project');
  wrapper.appendChild(sidebar);

  const main = document.createElement('main');
  main.className = 'admin-main';

  const feats = projectData?.features?.join('\n') || '';
  const techs = projectData?.technologies?.join(', ') || '';
  const existingImg = projectData?.imageUrl ? getImageUrl(projectData.imageUrl) : null;

  main.innerHTML = `
    <div class="admin-header">
      <div>
        <button class="btn btn-ghost btn-sm" id="pf-back" type="button">← Back to Projects</button>
        <h1 class="admin-header__title" style="margin-top:var(--space-2)">${isEdit ? 'Edit Project' : 'Add New Project'}</h1>
      </div>
    </div>

    <form id="project-form" class="admin-form" novalidate enctype="multipart/form-data">
      <div class="admin-form-grid">
        <div class="admin-form-main">

          <div class="admin-form-section">
            <h3 class="admin-form-section-title">Basic Info</h3>
            <div class="form-group">
              <label class="form-label" for="pf-title">Project Title *</label>
              <input class="form-input" type="text" id="pf-title" name="title" value="${projectData?.title || ''}" placeholder="e.g. AI Workspace" required />
            </div>

            <div class="form-group">
              <label class="form-label" for="pf-category">Category</label>
              <input class="form-input" type="text" id="pf-category" name="category" value="${projectData?.category || 'AI / GenAI'}" placeholder="AI / GenAI" />
            </div>

            <div class="form-group">
              <label class="form-label" for="pf-description">Description *</label>
              <textarea class="form-textarea" id="pf-description" name="description" rows="4" placeholder="Describe the project...">${projectData?.description || ''}</textarea>
            </div>
          </div>

          <div class="admin-form-section">
            <h3 class="admin-form-section-title">Features</h3>
            <div class="form-group">
              <label class="form-label" for="pf-features">Features (one per line)</label>
              <textarea class="form-textarea" id="pf-features" name="features" rows="5" placeholder="AI Chat with memory&#10;RAG Knowledge Assistant&#10;File Generator">${feats}</textarea>
            </div>
          </div>

          <div class="admin-form-section">
            <h3 class="admin-form-section-title">Technologies</h3>
            <div class="form-group">
              <label class="form-label" for="pf-technologies">Technologies (comma separated)</label>
              <input class="form-input" type="text" id="pf-technologies" name="technologies" value="${techs}" placeholder="FastAPI, PostgreSQL, OpenAI, Docker" />
            </div>
          </div>

          <div class="admin-form-section">
            <h3 class="admin-form-section-title">Links</h3>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="pf-github">GitHub URL</label>
                <input class="form-input" type="url" id="pf-github" name="githubUrl" value="${projectData?.githubUrl || ''}" placeholder="https://github.com/..." />
              </div>
              <div class="form-group">
                <label class="form-label" for="pf-demo">Live Demo URL</label>
                <input class="form-input" type="url" id="pf-demo" name="demoUrl" value="${projectData?.demoUrl || ''}" placeholder="https://..." />
              </div>
            </div>
          </div>
        </div>

        <div class="admin-form-sidebar">
          <div class="admin-form-section">
            <h3 class="admin-form-section-title">Preview Images / Gallery</h3>
            <div class="admin-image-upload" id="pf-image-upload-area">
              <input type="file" id="pf-images" name="images" accept="image/*" multiple class="sr-only" />
              <label for="pf-images" class="admin-image-dropzone">
                <span style="font-size:1.8rem">🖼️</span>
                <span style="font-weight:var(--fw-medium);color:var(--text-primary);font-size:var(--fs-sm)">+ Upload Images</span>
                <span class="admin-image-hint">Select one or multiple images (PNG, JPG, WEBP)</span>
              </label>
              <div class="admin-gallery-list" id="pf-gallery-list"></div>
            </div>
          </div>

          <div class="admin-form-section">
            <h3 class="admin-form-section-title">Settings</h3>
            <div class="admin-toggle-row">
              <div>
                <div class="admin-toggle-label">Published</div>
                <div class="admin-toggle-desc">Show on portfolio</div>
              </div>
              <label class="admin-toggle">
                <input type="checkbox" id="pf-published" name="published" ${projectData?.published !== false ? 'checked' : ''} />
                <span class="admin-toggle-slider"></span>
              </label>
            </div>
            <div class="admin-toggle-row">
              <div>
                <div class="admin-toggle-label">Featured</div>
                <div class="admin-toggle-desc">Highlight in projects section</div>
              </div>
              <label class="admin-toggle">
                <input type="checkbox" id="pf-featured" name="featured" ${projectData?.featured ? 'checked' : ''} />
                <span class="admin-toggle-slider"></span>
              </label>
            </div>
            <div class="form-group" style="margin-top:var(--space-3)">
              <label class="form-label" for="pf-order">Display Order</label>
              <input class="form-input" type="number" id="pf-order" name="order" value="${projectData?.order || '0'}" min="0" />
            </div>
          </div>

          <div class="admin-form-section">
            <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;" id="pf-submit">
              ${isEdit ? '💾 Save Changes' : '➕ Create Project'}
            </button>
            ${isEdit ? `<button type="button" class="btn btn-outline" style="width:100%;justify-content:center;margin-top:var(--space-2)" id="pf-cancel">Cancel</button>` : ''}
          </div>
        </div>
      </div>
    </form>
  `;

  wrapper.appendChild(main);
  injectFormStyles();
  return wrapper;
}

function injectFormStyles() {
  if (document.getElementById('admin-form-styles')) return;
  const style = document.createElement('style');
  style.id = 'admin-form-styles';
  style.textContent = `
    .admin-form-grid {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: var(--space-6);
      align-items: start;
    }

    .admin-form-main, .admin-form-sidebar {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
    }

    .admin-form-section {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: var(--space-5);
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .admin-form-section-title {
      font-size: var(--fs-sm);
      font-weight: var(--fw-semi);
      color: var(--text-primary);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--border-color);
    }

    .admin-image-upload { display: flex; flex-direction: column; }

    .admin-image-dropzone {
      width: 100%;
      border: 2px dashed var(--border-color);
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      cursor: pointer;
      background: var(--bg-glass-light);
      transition: all var(--transition-fast);
      text-align: center;
    }

    .admin-image-dropzone:hover {
      border-color: var(--accent-blue);
      background: var(--accent-blue-glow-sm);
    }

    .admin-image-hint {
      font-size: 10px !important;
      color: var(--text-muted);
    }

    .admin-gallery-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-3);
      margin-top: var(--space-3);
      width: 100%;
    }

    .admin-image-empty-hint {
      grid-column: 1 / -1;
      text-align: center;
      padding: var(--space-3);
      color: var(--text-muted);
      font-size: var(--fs-xs);
    }

    .admin-gallery-item {
      position: relative;
      aspect-ratio: 16 / 9;
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 1px solid var(--border-color);
      background: #06090e;
    }

    .admin-gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .admin-gallery-cover-badge {
      position: absolute;
      top: 4px;
      left: 4px;
      background: var(--accent-blue);
      color: #080c14;
      font-size: 10px;
      font-weight: var(--fw-bold);
      padding: 1px 6px;
      border-radius: 4px;
      letter-spacing: 0.05em;
    }

    .admin-gallery-make-cover {
      position: absolute;
      bottom: 4px;
      left: 4px;
      background: rgba(8, 12, 20, 0.85);
      color: var(--text-secondary);
      font-size: 9px;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      cursor: pointer;
      opacity: 0;
      transition: opacity var(--transition-fast);
    }

    .admin-gallery-item:hover .admin-gallery-make-cover {
      opacity: 1;
    }

    .admin-gallery-make-cover:hover {
      color: var(--accent-blue);
      border-color: var(--accent-blue);
    }

    .admin-gallery-remove {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(239, 68, 68, 0.9);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: bold;
      cursor: pointer;
      transition: transform var(--transition-fast), background var(--transition-fast);
    }

    .admin-gallery-remove:hover {
      background: #dc2626;
      transform: scale(1.15);
    }

    /* Toggle */
    .admin-toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-3);
    }

    .admin-toggle-label {
      font-size: var(--fs-sm);
      font-weight: var(--fw-medium);
      color: var(--text-primary);
    }

    .admin-toggle-desc {
      font-size: var(--fs-xs);
      color: var(--text-muted);
    }

    .admin-toggle {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
      flex-shrink: 0;
    }

    .admin-toggle input { opacity: 0; width: 0; height: 0; }

    .admin-toggle-slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background: var(--bg-glass-light);
      border: 1px solid var(--border-color);
      border-radius: 999px;
      transition: all var(--transition-normal);
    }

    .admin-toggle-slider::before {
      content: '';
      position: absolute;
      height: 16px;
      width: 16px;
      left: 3px;
      bottom: 3px;
      background: var(--text-muted);
      border-radius: 50%;
      transition: transform var(--transition-normal), background var(--transition-normal);
    }

    .admin-toggle input:checked + .admin-toggle-slider {
      background: rgba(59,130,246,0.2);
      border-color: rgba(59,130,246,0.4);
    }

    .admin-toggle input:checked + .admin-toggle-slider::before {
      transform: translateX(20px);
      background: var(--accent-blue);
    }

    @media (max-width: 900px) {
      .admin-form-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
}

export function initProjectForm(projectData = null, navigate) {
  const isEdit = !!projectData;

  // Back button
  document.getElementById('pf-back')?.addEventListener('click', () => navigate('projects'));
  document.getElementById('pf-cancel')?.addEventListener('click', () => navigate('projects'));

  // Multi-image state
  let existingImages = [];
  if (projectData) {
    if (Array.isArray(projectData.images) && projectData.images.length > 0) {
      existingImages = [...projectData.images];
    } else if (projectData.imageUrl) {
      existingImages = [projectData.imageUrl];
    }
  }

  let stagedFiles = [];

  const imageInput = document.getElementById('pf-images');
  const galleryList = document.getElementById('pf-gallery-list');

  function renderGallery() {
    if (!galleryList) return;

    const totalCount = existingImages.length + stagedFiles.length;
    if (totalCount === 0) {
      galleryList.innerHTML = `<div class="admin-image-empty-hint">No preview images uploaded yet.</div>`;
      return;
    }

    let html = '';
    // Existing images
    existingImages.forEach((imgUrl, idx) => {
      const fullUrl = getImageUrl(imgUrl);
      const isCover = idx === 0;
      html += `
        <div class="admin-gallery-item" data-type="existing" data-idx="${idx}">
          <img src="${fullUrl}" alt="Preview ${idx + 1}" />
          ${isCover ? '<span class="admin-gallery-cover-badge">Cover</span>' : `<button type="button" class="admin-gallery-make-cover" data-action="make-cover-existing" data-idx="${idx}" title="Set as cover image">Set Cover</button>`}
          <button type="button" class="admin-gallery-remove" data-action="remove-existing" data-idx="${idx}" title="Remove image">✕</button>
        </div>
      `;
    });

    // Staged files
    stagedFiles.forEach((file, idx) => {
      const isCover = existingImages.length === 0 && idx === 0;
      const objectUrl = URL.createObjectURL(file);
      html += `
        <div class="admin-gallery-item admin-gallery-item--staged" data-type="staged" data-idx="${idx}">
          <img src="${objectUrl}" alt="New Preview ${idx + 1}" />
          ${isCover ? '<span class="admin-gallery-cover-badge">Cover</span>' : `<button type="button" class="admin-gallery-make-cover" data-action="make-cover-staged" data-idx="${idx}" title="Set as cover image">Set Cover</button>`}
          <button type="button" class="admin-gallery-remove" data-action="remove-staged" data-idx="${idx}" title="Remove image">✕</button>
        </div>
      `;
    });

    galleryList.innerHTML = html;
  }

  renderGallery();

  // Handle file select
  imageInput?.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    stagedFiles.push(...files);
    e.target.value = ''; // Reset so user can select more files
    renderGallery();
  });

  // Handle gallery actions (remove, make cover)
  galleryList?.addEventListener('click', (e) => {
    const target = e.target.closest('button[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    const idx = parseInt(target.dataset.idx, 10);
    if (isNaN(idx)) return;

    if (action === 'remove-existing') {
      existingImages.splice(idx, 1);
      renderGallery();
    } else if (action === 'remove-staged') {
      stagedFiles.splice(idx, 1);
      renderGallery();
    } else if (action === 'make-cover-existing') {
      const [item] = existingImages.splice(idx, 1);
      existingImages.unshift(item);
      renderGallery();
    } else if (action === 'make-cover-staged') {
      const [item] = stagedFiles.splice(idx, 1);
      stagedFiles.unshift(item);
      // Put staged before existing so it becomes the primary cover
      const stagedFirst = stagedFiles.shift();
      stagedFiles.unshift(stagedFirst);
      renderGallery();
    }
  });

  // Form submit
  const form = document.getElementById('project-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('pf-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';

    try {
      const featsRaw = document.getElementById('pf-features').value;
      const features = featsRaw.split('\n').map(f => f.trim()).filter(Boolean);

      const techsRaw = document.getElementById('pf-technologies').value;
      const technologies = techsRaw.split(',').map(t => t.trim()).filter(Boolean);

      const payload = {
        title: document.getElementById('pf-title').value.trim(),
        description: document.getElementById('pf-description').value.trim(),
        category: document.getElementById('pf-category').value.trim(),
        githubUrl: document.getElementById('pf-github').value.trim(),
        demoUrl: document.getElementById('pf-demo').value.trim(),
        order: document.getElementById('pf-order').value,
        published: document.getElementById('pf-published').checked,
        featured: document.getElementById('pf-featured').checked,
        features,
        technologies,
        existingImages,
      };

      if (isEdit) {
        await projectService.updateProject(projectData._id, payload, stagedFiles);
        toast.success('Project updated successfully!');
      } else {
        await projectService.createProject(payload, stagedFiles);
        toast.success('Project created successfully!');
      }

      navigate('projects');
    } catch (err) {
      toast.error(err.message || 'Failed to save project');
      submitBtn.disabled = false;
      submitBtn.textContent = isEdit ? '💾 Save Changes' : '➕ Create Project';
    }
  });
}
