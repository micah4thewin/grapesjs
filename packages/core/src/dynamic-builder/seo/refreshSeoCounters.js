import announceSeoFieldState from './announceSeoFieldState.js';
import countTextCharacters from './countTextCharacters.js';
import updateCharacterCounterBadge from './updateCharacterCounterBadge.js';

const refreshSeoCounters = (rootElement, previewValues) => {
  rootElement.querySelectorAll('[data-db-seo-counter]').forEach((badgeElement) => {
    const fieldKey = badgeElement.dataset.dbSeoCounter;
    const fieldElement = rootElement.querySelector('[data-db-seo-field="' + fieldKey + '"]');
    if (!fieldElement) return;
    const measuredText = fieldKey === 'title' ? previewValues.titleText : fieldElement.value;
    const previousState = badgeElement.dataset.dbSeoState || '';
    const nextState = updateCharacterCounterBadge(badgeElement, countTextCharacters(measuredText));
    if (previousState && previousState !== nextState) {
      announceSeoFieldState(rootElement, fieldKey, badgeElement.textContent);
    }
  });
};

export default refreshSeoCounters;
