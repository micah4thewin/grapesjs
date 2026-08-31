import handleSchemaModalClick from './handleSchemaModalClick.js';
import refreshSchemaPreview from './refreshSchemaPreview.js';
import refreshSchemaValidationBadges from './refreshSchemaValidationBadges.js';
import updateSchemaGroupVisibility from './updateSchemaGroupVisibility.js';

const wireSchemaModalEvents = (editor, rootElement) => {
  const refreshLiveFeedback = () => {
    const pageTypeSelect = rootElement.querySelector('[data-db-schema-field="pageType"]');
    updateSchemaGroupVisibility(rootElement, (pageTypeSelect && pageTypeSelect.value) || 'WebPage');
    refreshSchemaValidationBadges(editor, rootElement);
    refreshSchemaPreview(editor, rootElement);
  };
  rootElement.addEventListener('click', (clickEvent) =>
    handleSchemaModalClick(editor, rootElement, clickEvent, refreshLiveFeedback),
  );
  rootElement.addEventListener('input', refreshLiveFeedback);
  rootElement.addEventListener('change', refreshLiveFeedback);
  refreshLiveFeedback();
};

export default wireSchemaModalEvents;
