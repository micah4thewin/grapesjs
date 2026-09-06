import countTextCharacters from './countTextCharacters.js';
import updateCharacterCounterBadge from './updateCharacterCounterBadge.js';

const refreshSeoCounters = (rootElement) => {
  rootElement.querySelectorAll('[data-db-seo-counter]').forEach((badgeElement) => {
    const fieldWrapper = badgeElement.closest('.gjs-db-field');
    const fieldElement = fieldWrapper && fieldWrapper.querySelector('[data-db-seo-field]');
    if (!fieldElement) return;
    if (badgeElement.id && fieldElement.getAttribute('aria-describedby') !== badgeElement.id) {
      fieldElement.setAttribute('aria-describedby', badgeElement.id);
    }
    updateCharacterCounterBadge(badgeElement, countTextCharacters(fieldElement.value));
  });
};

export default refreshSeoCounters;
