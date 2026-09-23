/**
 * AI Engineering Section
 */

import { observeReveal } from '../utils/scrollReveal.js';

const CAPABILITIES = [
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"/><circle cx="12" cy="14" r="2"/></svg>',
    title: 'LLM & Generative AI Integration',
    desc: 'Integrating large language models into applications — text generation, structured outputs, function calling, and multi-turn conversations.',
  },
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>',
    title: 'RAG & Vector Search',
    desc: 'Building Retrieval-Augmented Generation pipelines with vector databases, embeddings, and semantic search for context-aware AI responses.',
  },
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    title: 'Prompt Engineering',
    desc: 'Designing and optimizing prompts — few-shot examples, chain-of-thought reasoning, output structuring, and iterative prompt refinement.',
  },
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    title: 'AI API Integration',
    desc: 'Connecting applications to OpenAI, Google Gemini, and Hugging Face APIs — authentication, rate limiting, error handling, and response parsing.',
  },
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    title: 'AI Backend Development',
    desc: 'Building FastAPI backends that orchestrate AI workflows — async processing, session management, streaming responses, and database integration.',
  },
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    title: 'AI Application Deployment',
    desc: 'Deploying AI applications to production using Docker containers on AWS EC2 — infrastructure setup, environment configuration, and monitoring.',
  },
];

