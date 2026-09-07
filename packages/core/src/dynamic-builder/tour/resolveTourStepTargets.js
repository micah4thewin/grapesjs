import getTourStepRecords from './getTourStepRecords.js';

const hasLayoutBox = (candidateElement) =>
  Boolean(candidateElement) &&
  typeof candidateElement.getClientRects === 'function' &&
  candidateElement.getClientRects().length > 0;

const resolveTourStepTargets = (containerElement) => {
  if (!containerElement || typeof containerElement.querySelector !== 'function') return [];
  const containerHasLayout = hasLayoutBox(containerElement);
  return getTourStepRecords()
    .map((stepRecord) => ({ ...stepRecord, element: containerElement.querySelector(stepRecord.selector) }))
    .filter((stepRecord) => Boolean(stepRecord.element) && (!containerHasLayout || hasLayoutBox(stepRecord.element)));
};

export default resolveTourStepTargets;
