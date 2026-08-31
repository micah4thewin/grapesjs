import setSeoPreviewSlotText from './setSeoPreviewSlotText.js';

const updateSocialPreviewCard = (rootElement, previewValues) => {
  setSeoPreviewSlotText(rootElement, 'socialTitle', previewValues.socialTitleText || 'Add a share title');
  setSeoPreviewSlotText(
    rootElement,
    'socialDescription',
    previewValues.socialDescriptionText || 'Add a share description to control this text.',
  );
  const imageBoxElement = rootElement.querySelector('[data-db-seo-preview="image"]');
  if (!imageBoxElement) return;
  const cleanImageUrl = String(previewValues.socialImageUrl || '').replace(/[\u0022\u0027()\s]/g, '');
  imageBoxElement.classList.toggle('gjs-db-seo-social-image-empty', !cleanImageUrl);
  imageBoxElement.style.backgroundImage = cleanImageUrl ? 'url(' + cleanImageUrl + ')' : 'none';
  imageBoxElement.textContent = cleanImageUrl ? '' : 'No share image set';
};

export default updateSocialPreviewCard;