const FEATURED_PROJECTS = [
  {
    name: 'AI Workspace',
    category: 'AI Platform',
    summary: 'Production RAG platform with AI Chat, Knowledge Assistant, Web Search, and automated document workflows.',
    tags: ['FastAPI', 'OpenAI', 'ChromaDB', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    name: 'AI Time Travel Photobooth',
    category: 'Generative AI',
    summary: 'Generative AI application transforming user photos into historical eras using advanced image generation and prompt engineering.',
    tags: ['Generative AI', 'Google Gemini', 'Python', 'FastAPI', 'Prompt Engineering'],
  },
];

export function createAiEngineering() {
  const section = document.createElement('section');
  section.id = 'ai-engineering';
  section.className = 'section section-alt';

  const capCardsHTML = CAPABILITIES.map((cap, i) =>
    '<div class="aie-cap-card reveal-scale" style="transition-delay: ' + (i * 55) + 'ms;">' +
    '<div class="aie-cap-icon">' + cap.icon + '</div>' +
    '<div class="aie-cap-body">' +
    '<h3 class="aie-cap-title">' + cap.title + '</h3>' +
    '<p class="aie-cap-desc">' + cap.desc + '</p>' +
    '</div>' +
    '</div>'
  ).join('');

  const projCardsHTML = FEATURED_PROJECTS.map(p =>
    '<a href="#projects" class="aie-project-card">' +
    '<div class="aie-project-card__top"><span class="aie-project-cat">' + p.category + '</span></div>' +
    '<h4 class="aie-project-name">' + p.name + '</h4>' +
    '<p class="aie-project-summary">' + p.summary + '</p>' +
    '<div class="aie-project-tags">' + p.tags.map(t => '<span class="skill-chip">' + t + '</span>').join('') + '</div>' +
    '<span class="aie-project-link">View Projects &rarr;</span>' +
    '</a>'
  ).join('');

  section.innerHTML =
    '<div class="container">' +
    '<div class="section-header text-center">' +
    '<div class="section-label reveal"><span class="dot"></span>Capabilities</div>' +
    '<h2 class="section-title reveal">AI <span>Engineering</span></h2>' +
    '<p class="section-subtitle reveal" style="margin: 0 auto; max-width: 660px;">Building practical AI systems by combining Generative AI, LLMs, RAG, prompt engineering, AI APIs, and backend services.</p>' +
    '</div>' +
    '<div class="aie-caps-grid">' + capCardsHTML + '</div>' +
    '<p class="aie-summary reveal">Experienced in integrating AI models with production applications, developing intelligent workflows, building AI-powered backend services, and deploying scalable AI solutions.</p>' +
    '<div class="aie-projects-row">' +
    '<p class="aie-projects-label reveal">Applied in production projects:</p>' +
    '<div class="aie-projects-cards reveal">' + projCardsHTML + '</div>' +
    '</div>' +
    '</div>';

  const style = document.createElement('style');
  style.textContent = [
    '.aie-caps-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:var(--space-4);margin-bottom:var(--space-8);}',
    '.aie-cap-card{display:flex;align-items:flex-start;gap:var(--space-4);padding:var(--space-5);background:var(--bg-primary);border:1px solid var(--border-color);border-radius:var(--radius-xl);transition:all var(--transition-normal);position:relative;overflow:hidden;}',
    '.aie-cap-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:var(--gradient-primary);opacity:0;transition:opacity var(--transition-normal);}',
    '.aie-cap-card:hover{border-color:var(--accent-blue);transform:translateY(-4px);box-shadow:0 8px 30px var(--accent-blue-glow-sm);}',
    '.aie-cap-card:hover::before{opacity:1;}',
    '.aie-cap-icon{width:44px;height:44px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--accent-blue-glow-sm);border:1px solid rgba(245,158,11,0.22);border-radius:var(--radius-md);color:var(--accent-blue);transition:all var(--transition-normal);}',
    '.aie-cap-card:hover .aie-cap-icon{background:var(--accent-blue-glow);border-color:var(--accent-blue);transform:scale(1.05);}',
    '.aie-cap-body{display:flex;flex-direction:column;gap:4px;}',
    '.aie-cap-title{font-size:var(--fs-sm);font-weight:var(--fw-semi);color:var(--text-primary);line-height:1.3;}',
    '.aie-cap-desc{font-size:var(--fs-xs);color:var(--text-muted);line-height:1.6;}',
    '.aie-summary{font-size:var(--fs-sm);color:var(--text-secondary);line-height:1.75;max-width:760px;margin:0 auto var(--space-10);text-align:center;padding:var(--space-5) var(--space-6);background:var(--bg-glass-light);border:1px solid var(--border-color);border-left:3px solid var(--accent-blue);border-radius:var(--radius-lg);}',
    '.aie-projects-row{display:flex;flex-direction:column;gap:var(--space-4);}',
    '.aie-projects-label{font-size:var(--fs-xs);font-weight:var(--fw-semi);letter-spacing:0.15em;text-transform:uppercase;color:var(--text-muted);text-align:center;}',
    '.aie-projects-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-5);}',
    '.aie-project-card{display:flex;flex-direction:column;gap:var(--space-2);padding:var(--space-5);background:var(--bg-primary);border:1px solid var(--border-color);border-radius:var(--radius-xl);transition:all var(--transition-normal);text-decoration:none;color:inherit;}',
    '.aie-project-card:hover{border-color:var(--accent-blue);box-shadow:0 8px 30px var(--accent-blue-glow-sm);transform:translateY(-3px);}',
    '.aie-project-cat{font-size:var(--fs-xs);font-weight:var(--fw-semi);letter-spacing:0.12em;text-transform:uppercase;color:var(--accent-blue);}',
    '.aie-project-name{font-size:var(--fs-base);font-weight:var(--fw-bold);color:var(--text-primary);}',
    '.aie-project-summary{font-size:var(--fs-xs);color:var(--text-muted);line-height:1.6;flex:1;}',
    '.aie-project-tags{display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-1);}',
    '.aie-project-link{font-size:var(--fs-xs);font-weight:var(--fw-semi);color:var(--accent-blue);margin-top:var(--space-2);transition:color var(--transition-fast);}',
    '.aie-project-card:hover .aie-project-link{color:var(--accent-cyan);}',
    '@media(max-width:768px){.aie-caps-grid{grid-template-columns:1fr;}.aie-projects-cards{grid-template-columns:1fr;}.aie-summary{padding:var(--space-4);}}'
  ].join('\n');
  document.head.appendChild(style);

  return section;
}

export function initAiEngineering() {
  const section = document.getElementById('ai-engineering');
  if (!section) return;
  observeReveal(section);
}
