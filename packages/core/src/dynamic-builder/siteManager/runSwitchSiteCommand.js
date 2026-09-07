import findSiteRecordById from './findSiteRecordById.js';
import isEditorLive from '../support/isEditorLive.js';
import readCurrentSiteRecord from './readCurrentSiteRecord.js';
import switchToSiteRecord from './switchToSiteRecord.js';

const runSwitchSiteCommand = (editor, managerOptions, commandOptions) =>
  managerOptions.storageAdapter.listSites().then((siteRecords) => {
    if (!isEditorLive(editor)) return null;
    const targetRecord = findSiteRecordById(siteRecords, commandOptions.siteId);
    const currentRecord = readCurrentSiteRecord(editor);
    if (!targetRecord || (currentRecord && currentRecord.id === targetRecord.id)) return null;
    return switchToSiteRecord(editor, managerOptions, targetRecord);
  });

export default runSwitchSiteCommand;
