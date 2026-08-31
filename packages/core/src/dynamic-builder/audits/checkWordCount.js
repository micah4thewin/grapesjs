import createFindingRecord from './createFindingRecord.js';

const checkWordCount = (auditContext) => {
  if (!auditContext.canvasBody) return [];
  const wordCount = String(auditContext.canvasBody.textContent || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  if (wordCount >= 150) return [];
  return [
    createFindingRecord(
      'info',
      'Content',
      'The page contains about ' + wordCount + ' words.',
      'Pages under 150 words rarely rank well; add substantive copy if this page should be indexed.',
    ),
  ];
};

export default checkWordCount;
