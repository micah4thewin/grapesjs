import buildTraitAriaLabelAttribute from './buildTraitAriaLabelAttribute.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import formatTraitDisplayValue from './formatTraitDisplayValue.js';
import markTraitInputValidity from './markTraitInputValidity.js';
import normalizeUrlInput from './normalizeUrlInput.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';
import syncTraitInputFromValue from './syncTraitInputFromValue.js';

const createPlainUrlTraitDefinition = () => ({
  eventCapture: ['change'],
  createInput: ({ trait }) => {
    const placeholderValue = escapeHtmlText(trait.get('placeholder') || 'https://example.com/page');
    return [
      '<div class="gjs-db-field gjs-db-trait-url">',
      `<input type="text" class="gjs-db-field-input" inputmode="url" placeholder="${placeholderValue}"${buildTraitAriaLabelAttribute(trait)}>`,
      '<p class="gjs-db-field-help gjs-db-trait-link-hint" data-db-url-hint hidden></p>',
      '</div>',
    ].join('');
  },
  onEvent: ({ trait, elInput }) => {
    const urlInput = resolveTraitInnerElement(elInput, 'input');
    if (!urlInput) return;
    const normalized = normalizeUrlInput(urlInput.value);
    const safeValue = sanitizeUrlValue(normalized.value);
    const wasRejected = Boolean(normalized.value) && !safeValue;
    const hintElement = resolveTraitInnerElement(elInput, '[data-db-url-hint]');
    markTraitInputValidity(urlInput, !wasRejected, 'This address is not allowed here, so it was not saved');
    if (hintElement) {
      hintElement.hidden = !normalized.addedScheme;
      hintElement.textContent = normalized.addedScheme ? 'We added https:// for you.' : '';
    }
    if (wasRejected) return;
    if (normalized.addedScheme) urlInput.value = safeValue;
    trait.set('value', safeValue);
  },
  onUpdate: ({ trait, elInput }) => {
    const urlInput = syncTraitInputFromValue(elInput, 'input', formatTraitDisplayValue(trait.getValue()));
    if (urlInput) markTraitInputValidity(urlInput, true, '');
  },
});

export default createPlainUrlTraitDefinition;
