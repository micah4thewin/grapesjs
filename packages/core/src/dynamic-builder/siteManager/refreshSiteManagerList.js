import countEditorPages from './countEditorPages.js';
import isEditorLive from '../support/isEditorLive.js';
import readCurrentSiteRecord from './readCurrentSiteRecord.js';
import renderSiteListElement from './renderSiteListElement.js';
import sortSiteRecordsNewestFirst from './sortSiteRecordsNewestFirst.js';

const withLivePageCount = (siteRecord, editor, currentSiteId) =>
  siteRecord.id === currentSiteId
    ? { ...siteRecord, pageCount: countEditorPages(editor) || siteRecord.pageCount }
    : siteRecord;

const refreshSiteManagerList = (editor, managerOptions, rootElement) =>
  managerOptions.storageAdapter.listSites().then((siteRecords) => {
    if (!isEditorLive(editor)) return 0;
    const listElement = rootElement.querySelector('[data-db-site-list]');
    if (!listElement) return 0;
    const currentRecord = readCurrentSiteRecord(editor);
    const currentSiteId = currentRecord ? currentRecord.id : '';
    return renderSiteListElement(
      listElement,
      sortSiteRecordsNewestFirst(siteRecords).map((siteRecord) => withLivePageCount(siteRecord, editor, currentSiteId)),
      currentSiteId,
    );
  });

export default refreshSiteManagerList;
