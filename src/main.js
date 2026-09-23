/**
 * Portfolio SPA — Main Entry Point
 * Hash-based router for public portfolio and admin panel
 */

import './styles/index.css';

import { createNavbar, initNavbar } from './components/navbar.js';
import { createHome, initHome } from './pages/home.js';
import { createAbout } from './pages/about.js';
import { createSkills, initSkills } from './pages/skills.js';
import { createAiEngineering, initAiEngineering } from './pages/aiEngineering.js';
import { createAiArchitecture, initAiArchitecture } from './pages/aiArchitecture.js';
import { createExperience, initExperience } from './pages/experience.js';
import { createProjects, initProjects } from './pages/projects.js';
import { createEducation } from './pages/education.js';
import { createContact, initContact } from './pages/contact.js';
import { initScrollReveal } from './utils/scrollReveal.js';

import { createAdminLogin, initAdminLogin } from './admin/login.js';
import { createAdminDashboard, initAdminDashboard } from './admin/dashboard.js';
import { createProjectList, initProjectList } from './admin/projectList.js';
import { createProjectForm, initProjectForm } from './admin/projectForm.js';
import { createSkillsManager, initSkillsManager } from './admin/skillsManager.js';
import { createExperienceManager, initExperienceManager } from './admin/experienceManager.js';
import { projectService } from './services/projectService.js';
import { authService } from './services/authService.js';

const app = document.getElementById('app');

// ─── Public Portfolio ──────────────────────────────────────────────────────

function renderPortfolio() {
  document.title = 'Jayanth T R | AI Engineer — Generative AI, LLMs, RAG Systems';
  app.innerHTML = '';

  // Navbar
  const nav = createNavbar();
  app.appendChild(nav);

  // Sections
  const sections = [
    createHome(),
    createAbout(),
    createSkills(),
    createAiEngineering(),
    createAiArchitecture(),
    createExperience(),
    createProjects(),
    createEducation(),
    createContact(),
  ];

  sections.forEach(s => app.appendChild(s));

  // Init interactive parts
  requestAnimationFrame(() => {
    initNavbar();
    initHome();
    initSkills();
    initAiEngineering();
    initAiArchitecture();
    initExperience();
    initProjects();
    initContact();
    initScrollReveal();

    // Handle hash jump after render
    const hash = window.location.hash;
    if (hash && hash !== '#home' && !hash.startsWith('#admin')) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 200);
      }
    }
  });
}

// ─── Admin Router ─────────────────────────────────────────────────────────

async function renderAdmin(page, id = null) {
  const isAuth = authService.isAuthenticated();

  if (page === 'login') {
    document.title = 'Admin Login | Jayanth T R Portfolio';
    app.innerHTML = '';

    // Redirect to dashboard if already logged in
    if (isAuth) {
      const valid = await authService.verifyToken();
      if (valid) { renderAdmin('dashboard'); return; }
    }

    const loginPage = createAdminLogin();
    app.appendChild(loginPage);
    initAdminLogin(() => renderAdmin('dashboard'));
    return;
  }

  // Auth guard
  if (!isAuth) {
    window.location.hash = '#admin/login';
    return;
  }

  const valid = await authService.verifyToken();
  if (!valid) {
    window.location.hash = '#admin/login';
    return;
  }

  const navigate = (nextPage, nextId = null) => {
    if (nextId) window.location.hash = `#admin/${nextPage}/${nextId}`;
    else window.location.hash = `#admin/${nextPage}`;
  };

  app.innerHTML = '';

  if (page === 'dashboard' || page === '') {
    document.title = 'Admin Dashboard | Portfolio';
    const dashboard = createAdminDashboard();
    app.appendChild(dashboard);
    initAdminDashboard(navigate);

    // Wire sidebar nav
    setTimeout(() => wireSidebarNav(navigate), 0);
  }

  else if (page === 'projects') {
    document.title = 'Manage Projects | Portfolio Admin';
    const list = createProjectList();
    app.appendChild(list);
    initProjectList(navigate);
    setTimeout(() => wireSidebarNav(navigate), 0);
  }

  else if (page === 'add-project') {
    document.title = 'Add Project | Portfolio Admin';
    const form = createProjectForm(null, navigate);
    app.appendChild(form);
    initProjectForm(null, navigate);
    setTimeout(() => wireSidebarNav(navigate), 0);
  }

  else if (page === 'edit-project' && id) {
    document.title = 'Edit Project | Portfolio Admin';
    try {
      const data = await projectService.getAllProjects();
      const project = data.data?.find(p => p._id === id);
      if (!project) throw new Error('Not found');
      const form = createProjectForm(project, navigate);
      app.appendChild(form);
      initProjectForm(project, navigate);
    } catch {
      window.location.hash = '#admin/projects';
    }
    setTimeout(() => wireSidebarNav(navigate), 0);
  }

  else if (page === 'skills') {
    document.title = 'Manage Skills | Portfolio Admin';
    const sm = createSkillsManager();
    app.appendChild(sm);
    initSkillsManager(navigate);
    setTimeout(() => wireSidebarNav(navigate), 0);
  }

  else if (page === 'experience') {
    document.title = 'Manage Experience | Portfolio Admin';
    const em = createExperienceManager();
    app.appendChild(em);
    initExperienceManager(navigate);
    setTimeout(() => wireSidebarNav(navigate), 0);
  }
}

function wireSidebarNav(navigate) {
  const links = document.querySelectorAll('[data-page]');
  links.forEach(link => {
    link.addEventListener('click', () => navigate(link.dataset.page));
  });
}

// ─── Hash Router ──────────────────────────────────────────────────────────

function handleRoute() {
  const hash = window.location.hash || '';

  if (hash.startsWith('#admin')) {
    // Parse: #admin, #admin/dashboard, #admin/edit-project/abc123
    const parts = hash.replace('#admin', '').replace(/^\//, '').split('/');
    const page = parts[0] || 'dashboard';
    const id = parts[1] || null;
    renderAdmin(page, id);
    return;
  }

  // Public portfolio
  if (!app.querySelector('#home')) {
    renderPortfolio();
  } else {
    // Section already rendered — just scroll to hash
    const target = document.querySelector(hash || '#home');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
}

// ─── Boot ─────────────────────────────────────────────────────────────────

// Initial route
handleRoute();

// Listen for hash changes
window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  if (hash.startsWith('#admin') || !document.querySelector('#home')) {
    handleRoute();
  } else {
    const target = document.querySelector(hash || '#home');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
});
