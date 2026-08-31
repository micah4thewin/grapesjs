import syncCheckboxFromAttributes from './syncCheckboxFromAttributes.js';
import syncConsentCheckboxFromAttributes from './syncConsentCheckboxFromAttributes.js';
import syncFormFieldHelpFromAttribute from './syncFormFieldHelpFromAttribute.js';
import syncFormFieldLabelFromAttribute from './syncFormFieldLabelFromAttribute.js';
import syncFormFieldRequiredFromAttribute from './syncFormFieldRequiredFromAttribute.js';
import syncRadioGroupFromAttributes from './syncRadioGroupFromAttributes.js';
import syncSelectOptionsFromAttribute from './syncSelectOptionsFromAttribute.js';

const watchFormComponentUpdates = (editor) => {
  editor.on('component:update:attributes:data-db-label', (component) => {
    syncFormFieldLabelFromAttribute(component);
    syncCheckboxFromAttributes(component);
  });
  editor.on('component:update:attributes:data-db-help', (component) => syncFormFieldHelpFromAttribute(component));
  editor.on('component:update:attributes:data-db-required', (component) => {
    syncFormFieldRequiredFromAttribute(component);
    syncCheckboxFromAttributes(component);
  });
  editor.on('component:update:attributes:data-db-options', (component) => {
    syncSelectOptionsFromAttribute(component);
    syncRadioGroupFromAttributes(component);
  });
  editor.on('component:update:attributes:data-db-legend', (component) => syncRadioGroupFromAttributes(component));
  editor.on('component:update:attributes:data-db-group-name', (component) => syncRadioGroupFromAttributes(component));
  editor.on('component:update:attributes:data-db-name', (component) => {
    syncCheckboxFromAttributes(component);
    syncConsentCheckboxFromAttributes(component);
  });
  editor.on('component:update:attributes:data-db-value', (component) => syncCheckboxFromAttributes(component));
  editor.on('component:update:attributes:data-db-privacy-url', (component) =>
    syncConsentCheckboxFromAttributes(component),
  );
};

export default watchFormComponentUpdates;
