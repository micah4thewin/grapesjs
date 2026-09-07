import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getSubmissionRecipeRecords from './getSubmissionRecipeRecords.js';

const buildSelectMarkup = (dataAttribute, labelText, optionRecords) =>
  `<label class="gjs-db-field-label">${escapeHtmlText(labelText)}<select class="gjs-db-field-input" ${dataAttribute}>` +
  optionRecords.map((optionRecord) => `<option value="${optionRecord.id}">${optionRecord.label}</option>`).join('') +
  '</select></label>';

const buildRowsSection = (rowKind, titleText, addLabel) =>
  `<div class="gjs-db-kv-section" data-db-kv-section="${rowKind}">` +
  `<p class="gjs-db-field-label">${escapeHtmlText(titleText)}</p>` +
  `<div data-db-kv-rows="${rowKind}"></div>` +
  `<button type="button" class="gjs-db-button gjs-db-menu-add" data-db-kv-add="${rowKind}">${getIconMarkup('plus', { size: 14 })}<span>${escapeHtmlText(addLabel)}</span></button>` +
  '</div>';

const buildFormDestinationMarkup = () =>
  [
    '<div class="gjs-db-field gjs-db-form-destination" data-db-destination>',
    '<select class="gjs-db-field-input" data-db-destination-recipe aria-label="Where submissions go">',
    getSubmissionRecipeRecords()
      .map(
        (recipeRecord) =>
          `<option value="${escapeHtmlText(recipeRecord.id)}">${escapeHtmlText(recipeRecord.label)}</option>`,
      )
      .join(''),
    '</select>',
    '<input type="text" class="gjs-db-field-input" data-db-destination-url inputmode="url" aria-label="Form id or endpoint URL" hidden>',
    '<p class="gjs-db-field-help" data-db-destination-help></p>',
    '<p class="gjs-db-badge" data-db-destination-status></p>',
    '<div class="gjs-db-form-destination-custom" data-db-destination-custom hidden>',
    buildSelectMarkup('data-db-destination-method', 'Method', [
      { id: 'post', label: 'POST' },
      { id: 'put', label: 'PUT' },
      { id: 'get', label: 'GET (fields in the URL)' },
    ]),
    buildSelectMarkup('data-db-destination-body', 'Body format', [
      { id: 'multipart', label: 'Form data (supports files)' },
      { id: 'json', label: 'JSON' },
    ]),
    buildRowsSection('headers', 'Extra headers', 'Add header'),
    buildRowsSection('field-map', 'Rename fields before sending', 'Add rename'),
    '</div>',
    '</div>',
  ].join('');

export default buildFormDestinationMarkup;
