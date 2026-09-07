import isEditorLive from '../support/isEditorLive.js';
import showToastNotice from '../support/showToastNotice.js';

const readFieldValue = (formElement, fieldName) => {
  const fieldElement = formElement ? formElement.querySelector('[name="' + fieldName + '"]') : null;
  return fieldElement ? String(fieldElement.value || '').trim() : '';
};

const handleNewSiteSubmit = (editor, rootElement) => {
  const formElement = rootElement.querySelector('[data-db-site-new-form]');
  const errorElement = rootElement.querySelector('[data-db-site-error]');
  const siteName = readFieldValue(formElement, 'siteName');
  if (!siteName) {
    if (errorElement) errorElement.textContent = 'Give the site a name so you can find it again.';
    const nameElement = formElement && formElement.querySelector('[name="siteName"]');
    if (nameElement && typeof nameElement.focus === 'function') nameElement.focus();
    return null;
  }
  if (errorElement) errorElement.textContent = '';
  const createOptions = { name: siteName, description: readFieldValue(formElement, 'siteDescription') };
  return editor.runCommand('db:create-site', createOptions).then((siteRecord) => {
    if (!isEditorLive(editor) || !siteRecord) return null;
    editor.Modal.close();
    showToastNotice(editor, 'Created ' + siteRecord.name + '. Your other site is saved.', { kind: 'success' });
    return siteRecord;
  });
};

export default handleNewSiteSubmit;
