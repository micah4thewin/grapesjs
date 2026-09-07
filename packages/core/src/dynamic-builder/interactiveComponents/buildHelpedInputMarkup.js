import escapeHtmlText from '../support/escapeHtmlText.js';

const buildHelpedInputMarkup = (inputType, trait) => {
  const helpText = trait && typeof trait.get === 'function' ? String(trait.get('help') || '') : '';
  const placeholderText = trait && typeof trait.get === 'function' ? String(trait.get('placeholder') || '') : '';
  return [
    '<div class="gjs-db-field">',
    `<input type="${inputType}" class="gjs-db-field-input" placeholder="${escapeHtmlText(placeholderText)}">`,
    helpText ? `<span class="gjs-db-field-help">${escapeHtmlText(helpText)}</span>` : '',
    '</div>',
  ].join('');
};

export default buildHelpedInputMarkup;
