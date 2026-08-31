import sanitizeHtmlMarkup from '../support/sanitizeHtmlMarkup.js';

const renderCustomHtmlChildren = (component) => {
  if (!component || !component.components || !component.getAttributes) return;
  if (typeof DOMParser === 'undefined') return;
  const rawCode = String(component.getAttributes().htmlCode || '');
  const safeMarkup = sanitizeHtmlMarkup(rawCode, { allowIframes: true });
  const fallbackMarkup = '<p class="db-custom-html-note">Empty custom HTML block.</p>';
  component.components(safeMarkup || fallbackMarkup);
};

export default renderCustomHtmlChildren;
