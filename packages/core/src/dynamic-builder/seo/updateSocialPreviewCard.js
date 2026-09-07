import findSharePreviewPlatform from './findSharePreviewPlatform.js';
import resolveSharePreviewSlots from './resolveSharePreviewSlots.js';
import setSeoPreviewSlotText from './setSeoPreviewSlotText.js';

const updateSocialPreviewCard = (rootElement, previewValues) => {
  const cardElement = rootElement.querySelector('[data-db-seo-social-card]');
  if (!cardElement) return;
  const platformRecord = findSharePreviewPlatform(cardElement.dataset.dbSeoActivePlatform);
  const previewSlots = resolveSharePreviewSlots(previewValues, platformRecord);
  setSeoPreviewSlotText(rootElement, 'socialDomain', previewSlots.domainText.toUpperCase());
  setSeoPreviewSlotText(rootElement, 'socialTitle', previewSlots.titleText);
  const descriptionElement = rootElement.querySelector('[data-db-seo-preview="socialDescription"]');
  if (descriptionElement) {
    descriptionElement.hidden = !previewSlots.descriptionText;
    descriptionElement.textContent = previewSlots.descriptionText;
  }
  const noteElement = rootElement.querySelector('[data-db-seo-preview="socialNote"]');
  if (noteElement) {
    noteElement.hidden = !previewSlots.noteText;
    noteElement.textContent = previewSlots.noteText;
  }
  const imageBoxElement = rootElement.querySelector('[data-db-seo-preview="image"]');
  if (!imageBoxElement) return;
  const cleanImageUrl = String(previewSlots.imageUrl || '').replace(/[\u0022\u0027()\s]/g, '');
  imageBoxElement.classList.toggle('gjs-db-seo-social-image-empty', !cleanImageUrl);
  imageBoxElement.style.backgroundImage = cleanImageUrl ? 'url(' + cleanImageUrl + ')' : 'none';
  imageBoxElement.textContent = cleanImageUrl
    ? ''
    : previewSlots.noteText
      ? 'Image cannot be used'
      : 'No share image set';
};

export default updateSocialPreviewCard;
