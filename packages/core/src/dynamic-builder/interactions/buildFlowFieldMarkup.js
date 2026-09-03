import escapeHtmlText from '../support/escapeHtmlText.js';

const buildOptionsMarkup = (fieldRecord, currentValue) =>
  (fieldRecord.options || [])
    .map(
      (optionRecord) =>
        '<option value="' +
        escapeHtmlText(optionRecord.id) +
        '"' +
        (String(optionRecord.id) === currentValue ? ' selected' : '') +
        '>' +
        escapeHtmlText(optionRecord.label) +
        '</option>',
    )
    .join('');

const buildFlowFieldMarkup = (fieldRecord, fieldValue, fieldScope) => {
  const currentValue = String(fieldValue === undefined ? fieldRecord.default || '' : fieldValue);
  const sharedAttributes =
    ' class="gjs-db-field-input" data-db-flow-field="' +
    escapeHtmlText(fieldRecord.name) +
    '" data-db-flow-scope="' +
    escapeHtmlText(fieldScope) +
    '"';
  const labelMarkup = '<span class="gjs-db-flow-field-label">' + escapeHtmlText(fieldRecord.label) + '</span>';
  if (fieldRecord.type === 'select') {
    return (
      '<label class="gjs-db-flow-field">' +
      labelMarkup +
      '<select' +
      sharedAttributes +
      '>' +
      buildOptionsMarkup(fieldRecord, currentValue) +
      '</select></label>'
    );
  }
  if (fieldRecord.type === 'textarea') {
    return (
      '<label class="gjs-db-flow-field gjs-db-flow-field-wide">' +
      labelMarkup +
      '<textarea rows="3" placeholder="' +
      escapeHtmlText(fieldRecord.placeholder || '') +
      '"' +
      sharedAttributes +
      '>' +
      escapeHtmlText(currentValue) +
      '</textarea></label>'
    );
  }
  if (fieldRecord.type === 'checkbox') {
    return (
      '<label class="gjs-db-flow-field gjs-db-flow-field-check">' +
      '<input type="checkbox"' +
      sharedAttributes +
      (currentValue === 'true' ? ' checked' : '') +
      '>' +
      labelMarkup +
      '</label>'
    );
  }
  const inputType = fieldRecord.type === 'number' ? 'number' : 'text';
  return (
    '<label class="gjs-db-flow-field">' +
    labelMarkup +
    '<input type="' +
    inputType +
    '" value="' +
    escapeHtmlText(currentValue) +
    '" placeholder="' +
    escapeHtmlText(fieldRecord.placeholder || '') +
    '"' +
    sharedAttributes +
    '></label>'
  );
};

export default buildFlowFieldMarkup;
