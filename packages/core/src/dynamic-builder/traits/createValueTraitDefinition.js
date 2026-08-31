import formatTraitDisplayValue from './formatTraitDisplayValue.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';
import syncTraitInputFromValue from './syncTraitInputFromValue.js';

const createValueTraitDefinition = (buildInputMarkup, innerSelector) => ({
  createInput: (createOptions) => buildInputMarkup(createOptions),
  onEvent: ({ trait, elInput }) => {
    const innerElement = resolveTraitInnerElement(elInput, innerSelector);
    if (innerElement) trait.set('value', innerElement.value);
  },
  onUpdate: ({ trait, elInput }) => {
    syncTraitInputFromValue(elInput, innerSelector, formatTraitDisplayValue(trait.getValue()));
  },
});

export default createValueTraitDefinition;
