import readElementAttributeRecord from './readElementAttributeRecord.js';
import resolveRepeaterChainRegistry from './resolveRepeaterChainRegistry.js';
import resolveRepeaterSettings from './resolveRepeaterSettings.js';

const listTemplateAncestors = (element) => {
  const templateElements = [];
  let currentElement = element && element.closest ? element.closest('[data-db-repeater-item]') : null;
  while (currentElement) {
    templateElements.unshift(currentElement);
    const parentElement = currentElement.parentElement;
    currentElement = parentElement && parentElement.closest ? parentElement.closest('[data-db-repeater-item]') : null;
  }
  return templateElements;
};

const resolveElementBindingContext = (registry, element, contextCache) => {
  const templateElements = listTemplateAncestors(element);
  if (!templateElements.length) return registry;
  const cacheKey = templateElements[templateElements.length - 1];
  if (contextCache && contextCache.has(cacheKey)) return contextCache.get(cacheKey);
  const settingsList = templateElements.map((templateElement) => {
    const parentElement = templateElement.parentElement;
    const repeaterElement =
      parentElement && parentElement.closest ? parentElement.closest('[data-db-repeater]') || parentElement : null;
    return resolveRepeaterSettings(readElementAttributeRecord(repeaterElement));
  });
  const contextRegistry = resolveRepeaterChainRegistry(registry, settingsList);
  if (contextCache) contextCache.set(cacheKey, contextRegistry);
  return contextRegistry;
};

export default resolveElementBindingContext;
