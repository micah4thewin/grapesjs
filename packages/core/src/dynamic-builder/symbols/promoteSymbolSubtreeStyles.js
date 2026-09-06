import promoteIdStylesToClass from './promoteIdStylesToClass.js';
import walkComponentTree from '../support/walkComponentTree.js';

const promoteSymbolSubtreeStyles = (editor, rootComponent, symbolId) => {
  let promotedCount = 0;
  walkComponentTree(rootComponent, (currentComponent) => {
    const generatedClassName = 'db-sym-' + String(symbolId).replace(/[^a-zA-Z0-9-]/g, '') + '-' + promotedCount;
    if (promoteIdStylesToClass(editor, currentComponent, generatedClassName)) promotedCount += 1;
  });
  return promotedCount;
};

export default promoteSymbolSubtreeStyles;
