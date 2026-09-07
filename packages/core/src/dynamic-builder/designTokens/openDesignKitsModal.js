import applyDesignKitSelection from './applyDesignKitSelection.js';
import buildDesignKitsModalMarkup from './buildDesignKitsModalMarkup.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import clearDesignKitPreview from './clearDesignKitPreview.js';
import getDesignKitRecords from './getDesignKitRecords.js';
import getDesignKitsEditorCss from './getDesignKitsEditorCss.js';
import getSecondaryDesignKitRecords from './getSecondaryDesignKitRecords.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import injectDesignKitPreviewFonts from './injectDesignKitPreviewFonts.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import isPlainRecord from '../support/isPlainRecord.js';
import openThemedModal from '../support/openThemedModal.js';
import readCustomDesignKits from './readCustomDesignKits.js';
import renderDesignKitGrids from './renderDesignKitGrids.js';
import showToastNotice from '../support/showToastNotice.js';
import wireCustomKitActions from './wireCustomKitActions.js';
import wireDesignKitCardPreview from './wireDesignKitCardPreview.js';

const openDesignKitsModal = (editor, moduleOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  injectEditorStylesOnce(editor, 'db-css-design-kits', getDesignKitsEditorCss());
  const kitState = {
    builtIn: [...getDesignKitRecords(), ...getSecondaryDesignKitRecords()],
    custom: readCustomDesignKits(),
  };
  const listKits = () => kitState.builtIn.concat(kitState.custom);
  const findKitRecord = (kitId) => listKits().filter((kitRecord) => kitRecord.kitId === kitId)[0] || null;
  const readActiveKitId = () => {
    const storedKit = getSiteMetaRecord(editor).designKit;
    return isPlainRecord(storedKit) && typeof storedKit.kitId === 'string' ? storedKit.kitId : '';
  };
  injectDesignKitPreviewFonts(editor, listKits());
  const kitsElement = buildElementFromMarkup(containerElement.ownerDocument, buildDesignKitsModalMarkup());
  if (!kitsElement) return;
  const renderGrids = () => renderDesignKitGrids(kitsElement, kitState, readActiveKitId(), moduleOptions);
  renderGrids();
  const gridsElement = kitsElement.querySelector('[data-db-kit-grids]');
  wireDesignKitCardPreview(editor, moduleOptions, gridsElement, { findKitRecord, readActiveKitId });
  wireCustomKitActions(editor, moduleOptions, kitsElement, kitState, renderGrids);
  gridsElement.addEventListener('click', (clickEvent) => {
    const cardElement =
      clickEvent.target && clickEvent.target.closest ? clickEvent.target.closest('[data-db-kit-id]') : null;
    const selectedKit = cardElement ? findKitRecord(cardElement.getAttribute('data-db-kit-id')) : null;
    if (!selectedKit) return;
    clearDesignKitPreview(editor);
    applyDesignKitSelection(editor, moduleOptions, selectedKit);
    editor.Modal.close();
    showToastNotice(editor, `${selectedKit.kitName} applied. Press Ctrl+Z to undo.`, { kind: 'success' });
  });
  if (editor.Modal.onceClose) editor.Modal.onceClose(() => clearDesignKitPreview(editor));
  openThemedModal(editor, 'Design kits', kitsElement, { className: 'gjs-db-design-kits' });
  const focusTarget =
    kitsElement.querySelector('[aria-pressed="true"]') || kitsElement.querySelector('[data-db-kit-id]');
  if (focusTarget && focusTarget.focus) focusTarget.focus();
};

export default openDesignKitsModal;
