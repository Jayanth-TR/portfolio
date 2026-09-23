export function createAbout() {
  const section = document.createElement('section');
  section.id = 'about';
  section.className = 'section section-alt';

  section.innerHTML = `
    <div class="container">
      <div class="section-header text-center">
        <div class="section-label reveal"><span class="dot"></span>About Me</div>
        <h2 class="section-title reveal">The Engineer Behind <span>the Intelligence</span></h2>
        <p class="section-subtitle reveal" style="margin:0 auto;">
          Passionate about turning AI research into real-world products.
        </p>
      </div>

      <div class="about-grid">
        <div class="about-visual reveal-left">
          <div class="about-avatar-wrapper">
            <div class="about-avatar-ring"></div>
            <div class="about-avatar">
              <div class="about-avatar-inner">JTR</div>
            </div>
            <div class="about-avatar-badge">
              <span>🤖</span>
              <span>AI Engineer</span>
            </div>
          </div>

          <div class="about-info-cards">
            <div class="about-info-card">
              <span class="about-info-icon">📍</span>
              <div>
                <div class="about-info-label">Location</div>
                <div class="about-info-value">Bengaluru, India</div>
              </div>
            </div>
            <div class="about-info-card">
              <span class="about-info-icon">📧</span>
              <div>
                <div class="about-info-label">Email</div>
                <div class="about-info-value">
                  <a href="mailto:jayanthtr67@gmail.com">jayanthtr67@gmail.com</a>
                </div>
              </div>
            </div>
            <div class="about-info-card">
              <span class="about-info-icon">📱</span>
              <div>
                <div class="about-info-label">Phone</div>
                <div class="about-info-value">+91 93421 60653</div>
              </div>
            </div>
          </div>
        </div>

        <div class="about-content reveal-right">
          <div class="about-text">
            <p>
              I'm <strong>Jayanth T R</strong>, an AI Engineer based in Bengaluru, India, with over
              <strong>1.6+ years of hands-on experience</strong> building production-ready AI applications.
            </p>
            <p>
              Specializing in <strong>Generative AI, LLMs, and RAG systems</strong> — designing and deploying intelligent solutions using
              <strong>Python, FastAPI</strong>, and modern AI APIs including <strong>Google Gemini, OpenAI, and Hugging Face</strong>. Also working with ChromaDB vector search, with beginner-level experience in AWS cloud deployment and Docker.
            </p>
          </div>

          <div class="about-highlights reveal stagger-children">
            <div class="about-highlight">
              <div class="about-highlight-icon">🧠</div>
              <div>
                <strong>Generative AI & LLMs</strong>
                <span>RAG, prompt engineering, fine-tuning workflows</span>
              </div>
            </div>
            <div class="about-highlight">
              <div class="about-highlight-icon">🔌</div>
              <div>
                <strong>AI API Integration</strong>
                <span>Gemini, OpenAI, Hugging Face ecosystems</span>
              </div>
            </div>
            <div class="about-highlight">
              <div class="about-highlight-icon">⚡</div>
              <div>
                <strong>Backend & Deployment</strong>
                <span>FastAPI, Python, Docker, AWS</span>
              </div>
            </div>
            <div class="about-highlight">
              <div class="about-highlight-icon">🗄️</div>
              <div>
                <strong>Data & Vector Stores</strong>
                <span>PostgreSQL, MongoDB, ChromaDB</span>
              </div>
            </div>
          </div>

          <div class="about-actions reveal">
            <a href="#projects" class="btn btn-primary btn-md">View My Projects</a>
            <a href="/resume.pdf" download="Jayanth_TR_Resume.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-md">Download Resume</a>
          </div>
        </div>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #about {
      min-height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-10) 0 var(--space-16) 0;
      box-sizing: border-box;
    }

    #about .container {
      max-width: 1080px;
    }

    #about .section-header {
      margin-bottom: var(--space-6);
    }

    #about .section-title {
      font-size: clamp(1.75rem, 3vw, 2.35rem);
    }

    .about-grid {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: var(--space-10);
      align-items: center;
    }

    /* Avatar */
    .about-avatar-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: var(--space-3);
    }

    .about-avatar-ring {
      position: absolute;
      width: 130px;
      height: 130px;
      border-radius: 50%;
      border: 2px solid transparent;
      background: linear-gradient(var(--bg-secondary), var(--bg-secondary)) padding-box,
                  var(--gradient-primary) border-box;
      animation: spin 10s linear infinite;
    }

    .about-avatar {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: var(--gradient-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
      box-shadow: 0 0 30px var(--accent-blue-glow);
    }

    .about-avatar-inner {
      font-size: 1.85rem;
      font-weight: var(--fw-black);
      color: #080c14;
      letter-spacing: -0.02em;
      font-family: var(--font-mono);
    }

    .about-avatar-badge {
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: var(--space-2);
      background: var(--bg-card);
      border: 1px solid var(--border-color-hover);
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-sm);
      font-size: var(--fs-xs);
      font-weight: var(--fw-semi);
      color: var(--text-primary);
      white-space: nowrap;
      box-shadow: var(--shadow-md);
      z-index: 2;
    }

    .about-info-cards {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      margin-top: var(--space-5);
      width: 100%;
    }

    .about-info-card {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-2) var(--space-3);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
    }

    .about-info-card:hover {
      border-color: var(--border-color-hover);
      transform: translateX(4px);
    }

    .about-info-icon { font-size: 1rem; }

    .about-info-label {
      font-size: 0.7rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .about-info-value {
      font-size: var(--fs-xs);
      font-weight: var(--fw-medium);
      color: var(--text-primary);
    }

    .about-info-value a {
      color: var(--accent-blue);
      transition: color var(--transition-fast);
    }
    .about-info-value a:hover { color: var(--text-primary); }

    /* Content */
    .about-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .about-text {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .about-text p {
      font-size: var(--fs-sm);
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .about-text strong {
      color: var(--text-primary);
      font-weight: var(--fw-semi);
    }

    .about-highlights {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-2);
    }

    .about-highlight {
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);
      padding: var(--space-3);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      transition: all var(--transition-normal);
    }

    .about-highlight:hover {
      border-color: var(--accent-blue);
      box-shadow: 0 4px 20px var(--accent-blue-glow-sm);
      background: var(--bg-card-hover);
      transform: translateY(-2px);
    }

    .about-highlight-icon { font-size: 1.15rem; flex-shrink: 0; }

    .about-highlight div {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .about-highlight strong {
      font-size: var(--fs-xs);
      font-weight: var(--fw-semi);
      color: var(--text-primary);
    }

    .about-highlight span {
      font-size: 0.7rem;
      color: var(--text-muted);
      line-height: 1.3;
    }

    .about-actions {
      display: flex;
      gap: var(--space-3);
      margin-top: var(--space-1);
    }

    @media (max-width: 900px) {
      #about {
        min-height: auto;
        padding: var(--space-6) 0 var(--space-12) 0;
      }
      .about-grid {
        grid-template-columns: 1fr;
      }
      .about-visual {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--space-6);
        align-items: start;
      }
      .about-avatar-wrapper { margin-bottom: 0; }
    }

    @media (max-width: 640px) {
      #about {
        padding: var(--space-4) 0 var(--space-10) 0;
      }
      .about-visual { grid-template-columns: 1fr; }
      .about-highlights { grid-template-columns: 1fr; }
      .about-actions { flex-direction: column; }
    }
  `;
  document.head.appendChild(style);

  return section;
}
