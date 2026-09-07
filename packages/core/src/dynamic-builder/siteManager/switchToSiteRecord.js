import isEditorLive from '../support/isEditorLive.js';
import loadSiteProjectData from './loadSiteProjectData.js';
import readCurrentSiteRecord from './readCurrentSiteRecord.js';
import refreshSiteRecordStats from './refreshSiteRecordStats.js';
import setCurrentSiteRecord from './setCurrentSiteRecord.js';

const flushCurrentSiteRecord = (editor, managerOptions) => {
  const currentRecord = readCurrentSiteRecord(editor);
  if (!currentRecord) return Promise.resolve(false);
  if (editor.Commands && editor.Commands.has('db:persist-now')) editor.runCommand('db:persist-now');
  return managerOptions.storageAdapter.writeSite(refreshSiteRecordStats(editor, currentRecord));
};

const openSiteRecord = (editor, managerOptions, siteRecord, siteEntry) => {
  setCurrentSiteRecord(editor, managerOptions, siteRecord);
  loadSiteProjectData(editor, siteRecord, siteEntry && siteEntry.snapshot);
  const refreshedRecord = refreshSiteRecordStats(editor, siteRecord);
  return managerOptions.storageAdapter.writeSite(refreshedRecord).then(() => {
    if (!isEditorLive(editor)) return null;
    setCurrentSiteRecord(editor, managerOptions, refreshedRecord);
    editor.trigger('db:site:switch', { site: refreshedRecord });
    return refreshedRecord;
  });
};

const switchToSiteRecord = (editor, managerOptions, siteRecord, switchOptions = {}) => {
  if (!siteRecord) return Promise.resolve(null);
  const flushPromise =
    switchOptions.flushCurrent === false ? Promise.resolve(false) : flushCurrentSiteRecord(editor, managerOptions);
  return flushPromise
    .then(() => (isEditorLive(editor) ? managerOptions.storageAdapter.readSite(siteRecord.id) : null))
    .then((siteEntry) => (isEditorLive(editor) ? openSiteRecord(editor, managerOptions, siteRecord, siteEntry) : null));
};

export default switchToSiteRecord;
