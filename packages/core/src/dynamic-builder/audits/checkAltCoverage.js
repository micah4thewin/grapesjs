import collectImageRecords from './collectImageRecords.js';
import createFindingRecord from './createFindingRecord.js';
import resolveAuditThreshold from './resolveAuditThreshold.js';

const checkAltCoverage = (auditContext) => {
  const imageRecords = collectImageRecords(auditContext);
  if (!imageRecords.length) return [];
  const describedCount = imageRecords.filter(
    (imageRecord) => imageRecord.attributes.alt != null && String(imageRecord.attributes.alt).trim() !== '',
  ).length;
  const coverageRatio = describedCount / imageRecords.length;
  const minCoverageRatio = resolveAuditThreshold(auditContext, 'minAltCoverageRatio');
  if (coverageRatio >= minCoverageRatio) return [];
  return [
    createFindingRecord(
      'warning',
      'Content',
      'Only ' + Math.round(coverageRatio * 100) + ' percent of images have descriptive alt text.',
      'Describe at least ' + Math.round(minCoverageRatio * 100) + ' percent of images; search engines index alt text.',
    ),
  ];
};

export default checkAltCoverage;
