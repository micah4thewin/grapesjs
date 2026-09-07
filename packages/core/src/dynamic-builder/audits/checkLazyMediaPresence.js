import collectImageRecords from './collectImageRecords.js';
import createFindingRecord from './createFindingRecord.js';
import resolveAuditThreshold from './resolveAuditThreshold.js';

const checkLazyMediaPresence = (auditContext) => {
  const imageRecords = collectImageRecords(auditContext);
  if (imageRecords.length <= resolveAuditThreshold(auditContext, 'lazyImageCountTrigger')) return [];
  const hasLazyMedia = imageRecords.some(
    (imageRecord) => String(imageRecord.attributes.loading || '').toLowerCase() === 'lazy',
  );
  if (hasLazyMedia) return [];
  return [
    createFindingRecord(
      'warning',
      'Loading',
      'The page has ' + imageRecords.length + ' images and none of them load lazily.',
      'Set images below the first screen to lazy loading so the first paint stays fast.',
    ),
  ];
};

export default checkLazyMediaPresence;
