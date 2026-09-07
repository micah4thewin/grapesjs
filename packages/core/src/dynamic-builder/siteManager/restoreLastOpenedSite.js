import findSiteRecordById from './findSiteRecordById.js';
import isEditorLive from '../support/isEditorLive.js';
import pickNewestSiteRecord from './pickNewestSiteRecord.js';
import switchToSiteRecord from './switchToSiteRecord.js';

const restoreLastOpenedSite = (editor, managerOptions, siteRecords) =>
  managerOptions.storageAdapter.readUser().then((ownerRecord) => {
    if (!isEditorLive(editor)) return null;
    const lastSiteRecord = findSiteRecordById(siteRecords, ownerRecord && ownerRecord.lastSiteId);
    return switchToSiteRecord(editor, managerOptions, lastSiteRecord || pickNewestSiteRecord(siteRecords), {
      flushCurrent: false,
    });
  });

export default restoreLastOpenedSite;
