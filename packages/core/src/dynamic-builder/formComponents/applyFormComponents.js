import registerCanvasStyles from '../support/registerCanvasStyles.js';
import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import buildCheckboxTypeDefinition from './buildCheckboxTypeDefinition.js';
import buildConsentCheckboxTypeDefinition from './buildConsentCheckboxTypeDefinition.js';
import buildFileInputTypeDefinition from './buildFileInputTypeDefinition.js';
import buildFormFieldTypeDefinition from './buildFormFieldTypeDefinition.js';
import buildFormTypeDefinition from './buildFormTypeDefinition.js';
import buildFormsBaseCss from './buildFormsBaseCss.js';
import buildHiddenInputTypeDefinition from './buildHiddenInputTypeDefinition.js';
import buildHoneypotTypeDefinition from './buildHoneypotTypeDefinition.js';
import buildInputTypeDefinition from './buildInputTypeDefinition.js';
import buildRadioGroupTypeDefinition from './buildRadioGroupTypeDefinition.js';
import buildSelectTypeDefinition from './buildSelectTypeDefinition.js';
import buildSubmitButtonTypeDefinition from './buildSubmitButtonTypeDefinition.js';
import buildTextareaTypeDefinition from './buildTextareaTypeDefinition.js';
import resolveFormTextDefaults from './resolveFormTextDefaults.js';
import watchFormComponentUpdates from './watchFormComponentUpdates.js';

const applyFormComponents = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.formComponents) || {};
  const formTextDefaults = resolveFormTextDefaults(moduleOptions);
  registerComponentTypeSet(editor, [
    buildInputTypeDefinition(formTextDefaults),
    buildTextareaTypeDefinition(formTextDefaults),
    buildSelectTypeDefinition(formTextDefaults),
    buildCheckboxTypeDefinition(formTextDefaults),
    buildRadioGroupTypeDefinition(formTextDefaults),
    buildFileInputTypeDefinition(formTextDefaults),
    buildHiddenInputTypeDefinition(formTextDefaults),
    buildConsentCheckboxTypeDefinition(formTextDefaults),
    buildHoneypotTypeDefinition(formTextDefaults),
    buildSubmitButtonTypeDefinition(formTextDefaults),
    buildFormFieldTypeDefinition(formTextDefaults),
    buildFormTypeDefinition(formTextDefaults),
  ]);
  watchFormComponentUpdates(editor);
  registerCanvasStyles(editor, 'db-css-forms-base', buildFormsBaseCss());
};

export default applyFormComponents;
