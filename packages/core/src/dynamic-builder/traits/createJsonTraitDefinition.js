import buildTraitAriaLabelAttribute from './buildTraitAriaLabelAttribute.js';
import formatTraitDisplayValue from './formatTraitDisplayValue.js';
import markTraitInputValidity from './markTraitInputValidity.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';
import syncTraitInputFromValue from './syncTraitInputFromValue.js';

const createJsonTraitDefinition = () => ({
  createInput: ({ trait }) =>
    [
      '<div class="gjs-db-field">',
      `<textarea class="gjs-db-field-input gjs-db-trait-json" rows="6" spellcheck="false"${buildTraitAriaLabelAttribute(trait)} `,
      'placeholder="{ &quot;key&quot;: &quot;value&quot; }"></textarea>',
      '</div>',
    ].join(''),
  onEvent: ({ trait, elInput }) => {
    const jsonInput = resolveTraitInnerElement(elInput, 'textarea');
    if (!jsonInput) return;
    const rawValue = jsonInput.value.trim();
    let isParseable = true;
    if (rawValue) {
      try {
        JSON.parse(rawValue);
      } catch (parseError) {
        isParseable = false;
      }
    }
    markTraitInputValidity(jsonInput, isParseable, 'This is not valid JSON yet, so it has not been saved');
    if (isParseable) trait.set('value', rawValue);
  },
  onUpdate: ({ trait, elInput }) => {
    const jsonInput = syncTraitInputFromValue(elInput, 'textarea', formatTraitDisplayValue(trait.getValue()));
    if (jsonInput) markTraitInputValidity(jsonInput, true, '');
  },
});

export default createJsonTraitDefinition;
