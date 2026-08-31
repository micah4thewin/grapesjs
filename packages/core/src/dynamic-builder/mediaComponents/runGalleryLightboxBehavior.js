const runGalleryLightboxBehavior = () => {
  document.querySelectorAll('[data-db-type="gallery"]').forEach((galleryElement) => {
    if (galleryElement.dataset.dbLightboxReady) return;
    galleryElement.dataset.dbLightboxReady = 'true';
    const overlayState = { element: null, images: [], index: 0, restoreTarget: null };
    const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const buildControlButton = (buttonClass, labelText, glyphText) => {
      const buttonElement = document.createElement('button');
      buttonElement.type = 'button';
      buttonElement.className = 'db-lightbox-control ' + buttonClass;
      buttonElement.setAttribute('aria-label', labelText);
      buttonElement.textContent = glyphText;
      return buttonElement;
    };
    const renderCurrentImage = () => {
      const currentImage = overlayState.images[overlayState.index];
      if (!currentImage || !overlayState.element) return;
      const largeImage = overlayState.element.querySelector('.db-lightbox-image');
      largeImage.src = currentImage.currentSrc || currentImage.src;
      largeImage.alt = currentImage.alt || '';
      const counterElement = overlayState.element.querySelector('.db-lightbox-counter');
      counterElement.textContent = 'Image ' + (overlayState.index + 1) + ' of ' + overlayState.images.length;
    };
    const stepImage = (stepOffset) => {
      const imageCount = overlayState.images.length;
      if (!imageCount) return;
      overlayState.index = (overlayState.index + stepOffset + imageCount) % imageCount;
      renderCurrentImage();
    };
    const closeOverlay = () => {
      if (!overlayState.element) return;
      overlayState.element.remove();
      overlayState.element = null;
      if (overlayState.restoreTarget && overlayState.restoreTarget.focus) overlayState.restoreTarget.focus();
    };
    const handleOverlayKeydown = (keyEvent) => {
      const keyName = keyEvent.key;
      if (keyName === 'Escape' || keyName === 'ArrowRight' || keyName === 'ArrowLeft') keyEvent.preventDefault();
      if (keyName === 'Escape') closeOverlay();
      if (keyName === 'ArrowRight') stepImage(1);
      if (keyName === 'ArrowLeft') stepImage(-1);
      if (keyName !== 'Tab' || !overlayState.element) return;
      const focusableButtons = overlayState.element.querySelectorAll('button');
      const firstButton = focusableButtons[0];
      const lastButton = focusableButtons[focusableButtons.length - 1];
      const wrapTarget =
        keyEvent.shiftKey && document.activeElement === firstButton
          ? lastButton
          : !keyEvent.shiftKey && document.activeElement === lastButton
            ? firstButton
            : null;
      if (!wrapTarget) return;
      keyEvent.preventDefault();
      wrapTarget.focus();
    };
    const openOverlay = (imageIndex) => {
      overlayState.index = imageIndex;
      overlayState.restoreTarget = document.activeElement;
      const overlayElement = document.createElement('div');
      overlayElement.className = 'db-lightbox';
      overlayElement.setAttribute('role', 'dialog');
      overlayElement.setAttribute('aria-modal', 'true');
      overlayElement.setAttribute('aria-label', 'Image viewer');
      const frameElement = document.createElement('figure');
      frameElement.className = 'db-lightbox-frame';
      frameElement.appendChild(document.createElement('img')).className = 'db-lightbox-image';
      const counterElement = document.createElement('p');
      counterElement.className = 'db-lightbox-counter';
      counterElement.setAttribute('aria-live', 'polite');
      const prevButton = buildControlButton('db-lightbox-prev', 'Previous image', '\u2039');
      const nextButton = buildControlButton('db-lightbox-next', 'Next image', '\u203a');
      const closeButton = buildControlButton('db-lightbox-close', 'Close image viewer', '\u00d7');
      prevButton.addEventListener('click', () => stepImage(-1));
      nextButton.addEventListener('click', () => stepImage(1));
      closeButton.addEventListener('click', closeOverlay);
      overlayElement.addEventListener('click', (clickEvent) => clickEvent.target === overlayElement && closeOverlay());
      overlayElement.addEventListener('keydown', handleOverlayKeydown);
      [frameElement, counterElement, prevButton, nextButton, closeButton].forEach((childElement) =>
        overlayElement.appendChild(childElement),
      );
      if (prefersReducedMotion()) overlayElement.classList.add('db-lightbox-instant');
      document.body.appendChild(overlayElement);
      overlayState.element = overlayElement;
      renderCurrentImage();
      window.requestAnimationFrame(() => overlayElement.classList.add('db-lightbox-open'));
      closeButton.focus();
    };
    galleryElement.addEventListener('click', (clickEvent) => {
      if (galleryElement.getAttribute('data-db-lightbox') === 'false') return;
      const clickTarget = clickEvent.target;
      const imageElement = clickTarget && clickTarget.closest ? clickTarget.closest('img') : null;
      if (!imageElement || !galleryElement.contains(imageElement)) return;
      overlayState.images = Array.prototype.slice.call(galleryElement.querySelectorAll('img'));
      const imageIndex = overlayState.images.indexOf(imageElement);
      if (imageIndex < 0) return;
      clickEvent.preventDefault();
      openOverlay(imageIndex);
    });
  });
};

export default runGalleryLightboxBehavior;
