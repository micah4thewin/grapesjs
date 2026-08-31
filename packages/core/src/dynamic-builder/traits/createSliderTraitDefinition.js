import formatTraitDisplayValue from './formatTraitDisplayValue.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';
import syncTraitInputFromValue from './syncTraitInputFromValue.js';

const createSliderTraitDefinition = () => ({
  eventCapture: ['input', 'change'],
  createInput: ({ trait }) => {
    const minAttribute = formatTraitDisplayValue(trait.get('min')) || '0';
    const maxAttribute = formatTraitDisplayValue(trait.get('max')) || '100';
    const stepAttribute = formatTraitDisplayValue(trait.get('step')) || '1';
    return [
      '<div class="gjs-db-field gjs-db-trait-slider">',
      '<input type="range" class="gjs-db-field-input" ',
      `min="${minAttribute}" max="${maxAttribute}" step="${stepAttribute}">`,
      '<span class="gjs-db-trait-slider-readout gjs-db-muted"></span>',
      '</div>',
    ].join('');
  },
  onEvent: ({ trait, elInput }) => {
    const rangeInput = resolveTraitInnerElement(elInput, 'input');
    if (!rangeInput) return;
    const readoutElement = resolveTraitInnerElement(elInput, '.gjs-db-trait-slider-readout');
    if (readoutElement) readoutElement.textContent = rangeInput.value;
    trait.set('value', rangeInput.value);
  },
  onUpdate: ({ trait, elInput }) => {
    const currentValue = formatTraitDisplayValue(trait.getValue());
    const fallbackValue = formatTraitDisplayValue(trait.get('min')) || '0';
    const rangeInput = syncTraitInputFromValue(elInput, 'input', currentValue || fallbackValue);
    const readoutElement = resolveTraitInnerElement(elInput, '.gjs-db-trait-slider-readout');
    if (readoutElement && rangeInput) readoutElement.textContent = rangeInput.value;
  },
});

export default createSliderTraitDefinition;
