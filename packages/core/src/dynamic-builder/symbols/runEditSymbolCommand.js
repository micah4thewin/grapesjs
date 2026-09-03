import beginSymbolEditing from './beginSymbolEditing.js';
import findOwningSymbolInstance from './findOwningSymbolInstance.js';
import finishSymbolEditing from './finishSymbolEditing.js';
import isSymbolInstanceEditing from './isSymbolInstanceEditing.js';
import showToastNotice from '../support/showToastNotice.js';

const runEditSymbolCommand = (editor) => {
  const instanceComponent = findOwningSymbolInstance(editor.getSelected && editor.getSelected());
  if (!instanceComponent) {
    showToastNotice(editor, 'Select a reusable component first.', { kind: 'warning' });
    return;
  }
  if (isSymbolInstanceEditing(instanceComponent)) {
    finishSymbolEditing(editor, instanceComponent);
    showToastNotice(editor, 'Saved to every copy.', { kind: 'success' });
    return;
  }
  beginSymbolEditing(editor, instanceComponent);
  showToastNotice(editor, 'Editing everywhere. Changes here apply to every copy.');
};

export default runEditSymbolCommand;
