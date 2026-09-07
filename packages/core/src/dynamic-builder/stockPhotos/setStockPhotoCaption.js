import escapeHtmlText from '../support/escapeHtmlText.js';
import findAncestorOfType from '../mediaComponents/findAncestorOfType.js';
import findFigureCaptionComponent from './findFigureCaptionComponent.js';
import readComponentPlainText from '../support/readComponentPlainText.js';

const placeholderCaptionText = 'Describe the image for readers and search engines.';

const setStockPhotoCaption = (imageComponent, captionText) => {
  const figureComponent = findAncestorOfType(imageComponent, 'db-figure');
  const captionComponent = findFigureCaptionComponent(figureComponent);
  if (!captionComponent || !captionComponent.components || !captionText) return false;
  const currentText = readComponentPlainText(captionComponent);
  if (currentText && currentText !== placeholderCaptionText) return false;
  captionComponent.components(escapeHtmlText(captionText));
  return true;
};

export default setStockPhotoCaption;
