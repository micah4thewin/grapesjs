import escapeHtmlText from '../support/escapeHtmlText.js';

const buildPageNameFormMarkup = (inputId, initialValue, submitLabel) => {
  const errorId = `${inputId}-error`;
  const addressId = `${inputId}-address`;
  return [
    '<div class="gjs-db-form">',
    '<div class="gjs-db-field">',
    `<label class="gjs-db-field-label" for="${inputId}">Page name</label>`,
    `<input id="${inputId}" class="gjs-db-field-input" type="text" value="${escapeHtmlText(initialValue)}"`,
    ` autocomplete="off" aria-describedby="${addressId} ${errorId}" />`,
    `<div class="gjs-db-field-help" id="${addressId}" data-db-page-address></div>`,
    `<div class="gjs-db-field-help gjs-db-field-error-text" id="${errorId}" role="alert"></div>`,
    '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-page-modal-cancel>Cancel</button>',
    `<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-page-modal-submit>${escapeHtmlText(submitLabel)}</button>`,
    '</div>',
    '</div>',
  ].join('');
};

export default buildPageNameFormMarkup;
