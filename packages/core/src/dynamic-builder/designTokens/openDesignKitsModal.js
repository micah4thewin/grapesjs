import applyDesignKitSelection from './applyDesignKitSelection.js';
import buildDesignKitCardMarkup from './buildDesignKitCardMarkup.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import getDesignKitRecords from './getDesignKitRecords.js';
import getSecondaryDesignKitRecords from './getSecondaryDesignKitRecords.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import injectDesignKitPreviewFonts from './injectDesignKitPreviewFonts.js';
import isPlainRecord from '../support/isPlainRecord.js';
import openThemedModal from '../support/openThemedModal.js';
import showToastNotice from '../support/showToastNotice.js';

const openDesignKitsModal = (editor, moduleOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const kitRecords = [...getDesignKitRecords(), ...getSecondaryDesignKitRecords()];
  const storedKit = getSiteMetaRecord(editor).designKit;
  const activeKitId = isPlainRecord(storedKit) && typeof storedKit.kitId === 'string' ? storedKit.kitId : '';
  injectDesignKitPreviewFonts(editor, kitRecords);
  const kitsMarkup = [
    '<div class="gjs-db-form">',
    '<p class="gjs-db-muted">A kit swaps the site fonts and colors in one click. Everything stays editable in Design tokens.</p>',
    '<div class="gjs-db-kit-grid" role="group" aria-label="Design kits">',
    kitRecords.map((kitRecord) => buildDesignKitCardMarkup(kitRecord, activeKitId)).join(''),
    '</div>',
    '</div>',
  ].join('');
  const kitsElement = buildElementFromMarkup(containerElement.ownerDocument, kitsMarkup);
  if (!kitsElement) return;
  kitsElement.addEventListener('click', (clickEvent) => {
    const cardElement =
      clickEvent.target && clickEvent.target.closest ? clickEvent.target.closest('[data-db-kit-id]') : null;
    if (!cardElement) return;
    const selectedKit = kitRecords.filter(
      (kitRecord) => kitRecord.kitId === cardElement.getAttribute('data-db-kit-id'),
    )[0];
    if (!selectedKit) return;
    applyDesignKitSelection(editor, moduleOptions, selectedKit);
    editor.Modal.close();
    showToastNotice(editor, `${selectedKit.kitName} applied`, { kind: 'success' });
  });
  openThemedModal(editor, 'Design kits', kitsElement, { className: 'gjs-db-design-kits' });
  const focusTarget =
    kitsElement.querySelector('[aria-pressed="true"]') || kitsElement.querySelector('[data-db-kit-id]');
  if (focusTarget && focusTarget.focus) focusTarget.focus();
};

export default openDesignKitsModal;
