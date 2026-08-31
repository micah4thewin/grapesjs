import collectSchemaFormValues from './collectSchemaFormValues.js';
import updatePageMetaRecord from '../support/updatePageMetaRecord.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const handleSchemaModalClick = (editor, rootElement, clickEvent, refreshLiveFeedback) => {
  const clickedElement = clickEvent.target;
  if (!clickedElement || !clickedElement.closest) return;
  const saveButton = clickedElement.closest('[data-db-schema-save]');
  if (!saveButton) return;
  const sectionName = saveButton.dataset.dbSchemaSave;
  const sectionElement = rootElement.querySelector('[data-db-schema-section="' + sectionName + '"]');
  const formValues = collectSchemaFormValues(sectionElement);
  if (sectionName === 'site') updateSiteMetaRecord(editor, { schema: formValues });
  else updatePageMetaRecord(editor, { schema: formValues });
  const statusElement = rootElement.querySelector('[data-db-schema-status="' + sectionName + '"]');
  if (statusElement) statusElement.textContent = sectionName === 'site' ? 'Site schema saved' : 'Page schema saved';
  editor.trigger('db:schema:update', { section: sectionName, values: formValues });
  if (refreshLiveFeedback) refreshLiveFeedback();
};

export default handleSchemaModalClick;
