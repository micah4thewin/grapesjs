import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildTourOverlayMarkup from './buildTourOverlayMarkup.js';
import renderTourStepView from './renderTourStepView.js';
import scrollTourTargetIntoView from './scrollTourTargetIntoView.js';
import trapTourFocus from './trapTourFocus.js';

const runFallbackTour = (containerElement, stepRecords, onFinish) => {
  const ownerDocument = containerElement.ownerDocument;
  const targetWindow = ownerDocument.defaultView;
  const rootElement = buildElementFromMarkup(ownerDocument, buildTourOverlayMarkup());
  if (!rootElement) return null;
  containerElement.appendChild(rootElement);
  const popoverElement = rootElement.querySelector('[data-db-tour-popover]');
  let activeIndex = 0;
  let isClosed = false;
  const showStep = (nextIndex) => {
    activeIndex = Math.max(0, Math.min(nextIndex, stepRecords.length - 1));
    scrollTourTargetIntoView(stepRecords[activeIndex].element);
    renderTourStepView(rootElement, stepRecords, activeIndex);
    const nextButton = rootElement.querySelector('[data-db-tour-next]');
    nextButton.focus && nextButton.focus();
  };
  const closeTour = () => {
    if (isClosed) return;
    isClosed = true;
    ownerDocument.removeEventListener('keydown', handleKeyDown, true);
    targetWindow.removeEventListener('resize', handleViewportChange);
    targetWindow.removeEventListener('scroll', handleViewportChange, true);
    rootElement.remove();
    onFinish && onFinish();
  };
  const handleViewportChange = () => !isClosed && renderTourStepView(rootElement, stepRecords, activeIndex);
  const handleKeyDown = (keyEvent) => {
    if (isClosed) return;
    if (keyEvent.key === 'Escape') {
      keyEvent.preventDefault();
      closeTour();
      return;
    }
    if (keyEvent.key === 'Tab') trapTourFocus(popoverElement, keyEvent);
  };
  rootElement.querySelector('[data-db-tour-skip]').addEventListener('click', closeTour);
  rootElement.querySelector('[data-db-tour-prev]').addEventListener('click', () => showStep(activeIndex - 1));
  rootElement.querySelector('[data-db-tour-next]').addEventListener('click', () => {
    if (activeIndex >= stepRecords.length - 1) closeTour();
    else showStep(activeIndex + 1);
  });
  ownerDocument.addEventListener('keydown', handleKeyDown, true);
  targetWindow.addEventListener('resize', handleViewportChange);
  targetWindow.addEventListener('scroll', handleViewportChange, true);
  showStep(0);
  return { rootElement, close: closeTour };
};

export default runFallbackTour;
