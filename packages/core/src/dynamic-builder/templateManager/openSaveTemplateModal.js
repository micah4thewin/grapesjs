import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildSaveTemplateFormMarkup from './buildSaveTemplateFormMarkup.js';
import describeTemplateSource from './describeTemplateSource.js';
import focusFirstModalControl from '../support/focusFirstModalControl.js';
import getEditorInstanceSuffix from '../shell/getEditorInstanceSuffix.js';
import openThemedModal from '../support/openThemedModal.js';
import resolveTemplateSourceComponents from './resolveTemplateSourceComponents.js';
import saveComponentsAsTemplate from './saveComponentsAsTemplate.js';
import showToastNotice from '../support/showToastNotice.js';

const openSaveTemplateModal = (editor, moduleOptions, kindName, onSaved) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  const sourceComponents = resolveTemplateSourceComponents(editor, kindName);
  if (!sourceComponents.length) {
    const missingText =
      kindName === 'page'
        ? 'This page is empty, so there is nothing to save yet.'
        : 'Select a section on the page first, then save it as a template.';
    showToastNotice(editor, missingText, { kind: 'warning' });
    return null;
  }
  const sourceRecord = describeTemplateSource(editor, kindName, sourceComponents);
  const fieldIdPrefix = 'db-template-save' + getEditorInstanceSuffix(editor);
  const formMarkup = buildSaveTemplateFormMarkup(
    fieldIdPrefix,
    kindName,
    sourceRecord.defaultName,
    sourceRecord.summaryText,
  );
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, formMarkup);
  if (!formElement) return null;
  formElement.querySelector('[data-db-template-cancel]').addEventListener('click', () => editor.Modal.close());
  formElement
    .querySelector('[data-db-template-submit]')
    .addEventListener('click', () =>
      saveComponentsAsTemplate(editor, moduleOptions, formElement, kindName, sourceComponents, onSaved),
    );
  openThemedModal(editor, 'Save as a template', formElement, { className: 'gjs-db-template-save-modal' });
  focusFirstModalControl(formElement);
  return formElement;
};

export default openSaveTemplateModal;
