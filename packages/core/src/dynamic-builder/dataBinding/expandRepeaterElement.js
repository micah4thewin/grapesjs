import buildRepeaterEmptyMessageMarkup from './buildRepeaterEmptyMessageMarkup.js';
import findRepeaterTemplateElement from './findRepeaterTemplateElement.js';
import readElementAttributeRecord from './readElementAttributeRecord.js';
import renderRepeaterItemElement from './renderRepeaterItemElement.js';
import resolveRepeaterItems from './resolveRepeaterItems.js';
import resolveRepeaterSettings from './resolveRepeaterSettings.js';
import stripRepeaterEditorAttributes from './stripRepeaterEditorAttributes.js';

const expandRepeaterElement = (registry, repeaterElement, options = {}) => {
  if (!repeaterElement) return;
  const settings = resolveRepeaterSettings(readElementAttributeRecord(repeaterElement));
  const templateElement = findRepeaterTemplateElement(repeaterElement);
  Array.from(repeaterElement.children)
    .filter((childElement) => childElement.hasAttribute('data-db-repeater-preview'))
    .forEach((previewElement) => previewElement.remove());
  const sourceItems = templateElement ? resolveRepeaterItems(registry, settings) : [];
  const startIndex = options.startIndex > 0 ? options.startIndex : 0;
  sourceItems.slice(startIndex).forEach((sourceItem, offsetIndex) => {
    const indexNumber = startIndex + offsetIndex + 1;
    const itemElement = renderRepeaterItemElement(
      registry,
      templateElement,
      settings,
      sourceItem,
      indexNumber,
      sourceItems.length,
    );
    if (itemElement) repeaterElement.appendChild(itemElement);
  });
  if (templateElement) templateElement.remove();
  if (!sourceItems.length) {
    if (!settings.emptyText || !templateElement) {
      repeaterElement.remove();
      return;
    }
    repeaterElement.innerHTML = buildRepeaterEmptyMessageMarkup(settings.emptyText);
  }
  stripRepeaterEditorAttributes(repeaterElement);
};

export default expandRepeaterElement;
