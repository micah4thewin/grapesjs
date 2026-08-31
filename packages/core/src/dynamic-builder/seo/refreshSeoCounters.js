import updateCharacterCounterBadge from './updateCharacterCounterBadge.js';

const refreshSeoCounters = (rootElement) => {
  rootElement.querySelectorAll('[data-db-seo-counter]').forEach((badgeElement) => {
    const fieldWrapper = badgeElement.closest('.gjs-db-field');
    const fieldElement = fieldWrapper && fieldWrapper.querySelector('[data-db-seo-field]');
    if (fieldElement) updateCharacterCounterBadge(badgeElement, String(fieldElement.value || '').length);
  });
};

export default refreshSeoCounters;
