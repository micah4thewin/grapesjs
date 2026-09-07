import buildUserTemplateRecord from './buildUserTemplateRecord.js';
import isEditorLive from '../support/isEditorLive.js';
import readSaveTemplateValues from './readSaveTemplateValues.js';
import resolveTemplateStore from './resolveTemplateStore.js';
import serializeTemplateContent from './serializeTemplateContent.js';
import showToastNotice from '../support/showToastNotice.js';

const showFieldError = (formElement, messageText) => {
  const errorElement = formElement.querySelector('[data-db-template-error]');
  const inputElement = formElement.querySelector('[data-db-template-name]');
  if (errorElement) errorElement.textContent = messageText;
  if (!inputElement) return;
  inputElement.classList.add('gjs-db-field-invalid');
  inputElement.setAttribute('aria-invalid', 'true');
  inputElement.focus();
};

const saveComponentsAsTemplate = (editor, moduleOptions, formElement, kindName, sourceComponents, onSaved) => {
  const formValues = readSaveTemplateValues(formElement);
  if (!formValues.nameText) {
    showFieldError(formElement, 'Give the template a name so you can find it later.');
    return null;
  }
  const contentRecords = serializeTemplateContent(sourceComponents);
  if (!contentRecords.length) {
    showFieldError(formElement, 'There is nothing here to save yet.');
    return null;
  }
  const templateRecord = buildUserTemplateRecord(formValues, kindName, contentRecords);
  editor.Modal.close();
  return resolveTemplateStore(moduleOptions)
    .writeTemplate(templateRecord)
    .then((savedRecord) => {
      if (!isEditorLive(editor)) return null;
      showToastNotice(editor, 'Saved "' + savedRecord.name + '" to My templates.', { kind: 'success' });
      if (typeof onSaved === 'function') onSaved(savedRecord);
      return savedRecord;
    })
    .catch((saveError) => {
      if (isEditorLive(editor)) showToastNotice(editor, String(saveError.message || saveError), { kind: 'error' });
      return null;
    });
};

export default saveComponentsAsTemplate;
