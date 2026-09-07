import isPlainRecord from '../support/isPlainRecord.js';

const resolvePageName = (pageRecord, pageIndex) => {
  const storedName = isPlainRecord(pageRecord) ? String(pageRecord.name || '').trim() : '';
  if (storedName) return storedName;
  const isMainPage = isPlainRecord(pageRecord) && pageRecord.type === 'main';
  return isMainPage || pageIndex === 0 ? 'Home' : 'Page ' + (pageIndex + 1);
};

const buildRevisionMetaRecord = (snapshotPayload) => {
  const projectData = isPlainRecord(snapshotPayload) && isPlainRecord(snapshotPayload.projectData)
    ? snapshotPayload.projectData
    : {};
  const pageList = Array.isArray(projectData.pages) ? projectData.pages : [];
  let byteLength = 0;
  try {
    byteLength = JSON.stringify(snapshotPayload || {}).length;
  } catch (serializeError) {
    byteLength = 0;
  }
  return {
    pageCount: pageList.length,
    pageNames: pageList.map(resolvePageName),
    byteLength,
  };
};

export default buildRevisionMetaRecord;
