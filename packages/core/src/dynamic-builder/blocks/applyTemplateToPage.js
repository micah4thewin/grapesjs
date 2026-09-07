import showToastNotice from '../support/showToastNotice.js';
import cloneBlockContent from './cloneBlockContent.js';
import removeDuplicatePageChrome from './removeDuplicatePageChrome.js';
import removeOtherRootComponents from './removeOtherRootComponents.js';
import selectAndRevealComponent from './selectAndRevealComponent.js';

const applyTemplateToPage = (editor, blockModel, applyMode) => {
  const templateLabel = String(blockModel.get('label') || 'template');
  const addedComponents = editor.getWrapper().append(cloneBlockContent(blockModel));
  const keptLabels = applyMode === 'replace' ? [] : removeDuplicatePageChrome(editor, addedComponents);
  applyMode === 'replace' && removeOtherRootComponents(editor, addedComponents);
  const remainingComponents = addedComponents.filter(
    (addedComponent) => addedComponent.parent && addedComponent.parent(),
  );
  selectAndRevealComponent(editor, remainingComponents[0]);
  const keptNote = keptLabels.length ? ' Kept your existing ' + keptLabels.join(' and ') + '.' : '';
  const messageText =
    applyMode === 'replace'
      ? 'This page now uses the ' + templateLabel + '.'
      : 'Added the ' + templateLabel + ' below your content.' + keptNote;
  showToastNotice(editor, messageText, { kind: 'success' });
  return remainingComponents;
};

export default applyTemplateToPage;
