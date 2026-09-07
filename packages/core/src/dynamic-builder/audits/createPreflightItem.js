import buildFindingDetails from './buildFindingDetails.js';
import createFindingRecord from './createFindingRecord.js';
import resolvePageDetails from './resolvePageDetails.js';

const createPreflightItem = (severity, group, message, hint, component, page, fixId) =>
  createFindingRecord(severity, group, message, hint, {
    ...buildFindingDetails(component, fixId),
    ...resolvePageDetails(page),
  });

export default createPreflightItem;
