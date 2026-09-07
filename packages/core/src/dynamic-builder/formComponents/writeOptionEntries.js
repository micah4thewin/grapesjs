import serializeOptionEntries from './serializeOptionEntries.js';

const writeOptionEntries = (component, attributeName, optionEntries, selectedValue) => {
  if (!component || !component.addAttributes) return;
  const cleanEntries = optionEntries.map((optionEntry) => {
    const labelText = String(optionEntry.optionLabel || '').trim();
    const valueText = String(optionEntry.optionValue || '').trim() || labelText;
    return { optionLabel: labelText || valueText, optionValue: valueText };
  });
  const hasSelected = cleanEntries.some((optionEntry) => optionEntry.optionValue === selectedValue);
  component.addAttributes({
    [attributeName]: serializeOptionEntries(cleanEntries),
    'data-db-selected': hasSelected ? selectedValue : '',
  });
};

export default writeOptionEntries;
