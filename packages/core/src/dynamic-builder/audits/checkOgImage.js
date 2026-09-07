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
      'Add a 1200x630px sharing image so links posted on social media show a preview card.',
      { fixId: 'seo-field:ogImage' },
    ),
  ];
};

export default checkOgImage;
