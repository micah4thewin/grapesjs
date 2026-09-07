import escapeHtmlText from '../support/escapeHtmlText.js';
import toSlugText from '../support/toSlugText.js';
import resolveTraitInnerElement from '../traits/resolveTraitInnerElement.js';
import syncTraitInputFromValue from '../traits/syncTraitInputFromValue.js';
import describeAnchorHelpText from './describeAnchorHelpText.js';

const updateHelpText = (elInput, slugValue) => {
  const helpElement = resolveTraitInnerElement(elInput, '[data-db-anchor-help]');
  if (helpElement) helpElement.textContent = describeAnchorHelpText(slugValue);
};

const createAnchorTraitDefinition = () => ({
  createInput: ({ trait }) => {
    const placeholderValue = escapeHtmlText(trait.get('placeholder') || 'e.g. pricing');
    return [
      '<div class="gjs-db-field gjs-db-trait-anchor">',
      `<input type="text" class="gjs-db-field-input" placeholder="${placeholderValue}" spellcheck="false" autocomplete="off">`,
      '<div class="gjs-db-field-help" data-db-anchor-help></div>',
      '</div>',
    ].join('');
  },
  onEvent: ({ trait, elInput }) => {
    const anchorInput = resolveTraitInnerElement(elInput, 'input');
    if (!anchorInput) return;
    const slugValue = toSlugText(anchorInput.value);
    if (anchorInput.value !== slugValue) anchorInput.value = slugValue;
    trait.set('value', slugValue);
    updateHelpText(elInput, slugValue);
  },
  onUpdate: ({ trait, elInput }) => {
    const slugValue = String(trait.getValue() || '');
    syncTraitInputFromValue(elInput, 'input', slugValue);
    updateHelpText(elInput, slugValue);
  },
});

export default createAnchorTraitDefinition;
