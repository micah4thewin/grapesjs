import getInputTypeOptionRecords from './getInputTypeOptionRecords.js';

const syncInputTypeDefaults = (component) => {
  if (!component || !component.is || !component.is('db-input')) return;
  const componentAttributes = component.getAttributes();
  const typeRecords = getInputTypeOptionRecords();
  const nextRecord = typeRecords.find((typeRecord) => typeRecord.id === componentAttributes.type) || typeRecords[0];
  const previousRecord = typeRecords.find((typeRecord) => typeRecord.id === component.previous('attributes').type);
  const nextAttributes = {};
  const removedAttributes = [];
  if (nextRecord.inputmode) nextAttributes.inputmode = nextRecord.inputmode;
  else removedAttributes.push('inputmode');
  const currentAutocomplete = String(componentAttributes.autocomplete || '');
  const autocompleteIsDefault =
    !currentAutocomplete || (previousRecord && currentAutocomplete === previousRecord.autocomplete);
  if (autocompleteIsDefault && nextRecord.autocomplete) nextAttributes.autocomplete = nextRecord.autocomplete;
  const currentPlaceholder = String(componentAttributes.placeholder || '');
  const placeholderIsDefault =
    !currentPlaceholder ||
    currentPlaceholder === 'Type your answer' ||
    typeRecords.some((typeRecord) => typeRecord.placeholder && typeRecord.placeholder === currentPlaceholder);
  if (placeholderIsDefault && nextRecord.placeholder) nextAttributes.placeholder = nextRecord.placeholder;
  else if (placeholderIsDefault && currentPlaceholder) removedAttributes.push('placeholder');
  if (Object.keys(nextAttributes).length) component.addAttributes(nextAttributes);
  if (removedAttributes.length) component.removeAttributes(removedAttributes);
};

export default syncInputTypeDefaults;
