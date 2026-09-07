import buildSiteRecord from './buildSiteRecord.js';
import findSiteRecordById from './findSiteRecordById.js';
import isEditorLive from '../support/isEditorLive.js';
import pickNewestSiteRecord from './pickNewestSiteRecord.js';
import readCurrentSiteRecord from './readCurrentSiteRecord.js';
import switchToSiteRecord from './switchToSiteRecord.js';

const openReplacementSite = (editor, managerOptions, remainingRecords) =>
  switchToSiteRecord(
    editor,
    managerOptions,
    pickNewestSiteRecord(remainingRecords) || buildSiteRecord({ name: 'My first site' }),
    { flushCurrent: false },
  );

const runDeleteSiteCommand = (editor, managerOptions, commandOptions) =>
  managerOptions.storageAdapter.listSites().then((siteRecords) => {
    if (!isEditorLive(editor)) return null;
    const targetRecord = findSiteRecordById(siteRecords, commandOptions.siteId);
    if (!targetRecord) return null;
    const currentRecord = readCurrentSiteRecord(editor);
    const remainingRecords = siteRecords.filter((siteRecord) => siteRecord.id !== targetRecord.id);
    return managerOptions.storageAdapter.deleteSite(targetRecord.id).then(() => {
      if (!isEditorLive(editor)) return null;
      editor.trigger('db:site:delete', { site: targetRecord });
      if (!currentRecord || currentRecord.id !== targetRecord.id) return targetRecord;
      return openReplacementSite(editor, managerOptions, remainingRecords).then(() => targetRecord);
    });
  });

export default runDeleteSiteCommand;
