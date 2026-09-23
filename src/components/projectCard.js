const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const UPLOADS_BASE = API_BASE.replace('/api', '');

/**
 * Returns the full URL for an uploaded image
 */
export function getImageUrl(imageUrl) {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${UPLOADS_BASE}${imageUrl}`;
}

/**
 * Creates a project card element
 */
export function createProjectCard(project, isFeatured = false) {
  const card = document.createElement('article');
  card.className = `project-card reveal-scale${isFeatured ? ' project-card--featured' : ''}`;
  card.setAttribute('aria-label', `Project: ${project.title}`);

  const rawImages = (Array.isArray(project.images) && project.images.length > 0)
    ? project.images
    : (project.imageUrl ? [project.imageUrl] : []);
  const allImages = rawImages.map(img => getImageUrl(img)).filter(Boolean);
  const hasMultiple = allImages.length > 1;

  const techBadges = (project.technologies || []).map(t =>
    `<span class="badge badge-blue">${t}</span>`
  ).join('');
  const featuresList = (project.features || []).slice(0, 4).map(f =>
    `<li><span class="feature-dot">▹</span>${f}</li>`
  ).join('');

  let imageMarkup = '';
  if (allImages.length > 0) {
    imageMarkup = `
      <div class="project-card__slides">
        ${allImages.map((src, i) => `
          <div class="project-card__slide ${i === 0 ? 'is-active' : ''}" data-index="${i}">
            <img src="${src}" alt="${project.title} preview ${i + 1}" loading="lazy" />
          </div>
        `).join('')}
      </div>

      ${hasMultiple ? `
        <button type="button" class="project-card__nav project-card__nav--prev" aria-label="Previous image" data-action="prev">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button type="button" class="project-card__nav project-card__nav--next" aria-label="Next image" data-action="next">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="project-card__dots">
          ${allImages.map((_, i) => `<span class="project-card__dot ${i === 0 ? 'is-active' : ''}" data-index="${i}"></span>`).join('')}
        </div>
        <div class="project-card__count"><span class="project-card__count-current">1</span> / ${allImages.length}</div>
      ` : ''}
    `;
  } else {
    imageMarkup = `
      <div class="project-card__placeholder">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="3" fill="#f59e0b" opacity="0.6"/>
          <circle cx="60" cy="20" r="3" fill="#fb923c" opacity="0.6"/>
          <circle cx="40" cy="40" r="5" fill="#f59e0b" opacity="0.8"/>
          <circle cx="20" cy="60" r="3" fill="#fb923c" opacity="0.6"/>
          <circle cx="60" cy="60" r="3" fill="#f59e0b" opacity="0.6"/>
          <line x1="20" y1="20" x2="40" y2="40" stroke="#f59e0b" stroke-width="1" opacity="0.4"/>
          <line x1="60" y1="20" x2="40" y2="40" stroke="#fb923c" stroke-width="1" opacity="0.4"/>
          <line x1="40" y1="40" x2="20" y2="60" stroke="#f59e0b" stroke-width="1" opacity="0.4"/>
          <line x1="40" y1="40" x2="60" y2="60" stroke="#fb923c" stroke-width="1" opacity="0.4"/>
        </svg>
        <span>AI Project</span>
      </div>
    `;
  }

  card.innerHTML = `
    <div class="project-card__image" data-has-gallery="${hasMultiple}" title="${allImages.length > 0 ? 'Click to enlarge image' : ''}">
      ${imageMarkup}
      ${project.featured ? '<div class="project-card__featured-badge">⭐ Featured</div>' : ''}
      ${project.category ? `<div class="project-card__category">${project.category}</div>` : ''}
    </div>

    <div class="project-card__body">
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__desc">${project.description}</p>

      ${featuresList ? `
        <ul class="project-card__features">
          ${featuresList}
        </ul>
      ` : ''}

      <div class="project-card__tech">
        ${techBadges}
      </div>

      <div class="project-card__actions">
        ${project.githubUrl ? `
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer"
             class="btn btn-outline btn-sm" aria-label="View ${project.title} on GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        ` : ''}
        ${project.demoUrl ? `
          <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer"
             class="btn btn-primary btn-sm" aria-label="View ${project.title} live demo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Live Demo
          </a>
        ` : ''}
      </div>
    </div>
  `;

  // Slider interactivity
  let currentIndex = 0;
  if (hasMultiple) {
    const slides = card.querySelectorAll('.project-card__slide');
    const dots = card.querySelectorAll('.project-card__dot');
    const countEl = card.querySelector('.project-card__count-current');

    const setSlide = (index) => {
      currentIndex = (index + allImages.length) % allImages.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === currentIndex));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === currentIndex));
      if (countEl) countEl.textContent = currentIndex + 1;
    };

    card.querySelector('.project-card__nav--prev')?.addEventListener('click', (e) => {
      e.stopPropagation();
      setSlide(currentIndex - 1);
    });

    card.querySelector('.project-card__nav--next')?.addEventListener('click', (e) => {
      e.stopPropagation();
      setSlide(currentIndex + 1);
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        setSlide(idx);
      });
    });
  }

  // Lightbox on image click
  const imgArea = card.querySelector('.project-card__image');
  imgArea?.addEventListener('click', (e) => {
    if (e.target.closest('.project-card__nav') || e.target.closest('.project-card__dot')) return;
    if (allImages.length > 0) {
      openLightbox(allImages, currentIndex, project.title);
    }
  });

  return card;
}

export function openLightbox(images, initialIndex = 0, title = '') {
  if (!images || !images.length) return;
  let activeIndex = initialIndex;

  let modal = document.getElementById('project-lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'project-lightbox-modal';
    modal.className = 'lightbox-modal';
    document.body.appendChild(modal);
  }

  const renderModal = () => {
    modal.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-container">
        <div class="lightbox-header">
          <div class="lightbox-title">${title} ${images.length > 1 ? `<span class="lightbox-counter">(${activeIndex + 1} of ${images.length})</span>` : ''}</div>
          <button type="button" class="lightbox-close" aria-label="Close">✕</button>
        </div>
        <div class="lightbox-content">
          <img src="${images[activeIndex]}" alt="${title} preview" class="lightbox-image" />
          ${images.length > 1 ? `
            <button type="button" class="lightbox-nav lightbox-nav--prev" aria-label="Previous image">❮</button>
            <button type="button" class="lightbox-nav lightbox-nav--next" aria-label="Next image">❯</button>
          ` : ''}
        </div>
      </div>
    `;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    modal.querySelector('.lightbox-close')?.addEventListener('click', closeModal);
    modal.querySelector('.lightbox-backdrop')?.addEventListener('click', closeModal);

    modal.querySelector('.lightbox-nav--prev')?.addEventListener('click', (e) => {
      e.stopPropagation();
      activeIndex = (activeIndex - 1 + images.length) % images.length;
      renderModal();
    });

    modal.querySelector('.lightbox-nav--next')?.addEventListener('click', (e) => {
      e.stopPropagation();
      activeIndex = (activeIndex + 1) % images.length;
      renderModal();
    });
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKey);
  };

  const handleKey = (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowLeft' && images.length > 1) {
      activeIndex = (activeIndex - 1 + images.length) % images.length;
      renderModal();
    } else if (e.key === 'ArrowRight' && images.length > 1) {
      activeIndex = (activeIndex + 1) % images.length;
      renderModal();
    }
  };

  window.addEventListener('keydown', handleKey);
  renderModal();
}

