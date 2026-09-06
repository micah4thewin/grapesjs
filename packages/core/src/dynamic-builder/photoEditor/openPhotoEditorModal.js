import applyEditedPhotoToComponent from './applyEditedPhotoToComponent.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildPhotoEditorMarkup from './buildPhotoEditorMarkup.js';
import estimateDataUrlBytes from './estimateDataUrlBytes.js';
import getPhotoEditState from './getPhotoEditState.js';
import openThemedModal from '../support/openThemedModal.js';
import readImageElementFromSource from '../siteIdentity/readImageElementFromSource.js';
import showToastNotice from '../support/showToastNotice.js';
import wirePhotoEditorEvents from './wirePhotoEditorEvents.js';

const openPhotoEditorModal = (editor, imageComponent) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument || !imageComponent) return;
  const sourceValue = String(
    (imageComponent.getAttributes && imageComponent.getAttributes().src) || imageComponent.get('src') || '',
  );
  if (!sourceValue) {
    showToastNotice(editor, 'Choose an image first, then edit it.', { kind: 'warning' });
    return;
  }
  readImageElementFromSource(sourceValue)
    .then((imageElement) => {
      const modalElement = buildElementFromMarkup(
        containerElement.ownerDocument,
        buildPhotoEditorMarkup(getPhotoEditState()),
      );
      if (!modalElement) return;
      const originalBytes = sourceValue.indexOf('data:') === 0 ? estimateDataUrlBytes(sourceValue) : 0;
      wirePhotoEditorEvents(modalElement, imageElement, originalBytes, (dataUrl) => {
        applyEditedPhotoToComponent(
          editor,
          imageComponent,
          dataUrl,
          imageComponent.getName ? imageComponent.getName() : 'photo',
        );
        editor.Modal.close();
        showToastNotice(editor, 'Photo updated', { kind: 'success' });
      });
      openThemedModal(editor, 'Edit photo', modalElement, { className: 'gjs-db-photo-modal' });
    })
    .catch(() =>
      showToastNotice(
        editor,
        'This image cannot be edited here because its host blocks reading it. Upload it to the site instead.',
        { kind: 'error', duration: 6000 },
      ),
    );
};

export default openPhotoEditorModal;
