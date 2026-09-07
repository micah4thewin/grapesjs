const serializeOptionEntries = (optionEntries) =>
  optionEntries
    .map((optionEntry) => {
      const labelText = String(optionEntry.optionLabel || '').trim();
      const valueText = String(optionEntry.optionValue || '').trim();
      if (!labelText && !valueText) return '';
      return valueText && valueText !== labelText ? valueText + '|' + (labelText || valueText) : labelText;
    })
    .filter(Boolean)
    .join('\n');

export default serializeOptionEntries;
