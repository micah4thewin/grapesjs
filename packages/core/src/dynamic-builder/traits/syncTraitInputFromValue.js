import resolveTraitInnerElement from './resolveTraitInnerElement.js';

const syncTraitInputFromValue = (wrapperElement, innerSelector, nextValue) => {
  const innerElement = resolveTraitInnerElement(wrapperElement, innerSelector);
  if (!innerElement) return null;
  if (innerElement.value !== nextValue) innerElement.value = nextValue;
  return innerElement;
};

export default syncTraitInputFromValue;
