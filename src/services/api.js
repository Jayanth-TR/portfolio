// ─── API Base URL ────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Core fetch wrapper with auth, error handling
 */
async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('portfolio_admin_token');

  const headers = {
    ...options.headers,
  };

  // Only set Content-Type for non-FormData requests
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({ success: false, message: 'Invalid response' }));

  if (!response.ok) {
    const err = new Error(data.message || `HTTP ${response.status}`);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  get:    (endpoint, opts = {}) => apiFetch(endpoint, { method: 'GET', ...opts }),
  post:   (endpoint, body, opts = {}) => apiFetch(endpoint, { method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body), ...opts }),
  put:    (endpoint, body, opts = {}) => apiFetch(endpoint, { method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body), ...opts }),
  patch:  (endpoint, body, opts = {}) => apiFetch(endpoint, { method: 'PATCH', body: JSON.stringify(body), ...opts }),
  delete: (endpoint, opts = {}) => apiFetch(endpoint, { method: 'DELETE', ...opts }),
};

export default api;
