import isEditorLive from '../support/isEditorLive.js';
import readCurrentSiteRecord from './readCurrentSiteRecord.js';
import renderSiteListElement from './renderSiteListElement.js';
import sortSiteRecordsNewestFirst from './sortSiteRecordsNewestFirst.js';

const refreshSiteManagerList = (editor, managerOptions, rootElement) =>
  managerOptions.storageAdapter.listSites().then((siteRecords) => {
    if (!isEditorLive(editor)) return 0;
    const listElement = rootElement.querySelector('[data-db-site-list]');
    if (!listElement) return 0;
    const currentRecord = readCurrentSiteRecord(editor);
    return renderSiteListElement(
      listElement,
      sortSiteRecordsNewestFirst(siteRecords),
      currentRecord ? currentRecord.id : '',
    );
  });

export default refreshSiteManagerList;
