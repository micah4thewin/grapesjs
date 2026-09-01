import applyDesignKitSelection from './applyDesignKitSelection.js';
import buildDesignKitCardMarkup from './buildDesignKitCardMarkup.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import getDesignKitRecords from './getDesignKitRecords.js';
import getSecondaryDesignKitRecords from './getSecondaryDesignKitRecords.js';
import openThemedModal from '../support/openThemedModal.js';
import showToastNotice from '../support/showToastNotice.js';

const openDesignKitsModal = (editor, moduleOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const kitRecords = [...getDesignKitRecords(), ...getSecondaryDesignKitRecords()];
  const kitsMarkup = [
    '<div class="gjs-db-form">',
    '<p class="gjs-db-muted">A kit swaps the site fonts and colors in one click. Everything stays editable in Design tokens.</p>',
    `<div class="gjs-db-kit-grid">${kitRecords.map((kitRecord) => buildDesignKitCardMarkup(kitRecord)).join('')}</div>`,
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
};

export default openDesignKitsModal;
