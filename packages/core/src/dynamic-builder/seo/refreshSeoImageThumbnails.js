import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const refreshSeoImageThumbnails = (rootElement) => {
  rootElement.querySelectorAll('[data-db-seo-thumb]').forEach((thumbnailElement) => {
    const fieldKey = thumbnailElement.dataset.dbSeoThumb;
    const fieldElement = rootElement.querySelector('[data-db-seo-field="' + fieldKey + '"]');
    const imageSource = fieldElement ? sanitizeUrlValue(fieldElement.value) : '';
    if (!imageSource) {
      thumbnailElement.hidden = true;
      thumbnailElement.removeAttribute('src');
      return;
    }
    if (thumbnailElement.getAttribute('src') !== imageSource) thumbnailElement.setAttribute('src', imageSource);
    thumbnailElement.hidden = false;
  });
};

export default refreshSeoImageThumbnails;
