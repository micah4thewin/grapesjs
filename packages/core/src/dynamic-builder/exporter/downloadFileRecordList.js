import downloadTextFile from '../support/downloadTextFile.js';

const downloadFileRecordList = (editor, fileRecords, exportKind) => {
  const recordList = (Array.isArray(fileRecords) ? fileRecords : []).filter(Boolean);
  if (!recordList.length) return false;
  recordList.forEach((fileRecord, recordIndex) => {
    setTimeout(() => downloadTextFile(fileRecord.fileName, fileRecord.mimeType, fileRecord.content), recordIndex * 300);
  });
  editor.trigger('db:export:complete', {
    kind: exportKind,
    fileNames: recordList.map((fileRecord) => fileRecord.fileName),
  });
  return true;
};

export default downloadFileRecordList;
