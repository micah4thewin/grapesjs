import sortSiteRecordsNewestFirst from './sortSiteRecordsNewestFirst.js';

const pickNewestSiteRecord = (siteRecords) => sortSiteRecordsNewestFirst(siteRecords)[0] || null;

export default pickNewestSiteRecord;
