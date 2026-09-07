import showToastNotice from '../support/showToastNotice.js';
import cloneBlockContent from './cloneBlockContent.js';
import resolveInsertTarget from './resolveInsertTarget.js';
import selectAndRevealComponent from './selectAndRevealComponent.js';
import wrapRootLevelComponents from './wrapRootLevelComponents.js';

const insertBlockContent = (editor, blockModel) => {
  const contentRecords = cloneBlockContent(blockModel);
  const blockLabel = String(blockModel.get('label') || 'block');
  const insertTarget = resolveInsertTarget(editor, contentRecords);
  if (!insertTarget) {
    showToastNotice(editor, blockLabel + ' cannot go inside the selected item. Select a section first.', {
      kind: 'error',
    });
    return [];
  }
  const addedComponents = insertTarget.parentComponent.append(contentRecords, { at: insertTarget.insertIndex });
  wrapRootLevelComponents(editor, addedComponents);
  selectAndRevealComponent(editor, addedComponents[0]);
  showToastNotice(editor, 'Added ' + blockLabel + '.', { kind: 'success' });
  return addedComponents;
};

export default insertBlockContent;
