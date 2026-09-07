import activateSchemaModalTab from './activateSchemaModalTab.js';
import collectSchemaSnapshot from './collectSchemaSnapshot.js';
import handleSchemaModalClick from './handleSchemaModalClick.js';
import refreshSchemaPreview from './refreshSchemaPreview.js';
import refreshSchemaValidationBadges from './refreshSchemaValidationBadges.js';
import updateOrganizationFieldVisibility from './updateOrganizationFieldVisibility.js';
import updateSchemaGroupVisibility from './updateSchemaGroupVisibility.js';
import wireTabListKeyboardNavigation from '../support/wireTabListKeyboardNavigation.js';

const wireSchemaModalEvents = (editor, rootElement) => {
  const formState = { savedSnapshot: collectSchemaSnapshot(rootElement) };
  const refreshLiveFeedback = () => {
    const pageTypeSelect = rootElement.querySelector('[data-db-schema-field="pageType"]');
    updateSchemaGroupVisibility(rootElement, (pageTypeSelect && pageTypeSelect.value) || 'WebPage');
    const organizationTypeSelect = rootElement.querySelector('[data-db-schema-field="organization.type"]');
    updateOrganizationFieldVisibility(rootElement, organizationTypeSelect ? organizationTypeSelect.value : '');
    refreshSchemaValidationBadges(editor, rootElement);
    refreshSchemaPreview(editor, rootElement, {
      isDirty: collectSchemaSnapshot(rootElement) !== formState.savedSnapshot,
    });
  };
  const markSaved = () => {
    formState.savedSnapshot = collectSchemaSnapshot(rootElement);
    refreshLiveFeedback();
  };
  const activateTab = (tabName, tabOptions) => {
    activateSchemaModalTab(rootElement, tabName, tabOptions);
    editor.getModel().set('dbSchemaActiveTab', tabName);
  };
  rootElement.addEventListener('click', (clickEvent) =>
    handleSchemaModalClick(editor, rootElement, clickEvent, { refreshLiveFeedback, markSaved, activateTab }),
  );
  rootElement.addEventListener('input', refreshLiveFeedback);
  rootElement.addEventListener('change', refreshLiveFeedback);
  wireTabListKeyboardNavigation(rootElement, { tabAttribute: 'data-db-schema-tab', activateTab });
  refreshLiveFeedback();
};

export default wireSchemaModalEvents;
