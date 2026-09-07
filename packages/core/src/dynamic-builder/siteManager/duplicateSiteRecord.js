import buildProjectSnapshot from '../persistence/buildProjectSnapshot.js';
import buildSiteRecord from './buildSiteRecord.js';
import readCurrentSiteRecord from './readCurrentSiteRecord.js';

const duplicateSiteRecord = (editor, managerOptions, siteRecord) => {
  const currentRecord = readCurrentSiteRecord(editor);
  const isCurrentSite = !!currentRecord && currentRecord.id === siteRecord.id;
  if (isCurrentSite && editor.Commands && editor.Commands.has('db:persist-now')) editor.runCommand('db:persist-now');
  const copyRecord = buildSiteRecord({
    name: siteRecord.name + ' copy',
    description: siteRecord.description,
    pageCount: siteRecord.pageCount,
  });
  return managerOptions.storageAdapter.readSite(siteRecord.id).then((siteEntry) => {
    const storedSnapshot = siteEntry && siteEntry.snapshot;
    const snapshotRecord = storedSnapshot || (isCurrentSite ? buildProjectSnapshot(editor) : null);
    return managerOptions.storageAdapter.writeSite(copyRecord, snapshotRecord).then(() => copyRecord);
  });
};

export default duplicateSiteRecord;
