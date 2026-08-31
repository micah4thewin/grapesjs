import createFindingRecord from './createFindingRecord.js';
import resolveSeoRecords from './resolveSeoRecords.js';

const checkCanonicalBase = (auditContext) => {
  const { siteSeo } = resolveSeoRecords(auditContext);
  if (String(siteSeo.canonicalBase || '').trim()) return [];
  return [
    createFindingRecord(
      'warning',
      'Metadata',
      'No canonical base URL is configured for the site.',
      'Set the production domain in the SEO settings so canonical links and the sitemap resolve.',
    ),
  ];
};

export default checkCanonicalBase;
