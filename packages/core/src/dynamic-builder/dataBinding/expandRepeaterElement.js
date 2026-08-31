import applyLimitOffsetToItems from './applyLimitOffsetToItems.js';
import parseWholeNumberValue from './parseWholeNumberValue.js';
import replaceBindingTokensInText from './replaceBindingTokensInText.js';
import resolveSourceItems from './resolveSourceItems.js';

const expandRepeaterElement = (registry, repeaterElement) => {
  const templateElement = Array.from(repeaterElement.children).find((childElement) =>
    childElement.hasAttribute('data-db-repeater-item'),
  );
  if (!templateElement) return;
  const sourceName = repeaterElement.getAttribute('data-db-source') || '';
  const offsetValue = parseWholeNumberValue(repeaterElement.getAttribute('data-db-offset'), 0);
  const limitValue = parseWholeNumberValue(repeaterElement.getAttribute('data-db-limit'), 0);
  const sourceItems = applyLimitOffsetToItems(resolveSourceItems(registry[sourceName]), offsetValue, limitValue);
  sourceItems.forEach((sourceItem) => {
    const renderedMarkup = replaceBindingTokensInText({ ...registry, item: sourceItem }, templateElement.outerHTML);
    repeaterElement.insertAdjacentHTML('beforeend', renderedMarkup);
    const renderedElement = repeaterElement.lastElementChild;
    if (!renderedElement) return;
    renderedElement.removeAttribute('data-db-repeater-item');
    renderedElement.removeAttribute('data-db-type');
  });
  templateElement.remove();
};

export default expandRepeaterElement;
