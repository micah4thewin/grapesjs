import escapeHtmlText from '../support/escapeHtmlText.js';

const buildDataSourceJsonMarkup = (sourceName, jsonText, errorText) => {
  const safeName = escapeHtmlText(sourceName);
  const errorId = `db-json-error-${safeName}`;
  return [
    '<div class="gjs-db-field">',
    `<textarea class="gjs-db-field-input gjs-db-source-json${errorText ? ' gjs-db-trait-invalid' : ''}" `,
    `data-db-source-json="${safeName}" rows="10" spellcheck="false" aria-label="JSON for ${safeName}" `,
    `aria-describedby="${errorId}"${errorText ? ' aria-invalid="true"' : ''}>${escapeHtmlText(jsonText)}</textarea>`,
    `<p class="gjs-db-field-error" id="${errorId}" data-db-json-error${errorText ? '' : ' hidden'}>`,
    `${escapeHtmlText(errorText || '')}</p>`,
    '<p class="gjs-db-field-help gjs-db-muted">A list of items looks like [{"name": "Ada"}]. ',
    'A single record looks like {"name": "Ada"}.</p>',
    '</div>',
  ].join('');
};

export default buildDataSourceJsonMarkup;
