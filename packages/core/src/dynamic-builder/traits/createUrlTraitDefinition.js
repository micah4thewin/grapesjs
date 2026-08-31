import escapeHtmlText from '../support/escapeHtmlText.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';
import formatTraitDisplayValue from './formatTraitDisplayValue.js';
import markTraitInputValidity from './markTraitInputValidity.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';
import syncTraitInputFromValue from './syncTraitInputFromValue.js';

const createUrlTraitDefinition = () => ({
  createInput: ({ trait }) => {
    const placeholderValue = escapeHtmlText(trait.get('placeholder') || 'https://example.com/page');
    return [
      '<div class="gjs-db-field">',
      `<input type="text" class="gjs-db-field-input" inputmode="url" placeholder="${placeholderValue}">`,
      '</div>',
    ].join('');
  },
  onEvent: ({ trait, elInput }) => {
    const urlInput = resolveTraitInnerElement(elInput, 'input');
    if (!urlInput) return;
    const rawValue = urlInput.value.trim();
    const safeValue = sanitizeUrlValue(rawValue);
    const wasRejected = Boolean(rawValue) && !safeValue;
    markTraitInputValidity(urlInput, !wasRejected, 'Rejected as unsafe: this url will not be saved');
    if (!wasRejected) trait.set('value', safeValue);
  },
  onUpdate: ({ trait, elInput }) => {
    const urlInput = syncTraitInputFromValue(elInput, 'input', formatTraitDisplayValue(trait.getValue()));
    if (urlInput) markTraitInputValidity(urlInput, true, '');
  },
});

export default createUrlTraitDefinition;
