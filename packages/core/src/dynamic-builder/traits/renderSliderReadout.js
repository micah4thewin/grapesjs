import resolveTraitInnerElement from './resolveTraitInnerElement.js';

const renderSliderReadout = (wrapperElement, displayValue, unitText) => {
  const rangeInput = resolveTraitInnerElement(wrapperElement, 'input[type="range"]');
  const numberInput = resolveTraitInnerElement(wrapperElement, 'input[type="number"]');
  const unitElement = resolveTraitInnerElement(wrapperElement, '[data-db-slider-unit]');
  const valueText = String(displayValue);
  if (rangeInput) {
    if (rangeInput.value !== valueText) rangeInput.value = valueText;
    rangeInput.setAttribute('aria-valuetext', unitText ? `${valueText} ${unitText}` : valueText);
  }
  if (numberInput && numberInput.value !== valueText && wrapperElement.ownerDocument.activeElement !== numberInput) {
    numberInput.value = valueText;
  }
  if (unitElement) unitElement.textContent = unitText;
};

export default renderSliderReadout;
