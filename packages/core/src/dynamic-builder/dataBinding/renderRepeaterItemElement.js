import buildItemRegistry from './buildItemRegistry.js';
import expandNestedRepeaters from './expandNestedRepeaters.js';
import replaceBindingTokensInElement from './replaceBindingTokensInElement.js';
import stripElementIds from './stripElementIds.js';
import stripFailingConditionsInElement from './stripFailingConditionsInElement.js';

const renderRepeaterItemElement = (registry, templateElement, settings, sourceItem, indexNumber, countNumber) => {
  const itemElement = templateElement.cloneNode(true);
  itemElement.removeAttribute('data-db-repeater-item');
  itemElement.removeAttribute('data-db-type');
  stripElementIds(itemElement);
  const itemRegistry = buildItemRegistry(registry, settings, sourceItem, indexNumber, countNumber);
  expandNestedRepeaters(itemRegistry, itemElement);
  if (!stripFailingConditionsInElement(itemRegistry, itemElement)) return null;
  replaceBindingTokensInElement(itemRegistry, itemElement);
  return itemElement;
};

export default renderRepeaterItemElement;
