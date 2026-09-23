/**
 * AI Architecture Section
 * Visual end-to-end architecture diagram showing how AI systems are built and connected.
 */

import { observeReveal } from '../utils/scrollReveal.js';

const ARCH_LAYERS = [
  {
    id: 'user-app',
    label: 'User Application',
    sublabel: 'Web / API Client',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    pills: [],
    accent: false,
  },
  {
    id: 'backend',
    label: 'FastAPI Backend',
    sublabel: 'Orchestration Layer',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    pills: ['Python', 'FastAPI', 'REST APIs'],
    accent: false,
  },
  {
    id: 'ai-proc',
    label: 'AI Processing Layer',
    sublabel: 'Prompt + Context Assembly',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>',
    pills: [],
    accent: false,
  },
  {
    id: 'llm',
    label: 'LLM / Generative AI',
    sublabel: 'Language & Image Models',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"/><circle cx="12" cy="14" r="2"/></svg>',
    pills: ['OpenAI', 'Google Gemini', 'Hugging Face'],
    accent: true,
  },
  {
    id: 'rag',
    label: 'RAG / Vector Search',
    sublabel: 'Retrieval & Context Injection',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>',
    pills: ['Embeddings', 'Vector Search', 'ChromaDB'],
    accent: false,
  },
  {
    id: 'db',
    label: 'ChromaDB / PostgreSQL',
    sublabel: 'Persistent Storage',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="5" rx="2"/><rect x="2" y="11" width="20" height="5" rx="2"/><rect x="2" y="19" width="20" height="2" rx="1"/></svg>',
    pills: [],
    accent: false,
  },
  {
    id: 'deploy',
    label: 'AWS / Docker Deployment',
    sublabel: 'Cloud Infrastructure',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>',
    pills: ['Docker', 'AWS', 'EC2'],
    accent: false,
  },
];

