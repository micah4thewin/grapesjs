import escapeHtmlText from '../support/escapeHtmlText.js';

const buildEntryMarkup = (pickerEntry) =>
  [
    `<button type="button" class="gjs-db-list-item gjs-db-field-pick" data-db-pick-token="${escapeHtmlText(pickerEntry.token)}">`,
    `<span class="gjs-db-field-pick-label">${escapeHtmlText(pickerEntry.label)}</span>`,
    `<span class="gjs-db-field-pick-sample">${escapeHtmlText(pickerEntry.sample || '(empty)')}</span>`,
    `<code class="gjs-db-field-pick-token">${escapeHtmlText(pickerEntry.token)}</code>`,
    '</button>',
  ].join('');

const buildFieldPickerMarkup = (pickerEntries) => {
  const groupNames = [];
  pickerEntries.forEach((pickerEntry) => {
    if (groupNames.indexOf(pickerEntry.group) < 0) groupNames.push(pickerEntry.group);
  });
  const groupsMarkup = groupNames
    .map((groupName) => {
      const groupEntries = pickerEntries.filter((pickerEntry) => pickerEntry.group === groupName);
      return [
        `<div class="gjs-db-report-group" data-db-pick-group="${escapeHtmlText(groupName)}">`,
        `<div class="gjs-db-section-title">${escapeHtmlText(groupName)}</div>`,
        `<div class="gjs-db-list">${groupEntries.map(buildEntryMarkup).join('')}</div>`,
        '</div>',
      ].join('');
    })
    .join('');
  return [
    '<div class="gjs-db-form gjs-db-field-picker">',
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="db-field-picker-search">Find a field</label>',
    '<input id="db-field-picker-search" type="search" class="gjs-db-field-input" data-db-pick-search ',
    'placeholder="Type to filter, e.g. email" autocomplete="off">',
    '</div>',
    groupsMarkup || '<p class="gjs-db-muted">No data fields yet. Add items in Data sources first.</p>',
    '<p class="gjs-db-field-help gjs-db-muted" data-db-pick-empty hidden>No fields match. Try another word.</p>',
    '</div>',
  ].join('');
};

export default buildFieldPickerMarkup;
