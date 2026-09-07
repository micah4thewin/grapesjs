import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildSiteManagerMarkup from './buildSiteManagerMarkup.js';
import focusSiteManagerStart from './focusSiteManagerStart.js';
import openThemedModal from '../support/openThemedModal.js';
import refreshSiteManagerList from './refreshSiteManagerList.js';
import wireSiteManagerModal from './wireSiteManagerModal.js';

const openSiteManagerModal = (editor, managerOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  const rootElement = buildElementFromMarkup(
    containerElement.ownerDocument,
    buildSiteManagerMarkup(managerOptions.user),
  );
  if (!rootElement) return null;
  wireSiteManagerModal(editor, managerOptions, rootElement);
  openThemedModal(editor, 'Your sites', rootElement, { className: 'gjs-db-sites-modal' });
  refreshSiteManagerList(editor, managerOptions, rootElement).then(() => focusSiteManagerStart(editor, rootElement));
  return rootElement;
};

export default openSiteManagerModal;
