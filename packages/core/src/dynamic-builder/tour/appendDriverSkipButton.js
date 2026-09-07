const appendDriverSkipButton = (popoverRecord, onSkip) => {
  const footerElement = popoverRecord && popoverRecord.footer;
  if (!footerElement || footerElement.querySelector('[data-db-tour-skip]')) return false;
  const skipButton = footerElement.ownerDocument.createElement('button');
  skipButton.type = 'button';
  skipButton.className = 'gjs-db-tour-skip';
  skipButton.setAttribute('data-db-tour-skip', 'true');
  skipButton.textContent = 'Skip tour';
  skipButton.addEventListener('click', onSkip);
  footerElement.insertBefore(skipButton, popoverRecord.footerButtons || null);
  const closeButton = popoverRecord.closeButton;
  if (closeButton && closeButton.setAttribute) closeButton.setAttribute('aria-label', 'Close the tour');
  return true;
};

export default appendDriverSkipButton;
