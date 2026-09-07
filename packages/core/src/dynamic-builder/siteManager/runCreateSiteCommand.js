import buildSiteRecord from './buildSiteRecord.js';
import isEditorLive from '../support/isEditorLive.js';
import switchToSiteRecord from './switchToSiteRecord.js';

const runCreateSiteCommand = (editor, managerOptions, commandOptions) => {
  const siteName = String(commandOptions.name || '').trim();
  if (!siteName) return Promise.resolve(null);
  const siteRecord = buildSiteRecord({ name: siteName, description: commandOptions.description });
  return switchToSiteRecord(editor, managerOptions, siteRecord).then((createdRecord) => {
    if (!isEditorLive(editor) || !createdRecord) return null;
    editor.trigger('db:site:create', { site: createdRecord });
    return createdRecord;
  });
};

export default runCreateSiteCommand;
