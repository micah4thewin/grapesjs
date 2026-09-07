import activateTemplateManagerTab from './activateTemplateManagerTab.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildTemplateManagerMarkup from './buildTemplateManagerMarkup.js';
import focusFirstModalControl from '../support/focusFirstModalControl.js';
import getBuiltInPageTemplates from './getBuiltInPageTemplates.js';
import getBuiltInSectionTemplates from './getBuiltInSectionTemplates.js';
import getEditorInstanceSuffix from '../shell/getEditorInstanceSuffix.js';
import isEditorLive from '../support/isEditorLive.js';
import openThemedModal from '../support/openThemedModal.js';
import resolveTemplateStore from './resolveTemplateStore.js';
import wireTemplateManagerEvents from './wireTemplateManagerEvents.js';

const openTemplateManagerModal = (editor, moduleOptions, initialTabId) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  const activeTabId = initialTabId || 'pages';
  const fieldIdPrefix = 'db-template-manager' + getEditorInstanceSuffix(editor);
  const managerMarkup = buildTemplateManagerMarkup(fieldIdPrefix, activeTabId);
  const managerElement = buildElementFromMarkup(containerElement.ownerDocument, managerMarkup);
  if (!managerElement) return null;
  const viewState = {
    tabId: activeTabId,
    queryText: '',
    categoryId: 'all',
    pageRecords: getBuiltInPageTemplates(),
    sectionRecords: getBuiltInSectionTemplates(),
    userRecords: [],
  };
  const reopenOnTab = (tabId) => openTemplateManagerModal(editor, moduleOptions, tabId);
  wireTemplateManagerEvents(editor, moduleOptions, managerElement, viewState, reopenOnTab);
  activateTemplateManagerTab(editor, managerElement, viewState, activeTabId);
  openThemedModal(editor, 'Templates', managerElement, { className: 'gjs-db-template-manager-modal' });
  focusFirstModalControl(managerElement);
  resolveTemplateStore(moduleOptions)
    .listTemplates()
    .then((storedRecords) => {
      if (!isEditorLive(editor)) return;
      viewState.userRecords = Array.isArray(storedRecords) ? storedRecords : [];
      activateTemplateManagerTab(editor, managerElement, viewState, viewState.tabId);
    })
    .catch(() => null);
  return managerElement;
};

export default openTemplateManagerModal;
