import collectHeadingRecords from './collectHeadingRecords.js';

const collectHeadingLevels = (auditContext) => collectHeadingRecords(auditContext).map((headingRecord) => headingRecord.level);

export default collectHeadingLevels;
