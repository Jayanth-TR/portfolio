/**
 * Toast notification system
 */
let container = null;

function getContainer() {
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }
  return container;
}

function createToast(message, type = 'info', duration = 4000) {
  const c = getContainer();
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-message">${message}</span>
    <span class="toast-close" role="button" aria-label="Close">×</span>
  `;

  c.appendChild(toast);

  const close = () => {
    toast.classList.add('exit');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  toast.querySelector('.toast-close').addEventListener('click', close);
  setTimeout(close, duration);

  return toast;
}

export const toast = {
  success: (msg, duration) => createToast(msg, 'success', duration),
  error:   (msg, duration) => createToast(msg, 'error', duration),
  info:    (msg, duration) => createToast(msg, 'info', duration),
  warning: (msg, duration) => createToast(msg, 'warning', duration),
};

export default toast;
