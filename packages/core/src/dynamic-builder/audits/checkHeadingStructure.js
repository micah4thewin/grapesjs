import collectHeadingLevels from './collectHeadingLevels.js';
import createFindingRecord from './createFindingRecord.js';

const checkHeadingStructure = (auditContext) => {
  const findings = [];
  const headingLevels = collectHeadingLevels(auditContext);
  const h1Count = headingLevels.filter((headingLevel) => headingLevel === 1).length;
  if (h1Count > 1) {
    findings.push(
      createFindingRecord(
        'warning',
        'Headings',
        'The page has ' + h1Count + ' h1 headings.',
        'Keep exactly one h1 per page and demote the others to h2.',
      ),
    );
  }
  let previousLevel = 0;
  headingLevels.forEach((headingLevel) => {
    if (previousLevel && headingLevel > previousLevel + 1) {
      findings.push(
        createFindingRecord(
          'warning',
          'Headings',
          'Heading level jumps from h' + previousLevel + ' to h' + headingLevel + '.',
          'Keep heading levels sequential so screen reader users can scan the outline.',
        ),
      );
    }
    previousLevel = headingLevel;
  });
  return findings;
};

export default checkHeadingStructure;
