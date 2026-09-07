import createSymbolFromComponent from './createSymbolFromComponent.js';
import openSymbolNameModal from './openSymbolNameModal.js';
import renderSymbolInstance from './renderSymbolInstance.js';
import replaceComponentWithSymbolInstance from './replaceComponentWithSymbolInstance.js';
import resolveComponentDisplayName from './resolveComponentDisplayName.js';
import runSymbolUndoStep from './runSymbolUndoStep.js';
import showToastNotice from '../support/showToastNotice.js';

const runCreateSymbolCommand = (editor) => {
  const selectedComponent = editor.getSelected && editor.getSelected();
  if (!selectedComponent) {
    showToastNotice(editor, 'Select something on the page first, then make it reusable.', { kind: 'warning' });
    return;
  }
  if (selectedComponent.get('type') === 'db-symbol') {
    showToastNotice(editor, 'That is already a reusable component.', { kind: 'warning' });
    return;
  }
  openSymbolNameModal(editor, {
    titleText: 'Make reusable',
    submitText: 'Make reusable',
    helpText: 'Reuse this on any page. Editing it once updates every copy.',
    initialName: resolveComponentDisplayName(selectedComponent),
    onSubmit: (symbolName) => {
      const symbolRecord = runSymbolUndoStep(editor, () => {
        const savedRecord = createSymbolFromComponent(editor, selectedComponent, symbolName);
        if (!savedRecord) return null;
        const instanceComponent = replaceComponentWithSymbolInstance(selectedComponent, savedRecord.id);
        if (!instanceComponent) return savedRecord;
        renderSymbolInstance(editor, instanceComponent);
        editor.select(instanceComponent);
        return savedRecord;
      });
      if (!symbolRecord) return;
      showToastNotice(editor, '"' + symbolRecord.name + '" is now reusable.', { kind: 'success' });
    },
  });
};

export default runCreateSymbolCommand;
