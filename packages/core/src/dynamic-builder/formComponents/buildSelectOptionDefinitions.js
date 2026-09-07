import buildOptionDefinition from './buildOptionDefinition.js';
import resolveOptionEntries from './resolveOptionEntries.js';

const buildSelectOptionDefinitions = (optionsText, placeholderText, selectedValue) => {
  const optionEntries = resolveOptionEntries(optionsText);
  const cleanPlaceholder = String(placeholderText == null ? '' : placeholderText).trim();
  const hasSelectedValue = optionEntries.some((optionEntry) => optionEntry.optionValue === selectedValue);
  const optionDefinitions = optionEntries.map((optionEntry) =>
    buildOptionDefinition(
      optionEntry.optionValue,
      optionEntry.optionLabel,
      hasSelectedValue && optionEntry.optionValue === selectedValue ? { selected: 'selected' } : {},
    ),
  );
  if (!cleanPlaceholder) return optionDefinitions;
  const placeholderAttributes = hasSelectedValue
    ? { disabled: 'disabled' }
    : { disabled: 'disabled', selected: 'selected' };
  return [buildOptionDefinition('', cleanPlaceholder, placeholderAttributes), ...optionDefinitions];
};

export default buildSelectOptionDefinitions;
