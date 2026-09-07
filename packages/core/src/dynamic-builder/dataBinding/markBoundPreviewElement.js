import listBindingTokenBodies from './listBindingTokenBodies.js';

const markBoundPreviewElement = (element, rawText) => {
  if (!element || !element.setAttribute) return;
  const tokenList = listBindingTokenBodies(rawText)
    .map((tokenBody) => '{{db:' + tokenBody + '}}')
    .join(' ');
  const previousList = element.getAttribute('data-db-bound-preview') || '';
  const nextList = previousList && previousList.indexOf(tokenList) < 0 ? previousList + ' ' + tokenList : tokenList;
  element.setAttribute('data-db-bound-preview', nextList || 'true');
  if (!element.hasAttribute('title') || element.dbBoundTitle) {
    element.setAttribute('title', 'Shows data from ' + nextList);
    element.dbBoundTitle = true;
  }
};

export default markBoundPreviewElement;
