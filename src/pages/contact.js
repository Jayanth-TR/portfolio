export function createContact() {
  const section = document.createElement('section');
  section.id = 'contact';
  section.className = 'section';

  section.innerHTML = `
    <div class="container">
      <div class="section-header text-center">
        <div class="section-label reveal"><span class="dot"></span>Contact</div>
        <h2 class="section-title reveal">Let's <span>Connect</span></h2>
        <p class="section-subtitle reveal" style="margin:0 auto; max-width: 580px;">
          Open to AI Engineer roles and project collaborations. Reach out directly through any channel below.
        </p>
      </div>

      <div class="contact-channels reveal">
        <!-- Phone -->
        <a href="tel:+919342160653" class="contact-channel-card" id="contact-phone" aria-label="Call Jayanth T R">
          <div class="contact-channel-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div class="contact-channel-card__content">
            <span class="contact-channel-card__label">Phone</span>
            <span class="contact-channel-card__value">+91 93421 60653</span>
          </div>
          <div class="contact-channel-card__arrow">→</div>
        </a>

        <!-- Email -->
        <a href="mailto:jayanthtr67@gmail.com" class="contact-channel-card" id="contact-email" aria-label="Email Jayanth T R">
          <div class="contact-channel-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div class="contact-channel-card__content">
            <span class="contact-channel-card__label">Email</span>
            <span class="contact-channel-card__value">jayanthtr67@gmail.com</span>
          </div>
          <div class="contact-channel-card__arrow">→</div>
        </a>

        <!-- GitHub -->
        <a href="https://github.com/Jayanth-TR" target="_blank" rel="noopener noreferrer" class="contact-channel-card" id="contact-github" aria-label="GitHub Profile">
          <div class="contact-channel-card__icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </div>
          <div class="contact-channel-card__content">
            <span class="contact-channel-card__label">GitHub</span>
            <span class="contact-channel-card__value">github.com</span>
          </div>
          <div class="contact-channel-card__arrow">↗</div>
        </a>

        <!-- LinkedIn -->
        <a href="https://www.linkedin.com/in/jayanth-tr-67a05131a/" target="_blank" rel="noopener noreferrer" class="contact-channel-card" id="contact-linkedin" aria-label="LinkedIn Profile">
          <div class="contact-channel-card__icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div class="contact-channel-card__content">
            <span class="contact-channel-card__label">LinkedIn</span>
            <span class="contact-channel-card__value">linkedin.com/in/</span>
          </div>
          <div class="contact-channel-card__arrow">↗</div>
        </a>
      </div>
    </div>

    <footer class="portfolio-footer">
      <div class="container">
        <p>Designed & Built by <span class="gradient-text">Jayanth T R</span> — AI Engineer</p>
        <p class="footer-sub">© ${new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .contact-channels {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-5);
      max-width: 860px;
      margin: var(--space-10) auto 0;
    }

    .contact-channel-card {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-5) var(--space-6);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      text-decoration: none;
      color: var(--text-primary);
      transition: all var(--transition-normal);
      position: relative;
    }

    .contact-channel-card:hover {
      border-color: rgba(245, 158, 11, 0.45);
      box-shadow: 0 8px 32px rgba(245, 158, 11, 0.12), 0 0 0 1px rgba(245, 158, 11, 0.1);
      transform: translateY(-4px);
    }

    .contact-channel-card__icon {
      width: 50px;
      height: 50px;
      border-radius: var(--radius-md);
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.2);
      color: var(--accent-blue);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all var(--transition-normal);
    }

    .contact-channel-card:hover .contact-channel-card__icon {
      background: rgba(245, 158, 11, 0.16);
      border-color: rgba(245, 158, 11, 0.4);
      transform: scale(1.05);
    }

    .contact-channel-card__content {
      display: flex;
      flex-direction: column;
      gap: 3px;
      flex: 1;
      min-width: 0;
    }

    .contact-channel-card__label {
      font-size: var(--fs-xs);
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: var(--fw-semi);
    }

    .contact-channel-card__value {
      font-size: var(--fs-base);
      font-weight: var(--fw-medium);
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .contact-channel-card__arrow {
      font-size: var(--fs-lg);
      color: var(--text-muted);
      transition: all var(--transition-normal);
      padding-left: var(--space-2);
    }

    .contact-channel-card:hover .contact-channel-card__arrow {
      color: var(--accent-blue);
      transform: translate(3px, -3px);
    }

    .portfolio-footer {
      margin-top: var(--space-24);
      padding: var(--space-8) 0;
      border-top: 1px solid var(--border-color);
      text-align: center;
    }

    .portfolio-footer p {
      font-size: var(--fs-sm);
      color: var(--text-muted);
      line-height: 1.8;
    }

    .footer-sub {
      font-size: var(--fs-xs);
    }

    @media (max-width: 720px) {
      .contact-channels {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);

  return section;
}

export function initContact() {
  // No form initialization needed
}
