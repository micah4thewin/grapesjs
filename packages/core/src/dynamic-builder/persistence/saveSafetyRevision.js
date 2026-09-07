import matchesNewestRevision from './matchesNewestRevision.js';
import saveRevisionRecord from './saveRevisionRecord.js';

const saveSafetyRevision = (editor, moduleOptions, targetRecord) => {
  if (matchesNewestRevision(editor, moduleOptions)) return { proceed: true, savedRecord: null };
  const targetLabel = String((targetRecord && targetRecord.label) || 'revision').trim();
  const savedRecord = saveRevisionRecord(editor, moduleOptions, 'Before restoring "' + targetLabel + '"', {
    kind: 'safety',
  });
  return { proceed: !!savedRecord, savedRecord };
};

export default saveSafetyRevision;
