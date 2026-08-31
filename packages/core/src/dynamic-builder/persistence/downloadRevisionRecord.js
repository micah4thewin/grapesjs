import downloadTextFile from '../support/downloadTextFile.js';
import toSlugText from '../support/toSlugText.js';

const downloadRevisionRecord = (revisionRecord) => {
  const fileNameSlug = toSlugText(revisionRecord.label || revisionRecord.id) || 'revision';
  downloadTextFile(
    'db-revision-' + fileNameSlug + '.json',
    'application/json',
    JSON.stringify(revisionRecord, null, 2),
  );
};

export default downloadRevisionRecord;
