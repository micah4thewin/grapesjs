import expandRepeaterElement from './expandRepeaterElement.js';

const expandNestedRepeaters = (registry, rootElement) => {
  if (!rootElement || !rootElement.querySelector) return;
  let remainingGuard = 2000;
  let nestedRepeater = rootElement.querySelector('[data-db-repeater]');
  while (nestedRepeater && remainingGuard > 0) {
    expandRepeaterElement(registry, nestedRepeater);
    if (nestedRepeater.hasAttribute('data-db-repeater')) nestedRepeater.removeAttribute('data-db-repeater');
    nestedRepeater = rootElement.querySelector('[data-db-repeater]');
    remainingGuard -= 1;
  }
};

export default expandNestedRepeaters;
