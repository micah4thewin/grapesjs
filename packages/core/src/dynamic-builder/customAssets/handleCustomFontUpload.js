import getCustomAssetAdapters from './getCustomAssetAdapters.js';
import isEditorLive from '../support/isEditorLive.js';
import readCustomFontFormValues from './readCustomFontFormValues.js';
import readFileAsDataUrl from '../mediaComponents/readFileAsDataUrl.js';
import refreshCustomAssetsPanels from './refreshCustomAssetsPanels.js';
import showToastNotice from '../support/showToastNotice.js';

const resetFontForm = (rootElement) => {
  const formElement = rootElement.querySelector('[data-db-custom-font-form]');
  const fileElement = rootElement.querySelector('[data-db-custom-font-file]');
  if (fileElement) fileElement.value = '';
  if (formElement) formElement.querySelectorAll('[data-db-custom-font-family]').forEach((input) => (input.value = ''));
};

const handleCustomFontUpload = (editor, rootElement) => {
  const adapters = getCustomAssetAdapters(editor);
  const formValues = readCustomFontFormValues(rootElement, adapters.maxFontBytes);
  if (formValues.errorText) {
    showToastNotice(editor, formValues.errorText, { kind: 'warning' });
    return Promise.resolve(false);
  }
  return readFileAsDataUrl(formValues.fileObject)
    .then((dataUrl) => {
      if (!isEditorLive(editor)) return false;
      return adapters.fonts.writeFont({
        family: formValues.family,
        weight: formValues.weight,
        style: formValues.style,
        format: formValues.format,
        fileName: String(formValues.fileObject.name || ''),
        byteSize: Number(formValues.fileObject.size) || 0,
        addedAt: new Date().toISOString(),
        source: dataUrl,
      });
    })
    .then((savedRecord) => {
      if (!savedRecord || !isEditorLive(editor)) return false;
      resetFontForm(rootElement);
      showToastNotice(editor, savedRecord.family + ' is ready to use', { kind: 'success' });
      editor.trigger('db:custom-font:added', { family: savedRecord.family, fontId: savedRecord.fontId });
      return refreshCustomAssetsPanels(editor, rootElement);
    })
    .catch((writeError) => {
      if (isEditorLive(editor)) showToastNotice(editor, String(writeError.message || writeError), { kind: 'error' });
      return false;
    });
};

export default handleCustomFontUpload;
