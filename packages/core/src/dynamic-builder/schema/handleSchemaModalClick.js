import collectSchemaFormValues from './collectSchemaFormValues.js';
import copySchemaPreviewText from './copySchemaPreviewText.js';
import updatePageMetaRecord from '../support/updatePageMetaRecord.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const handleSchemaModalClick = (editor, rootElement, clickEvent, handlers) => {
  const clickedElement = clickEvent.target;
  if (!clickedElement || !clickedElement.closest) return;
  const handlerRecord = handlers || {};
  const tabButton = clickedElement.closest('[data-db-schema-tab]');
  if (tabButton) {
    handlerRecord.activateTab && handlerRecord.activateTab(tabButton.dataset.dbSchemaTab);
    return;
  }
  if (clickedElement.closest('[data-db-schema-copy]')) {
    copySchemaPreviewText(rootElement);
    return;
  }
  const saveButton = clickedElement.closest('[data-db-schema-save]');
  if (!saveButton) return;
  const sectionName = saveButton.dataset.dbSchemaSave;
  const sectionElement = rootElement.querySelector('[data-db-schema-section="' + sectionName + '"]');
  const formValues = collectSchemaFormValues(sectionElement);
  if (sectionName === 'site') updateSiteMetaRecord(editor, { schema: formValues });
  else updatePageMetaRecord(editor, { schema: formValues });
  const statusElement = rootElement.querySelector('[data-db-schema-status="' + sectionName + '"]');
  if (statusElement) statusElement.textContent = sectionName === 'site' ? 'Site details saved' : 'Page details saved';
  editor.trigger('db:schema:update', { section: sectionName, values: formValues });
  handlerRecord.markSaved && handlerRecord.markSaved();
};

export default handleSchemaModalClick;
