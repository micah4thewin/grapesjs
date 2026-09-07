import buildTemplatePreviewDocument from '../blocks/buildTemplatePreviewDocument.js';
import cloneTemplateContent from './cloneTemplateContent.js';
import fitTemplatePreviewScale from '../blocks/fitTemplatePreviewScale.js';

const mountTemplateCardPreview = (editor, cardElement, templateRecord) => {
  const frameElement = cardElement.querySelector('[data-db-template-preview-frame]');
  const iframeElement = cardElement.querySelector('[data-db-template-preview]');
  if (!frameElement || !iframeElement || iframeElement.getAttribute('data-db-preview-ready')) return false;
  iframeElement.setAttribute('data-db-preview-ready', 'true');
  iframeElement.srcdoc = buildTemplatePreviewDocument(editor, cloneTemplateContent(templateRecord));
  fitTemplatePreviewScale(frameElement, 1200, templateRecord.kind === 'page' ? 1100 : 620);
  return true;
};

export default mountTemplateCardPreview;
