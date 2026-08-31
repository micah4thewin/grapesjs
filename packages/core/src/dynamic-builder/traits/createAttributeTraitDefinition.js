import escapeHtmlText from '../support/escapeHtmlText.js';
import formatTraitDisplayValue from './formatTraitDisplayValue.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';
import syncTraitInputFromValue from './syncTraitInputFromValue.js';
import writeComponentAttributeValue from './writeComponentAttributeValue.js';

const createAttributeTraitDefinition = (attributeName, placeholderText) => ({
  createInput: ({ trait }) => {
    const placeholderValue = escapeHtmlText(trait.get('placeholder') || placeholderText);
    return [
      '<div class="gjs-db-field">',
      `<input type="text" class="gjs-db-field-input" placeholder="${placeholderValue}">`,
      '</div>',
    ].join('');
  },
  onEvent: ({ component, elInput }) => {
    const textInput = resolveTraitInnerElement(elInput, 'input');
    if (textInput) writeComponentAttributeValue(component, attributeName, textInput.value.trim());
  },
  onUpdate: ({ component, elInput }) => {
    const storedValue = component && component.getAttributes ? component.getAttributes()[attributeName] : '';
    syncTraitInputFromValue(elInput, 'input', formatTraitDisplayValue(storedValue));
  },
});

export default createAttributeTraitDefinition;
