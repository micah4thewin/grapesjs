import escapeHtmlText from '../support/escapeHtmlText.js';

const buildBlockCardRenderer =
  (hintText, keywordText) =>
  ({ model, className }) => {
    const mediaMarkup = String(model.get('media') || '');
    const labelText = escapeHtmlText(String(model.get('label') || ''));
    return [
      mediaMarkup ? `<div class="${className}__media">${mediaMarkup}</div>` : '',
      `<div class="${className}-label">${labelText}</div>`,
      hintText ? `<span class="gjs-db-block-hint">${escapeHtmlText(hintText)}</span>` : '',
      keywordText ? `<span class="gjs-db-block-keywords" aria-hidden="true">${escapeHtmlText(keywordText)}</span>` : '',
    ].join('');
  };

export default buildBlockCardRenderer;
