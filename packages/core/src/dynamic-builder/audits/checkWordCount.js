import collectCanvasCopyText from './collectCanvasCopyText.js';
import createFindingRecord from './createFindingRecord.js';
import resolveAuditThreshold from './resolveAuditThreshold.js';

const checkWordCount = (auditContext) => {
  if (!auditContext.canvasRoot && !auditContext.wrapperComponent) return [];
  const minWordCount = resolveAuditThreshold(auditContext, 'minWordCount');
  const wordCount = collectCanvasCopyText(auditContext).split(/\s+/).filter(Boolean).length;
  if (wordCount >= minWordCount) return [];
  return [
    createFindingRecord(
      'info',
      'Content',
      'The page contains about ' + wordCount + ' words.',
      'Pages under ' + minWordCount + ' words rarely rank well; add real copy if this page should be found in search.',
    ),
  ];
};

export default checkWordCount;
