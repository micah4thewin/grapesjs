const sortSiteRecordsNewestFirst = (siteRecords) =>
  (Array.isArray(siteRecords) ? siteRecords : [])
    .slice()
    .sort((firstRecord, secondRecord) =>
      String(secondRecord.updatedAt || '').localeCompare(String(firstRecord.updatedAt || '')),
    );

export default sortSiteRecordsNewestFirst;
