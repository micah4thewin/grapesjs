import activateSeoModalTab from './activateSeoModalTab.js';
import collectSeoFormValues from './collectSeoFormValues.js';
import updatePageMetaRecord from '../support/updatePageMetaRecord.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const handleSeoModalClick = (editor, rootElement, clickEvent) => {
  const clickedElement = clickEvent.target;
  if (!clickedElement || !clickedElement.closest) return;
  const tabButton = clickedElement.closest('[data-db-seo-tab]');
  if (tabButton) {
    activateSeoModalTab(rootElement, tabButton.dataset.dbSeoTab);
    return;
  }
  const saveButton = clickedElement.closest('[data-db-seo-save]');
  if (!saveButton) return;
  const sectionName = saveButton.dataset.dbSeoSave;
  const sectionElement = rootElement.querySelector('[data-db-seo-section="' + sectionName + '"]');
  const formValues = collectSeoFormValues(sectionElement);
  if (sectionName === 'site') updateSiteMetaRecord(editor, { seo: formValues });
  else updatePageMetaRecord(editor, { seo: formValues });
  const statusElement = rootElement.querySelector('[data-db-seo-status="' + sectionName + '"]');
  if (statusElement) statusElement.textContent = sectionName === 'site' ? 'Site defaults saved' : 'Page settings saved';
};

export default handleSeoModalClick;
