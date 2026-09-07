import readCurrentSiteRecord from './readCurrentSiteRecord.js';
import showToastNotice from '../support/showToastNotice.js';
import switchToSiteRecord from './switchToSiteRecord.js';

const runSiteDownload = (editor) =>
  editor.Commands && editor.Commands.has('db:download-site') ? editor.runCommand('db:download-site') : false;

const exportSiteRecord = (editor, managerOptions, siteRecord) => {
  const currentRecord = readCurrentSiteRecord(editor);
  if (currentRecord && currentRecord.id === siteRecord.id) return Promise.resolve(runSiteDownload(editor));
  showToastNotice(editor, 'Opening ' + siteRecord.name + ' so it can be exported', { kind: 'info' });
  return switchToSiteRecord(editor, managerOptions, siteRecord).then(() => runSiteDownload(editor));
};

export default exportSiteRecord;
