export function createEducation() {
  const section = document.createElement('section');
  section.id = 'education';
  section.className = 'section section-alt';

  section.innerHTML = `
    <div class="container">
      <div class="section-header text-center">
        <div class="section-label reveal"><span class="dot"></span>Education</div>
        <h2 class="section-title reveal">Academic <span>Background</span></h2>
      </div>

      <div class="education-grid">
        <div class="edu-card card reveal-scale">
          <div class="edu-card__icon">🎓</div>
          <div class="edu-card__content">
            <div class="edu-card__degree">Jun 2021 – Apr 2024</div>
            <div class="edu-card__field gradient-text">B.Sc. Computer Science</div>
            <div class="edu-card__school">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
              Sri Ramakrishna Mission Vidyalaya College of Arts and Science
            </div>
            <div class="edu-card__location">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Coimbatore, India
            </div>
          </div>
          <div class="edu-card__meta">
            <span class="badge badge-blue">Computer Science</span>
            <span class="badge badge-blue">Jun 2021 – Apr 2024</span>
          </div>
        </div>

        <div class="edu-card edu-card--certifications card reveal-scale" style="transition-delay:100ms">
          <div class="edu-card__cert-title">
            <span>🏆</span>
            Self-Directed AI Learning
          </div>
          <p class="edu-card__cert-desc">
            Continuously learning through hands-on projects, AI API documentation, open-source experimentation,
            and building real-world Generative AI applications with LLMs, RAG systems, and AI APIs.
          </p>
          <div class="edu-card__topics">
            <span class="skill-chip skill-chip--blue">Generative AI</span>
            <span class="skill-chip skill-chip--violet">LLMs</span>
            <span class="skill-chip skill-chip--cyan">RAG Systems</span>
            <span class="skill-chip skill-chip--blue">Prompt Engineering</span>
            <span class="skill-chip skill-chip--violet">AI APIs</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .education-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-6);
      max-width: 860px;
      margin: 0 auto;
    }

    .edu-card {
      padding: var(--space-6);
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      transition: all var(--transition-normal);
    }

    .edu-card:hover {
      border-color: var(--accent-blue);
      box-shadow: 0 8px 30px var(--accent-blue-glow-sm);
      transform: translateY(-4px);
    }

    .edu-card__icon {
      font-size: 2.5rem;
      width: 64px;
      height: 64px;
      background: var(--accent-blue-glow-sm);
      border: 1px solid rgba(245, 158, 11, 0.25);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-normal);
    }

    .edu-card:hover .edu-card__icon {
      background: var(--accent-blue-glow);
      border-color: var(--accent-blue);
      transform: scale(1.05);
    }

    .edu-card__content {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    .edu-card__degree {
      font-size: var(--fs-sm);
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .edu-card__field {
      font-size: var(--fs-xl);
      font-weight: var(--fw-bold);
      line-height: 1.3;
    }

    .edu-card__school {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
      font-size: var(--fs-sm);
      color: var(--text-secondary);
      margin-top: var(--space-2);
      line-height: 1.4;
    }

    .edu-card__location {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--fs-xs);
      color: var(--text-muted);
      margin-top: var(--space-1);
    }

    .edu-card__school svg,
    .edu-card__location svg {
      flex-shrink: 0;
      color: var(--accent-blue);
      margin-top: 2px;
    }

    .edu-card__meta {
      display: flex;
      gap: var(--space-2);
      flex-wrap: wrap;
    }

    .edu-card--certifications {
      background: linear-gradient(135deg, var(--accent-blue-glow-sm) 0%, rgba(251, 146, 60, 0.05) 100%);
      border-color: rgba(245, 158, 11, 0.25);
    }

    .edu-card__cert-title {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      font-size: var(--fs-lg);
      font-weight: var(--fw-bold);
      color: var(--text-primary);
    }

    .edu-card__cert-desc {
      font-size: var(--fs-sm);
      color: var(--text-secondary);
      line-height: 1.7;
    }

    .edu-card__topics {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    @media (max-width: 680px) {
      .education-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);

  return section;
}
