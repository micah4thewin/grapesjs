import isEditorLive from '../support/isEditorLive.js';
import mountTemplateCardPreview from './mountTemplateCardPreview.js';

const scheduleTemplatePreviews = (editor, cardElements, resolveTemplateRecord) => {
  const pendingElements = [...cardElements];
  const mountNextChunk = () => {
    if (!isEditorLive(editor)) return;
    pendingElements.splice(0, 3).forEach((cardElement) => {
      const templateRecord = resolveTemplateRecord(cardElement.getAttribute('data-db-template-card'));
      if (templateRecord && cardElement.isConnected !== false) {
        mountTemplateCardPreview(editor, cardElement, templateRecord);
      }
    });
    if (pendingElements.length) setTimeout(mountNextChunk, 40);
  };
  setTimeout(mountNextChunk, 40);
  return pendingElements.length;
};

export default scheduleTemplatePreviews;
