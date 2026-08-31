import isPlainRecord from '../support/isPlainRecord.js';

const resolvePageSeoRecord = (pageMeta) => {
  const metaRecord = isPlainRecord(pageMeta) ? pageMeta : {};
  const nestedSeoRecord = isPlainRecord(metaRecord.seo) ? metaRecord.seo : {};
  return { ...metaRecord, ...nestedSeoRecord };
};

export default resolvePageSeoRecord;
