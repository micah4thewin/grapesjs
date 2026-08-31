import createFindingRecord from './createFindingRecord.js';
import resolveSeoRecords from './resolveSeoRecords.js';
import toSlugText from '../support/toSlugText.js';

const checkSlugFormat = (auditContext) => {
  const { pageSeo } = resolveSeoRecords(auditContext);
  const slugValue = String(pageSeo.slug || '').trim();
  if (!slugValue) return [];
  const normalizedSlug = toSlugText(slugValue);
  if (normalizedSlug === slugValue) return [];
  return [
    createFindingRecord(
      'warning',
      'Metadata',
      'The page slug "' + slugValue + '" is not URL friendly.',
      'Use lowercase letters, numbers, and hyphens, for example "' + normalizedSlug + '".',
    ),
  ];
};

export default checkSlugFormat;
