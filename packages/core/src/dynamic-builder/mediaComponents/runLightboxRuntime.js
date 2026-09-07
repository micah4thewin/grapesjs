const runLightboxRuntime = () => {
  if (typeof window.dbOpenLightbox === 'function') return;
  const viewerState = { element: null, images: [], index: 0, restoreTarget: null, pointerStart: null };
  const buildControlButton = (buttonClass, labelText, glyphText, handleClick) => {
    const buttonElement = document.createElement('button');
    buttonElement.type = 'button';
    buttonElement.className = 'db-lightbox-control ' + buttonClass;
    buttonElement.setAttribute('aria-label', labelText);
    buttonElement.textContent = glyphText;
    buttonElement.addEventListener('click', handleClick);
    return buttonElement;
  };
  const wrapIndex = (imageIndex) => (imageIndex + viewerState.images.length) % viewerState.images.length;
  const showImage = (imageIndex) => {
    const overlayElement = viewerState.element;
    const currentImage = viewerState.images[wrapIndex(imageIndex)];
    if (!currentImage || !overlayElement) return;
    viewerState.index = wrapIndex(imageIndex);
    const largeImage = overlayElement.querySelector('.db-lightbox-image');
    overlayElement.classList.add('db-lightbox-loading');
    largeImage.onload = () => overlayElement.classList.remove('db-lightbox-loading');
    largeImage.onerror = largeImage.onload;
    largeImage.src = currentImage.currentSrc || currentImage.src;
    largeImage.alt = currentImage.alt || '';
    if (largeImage.complete && largeImage.naturalWidth) largeImage.onload();
    overlayElement.querySelector('.db-lightbox-counter').textContent =
      'Image ' + (viewerState.index + 1) + ' of ' + viewerState.images.length;
    [1, -1].forEach((stepOffset) => {
      const neighbourImage = viewerState.images[wrapIndex(viewerState.index + stepOffset)];
      if (neighbourImage) new Image().src = neighbourImage.currentSrc || neighbourImage.src;
    });
  };
  const stepImage = (stepOffset) => showImage(viewerState.index + stepOffset);
  const closeOverlay = () => {
    if (!viewerState.element) return;
    document.removeEventListener('keydown', handleViewerKeydown);
    document.documentElement.style.overflow = '';
    viewerState.element.remove();
    viewerState.element = null;
    if (viewerState.restoreTarget && viewerState.restoreTarget.focus) viewerState.restoreTarget.focus();
  };
  const handleViewerKeydown = (keyEvent) => {
    const overlayElement = viewerState.element;
    const keyName = keyEvent.key;
    if (!overlayElement) return;
    if (keyName === 'Escape' || keyName === 'ArrowRight' || keyName === 'ArrowLeft') keyEvent.preventDefault();
    if (keyName === 'Escape') closeOverlay();
    if (keyName === 'ArrowRight' || keyName === 'ArrowLeft') stepImage(keyName === 'ArrowRight' ? 1 : -1);
    if (keyName !== 'Tab') return;
    const focusableButtons = overlayElement.querySelectorAll('button');
    const firstButton = focusableButtons[0];
    const lastButton = focusableButtons[focusableButtons.length - 1];
    const activeElement = document.activeElement;
    const leavesForward =
      !keyEvent.shiftKey && (activeElement === lastButton || !overlayElement.contains(activeElement));
    const leavesBackward = keyEvent.shiftKey && (activeElement === firstButton || activeElement === overlayElement);
    if (!leavesForward && !leavesBackward) return;
    keyEvent.preventDefault();
    (leavesForward ? firstButton : lastButton).focus();
  };
  window.dbOpenLightbox = (imageList, startIndex, restoreTarget) => {
    closeOverlay();
    viewerState.images = imageList;
    viewerState.restoreTarget = restoreTarget || document.activeElement;
    const overlayElement = document.createElement('div');
    overlayElement.className = 'db-lightbox';
    [
      ['role', 'dialog'],
      ['aria-modal', 'true'],
      ['aria-label', 'Image viewer'],
      ['tabindex', '-1'],
    ].forEach((attributePair) => overlayElement.setAttribute(attributePair[0], attributePair[1]));
    const frameElement = document.createElement('figure');
    frameElement.className = 'db-lightbox-frame';
    frameElement.appendChild(document.createElement('img')).className = 'db-lightbox-image';
    const counterElement = document.createElement('p');
    counterElement.className = 'db-lightbox-counter';
    counterElement.setAttribute('aria-live', 'polite');
    const prevButton = buildControlButton('db-lightbox-prev', 'Previous image', '\u2039', () => stepImage(-1));
    const nextButton = buildControlButton('db-lightbox-next', 'Next image', '\u203a', () => stepImage(1));
    const closeButton = buildControlButton('db-lightbox-close', 'Close image viewer', '\u00d7', closeOverlay);
    [frameElement, counterElement, prevButton, nextButton, closeButton].forEach((childElement) =>
      overlayElement.appendChild(childElement),
    );
    overlayElement.addEventListener('click', (clickEvent) => {
      if (clickEvent.target === overlayElement) closeOverlay();
      else if (!overlayElement.contains(document.activeElement)) overlayElement.focus();
    });
    overlayElement.addEventListener('pointerdown', (pointerEvent) => (viewerState.pointerStart = pointerEvent.clientX));
    overlayElement.addEventListener('pointerup', (pointerEvent) => {
      const pointerDelta = viewerState.pointerStart === null ? 0 : pointerEvent.clientX - viewerState.pointerStart;
      viewerState.pointerStart = null;
      if (Math.abs(pointerDelta) >= 40) stepImage(pointerDelta > 0 ? -1 : 1);
    });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      overlayElement.classList.add('db-lightbox-instant');
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', handleViewerKeydown);
    document.body.appendChild(overlayElement);
    viewerState.element = overlayElement;
    showImage(startIndex);
    (window.requestAnimationFrame || window.setTimeout)(() => overlayElement.classList.add('db-lightbox-open'));
    closeButton.focus();
  };
};

export default runLightboxRuntime;
