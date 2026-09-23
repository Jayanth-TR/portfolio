/**
 * Home / Hero Section
 * - Animated neural network canvas
 * - Typing animation
 * - Entrance animations
 */
export function createHome() {
  const section = document.createElement('section');
  section.id = 'home';
  section.className = 'hero-section';

  section.innerHTML = `
    <canvas id="neural-canvas" aria-hidden="true"></canvas>

    <div class="hero-glow-orb hero-glow-1" aria-hidden="true"></div>
    <div class="hero-glow-orb hero-glow-2" aria-hidden="true"></div>

    <div class="container hero-container">
      <div class="hero-content">


        <h1 class="hero-title reveal">
          Building <span class="gradient-text">Intelligent</span><br/>
          Systems with AI
        </h1>

        <p class="hero-subtitle reveal">
          AI Engineer specializing in <span class="hero-type" id="hero-type"></span>
          <span class="hero-cursor" aria-hidden="true">|</span>
        </p>

        <div class="hero-stats reveal stagger-children">
          <div class="hero-stat">
            <span class="hero-stat-value">1.6+</span>
            <span class="hero-stat-label">Years Experience</span>
          </div>
          <div class="hero-stat-divider" aria-hidden="true"></div>
          <div class="hero-stat">
            <span class="hero-stat-value gradient-text">GenAI</span>
            <span class="hero-stat-label">Generative AI</span>
          </div>
          <div class="hero-stat-divider" aria-hidden="true"></div>
          <div class="hero-stat">
            <span class="hero-stat-value gradient-text-cyan">LLMs</span>
            <span class="hero-stat-label">& RAG Systems</span>
          </div>
          <div class="hero-stat-divider" aria-hidden="true"></div>
          <div class="hero-stat">
            <span class="hero-stat-value gradient-text">AI Apps</span>
            <span class="hero-stat-label">Development</span>
          </div>
        </div>

        <div class="hero-actions reveal">
          <a href="#projects" class="btn btn-primary btn-md" id="hero-view-projects">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            View Projects
          </a>
          <a href="#contact" class="btn btn-outline btn-md" id="hero-contact">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Contact Me
          </a>
          <a href="/resume.pdf" download="Jayanth_TR_Resume.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-md" id="hero-resume">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Resume
          </a>
        </div>
      </div>

      <div class="hero-visual reveal-right" aria-hidden="true">
        <div class="hero-card-stack">
          <div class="hero-card hero-card-1">
            <div class="hero-card-icon">🤖</div>
            <span>Generative AI</span>
          </div>
          <div class="hero-card hero-card-2">
            <div class="hero-card-icon">🧠</div>
            <span>LLMs & RAG</span>
          </div>
          <div class="hero-card hero-card-3">
            <div class="hero-card-icon">⚡</div>
            <span>FastAPI & Python</span>
          </div>
          <div class="hero-card hero-card-4">
            <div class="hero-card-icon">☁️</div>
            <span>AWS Cloud</span>
          </div>
          <div class="hero-ring" aria-hidden="true"></div>
          <div class="hero-ring hero-ring-2" aria-hidden="true"></div>
        </div>
      </div>
    </div>

    <div class="hero-scroll-hint reveal" aria-label="Scroll down">
      <span class="hero-scroll-text">Scroll to explore</span>
      <div class="hero-scroll-arrow"></div>
    </div>
  `;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      background: var(--bg-primary);
    }

    #neural-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0.5;
      pointer-events: none;
    }

    .hero-glow-orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      filter: blur(100px);
    }
    .hero-glow-1 {
      width: 600px; height: 600px;
      top: -200px; left: -100px;
      background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%);
    }
    .hero-glow-2 {
      width: 500px; height: 500px;
      bottom: -100px; right: -100px;
      background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%);
    }

    .hero-container {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: var(--space-8);
      align-items: center;
      padding-top: calc(var(--nav-height) + var(--space-3));
      padding-bottom: var(--space-4);
      max-width: 1080px;
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .hero-title {
      font-size: clamp(2rem, 3.8vw, 3.4rem);
      font-weight: var(--fw-bold);
      line-height: 1.15;
      color: var(--text-primary);
    }

    .hero-subtitle {
      font-size: var(--fs-base);
      color: var(--text-secondary);
      line-height: 1.5;
      min-height: auto;
    }

    .hero-type {
      color: var(--accent-blue);
      font-weight: var(--fw-semi);
    }

    .hero-cursor {
      color: var(--accent-blue);
      animation: blink 1s step-end infinite;
      font-weight: var(--fw-light);
    }

    .hero-stats {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-3) var(--space-4);
      background: var(--bg-glass-light);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      width: fit-content;
      backdrop-filter: blur(8px);
    }

    .hero-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .hero-stat-value {
      font-size: var(--fs-lg);
      font-weight: var(--fw-bold);
      line-height: 1;
    }

    .hero-stat-label {
      font-size: var(--fs-xs);
      color: var(--text-muted);
      white-space: nowrap;
      text-align: center;
    }

    .hero-stat-divider {
      width: 1px;
      height: 28px;
      background: var(--border-color);
    }

    .hero-actions {
      display: flex;
      gap: var(--space-3);
      flex-wrap: wrap;
    }

    /* Visual / Cards Stack */
    .hero-visual {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-card-stack {
      position: relative;
      width: 290px;
      height: 290px;
    }

    .hero-card {
      position: absolute;
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-3) var(--space-4);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      font-size: var(--fs-sm);
      font-weight: var(--fw-medium);
      color: var(--text-secondary);
      backdrop-filter: blur(12px);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
      white-space: nowrap;
    }

    .hero-card:hover {
      border-color: var(--accent-blue);
      color: var(--text-primary);
      box-shadow: var(--shadow-blue);
    }

    .hero-card-icon { font-size: 1.25rem; }

    .hero-card-1 {
      top: 20px; left: 10px;
      animation: float 4s ease-in-out infinite;
    }
    .hero-card-2 {
      top: 80px; right: 0px;
      animation: float 4.5s ease-in-out infinite 0.5s;
    }
    .hero-card-3 {
      bottom: 80px; left: 0px;
      animation: float 5s ease-in-out infinite 1s;
    }
    .hero-card-4 {
      bottom: 20px; right: 10px;
      animation: float 4.2s ease-in-out infinite 1.5s;
    }

    .hero-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 180px;
      height: 180px;
      border-radius: 50%;
      border: 1px solid rgba(59, 130, 246, 0.15);
      animation: spin 12s linear infinite;
    }

    .hero-ring::before {
      content: '';
      position: absolute;
      top: -4px;
      left: 50%;
      width: 8px;
      height: 8px;
      background: var(--accent-blue);
      border-radius: 50%;
      transform: translateX(-50%);
      box-shadow: 0 0 12px var(--accent-blue);
    }

    .hero-ring-2 {
      width: 240px;
      height: 240px;
      border-color: rgba(139, 92, 246, 0.1);
      animation: spin 18s linear infinite reverse;
    }

    .hero-ring-2::before {
      background: var(--accent-violet);
      box-shadow: 0 0 12px var(--accent-violet);
    }

    /* Scroll hint */
    .hero-scroll-hint {
      position: absolute;
      bottom: var(--space-2);
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      z-index: 1;
      opacity: 0.7;
    }

    @media (max-height: 700px) {
      .hero-scroll-hint {
        display: none;
      }
    }

    .hero-scroll-text {
      font-size: var(--fs-xs);
      color: var(--text-muted);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .hero-scroll-arrow {
      width: 24px;
      height: 24px;
      border-right: 2px solid var(--text-muted);
      border-bottom: 2px solid var(--text-muted);
      transform: rotate(45deg);
      animation: float 2s ease-in-out infinite;
    }

    @media (max-width: 900px) {
      .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .hero-badge { margin: 0 auto; }
      .hero-stats { margin: 0 auto; }
      .hero-actions { justify-content: center; }
      .hero-visual { display: none; }
    }

    @media (max-width: 600px) {
      .hero-stats {
        flex-direction: column;
        gap: var(--space-3);
      }
      .hero-stat-divider { width: 60px; height: 1px; }
      .hero-actions { flex-direction: column; align-items: center; }
    }
  `;
  document.head.appendChild(style);

  return section;
}

export function initHome() {
  // Typing animation
  const phrases = [
    'Generative AI',
    'Large Language Models',
    'RAG Systems',
    'AI Chatbots',
    'Prompt Engineering',
    'AI-powered Applications',
  ];
  const typeEl = document.getElementById('hero-type');
  if (typeEl) {
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let paused = false;

    function type() {
      const current = phrases[phraseIdx];
      if (paused) {
        paused = false;
        setTimeout(type, 1800);
        return;
      }
      if (!deleting) {
        typeEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          paused = true;
          deleting = true;
          setTimeout(type, 60);
          return;
        }
      } else {
        typeEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 50 : 90);
    }
    setTimeout(type, 800);
  }

  // Neural canvas
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let nodes = [];
  let animFrameId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initNodes();
  }

  function initNodes() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 60);
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1.5,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxDist = 150;

    // Update positions
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
          grad.addColorStop(0, `rgba(245, 158, 11, ${alpha})`);
          grad.addColorStop(1, `rgba(251, 146, 60, ${alpha})`);
          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.75)';
      ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    animFrameId = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  draw();

  // Cleanup on section unmount (not strictly needed for SPA)
  return () => {
    cancelAnimationFrame(animFrameId);
    window.removeEventListener('resize', resize);
  };
}
