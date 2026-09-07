import deleteUserTemplate from './deleteUserTemplate.js';
import isEditorLive from '../support/isEditorLive.js';
import resolveTemplateStore from './resolveTemplateStore.js';
import showToastNotice from '../support/showToastNotice.js';

const runDeleteTemplateCommand = (editor, moduleOptions, templateId) => {
  const wantedId = String(templateId || '');
  if (!wantedId) {
    showToastNotice(editor, 'Open Templates, then delete a saved template from its card.', { kind: 'warning' });
    return Promise.resolve(null);
  }
  return resolveTemplateStore(moduleOptions)
    .listTemplates()
    .then((storedRecords) => {
      if (!isEditorLive(editor)) return null;
      const templateRecord = (storedRecords || []).find((storedRecord) => storedRecord.templateId === wantedId);
      if (!templateRecord) {
        showToastNotice(editor, 'That template is no longer saved in this browser.', { kind: 'warning' });
        return null;
      }
      return deleteUserTemplate(editor, moduleOptions, templateRecord);
    })
    .catch(() => null);
};

export default runDeleteTemplateCommand;
