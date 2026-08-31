import validateJsonAreaElement from './validateJsonAreaElement.js';

const collectDataSourcesFromForm = (formElement) => {
  const collectedRecord = {};
  let firstInvalidArea = null;
  Array.from(formElement.querySelectorAll('[data-db-source-json]')).forEach((jsonAreaElement) => {
    const parsedValue = validateJsonAreaElement(jsonAreaElement);
    if (parsedValue === null) {
      if (!firstInvalidArea) firstInvalidArea = jsonAreaElement;
      return;
    }
    collectedRecord[jsonAreaElement.getAttribute('data-db-source-json')] = parsedValue;
  });
  if (firstInvalidArea) {
    firstInvalidArea.focus();
    return null;
  }
  return collectedRecord;
};

export default collectDataSourcesFromForm;
