const findSiteRecordById = (siteRecords, siteId) =>
  (Array.isArray(siteRecords) ? siteRecords : []).find((siteRecord) => siteRecord && siteRecord.id === siteId) || null;

export default findSiteRecordById;
