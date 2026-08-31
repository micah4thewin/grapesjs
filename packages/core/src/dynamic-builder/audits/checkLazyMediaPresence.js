import collectImageRecords from './collectImageRecords.js';
import createFindingRecord from './createFindingRecord.js';

const checkLazyMediaPresence = (auditContext) => {
  const imageRecords = collectImageRecords(auditContext);
  if (imageRecords.length <= 10) return [];
  const hasLazyMedia = imageRecords.some(
    (imageRecord) => String(imageRecord.attributes.loading || '').toLowerCase() === 'lazy',
  );
  if (hasLazyMedia) return [];
  return [
    createFindingRecord(
      'warning',
      'Loading',
      'The page has ' + imageRecords.length + ' images and none of them load lazily.',
      'Add loading="lazy" to below-the-fold images so the first paint stays fast.',
    ),
  ];
};

export default checkLazyMediaPresence;
