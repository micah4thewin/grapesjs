import createFindingRecord from './createFindingRecord.js';
import resolveSeoRecords from './resolveSeoRecords.js';

const checkSeoTitle = (auditContext) => {
  const { pageSeo, siteSeo } = resolveSeoRecords(auditContext);
  const titleText = String(pageSeo.title || siteSeo.defaultTitle || '').trim();
  if (!titleText) {
    return [
      createFindingRecord(
        'error',
        'Metadata',
        'The page has no SEO title.',
        'Set a unique title of roughly 30 to 60 characters in the SEO settings.',
      ),
    ];
  }
  if (titleText.length < 10) {
    return [
      createFindingRecord(
        'warning',
        'Metadata',
        'The SEO title is only ' + titleText.length + ' characters long.',
        'Expand the title so it describes the page; aim for 30 to 60 characters.',
      ),
    ];
  }
  if (titleText.length > 60) {
    return [
      createFindingRecord(
        'warning',
        'Metadata',
        'The SEO title is ' + titleText.length + ' characters long.',
        'Keep titles under 60 characters so search results do not truncate them.',
      ),
    ];
  }
  return [];
};

export default checkSeoTitle;
