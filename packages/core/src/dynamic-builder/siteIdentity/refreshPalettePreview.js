import buildPalettePreviewMarkup from './buildPalettePreviewMarkup.js';
import collectSiteIdentityFormValues from './collectSiteIdentityFormValues.js';
import generateBrandPalette from './generateBrandPalette.js';

const refreshPalettePreview = (formElement) => {
  const formValues = collectSiteIdentityFormValues(formElement);
  const previewHost = formElement.querySelector('[data-db-identity-palette]');
  if (!previewHost) return;
  previewHost.innerHTML = buildPalettePreviewMarkup(generateBrandPalette(formValues.brandColor, formValues.moodId));
  const nameElement = previewHost.querySelector('[data-db-identity-preview-name]');
  const taglineElement = previewHost.querySelector('[data-db-identity-preview-tagline]');
  if (nameElement && formValues.siteName) nameElement.textContent = formValues.siteName;
  if (taglineElement && formValues.tagline) taglineElement.textContent = formValues.tagline;
};

export default refreshPalettePreview;
