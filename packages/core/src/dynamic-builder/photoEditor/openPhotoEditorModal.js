import applyEditedPhotoToComponent from './applyEditedPhotoToComponent.js';
import openPhotoEditorSession from './openPhotoEditorSession.js';

const openPhotoEditorModal = (editor, imageComponent) => {
  if (!imageComponent) return false;
  const attributeRecord = imageComponent.getAttributes ? imageComponent.getAttributes() : {};
  const sourceValue = String(attributeRecord.src || (imageComponent.get && imageComponent.get('src')) || '');
  return openPhotoEditorSession(editor, sourceValue, (dataUrl) =>
    applyEditedPhotoToComponent(
      editor,
      imageComponent,
      dataUrl,
      imageComponent.getName ? imageComponent.getName() : 'photo',
    ),
  );
};

export default openPhotoEditorModal;
