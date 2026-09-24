import { experienceService } from '../services/experienceService.js';
import { observeReveal } from '../utils/scrollReveal.js';

const EXPERIENCES = [
  {
    title: 'Software Developer / AI Engineer',
    company: 'Beats Production Pvt Ltd',
    period: 'May 2025 – Present',
    location: 'Bengaluru, India',
    type: 'Full-time',
    current: true,
    highlights: [
      'Developed AI-powered applications using Generative AI, Large Language Models, RAG, and LLM-based agents',
      'Implemented dynamic tool calling where the AI automatically selects and invokes appropriate tools based on user intent without requiring manual tool selection',
      'Integrated OpenAI, Google Gemini, and Hugging Face APIs for AI-driven image transformation and intelligent content generation',
      'Built Python and FastAPI AI backends to serve LLM-based agents and AI models at scale',
      'Deployed applications to AWS cloud infrastructure using Docker containers',
      'Designed and refined prompts for AI image generation and evaluated model outputs across RAG and generative workflows',
    ],
    tags: ['AI Agents', 'Tool Calling', 'LLMs', 'RAG', 'Generative AI', 'OpenAI', 'Google Gemini', 'Python', 'FastAPI', 'AWS', 'Docker'],
    accent: 'blue',
  },
  {
    title: 'MERN Stack Intern',
    company: 'Profimax Digiconnect Pvt Ltd',
    period: 'Oct 2024 – Apr 2025',
    location: 'India',
    type: 'Internship',
    current: false,
    highlights: [
      'Developed AI chatbot backends using Python, integrating NLP and conversational AI capabilities for intelligent user interactions',
      'Built React.js-based chatbot UI components enabling seamless AI-driven frontend interaction',
      'Integrated chatbot functionality with REST APIs and backend services to power AI-driven workflows',
      'Worked on JavaScript-driven frontend and backend AI integration flows',
      'Contributed to full-stack AI-powered features across the MERN stack',
    ],
    tags: ['Python', 'AI Chatbot', 'NLP', 'AI-driven Workflows', 'React.js', 'JavaScript', 'REST APIs', 'Node.js'],
    accent: 'violet',
  },
];

