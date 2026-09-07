const buildSiteStorageKey = (siteId) => 'db-site:' + String(siteId || '');

export default buildSiteStorageKey;
