import { authService } from '../services/authService.js';
import { toast } from '../components/toast.js';

export function createAdminLogin() {
  const wrapper = document.createElement('div');
  wrapper.className = 'admin-login-page';
  wrapper.id = 'admin-login-page';

  wrapper.innerHTML = `
    <div class="admin-login-bg" aria-hidden="true">
      <div class="admin-login-orb admin-orb-1"></div>
      <div class="admin-login-orb admin-orb-2"></div>
    </div>

    <div class="admin-login-card">
      <div class="admin-login-logo">
        <div class="admin-login-icon">🔐</div>
        <h1 class="admin-login-title">Admin Panel</h1>
        <p class="admin-login-sub">Jayanth T R — Portfolio Admin</p>
      </div>

      <form id="admin-login-form" class="admin-login-form" novalidate>
        <div class="form-group">
          <label class="form-label" for="admin-username">Username</label>
          <input class="form-input" type="text" id="admin-username" name="username" placeholder="admin" autocomplete="username" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="admin-password">Password</label>
          <div class="admin-password-wrapper">
            <input class="form-input" type="password" id="admin-password" name="password" placeholder="••••••••" autocomplete="current-password" required />
            <button type="button" class="admin-password-toggle" id="toggle-password" aria-label="Toggle password visibility">
              <svg id="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
        </div>

        <span class="admin-login-error" id="admin-login-error"></span>

        <button type="submit" class="btn btn-primary btn-lg" id="admin-login-btn" style="width:100%;justify-content:center;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          <span>Sign In</span>
        </button>
      </form>

      <a href="#home" class="admin-back-link">← Back to Portfolio</a>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .admin-login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-primary);
      position: relative;
      overflow: hidden;
      padding: var(--space-4);
    }

    .admin-login-bg {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .admin-login-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
    }

    .admin-orb-1 {
      width: 500px; height: 500px;
      top: -200px; left: -100px;
      background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%);
    }

    .admin-orb-2 {
      width: 400px; height: 400px;
      bottom: -100px; right: -100px;
      background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
    }

    .admin-login-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-2xl);
      padding: var(--space-10);
      width: 100%;
      max-width: 420px;
      position: relative;
      z-index: 1;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      animation: scaleIn 0.4s ease;
    }

    .admin-login-logo {
      text-align: center;
      margin-bottom: var(--space-8);
    }

    .admin-login-icon {
      font-size: 2.5rem;
      margin-bottom: var(--space-3);
    }

    .admin-login-title {
      font-size: var(--fs-2xl);
      font-weight: var(--fw-black);
      color: var(--text-primary);
      margin-bottom: var(--space-1);
    }

    .admin-login-sub {
      font-size: var(--fs-sm);
      color: var(--text-muted);
    }

    .admin-login-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
    }

    .admin-password-wrapper {
      position: relative;
    }

    .admin-password-wrapper .form-input {
      padding-right: 3rem;
      width: 100%;
    }

    .admin-password-toggle {
      position: absolute;
      right: var(--space-3);
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      transition: color var(--transition-fast);
    }

    .admin-password-toggle:hover { color: var(--text-primary); }

    .admin-login-error {
      color: #f87171;
      font-size: var(--fs-sm);
      min-height: 20px;
      display: block;
      text-align: center;
    }

    .admin-back-link {
      display: block;
      text-align: center;
      margin-top: var(--space-6);
      font-size: var(--fs-sm);
      color: var(--text-muted);
      transition: color var(--transition-fast);
    }

    .admin-back-link:hover { color: var(--accent-blue); }
  `;
  document.head.appendChild(style);

  return wrapper;
}

export function initAdminLogin(onSuccess) {
  const form = document.getElementById('admin-login-form');
  const toggleBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('admin-password');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isPass = passwordInput.type === 'password';
      passwordInput.type = isPass ? 'text' : 'password';
    });
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value;
    const errorEl = document.getElementById('admin-login-error');
    const btn = document.getElementById('admin-login-btn');

    errorEl.textContent = '';

    if (!username || !password) {
      errorEl.textContent = 'Username and password are required.';
      return;
    }

    btn.disabled = true;
    btn.querySelector('span').textContent = 'Signing in...';

    try {
      await authService.login(username, password);
      toast.success('Welcome back, Admin! 🚀');
      if (onSuccess) onSuccess();
    } catch (err) {
      errorEl.textContent = err.message || 'Invalid credentials';
    } finally {
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Sign In';
    }
  });
}
