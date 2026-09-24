import { createProjectCard } from '../components/projectCard.js';
import { projectService } from '../services/projectService.js';
import { observeReveal } from '../utils/scrollReveal.js';

// Seed projects shown when backend is unavailable
const SEED_PROJECTS = [
  {
    _id: 'seed-1',
    title: 'AI Workspace',
    description: 'Production-ready AI platform for business productivity and event management, powered by LLM-based agents and dynamic tool calling. Implemented LLM-based tool calling that dynamically selects and executes appropriate tools based on user intent, enabling automated multi-step workflows across RAG, web search, document generation, and AI services.',
    features: [
      'AI Chat with dynamic tool selection',
      'RAG Knowledge Assistant',
      'Web Search integration',
      'AI Estimate Generator',
      'AI File Generator',
      'Event Image Enhancer',
      'File Management System',
    ],
    technologies: ['AI Agents', 'OpenAI', 'RAG', 'ChromaDB', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
    githubUrl: '',
    demoUrl: '',
    imageUrl: '',
    featured: true,
    published: true,
    category: 'AI Agent Platform',
    order: 0,
  },
  {
    _id: 'seed-2',
    title: 'AI Time Travel Photobooth',
    description: 'Generative AI photobooth application that transforms user photos into different historical eras and futuristic time periods using advanced image generation and prompt engineering.',
    features: [
      'Historical time-period photo transformations',
      'Futuristic era transformations',
      'Gemini-powered image generation',
      'Advanced prompt engineering pipeline',
      'AI image processing workflow',
    ],
    technologies: ['Generative AI', 'Google Gemini', 'Image Generation', 'Prompt Engineering', 'FastAPI', 'Python'],
    githubUrl: '',
    demoUrl: '',
    imageUrl: '',
    featured: false,
    published: true,
    category: 'Generative AI',
    order: 1,
  },
];

export function createProjects() {
  const section = document.createElement('section');
  section.id = 'projects';
  section.className = 'section';

  section.innerHTML = `
    <div class="container">
      <div class="section-header text-center">
        <div class="section-label reveal"><span class="dot"></span>Projects</div>
        <h2 class="section-title reveal">AI-Powered <span>Work</span></h2>
        <p class="section-subtitle reveal" style="margin:0 auto;">
          Real-world AI applications — from AI Agent platforms with dynamic tool calling to generative image systems.
        </p>
      </div>

      <div id="projects-grid" class="projects-grid">
        <div class="projects-loading" id="projects-loading">
          <div class="spinner"></div>
          <span>Loading projects...</span>
        </div>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-6);
    }

    .projects-loading {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-4);
      padding: var(--space-16);
      color: var(--text-muted);
      font-size: var(--fs-sm);
    }

    .projects-empty {
      grid-column: 1 / -1;
      text-align: center;
      padding: var(--space-16);
      color: var(--text-muted);
    }

    .projects-empty h3 {
      font-size: var(--fs-xl);
      color: var(--text-secondary);
      margin-bottom: var(--space-2);
    }

    @media (max-width: 768px) {
      .projects-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);

  return section;
}

export async function initProjects() {
  const grid = document.getElementById('projects-grid');
  const loading = document.getElementById('projects-loading');
  if (!grid) return;

  try {
    const data = await projectService.getPublishedProjects();
    const projects = data.data && data.data.length > 0 ? data.data : SEED_PROJECTS;
    renderProjects(grid, projects);
  } catch {
    // Backend unavailable — show seed projects
    renderProjects(grid, SEED_PROJECTS);
  }
}

function renderProjects(grid, projects) {
  grid.innerHTML = '';

  if (!projects || projects.length === 0) {
    grid.innerHTML = `
      <div class="projects-empty">
        <h3>No Projects Yet</h3>
        <p>Projects will appear here once added via the admin panel.</p>
      </div>`;
    return;
  }

  // Featured first
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);
  const ordered = [...featured, ...rest];

  ordered.forEach((project, i) => {
    const card = createProjectCard(project, false);
    card.style.transitionDelay = `${i * 80}ms`;
    grid.appendChild(card);
  });

  // Trigger scroll reveal for newly added cards
  observeReveal(grid);
}
