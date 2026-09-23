import { skillsService } from '../services/skillsService.js';
import { observeReveal } from '../utils/scrollReveal.js';

const SKILL_GROUPS = [
  {
    category: 'Generative AI',
    icon: '🤖',
    skills: ['Generative AI', 'Text Generation', 'Image Generation', 'AI Model Evaluation', 'AI Workflows'],
  },
  {
    category: 'LLMs & RAG',
    icon: '🧠',
    skills: ['Large Language Models', 'RAG Systems', 'Vector Search', 'ChromaDB', 'Embeddings', 'Prompt Engineering'],
  },
  {
    category: 'AI APIs',
    icon: '🔌',
    skills: ['Google Gemini API', 'OpenAI API', 'Hugging Face API', 'AI API Integration'],
  },
  {
    category: 'Programming',
    icon: '💻',
    skills: ['Python', 'JavaScript'],
  },
  {
    category: 'Backend & APIs',
    icon: '⚡',
    skills: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'API Design'],
  },
  {
    category: 'Databases',
    icon: '🗄️',
    skills: ['PostgreSQL', 'MongoDB', 'ChromaDB'],
  },
  {
    category: 'Cloud & Deployment',
    icon: '☁️',
    skills: ['AWS EC2', 'Docker', 'Cloud Deployment'],
  },
  {
    category: 'Developer Tools',
    icon: '🛠️',
    skills: ['Git', 'GitHub', 'Postman', 'VS Code'],
  },
];

function renderSkillCards(container, groups) {
  if (!container) return;
  container.innerHTML = groups.map((group, i) => `
    <div class="skill-group reveal-scale" style="transition-delay: ${i * 60}ms">
      <div class="skill-group__header">
        <span class="skill-group__icon">${group.icon || '⚡'}</span>
        <h3 class="skill-group__title">${group.category}</h3>
      </div>
      <div class="skill-group__chips">
        ${(group.skills || []).map(s => `<span class="skill-chip">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');
  observeReveal(container);
}

export function createSkills() {
  const section = document.createElement('section');
  section.id = 'skills';
  section.className = 'section';

  section.innerHTML = `
    <div class="container">
      <div class="section-header text-center">
        <div class="section-label reveal"><span class="dot"></span>Technical Skills</div>
        <h2 class="section-title reveal">Tools & <span>Technologies</span></h2>
        <p class="section-subtitle reveal" style="margin: 0 auto;">
          A curated stack built around AI engineering — from model APIs to cloud deployment.
        </p>
      </div>

      <div class="skills-grid" id="skills-grid">
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--space-5);
    }

    .skill-group {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: var(--space-5);
      transition: all var(--transition-normal);
      position: relative;
      overflow: hidden;
    }

    .skill-group::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--gradient-primary);
      opacity: 0;
      transition: opacity var(--transition-normal);
    }

    .skill-group:hover {
      border-color: var(--accent-blue);
      transform: translateY(-4px);
      box-shadow: 0 8px 30px var(--accent-blue-glow-sm), 0 0 0 1px var(--accent-blue-glow-sm);
    }

    .skill-group:hover::before {
      opacity: 1;
    }

    .skill-group__header {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-4);
    }

    .skill-group__icon {
      font-size: 1.5rem;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--accent-blue-glow-sm);
      border: 1px solid rgba(245, 158, 11, 0.22);
      border-radius: var(--radius-md);
      flex-shrink: 0;
      color: var(--accent-blue);
      transition: all var(--transition-normal);
    }

    .skill-group:hover .skill-group__icon {
      background: var(--accent-blue-glow);
      border-color: var(--accent-blue);
      transform: scale(1.05);
    }

    .skill-group__title {
      font-size: var(--fs-base);
      font-weight: var(--fw-semi);
      color: var(--text-primary);
    }

    .skill-group__chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .skill-chip {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-sm);
      font-size: var(--fs-xs);
      font-weight: var(--fw-medium);
      transition: all var(--transition-fast);
      cursor: default;
      letter-spacing: 0.04em;
      background: var(--accent-blue-glow-sm);
      color: var(--accent-blue);
      border-left: 2px solid var(--accent-blue);
      border-top: 1px solid rgba(245, 158, 11, 0.18);
      border-right: 1px solid rgba(245, 158, 11, 0.18);
      border-bottom: 1px solid rgba(245, 158, 11, 0.18);
    }

    .skill-chip:hover {
      transform: translateX(3px);
      background: var(--accent-blue-glow);
      border-top-color: var(--accent-blue);
      border-right-color: var(--accent-blue);
      border-bottom-color: var(--accent-blue);
      border-left-color: var(--accent-blue);
      color: var(--accent-blue);
    }

    /* Keep color variant compatibility */
    .skill-chip--blue,
    .skill-chip--violet,
    .skill-chip--cyan {
      background: var(--accent-blue-glow-sm);
      color: var(--accent-blue);
      border-left: 2px solid var(--accent-blue);
      border-top: 1px solid rgba(245, 158, 11, 0.18);
      border-right: 1px solid rgba(245, 158, 11, 0.18);
      border-bottom: 1px solid rgba(245, 158, 11, 0.18);
    }

    .skill-chip--blue:hover,
    .skill-chip--violet:hover,
    .skill-chip--cyan:hover {
      background: var(--accent-blue-glow);
      border-top-color: var(--accent-blue);
      border-right-color: var(--accent-blue);
      border-bottom-color: var(--accent-blue);
      border-left-color: var(--accent-blue);
      color: var(--accent-blue);
    }
  `;
  document.head.appendChild(style);

  return section;
}

export async function initSkills() {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  // Render initial fallback right away so user sees content immediately
  renderSkillCards(container, SKILL_GROUPS);

  try {
    const data = await skillsService.getSkills();
    if (data && data.length > 0) {
      renderSkillCards(container, data);
    }
  } catch (err) {
    console.warn('Using default skill groups due to fetch error:', err);
  }
}

