import buildSiteCardMarkup from './buildSiteCardMarkup.js';

const renderSiteListElement = (listElement, siteRecords, currentSiteId) => {
  if (!siteRecords.length) {
    listElement.innerHTML = '<li class="gjs-db-muted">No sites yet. Name your first one below.</li>';
    return 0;
  }
  const nowValue = new Date();
  listElement.innerHTML = siteRecords
    .map((siteRecord) => buildSiteCardMarkup(siteRecord, currentSiteId, nowValue))
    .join('');
  return siteRecords.length;
};

export default renderSiteListElement;