export function createAiArchitecture() {
  const section = document.createElement('section');
  section.id = 'ai-architecture';
  section.className = 'section';

  const layersHTML = ARCH_LAYERS.map((layer, i) => {
    const pillsHTML = layer.pills.length
      ? '<div class="arch-layer-pills">' + layer.pills.map(p => '<span class="arch-pill">' + p + '</span>').join('') + '</div>'
      : '';
    const connector = i < ARCH_LAYERS.length - 1
      ? '<div class="arch-connector"><div class="arch-connector-line"></div><div class="arch-connector-arrow"></div></div>'
      : '';
    return (
      '<div class="arch-layer-wrap reveal" style="transition-delay:' + (i * 70) + 'ms;">' +
        '<div class="arch-layer' + (layer.accent ? ' arch-layer--accent' : '') + '">' +
          '<div class="arch-layer-left">' +
            '<div class="arch-layer-icon">' + layer.icon + '</div>' +
            '<div class="arch-layer-text">' +
              '<span class="arch-layer-label">' + layer.label + '</span>' +
              '<span class="arch-layer-sublabel">' + layer.sublabel + '</span>' +
            '</div>' +
          '</div>' +
          pillsHTML +
        '</div>' +
        connector +
      '</div>'
    );
  }).join('');

  section.innerHTML =
    '<div class="container">' +
      '<div class="section-header text-center">' +
        '<div class="section-label reveal"><span class="dot"></span>System Design</div>' +
        '<h2 class="section-title reveal">AI <span>Architecture</span></h2>' +
        '<p class="section-subtitle reveal" style="margin: 0 auto; max-width: 660px;">Designing end-to-end AI workflows that connect applications, backend services, AI models, retrieval systems, databases, and cloud infrastructure.</p>' +
      '</div>' +
      '<div class="arch-diagram-wrap">' +
        '<div class="arch-diagram reveal">' + layersHTML + '</div>' +
        '<div class="arch-sidebar reveal-right">' +
          '<div class="arch-sidebar-card">' +
            '<h4 class="arch-sidebar-title">What this shows</h4>' +
            '<ul class="arch-sidebar-list">' +
              '<li>End-to-end request flow from user to AI model</li>' +
              '<li>RAG pipeline for context-aware responses</li>' +
              '<li>Separation of AI logic from application logic</li>' +
              '<li>Persistent storage for vectors and relational data</li>' +
              '<li>Containerised cloud deployment on AWS EC2</li>' +
            '</ul>' +
          '</div>' +
          '<div class="arch-sidebar-card">' +
            '<h4 class="arch-sidebar-title">Demonstrated in</h4>' +
            '<a href="#projects" class="arch-project-ref">' +
              '<span class="arch-project-ref-name">AI Workspace</span>' +
              '<span class="arch-project-ref-desc">Full-stack RAG platform — FastAPI + OpenAI + ChromaDB + PostgreSQL + Docker + AWS</span>' +
              '<span class="arch-project-ref-link">View Project &rarr;</span>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  const style = document.createElement('style');
  style.textContent = [
    '.arch-diagram-wrap{display:grid;grid-template-columns:1fr 300px;gap:var(--space-8);align-items:start;}',
    '.arch-diagram{display:flex;flex-direction:column;align-items:stretch;}',
    '.arch-layer-wrap{display:flex;flex-direction:column;align-items:center;}',
    '.arch-layer{width:100%;display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);padding:var(--space-4) var(--space-5);background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-lg);transition:all var(--transition-normal);}',
    '.arch-layer:hover{border-color:var(--accent-blue);box-shadow:0 4px 20px var(--accent-blue-glow-sm);}',
    '.arch-layer--accent{border-color:rgba(245,158,11,0.35);background:linear-gradient(135deg,var(--bg-card),rgba(245,158,11,0.04));}',
    '.arch-layer--accent:hover{box-shadow:0 4px 24px rgba(245,158,11,0.2);}',
    '.arch-layer-left{display:flex;align-items:center;gap:var(--space-3);}',
    '.arch-layer-icon{width:38px;height:38px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--accent-blue-glow-sm);border:1px solid rgba(245,158,11,0.2);border-radius:var(--radius-md);color:var(--accent-blue);}',
    '.arch-layer-text{display:flex;flex-direction:column;gap:2px;}',
    '.arch-layer-label{font-size:var(--fs-sm);font-weight:var(--fw-semi);color:var(--text-primary);line-height:1.2;}',
    '.arch-layer-sublabel{font-size:var(--fs-xs);color:var(--text-muted);}',
    '.arch-layer-pills{display:flex;gap:var(--space-2);flex-wrap:wrap;}',
    '.arch-pill{padding:3px 10px;background:var(--accent-blue-glow-sm);border:1px solid rgba(245,158,11,0.22);border-radius:var(--radius-full);font-size:0.68rem;font-weight:var(--fw-medium);color:var(--accent-blue);white-space:nowrap;}',
    '.arch-connector{display:flex;flex-direction:column;align-items:center;gap:0;width:100%;padding:2px 0;}',
    '.arch-connector-line{width:2px;height:20px;background:linear-gradient(to bottom,var(--accent-blue),rgba(245,158,11,0.3));}',
    '.arch-connector-arrow{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:6px solid rgba(245,158,11,0.5);}',
    '.arch-sidebar{display:flex;flex-direction:column;gap:var(--space-4);position:sticky;top:calc(var(--nav-height) + var(--space-4));}',
    '.arch-sidebar-card{padding:var(--space-5);background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-xl);}',
    '.arch-sidebar-title{font-size:var(--fs-sm);font-weight:var(--fw-semi);color:var(--text-primary);margin-bottom:var(--space-3);}',
    '.arch-sidebar-list{display:flex;flex-direction:column;gap:var(--space-2);}',
    '.arch-sidebar-list li{font-size:var(--fs-xs);color:var(--text-muted);line-height:1.5;padding-left:var(--space-4);position:relative;}',
    '.arch-sidebar-list li::before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;border-radius:50%;background:var(--accent-blue);}',
    '.arch-project-ref{display:flex;flex-direction:column;gap:var(--space-2);padding:var(--space-4);background:var(--bg-glass-light);border:1px solid var(--border-color);border-radius:var(--radius-lg);text-decoration:none;color:inherit;transition:all var(--transition-fast);}',
    '.arch-project-ref:hover{border-color:var(--accent-blue);}',
    '.arch-project-ref-name{font-size:var(--fs-sm);font-weight:var(--fw-bold);color:var(--text-primary);}',
    '.arch-project-ref-desc{font-size:var(--fs-xs);color:var(--text-muted);line-height:1.5;}',
    '.arch-project-ref-link{font-size:var(--fs-xs);font-weight:var(--fw-semi);color:var(--accent-blue);}',
    '@media(max-width:900px){',
      '.arch-diagram-wrap{grid-template-columns:1fr;}',
      '.arch-sidebar{position:static;margin-top:var(--space-6);}',
    '}',
    '@media(max-width:600px){',
      '.arch-layer{flex-direction:column;align-items:flex-start;gap:var(--space-3);}',
      '.arch-layer-pills{width:100%;}',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  return section;
}

export function initAiArchitecture() {
  const section = document.getElementById('ai-architecture');
  if (!section) return;
  observeReveal(section);
}
