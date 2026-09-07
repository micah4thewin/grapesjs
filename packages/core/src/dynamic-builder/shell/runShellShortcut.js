import getShellShortcutDefinitions from './getShellShortcutDefinitions.js';
import getThemedModalSession from '../support/getThemedModalSession.js';
import runShellCommand from './runShellCommand.js';

const runShellShortcut = (editor, definitionRecord) => {
  const modalModule = editor.Modal;
  if (modalModule && modalModule.isOpen && modalModule.isOpen()) {
    const sessionRecord = getThemedModalSession(editor) || {};
    const openDefinition = getShellShortcutDefinitions().find(
      (candidateRecord) => candidateRecord.modalClassName && candidateRecord.modalClassName === sessionRecord.className,
    );
    if (!openDefinition || !openDefinition.isTransient) return;
    modalModule.close();
    if (openDefinition.commandId === definitionRecord.commandId) return;
  }
  const commandIsActive = editor.Commands.isActive && editor.Commands.isActive(definitionRecord.commandId);
  if (definitionRecord.onlyWhenActive && !commandIsActive) return;
  runShellCommand(editor, definitionRecord.commandId);
};

export default runShellShortcut;
