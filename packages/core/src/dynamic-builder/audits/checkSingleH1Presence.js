import collectHeadingLevels from './collectHeadingLevels.js';
import createFindingRecord from './createFindingRecord.js';

const checkSingleH1Presence = (auditContext) => {
  const h1Count = collectHeadingLevels(auditContext).filter((headingLevel) => headingLevel === 1).length;
  if (h1Count === 1) return [];
  if (h1Count === 0) {
    return [
      createFindingRecord(
        'warning',
        'Content',
        'The page has no h1 heading.',
        'Add exactly one h1 that states the page topic; search engines weigh it heavily.',
      ),
    ];
  }
  return [
    createFindingRecord(
      'warning',
      'Content',
      'The page has ' + h1Count + ' h1 headings.',
      'Keep exactly one h1 and demote the others to h2.',
    ),
  ];
};

export default checkSingleH1Presence;
