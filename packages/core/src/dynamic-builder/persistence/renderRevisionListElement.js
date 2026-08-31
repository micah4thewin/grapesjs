import buildRevisionItemMarkup from './buildRevisionItemMarkup.js';

const renderRevisionListElement = (listElement, revisionList) => {
  if (!listElement) return;
  if (!revisionList.length) {
    listElement.innerHTML = '<li class="gjs-db-list-item gjs-db-muted">No revisions saved yet.</li>';
    return;
  }
  listElement.innerHTML = revisionList.map((revisionRecord) => buildRevisionItemMarkup(revisionRecord)).join('');
};

export default renderRevisionListElement;
