const runGalleryLightboxBehavior = () => {
  document.querySelectorAll('[data-db-type="gallery"]').forEach((galleryElement) => {
    if (galleryElement.dataset.dbLightboxReady) return;
    galleryElement.dataset.dbLightboxReady = 'true';
    const isEditing = () => document.body.hasAttribute('data-db-editing');
    const lightboxEnabled = () => galleryElement.getAttribute('data-db-lightbox') !== 'false';
    const readImages = () => Array.prototype.slice.call(galleryElement.querySelectorAll('img'));
    const decorateImages = () => {
      const isEnabled = lightboxEnabled();
      readImages().forEach((imageElement) => {
        if (!isEnabled) {
          ['tabindex', 'role', 'aria-label'].forEach((attributeName) => imageElement.removeAttribute(attributeName));
          return;
        }
        imageElement.setAttribute('tabindex', '0');
        imageElement.setAttribute('role', 'button');
        imageElement.setAttribute('aria-label', 'Open ' + (imageElement.alt || 'picture') + ' in the viewer');
      });
    };
    const openImage = (imageElement) => {
      if (!lightboxEnabled() || isEditing() || typeof window.dbOpenLightbox !== 'function') return false;
      const imageList = readImages();
      const imageIndex = imageList.indexOf(imageElement);
      if (imageIndex < 0) return false;
      window.dbOpenLightbox(imageList, imageIndex, imageElement);
      return true;
    };
    const findImage = (eventTarget) => {
      const imageElement = eventTarget && eventTarget.closest ? eventTarget.closest('img') : null;
      return imageElement && galleryElement.contains(imageElement) ? imageElement : null;
    };
    galleryElement.addEventListener('click', (clickEvent) => {
      const imageElement = findImage(clickEvent.target);
      if (imageElement && openImage(imageElement)) clickEvent.preventDefault();
    });
    galleryElement.addEventListener('keydown', (keyEvent) => {
      if (keyEvent.key !== 'Enter' && keyEvent.key !== ' ') return;
      const imageElement = findImage(keyEvent.target);
      if (imageElement && openImage(imageElement)) keyEvent.preventDefault();
    });
    if (window.MutationObserver)
      new MutationObserver(decorateImages).observe(galleryElement, {
        attributes: true,
        attributeFilter: ['data-db-lightbox'],
        childList: true,
        subtree: true,
      });
    decorateImages();
  });
};

export default runGalleryLightboxBehavior;
