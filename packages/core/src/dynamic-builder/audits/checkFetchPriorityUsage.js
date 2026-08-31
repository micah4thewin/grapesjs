import collectImageRecords from './collectImageRecords.js';
import createFindingRecord from './createFindingRecord.js';

const checkFetchPriorityUsage = (auditContext) => {
  const highPriorityCount = auditContext.canvasBody
    ? auditContext.canvasBody.querySelectorAll('[fetchpriority="high"]').length
    : collectImageRecords(auditContext).filter(
        (imageRecord) => String(imageRecord.attributes.fetchpriority || '').toLowerCase() === 'high',
      ).length;
  if (highPriorityCount <= 1) return [];
  return [
    createFindingRecord(
      'warning',
      'Loading',
      highPriorityCount + ' elements request fetchpriority="high".',
      'Reserve high priority for the single most important above-the-fold asset.',
    ),
  ];
};

export default checkFetchPriorityUsage;
