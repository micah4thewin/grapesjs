import buildSiteArchiveFileName from './buildSiteArchiveFileName.js';
import downloadRecordsAsZip from './downloadRecordsAsZip.js';
import downloadTextFile from '../support/downloadTextFile.js';
import showToastNotice from '../support/showToastNotice.js';

const downloadFileRecordList = (editor, fileRecords, exportKind, downloadOptions = {}) => {
  const recordList = (Array.isArray(fileRecords) ? fileRecords : []).filter(Boolean);
  if (!recordList.length) {
    showToastNotice(editor, 'Nothing to download for this site yet', { kind: 'warning' });
    return false;
  }
  if (recordList.length > 1 || downloadOptions.forceZip) {
    const fallbackName = exportKind === 'publish' ? buildSiteArchiveFileName(editor) : 'pages.zip';
    return downloadRecordsAsZip(editor, recordList, exportKind, downloadOptions.archiveFileName || fallbackName);
  }
  const singleRecord = recordList[0];
  downloadTextFile(singleRecord.fileName, singleRecord.mimeType, singleRecord.content);
  editor.trigger('db:export:complete', {
    kind: exportKind,
    fileNames: [singleRecord.fileName],
    message: singleRecord.fileName + ' downloaded',
  });
  return true;
};

export default downloadFileRecordList;
