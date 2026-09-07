import escapeHtmlText from '../support/escapeHtmlText.js';

const writeComponentTextContent = (component, textValue) => {
  if (!component || typeof component.components !== 'function') return;
  const nextMarkup = escapeHtmlText(String(textValue == null ? '' : textValue).trim());
  const currentMarkup = typeof component.getInnerHTML === 'function' ? String(component.getInnerHTML() || '') : '';
  if (currentMarkup.trim() !== nextMarkup) component.components(nextMarkup);
};

export default writeComponentTextContent;
