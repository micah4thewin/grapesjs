import createFindingRecord from './createFindingRecord.js';
import resolveSeoRecords from './resolveSeoRecords.js';

const checkSeoDescription = (auditContext) => {
  const { pageSeo, siteSeo } = resolveSeoRecords(auditContext);
  const descriptionText = String(pageSeo.description || siteSeo.defaultDescription || '').trim();
  if (!descriptionText) {
    return [
      createFindingRecord(
        'warning',
        'Metadata',
        'The page has no meta description.',
        'Write a 50 to 160 character summary; search engines show it under the title.',
      ),
    ];
  }
  if (descriptionText.length < 50) {
    return [
      createFindingRecord(
        'info',
        'Metadata',
        'The meta description is only ' + descriptionText.length + ' characters long.',
        'Expand it toward 50 to 160 characters to use the available snippet space.',
      ),
    ];
  }
  if (descriptionText.length > 160) {
    return [
      createFindingRecord(
        'warning',
        'Metadata',
        'The meta description is ' + descriptionText.length + ' characters long.',
        'Keep descriptions under 160 characters so they are not cut off in results.',
      ),
    ];
  }
  return [];
};

export default checkSeoDescription;
