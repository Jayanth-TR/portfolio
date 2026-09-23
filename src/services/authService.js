/**
 * Client-Side Admin Authentication Service
 */
const TOKEN_KEY = 'portfolio_admin_token';
const ADMIN_KEY = 'portfolio_admin_user';

const EXPECTED_USER = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
const EXPECTED_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

export const authService = {
  async login(username, password) {
    // Simulated async credential check
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (username === EXPECTED_USER && password === EXPECTED_PASS) {
      const session = {
        username,
        role: 'admin',
        loginTime: Date.now(),
      };
      const token = btoa(JSON.stringify(session));

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(ADMIN_KEY, JSON.stringify(session));

      return {
        success: true,
        token,
        admin: session,
      };
    }

    throw new Error('Invalid username or password');
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
  },

  isAuthenticated() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;
    try {
      const session = JSON.parse(atob(token));
      // 7-day session validity
      return Date.now() - session.loginTime < 7 * 24 * 60 * 60 * 1000;
    } catch {
      return false;
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getAdmin() {
    try {
      return JSON.parse(localStorage.getItem(ADMIN_KEY));
    } catch {
      return null;
    }
  },

  async verifyToken() {
    return this.isAuthenticated();
  },
};

export default authService;
