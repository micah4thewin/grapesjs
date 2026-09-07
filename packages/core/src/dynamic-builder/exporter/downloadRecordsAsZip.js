import buildZipArchiveBytes from './buildZipArchiveBytes.js';
import downloadBlobFile from '../support/downloadBlobFile.js';

const downloadRecordsAsZip = (editor, fileRecords, exportKind, archiveFileName, extraPayload) => {
  const recordList = (Array.isArray(fileRecords) ? fileRecords : []).filter(Boolean);
  if (!recordList.length) return false;
  const archiveBytes = buildZipArchiveBytes(recordList, new Date());
  downloadBlobFile(archiveFileName, new Blob([archiveBytes], { type: 'application/zip' }));
  const countText = recordList.length === 1 ? '1 file' : recordList.length + ' files';
  editor.trigger('db:export:complete', {
    ...(extraPayload || {}),
    kind: exportKind,
    fileNames: recordList.map((fileRecord) => fileRecord.fileName),
    archiveFileName,
    message: countText + ' saved to ' + archiveFileName,
  });
  return true;
};

export default downloadRecordsAsZip;
