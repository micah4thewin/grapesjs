import collectSeoModalValues from './collectSeoModalValues.js';
import refreshSeoImageThumbnails from './refreshSeoImageThumbnails.js';
import resolveSeoModalPage from './resolveSeoModalPage.js';
import resolveSeoPreviewValues from './resolveSeoPreviewValues.js';
import updateSearchPreviewCard from './updateSearchPreviewCard.js';
import updateSocialPreviewCard from './updateSocialPreviewCard.js';

const refreshSeoPreviews = (editor, rootElement) => {
  const { siteValues, pageValues } = collectSeoModalValues(rootElement);
  const previewValues = resolveSeoPreviewValues(
    editor,
    siteValues,
    pageValues,
    resolveSeoModalPage(editor, rootElement),
  );
  updateSearchPreviewCard(rootElement, previewValues);
  updateSocialPreviewCard(rootElement, previewValues);
  refreshSeoImageThumbnails(rootElement);
  return { siteValues, pageValues, previewValues };
};

export default refreshSeoPreviews;
