import createFindingRecord from './createFindingRecord.js';
import resolveSeoRecords from './resolveSeoRecords.js';

const checkDocumentLanguage = (auditContext) => {
  const { siteSeo } = resolveSeoRecords(auditContext);
  if (String(siteSeo.language || '').trim()) return [];
  return [
    createFindingRecord(
      'warning',
      'Language',
      'No site language is set, so exported pages will declare English (lang="en").',
      'If the site is not in English, choose its language in the SEO settings so screen readers pronounce it correctly.',
      { fixId: 'seo-field:language' },
    ),
  ];
};

export default checkDocumentLanguage;
