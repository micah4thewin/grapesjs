import promoteIdStylesToClass from './promoteIdStylesToClass.js';
import resolveEditorModel from './resolveEditorModel.js';
import walkComponentTree from '../support/walkComponentTree.js';

const nextClassSequence = (editor) => {
  const editorModel = resolveEditorModel(editor);
  const nextValue = Number((editorModel && editorModel.get('dbSymbolClassSequence')) || 0) + 1;
  editorModel && editorModel.set('dbSymbolClassSequence', nextValue, { silent: true });
  return nextValue;
};

const promoteSymbolSubtreeStyles = (editor, rootComponent, symbolId) => {
  let promotedCount = 0;
  const safeSymbolId = String(symbolId).replace(/[^a-zA-Z0-9-]/g, '');
  walkComponentTree(rootComponent, (currentComponent) => {
    const generatedClassName = 'db-sym-' + safeSymbolId + '-' + nextClassSequence(editor).toString(36);
    if (promoteIdStylesToClass(editor, currentComponent, generatedClassName)) promotedCount += 1;
  });
  return promotedCount;
};

export default promoteSymbolSubtreeStyles;
