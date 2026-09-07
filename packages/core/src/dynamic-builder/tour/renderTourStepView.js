import positionTourPopover from './positionTourPopover.js';

const holePadding = 6;

const renderTourStepView = (rootElement, stepRecords, activeIndex) => {
  const stepRecord = stepRecords[activeIndex];
  if (!stepRecord) return false;
  const ownerDocument = rootElement.ownerDocument;
  const targetWindow = ownerDocument.defaultView;
  const targetRect = stepRecord.element.getBoundingClientRect();
  const holeElement = rootElement.querySelector('[data-db-tour-hole]');
  holeElement.style.left = `${Math.round(targetRect.left - holePadding)}px`;
  holeElement.style.top = `${Math.round(targetRect.top - holePadding)}px`;
  holeElement.style.width = `${Math.round(targetRect.width + holePadding * 2)}px`;
  holeElement.style.height = `${Math.round(targetRect.height + holePadding * 2)}px`;
  rootElement.querySelector('[data-db-tour-progress]').textContent = `Step ${activeIndex + 1} of ${stepRecords.length}`;
  rootElement.querySelector('[data-db-tour-title]').textContent = stepRecord.title;
  rootElement.querySelector('[data-db-tour-text]').textContent = stepRecord.description;
  const previousButton = rootElement.querySelector('[data-db-tour-prev]');
  previousButton.hidden = activeIndex === 0;
  const isLastStep = activeIndex === stepRecords.length - 1;
  const nextButton = rootElement.querySelector('[data-db-tour-next]');
  nextButton.textContent = isLastStep ? 'Done' : 'Next';
  const popoverElement = rootElement.querySelector('[data-db-tour-popover]');
  positionTourPopover(
    popoverElement,
    targetRect,
    stepRecord.side,
    targetWindow.innerWidth || 1024,
    targetWindow.innerHeight || 768,
  );
  return true;
};

export default renderTourStepView;
