import isEditorLive from '../support/isEditorLive.js';
import openConfirmModal from '../shell/openConfirmModal.js';
import resolveTemplateStore from './resolveTemplateStore.js';
import showToastNotice from '../support/showToastNotice.js';

const runDelete = (editor, moduleOptions, templateRecord, onDeleted) =>
  resolveTemplateStore(moduleOptions)
    .deleteTemplate(templateRecord.templateId)
    .then(() => {
      if (!isEditorLive(editor)) return null;
      showToastNotice(editor, 'Deleted "' + templateRecord.name + '".', { kind: 'success' });
      if (typeof onDeleted === 'function') onDeleted(templateRecord);
      return templateRecord;
    })
    .catch((deleteError) => {
      if (isEditorLive(editor)) showToastNotice(editor, String(deleteError.message || deleteError), { kind: 'error' });
      return null;
    });

const deleteUserTemplate = (editor, moduleOptions, templateRecord, onDeleted) => {
  if (!templateRecord) return null;
  openConfirmModal(
    editor,
    'Delete this template?',
    'The template "' +
      templateRecord.name +
      '" will be removed from this browser. Pages already built stay as they are.',
    'Delete template',
    () => runDelete(editor, moduleOptions, templateRecord, onDeleted),
  );
  return templateRecord;
};

export default deleteUserTemplate;
