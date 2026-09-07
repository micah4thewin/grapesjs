import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildPhotoEditorMarkup from './buildPhotoEditorMarkup.js';
import estimateDataUrlBytes from './estimateDataUrlBytes.js';
import getPhotoEditState from './getPhotoEditState.js';
import isEditorLive from '../support/isEditorLive.js';
import openThemedModal from '../support/openThemedModal.js';
import readImageElementFromSource from '../siteIdentity/readImageElementFromSource.js';
import showToastNotice from '../support/showToastNotice.js';
import wirePhotoEditorEvents from './wirePhotoEditorEvents.js';

const openPhotoEditorSession = (editor, sourceValue, onApply) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return false;
  if (!sourceValue) {
    showToastNotice(editor, 'Choose an image first, then edit it.', { kind: 'warning' });
    return false;
  }
  readImageElementFromSource(sourceValue)
    .then((imageElement) => {
      if (!isEditorLive(editor)) return;
      const modalElement = buildElementFromMarkup(
        containerElement.ownerDocument,
        buildPhotoEditorMarkup(getPhotoEditState()),
      );
      if (!modalElement) return;
      const originalBytes = sourceValue.indexOf('data:') === 0 ? estimateDataUrlBytes(sourceValue) : 0;
      wirePhotoEditorEvents(modalElement, imageElement, originalBytes, (dataUrl) => {
        onApply(dataUrl);
        editor.Modal.close();
        showToastNotice(editor, 'Photo updated', { kind: 'success' });
      });
      openThemedModal(editor, 'Edit photo', modalElement, { className: 'gjs-db-photo-modal' });
    })
    .catch(() => {
      if (!isEditorLive(editor)) return;
      showToastNotice(
        editor,
        'This image cannot be edited here because its host blocks reading it. Upload it to the site instead.',
        { kind: 'error', duration: 6000 },
      );
    });
  return true;
};

export default openPhotoEditorSession;
