import applyFieldPreset from './applyFieldPreset.js';
import syncCheckboxFromAttributes from './syncCheckboxFromAttributes.js';
import syncConsentCheckboxFromAttributes from './syncConsentCheckboxFromAttributes.js';
import syncFormFieldHelpFromAttribute from './syncFormFieldHelpFromAttribute.js';
import syncFormFieldLabelFromAttribute from './syncFormFieldLabelFromAttribute.js';
import syncFormFieldRequiredFromAttribute from './syncFormFieldRequiredFromAttribute.js';
import syncHiddenInputFromAttributes from './syncHiddenInputFromAttributes.js';
import syncInputPatternPreset from './syncInputPatternPreset.js';
import syncInputTypeDefaults from './syncInputTypeDefaults.js';
import syncLegendFromAttribute from './syncLegendFromAttribute.js';
import syncRadioGroupFromAttributes from './syncRadioGroupFromAttributes.js';
import syncSelectOptionsFromAttribute from './syncSelectOptionsFromAttribute.js';
import syncSubmitButtonClasses from './syncSubmitButtonClasses.js';

const watchFormAttributeUpdates = (editor) => {
  const watchAttribute = (attributeName, ...syncHandlers) =>
    editor.on('component:update:attributes:' + attributeName, (component) =>
      syncHandlers.forEach((syncHandler) => syncHandler(component)),
    );
  watchAttribute('data-db-label', syncFormFieldLabelFromAttribute, syncCheckboxFromAttributes);
  watchAttribute('data-db-help', syncFormFieldHelpFromAttribute);
  watchAttribute(
    'data-db-required',
    syncFormFieldRequiredFromAttribute,
    syncCheckboxFromAttributes,
    syncConsentCheckboxFromAttributes,
    syncRadioGroupFromAttributes,
  );
  watchAttribute('data-db-field-kind', applyFieldPreset);
  watchAttribute('data-db-options', syncSelectOptionsFromAttribute, syncRadioGroupFromAttributes);
  watchAttribute('data-db-selected', syncSelectOptionsFromAttribute, syncRadioGroupFromAttributes);
  watchAttribute('data-db-placeholder', syncSelectOptionsFromAttribute);
  watchAttribute('data-db-legend', syncRadioGroupFromAttributes, (component) =>
    syncLegendFromAttribute(component && component.is && component.is('db-form-step') ? component : null, 'Step'),
  );
  watchAttribute('data-db-group-name', syncRadioGroupFromAttributes);
  watchAttribute(
    'data-db-name',
    syncCheckboxFromAttributes,
    syncConsentCheckboxFromAttributes,
    syncHiddenInputFromAttributes,
  );
  watchAttribute('data-db-value', syncCheckboxFromAttributes, syncHiddenInputFromAttributes);
  watchAttribute('data-db-privacy-url', syncConsentCheckboxFromAttributes);
  watchAttribute('data-db-consent-text', syncConsentCheckboxFromAttributes);
  watchAttribute('data-db-link-text', syncConsentCheckboxFromAttributes);
  watchAttribute('type', syncInputTypeDefaults);
  watchAttribute('data-db-variant', syncSubmitButtonClasses);
  watchAttribute('data-db-size', syncSubmitButtonClasses);
  watchAttribute('data-db-pattern-preset', syncInputPatternPreset);
};

export default watchFormAttributeUpdates;
