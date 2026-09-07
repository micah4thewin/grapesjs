import resolveTraitInnerElement from '../traits/resolveTraitInnerElement.js';
import buildKeyValueRowsMarkup from './buildKeyValueRowsMarkup.js';
import getSubmissionRecipeRecords from './getSubmissionRecipeRecords.js';
import isFormConnected from './isFormConnected.js';
import parseJsonRecord from './parseJsonRecord.js';

const syncCustomSection = (wrapperElement, formAttributes, isCustom) => {
  const customElement = resolveTraitInnerElement(wrapperElement, '[data-db-destination-custom]');
  if (!customElement) return;
  customElement.hidden = !isCustom;
  if (!isCustom) return;
  const methodElement = customElement.querySelector('[data-db-destination-method]');
  const bodyElement = customElement.querySelector('[data-db-destination-body]');
  if (methodElement) methodElement.value = String(formAttributes['data-db-method'] || 'post').toLowerCase();
  if (bodyElement) bodyElement.value = formAttributes['data-db-body-format'] === 'json' ? 'json' : 'multipart';
  if (customElement.contains(customElement.ownerDocument.activeElement)) return;
  const headersElement = customElement.querySelector('[data-db-kv-rows="headers"]');
  const mapElement = customElement.querySelector('[data-db-kv-rows="field-map"]');
  if (headersElement)
    headersElement.innerHTML = buildKeyValueRowsMarkup(
      parseJsonRecord(formAttributes['data-db-headers']),
      'headers',
      'Header name',
      'Header value',
    );
  if (mapElement)
    mapElement.innerHTML = buildKeyValueRowsMarkup(
      parseJsonRecord(formAttributes['data-db-field-map']),
      'field-map',
      'Field name in the form',
      'Name the service expects',
    );
};

const syncFormDestinationControls = (wrapperElement, formComponent) => {
  const selectElement = resolveTraitInnerElement(wrapperElement, '[data-db-destination-recipe]');
  const urlElement = resolveTraitInnerElement(wrapperElement, '[data-db-destination-url]');
  const helpElement = resolveTraitInnerElement(wrapperElement, '[data-db-destination-help]');
  const statusElement = resolveTraitInnerElement(wrapperElement, '[data-db-destination-status]');
  if (!selectElement || !urlElement || !formComponent || !formComponent.getAttributes) return;
  const formAttributes = formComponent.getAttributes();
  const recipeRecords = getSubmissionRecipeRecords();
  const recipeId = String(formAttributes['data-db-recipe'] || 'formspree');
  const recipeRecord = recipeRecords.find((candidate) => candidate.id === recipeId) || recipeRecords[0];
  if (selectElement.value !== recipeRecord.id) selectElement.value = recipeRecord.id;
  urlElement.hidden = !recipeRecord.needsUrl;
  urlElement.placeholder = recipeRecord.urlPlaceholder;
  const actionValue = String(formAttributes.action || '');
  if (urlElement.value !== actionValue && wrapperElement.ownerDocument.activeElement !== urlElement)
    urlElement.value = actionValue;
  if (helpElement) helpElement.textContent = recipeRecord.helpText;
  syncCustomSection(wrapperElement, formAttributes, Boolean(recipeRecord.isCustom));
  if (!statusElement) return;
  const isConnected = isFormConnected(formAttributes);
  statusElement.textContent = isConnected
    ? 'Connected: submissions go to ' + recipeRecord.label.replace(' (recommended)', '')
    : 'Not connected: submissions are not sent yet';
  statusElement.className = 'gjs-db-badge ' + (isConnected ? 'gjs-db-badge-success' : 'gjs-db-badge-warning');
};

export default syncFormDestinationControls;
