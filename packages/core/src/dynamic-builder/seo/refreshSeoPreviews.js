import collectSeoFormValues from './collectSeoFormValues.js';
import resolveSeoPreviewValues from './resolveSeoPreviewValues.js';
import updateSearchPreviewCard from './updateSearchPreviewCard.js';
import updateSocialPreviewCard from './updateSocialPreviewCard.js';

const refreshSeoPreviews = (editor, rootElement) => {
  const siteValues = collectSeoFormValues(rootElement.querySelector('[data-db-seo-section="site"]'));
  const pageValues = collectSeoFormValues(rootElement.querySelector('[data-db-seo-section="page"]'));
  const previewValues = resolveSeoPreviewValues(editor, siteValues, pageValues);
  updateSearchPreviewCard(rootElement, previewValues);
  updateSocialPreviewCard(rootElement, previewValues);
};

export default refreshSeoPreviews;
