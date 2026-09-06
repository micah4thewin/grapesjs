import downloadRecordsAsZip from './downloadRecordsAsZip.js';
import downloadTextFile from '../support/downloadTextFile.js';

const downloadFileRecordList = (editor, fileRecords, exportKind) => {
  const recordList = (Array.isArray(fileRecords) ? fileRecords : []).filter(Boolean);
  if (!recordList.length) return false;
  if (recordList.length > 1) {
    return downloadRecordsAsZip(editor, recordList, exportKind, exportKind === 'publish' ? 'site.zip' : 'pages.zip');
  }
  const singleRecord = recordList[0];
  downloadTextFile(singleRecord.fileName, singleRecord.mimeType, singleRecord.content);
  editor.trigger('db:export:complete', { kind: exportKind, fileNames: [singleRecord.fileName] });
  return true;
};

export default downloadFileRecordList;
