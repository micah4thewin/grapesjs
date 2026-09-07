import activateSeoModalTab from './activateSeoModalTab.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildSeoModalMarkup from './buildSeoModalMarkup.js';
import getPageSeoRecord from './getPageSeoRecord.js';
import getSiteSeoRecord from './getSiteSeoRecord.js';
import presentSeoModal from './presentSeoModal.js';
import resolveInitialSeoTab from './resolveInitialSeoTab.js';
import resolveSeoPageContext from './resolveSeoPageContext.js';
import wireSeoModalEvents from './wireSeoModalEvents.js';

const openSeoSettingsModal = (editor, options = {}) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const commandOptions = options && typeof options === 'object' ? options : {};
  const pageContext = resolveSeoPageContext(editor, commandOptions.page);
  const siteSeoRecord = getSiteSeoRecord(editor);
  const pageSeoRecord = getPageSeoRecord(editor, pageContext.page);
  const modalMarkup = buildSeoModalMarkup(siteSeoRecord, pageSeoRecord, pageContext);
  const rootElement = buildElementFromMarkup(containerElement.ownerDocument, modalMarkup);
  if (!rootElement) return;
  if (pageContext.page && pageContext.page.getId) rootElement.dataset.dbSeoPageId = String(pageContext.page.getId());
  activateSeoModalTab(rootElement, resolveInitialSeoTab(editor, siteSeoRecord, commandOptions));
  const refreshLiveFeedback = wireSeoModalEvents(editor, rootElement);
  presentSeoModal(editor, rootElement, refreshLiveFeedback);
};

export default openSeoSettingsModal;
