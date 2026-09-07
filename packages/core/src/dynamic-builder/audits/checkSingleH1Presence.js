import buildFindingDetails from './buildFindingDetails.js';
import collectHeadingRecords from './collectHeadingRecords.js';
import createFindingRecord from './createFindingRecord.js';

const checkSingleH1Presence = (auditContext) => {
  const topHeadings = collectHeadingRecords(auditContext).filter((headingRecord) => headingRecord.level === 1);
  if (topHeadings.length === 1) return [];
  if (topHeadings.length === 0) {
    return [
      createFindingRecord(
        'warning',
        'Content',
        'The page has no h1 heading.',
        'Give the page exactly one h1 that states its topic; search engines weigh it heavily.',
      ),
    ];
  }
  return topHeadings
    .slice(1)
    .map((headingRecord) =>
      createFindingRecord(
        'warning',
        'Content',
        'The page has ' + topHeadings.length + ' h1 headings; only the first one should stay an h1.',
        'Change this heading to h2 so the page keeps a single main title.',
        buildFindingDetails(headingRecord.target, 'demote-heading'),
      ),
    );
};

export default checkSingleH1Presence;
