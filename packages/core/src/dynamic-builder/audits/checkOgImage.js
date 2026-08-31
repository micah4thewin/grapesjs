import createFindingRecord from './createFindingRecord.js';
import resolveSeoRecords from './resolveSeoRecords.js';

const checkOgImage = (auditContext) => {
  const { pageSeo, siteSeo } = resolveSeoRecords(auditContext);
  const ogImageValue = String(
    pageSeo.ogImage || pageSeo.socialImage || siteSeo.ogImage || siteSeo.defaultOgImage || '',
  ).trim();
  if (ogImageValue) return [];
  return [
    createFindingRecord(
      'info',
      'Metadata',
      'No social sharing image is set for this page.',
      'Add an og:image of 1200x630px so shared links show a preview card.',
    ),
  ];
};

export default checkOgImage;
