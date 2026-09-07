import formatTraitDisplayValue from './formatTraitDisplayValue.js';

const resolveSliderDisplayValue = (trait) => {
  const currentValue = formatTraitDisplayValue(trait.getValue());
  if (currentValue !== '') return currentValue;
  const defaultValue = formatTraitDisplayValue(trait.get('default'));
  if (defaultValue !== '') return defaultValue;
  return formatTraitDisplayValue(trait.get('min')) || '0';
};

export default resolveSliderDisplayValue;
