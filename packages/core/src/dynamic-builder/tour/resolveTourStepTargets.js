import getTourStepRecords from './getTourStepRecords.js';

const isVisibleElement = (candidateElement) =>
  Boolean(candidateElement) &&
  typeof candidateElement.getClientRects === 'function' &&
  candidateElement.getClientRects().length > 0;

const resolveTourStepTargets = (containerElement) => {
  if (!containerElement || typeof containerElement.querySelector !== 'function') return [];
  return getTourStepRecords()
    .map((stepRecord) => ({ ...stepRecord, element: containerElement.querySelector(stepRecord.selector) }))
    .filter((stepRecord) => isVisibleElement(stepRecord.element));
};

export default resolveTourStepTargets;
