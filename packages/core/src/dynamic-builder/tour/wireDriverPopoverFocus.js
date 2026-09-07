import trapTourFocus from './trapTourFocus.js';

const wireDriverPopoverFocus = (targetDocument) => {
  const handleKeyDown = (keyEvent) => {
    if (keyEvent.key !== 'Tab') return;
    const popoverElement = targetDocument.querySelector('.driver-popover');
    if (popoverElement) trapTourFocus(popoverElement, keyEvent);
  };
  targetDocument.addEventListener('keydown', handleKeyDown, true);
  return () => targetDocument.removeEventListener('keydown', handleKeyDown, true);
};

export default wireDriverPopoverFocus;
