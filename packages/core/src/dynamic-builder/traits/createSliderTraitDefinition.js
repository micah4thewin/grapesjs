import buildTraitAriaLabelAttribute from './buildTraitAriaLabelAttribute.js';
import commitSliderValue from './commitSliderValue.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import formatTraitDisplayValue from './formatTraitDisplayValue.js';
import renderSliderReadout from './renderSliderReadout.js';
import resolveSliderDisplayValue from './resolveSliderDisplayValue.js';
import resolveSliderUnitText from './resolveSliderUnitText.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';

const createSliderTraitDefinition = () => ({
  eventCapture: ['input', 'change', 'dblclick'],
  createInput: ({ trait }) => {
    const minAttribute = escapeHtmlText(formatTraitDisplayValue(trait.get('min')) || '0');
    const maxAttribute = escapeHtmlText(formatTraitDisplayValue(trait.get('max')) || '100');
    const stepAttribute = escapeHtmlText(formatTraitDisplayValue(trait.get('step')) || '1');
    const boundsText = `min="${minAttribute}" max="${maxAttribute}" step="${stepAttribute}"`;
    const unitText = resolveSliderUnitText(trait);
    return [
      '<div class="gjs-db-field gjs-db-trait-slider" title="Double-click the number to reset">',
      `<input type="range" class="gjs-db-field-input gjs-db-trait-slider-range" ${boundsText}${buildTraitAriaLabelAttribute(trait)}>`,
      '<span class="gjs-db-trait-slider-readout">',
      `<input type="number" class="gjs-db-field-input gjs-db-trait-slider-number" ${boundsText}${buildTraitAriaLabelAttribute(trait, '(exact value)')}>`,
      `<span class="gjs-db-trait-slider-unit gjs-db-muted" data-db-slider-unit>${escapeHtmlText(unitText)}</span>`,
      '</span>',
      '</div>',
    ].join('');
  },
  onEvent: ({ trait, elInput, event }) => {
    const eventTarget = event && event.target;
    if (!eventTarget || !eventTarget.matches) return;
    const unitText = resolveSliderUnitText(trait);
    if (event.type === 'dblclick') {
      if (!eventTarget.closest('.gjs-db-trait-slider-readout')) return;
      const defaultValue = formatTraitDisplayValue(trait.get('default'));
      if (defaultValue === '') return;
      renderSliderReadout(elInput, commitSliderValue(trait, defaultValue, false) || defaultValue, unitText);
      return;
    }
    if (!eventTarget.matches('input')) return;
    const isRangeInput = eventTarget.type === 'range';
    const isPartial = isRangeInput && event.type === 'input';
    if (!isRangeInput && event.type === 'input') return;
    const committedValue = commitSliderValue(trait, eventTarget.value, isPartial);
    if (committedValue === null) {
      renderSliderReadout(elInput, resolveSliderDisplayValue(trait), unitText);
      return;
    }
    const rangeInput = resolveTraitInnerElement(elInput, 'input[type="range"]');
    if (!isRangeInput && rangeInput) rangeInput.value = committedValue;
    renderSliderReadout(elInput, committedValue, unitText);
  },
  onUpdate: ({ trait, elInput }) => {
    renderSliderReadout(elInput, resolveSliderDisplayValue(trait), resolveSliderUnitText(trait));
  },
});

export default createSliderTraitDefinition;