// Inject project card styles
const style = document.createElement('style');
style.textContent = `
  .project-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: all var(--transition-normal);
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .project-card:hover {
    border-color: rgba(245, 158, 11, 0.4);
    box-shadow: 0 8px 40px rgba(245, 158, 11, 0.15), 0 0 0 1px rgba(245, 158, 11, 0.1);
    transform: translateY(-6px);
  }

  .project-card--featured {
    border-color: rgba(245, 158, 11, 0.35);
    background: linear-gradient(135deg, #111827 0%, #0d1220 100%);
  }

  .project-card__image {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    height: auto;
    overflow: hidden;
    background: #080c14;
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;
    user-select: none;
  }

  .project-card__slides {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .project-card__slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s ease, transform 0.4s ease;
    transform: scale(0.98);
  }

  .project-card__slide.is-active {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1);
  }

  .project-card__slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
    display: block;
  }

  .project-card:hover .project-card__slide.is-active img {
    transform: scale(1.04);
  }

  .project-card__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(8, 12, 20, 0.8);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 5;
    opacity: 0;
    transition: all var(--transition-fast);
  }

  .project-card:hover .project-card__nav {
    opacity: 1;
  }

  .project-card__nav:hover {
    background: var(--accent-blue);
    color: #080c14;
    border-color: var(--accent-blue);
    transform: translateY(-50%) scale(1.1);
  }

  .project-card__nav--prev { left: var(--space-3); }
  .project-card__nav--next { right: var(--space-3); }

  .project-card__dots {
    position: absolute;
    bottom: var(--space-3);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 6px;
    z-index: 5;
    background: rgba(8, 12, 20, 0.65);
    padding: 3px 8px;
    border-radius: var(--radius-full);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .project-card__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.35);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .project-card__dot.is-active {
    width: 16px;
    border-radius: 3px;
    background: var(--accent-blue);
  }

  .project-card__count {
    position: absolute;
    bottom: var(--space-3);
    right: var(--space-3);
    background: rgba(8, 12, 20, 0.75);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: var(--text-muted);
    font-size: 10px;
    font-family: var(--font-mono);
    padding: 2px 7px;
    border-radius: var(--radius-sm);
    z-index: 5;
  }

  /* Lightbox */
  .lightbox-modal {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }

  .lightbox-modal.is-open {
    opacity: 1;
    pointer-events: auto;
  }

  .lightbox-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(4, 6, 12, 0.88);
    backdrop-filter: blur(12px);
  }

  .lightbox-container {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    max-width: 92vw;
    max-height: 90vh;
  }

  .lightbox-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-3);
    color: var(--text-primary);
  }

  .lightbox-title {
    font-size: var(--fs-md);
    font-weight: var(--fw-semi);
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .lightbox-counter {
    color: var(--accent-blue);
    font-size: var(--fs-xs);
    font-family: var(--font-mono);
  }

  .lightbox-close {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .lightbox-close:hover {
    background: rgba(239, 68, 68, 0.8);
    color: #fff;
    transform: scale(1.1);
  }

  .lightbox-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 82vh;
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--border-color);
    box-shadow: 0 20px 60px rgba(0,0,0,0.8);
    background: #000;
  }

  .lightbox-image {
    max-width: 90vw;
    max-height: 80vh;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
  }

  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(8, 12, 20, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .lightbox-nav:hover {
    background: var(--accent-blue);
    color: #080c14;
    border-color: var(--accent-blue);
    transform: translateY(-50%) scale(1.1);
  }

  .lightbox-nav--prev { left: var(--space-4); }
  .lightbox-nav--next { right: var(--space-4); }

  .project-card__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    background: linear-gradient(135deg, #0d1220 0%, #111827 100%);
    color: var(--text-muted);
    font-size: var(--fs-sm);
    font-family: var(--font-mono);
  }

  .project-card__placeholder svg {
    width: 80px;
    height: 80px;
    opacity: 0.7;
  }

  .project-card__featured-badge {
    position: absolute;
    top: var(--space-3);
    left: var(--space-3);
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.95), rgba(251, 146, 60, 0.95));
    color: #080c14;
    font-size: var(--fs-xs);
    font-weight: var(--fw-bold);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-sm);
    backdrop-filter: blur(8px);
  }

  .project-card__category {
    position: absolute;
    top: var(--space-3);
    right: var(--space-3);
    background: rgba(8, 12, 20, 0.85);
    color: var(--text-muted);
    font-size: var(--fs-xs);
    font-family: var(--font-mono);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    backdrop-filter: blur(8px);
  }

  .project-card__body {
    padding: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    flex: 1;
  }

  .project-card__title {
    font-size: var(--fs-lg);
    font-weight: var(--fw-bold);
    color: var(--text-primary);
    line-height: 1.3;
  }

  .project-card__desc {
    font-size: var(--fs-sm);
    color: var(--text-secondary);
    line-height: 1.65;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .project-card--featured .project-card__desc {
    -webkit-line-clamp: 4;
  }

  .project-card__features {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .project-card__features li {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    font-size: var(--fs-xs);
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .feature-dot {
    color: var(--accent-blue);
    flex-shrink: 0;
    font-size: 0.65rem;
    margin-top: 2px;
  }

  .project-card__tech {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: auto;
  }

  .project-card__actions {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
    margin-top: var(--space-2);
  }


`;
document.head.appendChild(style);
