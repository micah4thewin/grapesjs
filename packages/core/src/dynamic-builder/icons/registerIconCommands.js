import openIconPickerForComponent from './openIconPickerForComponent.js';
import registerCommandSet from '../support/registerCommandSet.js';
import showToastNotice from '../support/showToastNotice.js';

const registerIconCommands = (editor) =>
  registerCommandSet(editor, {
    'db:open-icon-picker': (commandEditor) => {
      const selectedComponent = commandEditor.getSelected && commandEditor.getSelected();
      const selectedType = selectedComponent && selectedComponent.get ? String(selectedComponent.get('type')) : '';
      if (selectedType !== 'db-icon') {
        showToastNotice(commandEditor, 'Select an icon on the page first, then change it.', { kind: 'warning' });
        return;
      }
      openIconPickerForComponent(commandEditor, selectedComponent);
    },
  });

export default registerIconCommands;
