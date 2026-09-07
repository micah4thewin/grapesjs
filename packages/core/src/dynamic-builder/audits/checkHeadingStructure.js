import buildFindingDetails from './buildFindingDetails.js';
import collectHeadingRecords from './collectHeadingRecords.js';
import createFindingRecord from './createFindingRecord.js';

const checkHeadingStructure = (auditContext) => {
  const findings = [];
  let previousLevel = 0;
  collectHeadingRecords(auditContext).forEach((headingRecord) => {
    const headingLevel = headingRecord.level;
    if (previousLevel && headingLevel > previousLevel + 1) {
      findings.push(
        createFindingRecord(
          'warning',
          'Headings',
          'Heading level jumps from h' + previousLevel + ' to h' + headingLevel + '.',
          'Keep heading levels in order so screen reader users can scan the page outline.',
          buildFindingDetails(headingRecord.target),
        ),
      );
    }
    previousLevel = headingLevel;
  });
  return findings;
};

export default checkHeadingStructure;
