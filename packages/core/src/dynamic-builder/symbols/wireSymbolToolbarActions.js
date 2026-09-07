import applySymbolToolbar from './applySymbolToolbar.js';
import isSymbolInstanceEditing from './isSymbolInstanceEditing.js';
import showSymbolLockedHint from './showSymbolLockedHint.js';

const wireSymbolToolbarActions = (editor) => {
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || typeof selectedComponent.get !== 'function') return;
    applySymbolToolbar(editor, selectedComponent);
    if (selectedComponent.get('type') === 'db-symbol' && !isSymbolInstanceEditing(selectedComponent)) {
      showSymbolLockedHint(editor);
    }
  });
};

export default wireSymbolToolbarActions;
