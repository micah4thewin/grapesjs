import duplicateSiteRecord from './duplicateSiteRecord.js';
import exportSiteRecord from './exportSiteRecord.js';
import findSiteRecordById from './findSiteRecordById.js';
import isEditorLive from '../support/isEditorLive.js';
import showToastNotice from '../support/showToastNotice.js';

const runSiteCopyAction = (editor, managerOptions, actionName, siteId, refreshList) =>
  managerOptions.storageAdapter.listSites().then((siteRecords) => {
    if (!isEditorLive(editor)) return null;
    const siteRecord = findSiteRecordById(siteRecords, siteId);
    if (!siteRecord) return null;
    if (actionName === 'export') {
      editor.Modal.close();
      return exportSiteRecord(editor, managerOptions, siteRecord);
    }
    return duplicateSiteRecord(editor, managerOptions, siteRecord).then((copyRecord) => {
      if (!isEditorLive(editor)) return null;
      showToastNotice(editor, 'Copied to ' + copyRecord.name, { kind: 'success' });
      return refreshList();
    });
  });

export default runSiteCopyAction;
