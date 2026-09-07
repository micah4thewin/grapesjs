import collectImageRecords from './collectImageRecords.js';
import createFindingRecord from './createFindingRecord.js';

const checkFetchPriorityUsage = (auditContext) => {
  const highPriorityCount = auditContext.canvasRoot
    ? auditContext.canvasRoot.querySelectorAll('[fetchpriority="high"]').length
    : collectImageRecords(auditContext).filter(
        (imageRecord) => String(imageRecord.attributes.fetchpriority || '').toLowerCase() === 'high',
      ).length;
  if (highPriorityCount <= 1) return [];
  return [
    createFindingRecord(
      'warning',
      'Loading',
      highPriorityCount + ' images are marked as high priority.',
      'Keep high priority for the single most important picture at the top of the page.',
    ),
  ];
};

export default checkFetchPriorityUsage;
