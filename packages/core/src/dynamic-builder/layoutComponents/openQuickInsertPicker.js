import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openThemedModal from '../support/openThemedModal.js';
import buildQuickInsertEditorCss from './buildQuickInsertEditorCss.js';
import getQuickInsertRecords from './getQuickInsertRecords.js';
import insertComponentAfter from './insertComponentAfter.js';

const openQuickInsertPicker = (editor, referenceComponent) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const ownerDocument = containerElement.ownerDocument;
  injectEditorStylesOnce(editor, 'db-css-layout-quick-insert', buildQuickInsertEditorCss());
  const gridElement = ownerDocument.createElement('div');
  gridElement.className = 'gjs-db-quick-insert';
  getQuickInsertRecords().forEach((insertRecord) => {
    const itemButton = ownerDocument.createElement('button');
    itemButton.type = 'button';
    itemButton.className = 'gjs-db-button gjs-db-quick-insert-item';
    itemButton.setAttribute('data-db-insert', insertRecord.id);
    itemButton.innerHTML = `${getIconMarkup(insertRecord.icon, { size: 20 })}<span>${escapeHtmlText(insertRecord.label)}</span>`;
    itemButton.addEventListener('click', () => {
      editor.Modal.close();
      insertComponentAfter(editor, referenceComponent, insertRecord.content);
    });
    gridElement.appendChild(itemButton);
  });
  openThemedModal(editor, 'Add a block below', gridElement, { className: 'gjs-db-quick-insert-modal' });
  const firstButton = gridElement.querySelector('button');
  firstButton && setTimeout(() => firstButton.focus(), 30);
};

export default openQuickInsertPicker;
