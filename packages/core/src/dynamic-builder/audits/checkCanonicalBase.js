import createFindingRecord from './createFindingRecord.js';
import resolveSeoRecords from './resolveSeoRecords.js';

const checkCanonicalBase = (auditContext) => {
  const { siteSeo } = resolveSeoRecords(auditContext);
  if (String(siteSeo.canonicalBase || '').trim()) return [];
  return [
    createFindingRecord(
      'warning',
      'Metadata',
      'No website address (canonical base URL) is set for the site.',
      'Enter the address the site will live at, such as https://www.example.com, so links and the sitemap resolve.',
      { fixId: 'seo-field:canonicalBase' },
    ),
  ];
};

export default checkCanonicalBase;
