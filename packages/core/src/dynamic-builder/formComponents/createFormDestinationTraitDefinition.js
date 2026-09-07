import markTraitInputValidity from '../traits/markTraitInputValidity.js';
import resolveTraitInnerElement from '../traits/resolveTraitInnerElement.js';
import applySubmissionRecipe from './applySubmissionRecipe.js';
import buildFormDestinationMarkup from './buildFormDestinationMarkup.js';
import getSubmissionRecipeRecords from './getSubmissionRecipeRecords.js';
import normalizeRecipeEndpoint from './normalizeRecipeEndpoint.js';
import readKeyValueRows from './readKeyValueRows.js';
import syncFormDestinationControls from './syncFormDestinationControls.js';

const writeEndpoint = (formComponent, urlElement) => {
  const recipeId = String(formComponent.getAttributes()['data-db-recipe'] || 'formspree');
  const recipeRecord = getSubmissionRecipeRecords().find((candidate) => candidate.id === recipeId);
  const endpointRecord = normalizeRecipeEndpoint(recipeRecord, urlElement.value);
  const hintText =
    recipeRecord && recipeRecord.urlHost
      ? 'Paste the id or the https:// URL from ' + recipeRecord.urlHost
      : 'Paste a full https:// address';
  markTraitInputValidity(urlElement, endpointRecord.isValid, hintText);
  if (!endpointRecord.isValid) return;
  if (endpointRecord.endpointUrl) formComponent.addAttributes({ action: endpointRecord.endpointUrl });
  else formComponent.removeAttributes(['action']);
};

const writeCustomSettings = (formComponent, elInput, eventTarget) => {
  const customElement = resolveTraitInnerElement(elInput, '[data-db-destination-custom]');
  if (!customElement || !customElement.contains(eventTarget)) return false;
  const removeButton = eventTarget.closest('[data-db-kv-remove]');
  const addButton = eventTarget.closest('[data-db-kv-add]');
  if (removeButton) removeButton.closest('[data-db-kv-row]').remove();
  if (addButton) {
    const rowsElement = customElement.querySelector(
      '[data-db-kv-rows="' + addButton.getAttribute('data-db-kv-add') + '"]',
    );
    const templateRow = rowsElement.querySelector('[data-db-kv-row]');
    if (templateRow) {
      const newRow = templateRow.cloneNode(true);
      newRow.querySelectorAll('input').forEach((inputElement) => (inputElement.value = ''));
      rowsElement.appendChild(newRow);
    }
  }
  const methodElement = customElement.querySelector('[data-db-destination-method]');
  const bodyElement = customElement.querySelector('[data-db-destination-body]');
  formComponent.addAttributes({
    'data-db-method': methodElement ? methodElement.value : 'post',
    'data-db-body-format': bodyElement ? bodyElement.value : 'multipart',
    'data-db-headers': JSON.stringify(readKeyValueRows(customElement.querySelector('[data-db-kv-section="headers"]'))),
    'data-db-field-map': JSON.stringify(
      readKeyValueRows(customElement.querySelector('[data-db-kv-section="field-map"]')),
    ),
  });
  return true;
};

const createFormDestinationTraitDefinition = () => ({
  noLabel: true,
  eventCapture: ['change', 'input', 'click'],
  createInput: () => buildFormDestinationMarkup(),
  onEvent: ({ component, elInput, event }) => {
    const eventTarget = event && event.target;
    if (!eventTarget || !component) return;
    const selectElement = resolveTraitInnerElement(elInput, '[data-db-destination-recipe]');
    const urlElement = resolveTraitInnerElement(elInput, '[data-db-destination-url]');
    if (eventTarget === selectElement && event.type === 'change') applySubmissionRecipe(component, selectElement.value);
    else if (eventTarget === urlElement && event.type !== 'click') writeEndpoint(component, urlElement);
    else if (eventTarget === selectElement || eventTarget === urlElement) return;
    else if (!writeCustomSettings(component, elInput, eventTarget)) return;
    syncFormDestinationControls(elInput, component);
  },
  onUpdate: ({ component, elInput }) => syncFormDestinationControls(elInput, component),
});

export default createFormDestinationTraitDefinition;
