import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSiteSettingsFieldMarkup = (fieldKey, labelText, helpText, fieldValue, fieldOptions = {}) => {
  const safeKey = escapeHtmlText(fieldKey);
  const inputId = 'gjs-db-site-' + safeKey;
  const listAttribute = fieldOptions.listId ? ' list="' + escapeHtmlText(fieldOptions.listId) + '"' : '';
  const placeholderAttribute = fieldOptions.placeholder
    ? ' placeholder="' + escapeHtmlText(fieldOptions.placeholder) + '"'
    : '';
  const datalistMarkup =
    fieldOptions.listId && Array.isArray(fieldOptions.listValues)
      ? '<datalist id="' +
        escapeHtmlText(fieldOptions.listId) +
        '">' +
        fieldOptions.listValues
          .map((listValue) => '<option value="' + escapeHtmlText(listValue) + '"></option>')
          .join('') +
        '</datalist>'
      : '';
  return [
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="' + inputId + '">' + escapeHtmlText(labelText) + '</label>',
    '<input type="' +
      escapeHtmlText(fieldOptions.inputType || 'text') +
      '" class="gjs-db-field-input" id="' +
      inputId +
      '" data-db-site-field="' +
      safeKey +
      '" value="' +
      escapeHtmlText(fieldValue || '') +
      '"' +
      listAttribute +
      placeholderAttribute +
      ' aria-describedby="' +
      inputId +
      '-help ' +
      inputId +
      '-error">',
    datalistMarkup,
    '<div class="gjs-db-field-help" id="' + inputId + '-help">' + escapeHtmlText(helpText) + '</div>',
    '<div class="gjs-db-field-help gjs-db-field-error-text" id="' +
      inputId +
      '-error" role="alert" data-db-site-error="' +
      safeKey +
      '"></div>',
    '</div>',
  ].join('');
};

export default buildSiteSettingsFieldMarkup;
