const listFocusableElements = (rootElement) => {
  if (!rootElement || typeof rootElement.querySelectorAll !== 'function') return [];
  const focusableSelector = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');
  const rootHasLayout = typeof rootElement.getClientRects === 'function' && rootElement.getClientRects().length > 0;
  return Array.from(rootElement.querySelectorAll(focusableSelector)).filter((candidateElement) => {
    if (candidateElement.closest('[hidden]') || candidateElement.getAttribute('aria-hidden') === 'true') return false;
    if (candidateElement.closest('[inert]')) return false;
    return !rootHasLayout || candidateElement.getClientRects().length > 0;
  });
};

export default listFocusableElements;
