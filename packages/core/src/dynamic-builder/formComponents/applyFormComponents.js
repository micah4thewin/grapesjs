import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';
import registerCommandSet from '../support/registerCommandSet.js';
import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import registerEditorOnlyCanvasStyles from '../support/registerEditorOnlyCanvasStyles.js';
import registerRuntimeScript from '../support/registerRuntimeScript.js';
import registerTraitTypeSet from '../support/registerTraitTypeSet.js';
import addFormStep from './addFormStep.js';
import buildCheckboxTypeDefinition from './buildCheckboxTypeDefinition.js';
import buildConsentCheckboxTypeDefinition from './buildConsentCheckboxTypeDefinition.js';
import buildFieldLabelTypeDefinition from './buildFieldLabelTypeDefinition.js';
import buildFileInputTypeDefinition from './buildFileInputTypeDefinition.js';
import buildFormEditorCanvasCss from './buildFormEditorCanvasCss.js';
import buildFormEditorCss from './buildFormEditorCss.js';
import buildFormFieldTypeDefinition from './buildFormFieldTypeDefinition.js';
import buildFormRowTypeDefinition from './buildFormRowTypeDefinition.js';
import buildFormStatusTypeDefinition from './buildFormStatusTypeDefinition.js';
import buildFormStepTypeDefinition from './buildFormStepTypeDefinition.js';
import buildFormStepsNavDefinition from './buildFormStepsNavDefinition.js';
import buildFormTypeDefinition from './buildFormTypeDefinition.js';
import buildFormsBaseCss from './buildFormsBaseCss.js';
import buildHiddenInputTypeDefinition from './buildHiddenInputTypeDefinition.js';
import buildHoneypotTypeDefinition from './buildHoneypotTypeDefinition.js';
import buildInputTypeDefinition from './buildInputTypeDefinition.js';
import buildRadioGroupTypeDefinition from './buildRadioGroupTypeDefinition.js';
import buildSelectTypeDefinition from './buildSelectTypeDefinition.js';
import buildSubmitButtonTypeDefinition from './buildSubmitButtonTypeDefinition.js';
import buildTextareaTypeDefinition from './buildTextareaTypeDefinition.js';
import createFieldPickerTraitDefinition from './createFieldPickerTraitDefinition.js';
import createFormDestinationTraitDefinition from './createFormDestinationTraitDefinition.js';
import createFormPreviewTraitDefinition from './createFormPreviewTraitDefinition.js';
import createOptionListTraitDefinition from './createOptionListTraitDefinition.js';
import createPageUrlTraitDefinition from './createPageUrlTraitDefinition.js';
import getFormRuntimeRecords from './getFormRuntimeRecords.js';
import openAddFieldModal from './openAddFieldModal.js';
import resolveFormTextDefaults from './resolveFormTextDefaults.js';
import watchFormComponentUpdates from './watchFormComponentUpdates.js';

const applyFormComponents = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.formComponents) || {};
  const formTextDefaults = resolveFormTextDefaults(moduleOptions);
  registerTraitTypeSet(editor, {
    'db-form-destination': createFormDestinationTraitDefinition(),
    'db-form-preview': createFormPreviewTraitDefinition(),
    'db-option-list': createOptionListTraitDefinition(),
    'db-page-url': createPageUrlTraitDefinition(editor),
    'db-field-picker': createFieldPickerTraitDefinition(),
  });
  registerComponentTypeSet(editor, [
    buildFieldLabelTypeDefinition(),
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
    buildFormStatusTypeDefinition(),
    buildFormRowTypeDefinition(),
    buildFormStepsNavDefinition(),
    buildFormStepTypeDefinition(),
    buildFormFieldTypeDefinition(formTextDefaults),
    buildFormTypeDefinition(formTextDefaults),
  ]);
  watchFormComponentUpdates(editor);
  Object.entries(getFormRuntimeRecords()).forEach(([runtimeId, runtimeRecord]) =>
    registerRuntimeScript(editor, runtimeId, runtimeRecord),
  );
  registerCommandSet(editor, {
    'db:add-form-field': { run: (commandEditor) => openAddFieldModal(commandEditor, commandEditor.getSelected()) },
    'db:add-form-step': { run: (commandEditor) => addFormStep(commandEditor, commandEditor.getSelected()) },
  });
  registerCanvasStyles(editor, 'db-css-forms-base', buildFormsBaseCss());
  registerEditorOnlyCanvasStyles(editor, 'db-css-forms-editor-canvas', buildFormEditorCanvasCss());
  const injectFormEditorStyles = () => injectEditorStylesOnce(editor, 'db-css-forms-editor', buildFormEditorCss());
  injectFormEditorStyles();
  if (editor.onReady) editor.onReady(injectFormEditorStyles);
};

export default applyFormComponents;
