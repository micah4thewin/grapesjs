import formatTraitDisplayValue from './formatTraitDisplayValue.js';

const clampSliderValue = (trait, rawValue) => {
  const numericValue = Number(rawValue);
  if (rawValue === '' || !Number.isFinite(numericValue)) return null;
  const minValue = Number(trait.get('min'));
  const maxValue = Number(trait.get('max'));
  let boundedValue = numericValue;
  if (Number.isFinite(minValue)) boundedValue = Math.max(minValue, boundedValue);
  if (Number.isFinite(maxValue)) boundedValue = Math.min(maxValue, boundedValue);
  return String(Number(boundedValue.toFixed(4)));
};

const revertToScrubStart = (trait, startValue) => {
  if (startValue === '') {
    const targetComponent = trait.target;
    if (targetComponent && targetComponent.removeAttributes) {
      targetComponent.removeAttributes([trait.get('name')], { avoidStore: true });
    }
    return;
  }
  trait.setValue(startValue, { partial: true });
};

const commitSliderValue = (trait, rawValue, isPartial) => {
  const boundedValue = clampSliderValue(trait, rawValue);
  if (boundedValue === null) return null;
  if (isPartial) {
    if (trait.dbScrubStartValue === undefined) trait.dbScrubStartValue = formatTraitDisplayValue(trait.getValue());
    trait.setValue(boundedValue, { partial: true });
    return boundedValue;
  }
  const startValue = trait.dbScrubStartValue;
  delete trait.dbScrubStartValue;
  if (startValue !== undefined && startValue !== boundedValue) revertToScrubStart(trait, startValue);
  trait.set('value', boundedValue);
  return boundedValue;
};

export default commitSliderValue;
