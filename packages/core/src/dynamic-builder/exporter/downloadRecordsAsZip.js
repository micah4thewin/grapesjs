import buildZipArchiveBytes from './buildZipArchiveBytes.js';
import downloadBlobFile from '../support/downloadBlobFile.js';

const downloadRecordsAsZip = (editor, fileRecords, exportKind, archiveFileName) => {
  const recordList = (Array.isArray(fileRecords) ? fileRecords : []).filter(Boolean);
  if (!recordList.length) return false;
  const archiveBytes = buildZipArchiveBytes(recordList, new Date());
  downloadBlobFile(archiveFileName, new Blob([archiveBytes], { type: 'application/zip' }));
  editor.trigger('db:export:complete', {
    kind: exportKind,
    fileNames: recordList.map((fileRecord) => fileRecord.fileName),
  });
  return true;
};

export default downloadRecordsAsZip;
