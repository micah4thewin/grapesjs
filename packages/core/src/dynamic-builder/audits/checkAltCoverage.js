import collectImageRecords from './collectImageRecords.js';
import createFindingRecord from './createFindingRecord.js';

const checkAltCoverage = (auditContext) => {
  const imageRecords = collectImageRecords(auditContext);
  if (!imageRecords.length) return [];
  const describedCount = imageRecords.filter(
    (imageRecord) => imageRecord.attributes.alt != null && String(imageRecord.attributes.alt).trim() !== '',
  ).length;
  const coverageRatio = describedCount / imageRecords.length;
  if (coverageRatio >= 0.9) return [];
  return [
    createFindingRecord(
      'warning',
      'Content',
      'Only ' + Math.round(coverageRatio * 100) + ' percent of images have descriptive alt text.',
      'Describe at least 90 percent of images; search engines index alt text.',
    ),
  ];
};

export default checkAltCoverage;
