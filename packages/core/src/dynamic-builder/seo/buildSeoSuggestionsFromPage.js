import collectComponentPlainText from '../schema/collectComponentPlainText.js';
import findComponentsInTree from '../schema/findComponentsInTree.js';
import resolvePageRootComponent from './resolvePageRootComponent.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';
import truncateTextAtWordBoundary from './truncateTextAtWordBoundary.js';

const readTagName = (component) => String((component.get && component.get('tagName')) || '').toLowerCase();

const readImageSource = (component) => {
  const attributes = component.getAttributes ? component.getAttributes() : {};
  const sourceValue = sanitizeUrlValue(attributes.src || (component.get && component.get('src')) || '');
  return /^data:/i.test(sourceValue) ? '' : sourceValue;
};

const buildSeoSuggestionsFromPage = (editor, page) => {
  const rootComponent = resolvePageRootComponent(editor, page);
  if (!rootComponent) return { title: '', description: '', image: '' };
  const headingComponents = findComponentsInTree(rootComponent, (component) => /^h[1-2]$/.test(readTagName(component)));
  const headingComponent =
    headingComponents.find((component) => readTagName(component) === 'h1') || headingComponents[0] || null;
  const paragraphText = findComponentsInTree(rootComponent, (component) => readTagName(component) === 'p')
    .map((component) => collectComponentPlainText(component))
    .find((textValue) => textValue.length >= 40);
  const imageSource = findComponentsInTree(rootComponent, (component) => readTagName(component) === 'img')
    .map(readImageSource)
    .find(Boolean);
  return {
    title: truncateTextAtWordBoundary(headingComponent ? collectComponentPlainText(headingComponent) : '', 60),
    description: truncateTextAtWordBoundary(paragraphText || '', 155),
    image: imageSource || '',
  };
};

export default buildSeoSuggestionsFromPage;