function renderExperienceTimeline(container, items) {
  if (!container) return;
  container.innerHTML = items.map((exp, i) => `
    <div class="timeline-item reveal" style="transition-delay: ${i * 150}ms">
      <div class="timeline-marker">
        <div class="timeline-dot timeline-dot--${exp.accent || 'blue'}">
          ${exp.current ? '<span class="timeline-dot-pulse"></span>' : ''}
        </div>
        ${i < items.length - 1 ? '<div class="timeline-line"></div>' : ''}
      </div>

      <div class="timeline-card">
        <div class="timeline-card__header">
          <div class="timeline-card__meta">
            <div class="timeline-card__period">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ${exp.period || ''}
            </div>
            <div class="timeline-card__location">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${exp.location || ''}
            </div>
          </div>
          <div class="timeline-badge ${exp.current ? 'timeline-badge--current' : 'timeline-badge--past'}">
            ${exp.current ? '● Current' : 'Completed'}
          </div>
        </div>

        <h3 class="timeline-card__title">${exp.title}</h3>
        <div class="timeline-card__company">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
          ${exp.company}
          <span class="timeline-type-badge">${exp.type || 'Full-time'}</span>
        </div>

        <ul class="timeline-card__highlights">
          ${(exp.highlights || []).map(h => `
            <li>
              <span class="timeline-bullet">▹</span>
              ${h}
            </li>
          `).join('')}
        </ul>

        <div class="timeline-card__tags">
          ${(exp.tags || []).map(t => `<span class="badge badge-${exp.accent === 'violet' ? 'violet' : 'blue'}">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
  observeReveal(container);
}

export function createExperience() {
  const section = document.createElement('section');
  section.id = 'experience';
  section.className = 'section section-alt';

  section.innerHTML = `
    <div class="container">
      <div class="section-header text-center">
        <div class="section-label reveal"><span class="dot"></span>Experience</div>
        <h2 class="section-title reveal">Professional <span>Journey</span></h2>
        <p class="section-subtitle reveal" style="margin:0 auto;">
          Building AI Agents, LLM-powered systems, and generative AI applications in production.
        </p>
      </div>

      <div class="timeline" id="experience-timeline">
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 0;
      max-width: 860px;
      margin: 0 auto;
    }

    .timeline-item {
      display: grid;
      grid-template-columns: 40px 1fr;
      gap: var(--space-6);
    }

    .timeline-marker {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: var(--space-6);
    }

    .timeline-dot {
      position: relative;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      flex-shrink: 0;
      z-index: 1;
    }

    .timeline-dot--blue {
      background: var(--accent-blue);
      box-shadow: 0 0 16px rgba(59, 130, 246, 0.6);
    }

    .timeline-dot--violet {
      background: var(--accent-violet);
      box-shadow: 0 0 16px rgba(139, 92, 246, 0.6);
    }

    .timeline-dot-pulse {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: inherit;
      opacity: 0.3;
      animation: pulse 2s ease-in-out infinite;
    }

    .timeline-line {
      flex: 1;
      width: 1px;
      background: linear-gradient(180deg, var(--accent-blue) 0%, transparent 100%);
      opacity: 0.3;
      margin: var(--space-2) 0;
      min-height: 40px;
    }

    .timeline-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: var(--space-6);
      margin-bottom: var(--space-6);
      transition: all var(--transition-normal);
      position: relative;
      overflow: hidden;
    }

    .timeline-card::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: var(--gradient-primary);
      opacity: 0;
      transition: opacity var(--transition-normal);
    }

    .timeline-card:hover {
      border-color: var(--border-color-hover);
      box-shadow: var(--shadow-blue);
      transform: translateX(4px);
    }

    .timeline-card:hover::before {
      opacity: 1;
    }

    .timeline-card__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
      flex-wrap: wrap;
    }

    .timeline-card__meta {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    .timeline-card__period,
    .timeline-card__location {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--fs-xs);
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .timeline-badge {
      padding: 0.2rem 0.7rem;
      border-radius: var(--radius-full);
      font-size: var(--fs-xs);
      font-weight: var(--fw-semi);
      flex-shrink: 0;
    }

    .timeline-badge--current {
      background: rgba(34, 197, 94, 0.1);
      color: #86efac;
      border: 1px solid rgba(34, 197, 94, 0.3);
    }

    .timeline-badge--past {
      background: var(--bg-glass-light);
      color: var(--text-muted);
      border: 1px solid var(--border-color);
    }

    .timeline-card__title {
      font-size: var(--fs-xl);
      font-weight: var(--fw-bold);
      color: var(--text-primary);
      margin-bottom: var(--space-2);
    }

    .timeline-card__company {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--fs-sm);
      color: var(--accent-blue);
      font-weight: var(--fw-medium);
      margin-bottom: var(--space-4);
      flex-wrap: wrap;
    }

    .timeline-type-badge {
      font-size: var(--fs-xs);
      color: var(--text-muted);
      background: var(--bg-glass-light);
      border: 1px solid var(--border-color);
      padding: 0.15rem 0.5rem;
      border-radius: var(--radius-full);
    }

    .timeline-card__highlights {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
    }

    .timeline-card__highlights li {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
      font-size: var(--fs-sm);
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .timeline-bullet {
      color: var(--accent-blue);
      flex-shrink: 0;
      font-size: 0.7rem;
      margin-top: 4px;
    }

    .timeline-card__tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    @media (max-width: 640px) {
      .timeline-item { grid-template-columns: 28px 1fr; gap: var(--space-3); }
      .timeline-card { padding: var(--space-4); }
      .timeline-card__title { font-size: var(--fs-lg); }
    }
  `;
  document.head.appendChild(style);

  return section;
}

export async function initExperience() {
  const container = document.getElementById('experience-timeline');
  if (!container) return;

  // Render initial fallback right away so page is never empty
  renderExperienceTimeline(container, EXPERIENCES);

  try {
    const data = await experienceService.getExperience();
    if (data && data.length > 0) {
      renderExperienceTimeline(container, data);
    }
  } catch (err) {
    console.warn('Using default experience items due to fetch error:', err);
  }
}

