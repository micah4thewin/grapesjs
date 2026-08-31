import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildRevisionsModalMarkup from './buildRevisionsModalMarkup.js';
import handleRevisionListClick from './handleRevisionListClick.js';
import openThemedModal from '../support/openThemedModal.js';
import readRevisionList from './readRevisionList.js';
import renderRevisionListElement from './renderRevisionListElement.js';
import sortRevisionsNewestFirst from './sortRevisionsNewestFirst.js';

const openRevisionsModal = (editor, moduleOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const rootElement = buildElementFromMarkup(containerElement.ownerDocument, buildRevisionsModalMarkup());
  if (!rootElement) return;
  const listElement = rootElement.querySelector('[data-db-revision-list]');
  const refreshRevisionList = () =>
    renderRevisionListElement(listElement, sortRevisionsNewestFirst(readRevisionList(moduleOptions)));
  refreshRevisionList();
  rootElement.addEventListener('click', (clickEvent) =>
    handleRevisionListClick(editor, moduleOptions, clickEvent, refreshRevisionList),
  );
  openThemedModal(editor, 'Project revisions', rootElement, { className: 'gjs-db-revisions-modal' });
};

export default openRevisionsModal;
