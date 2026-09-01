import addNewSitePage from './addNewSitePage.js';
import openCommandPalette from './openCommandPalette.js';
import openShortcutHelp from './openShortcutHelp.js';
import registerCommandSet from '../support/registerCommandSet.js';

const registerShellCommands = (editor) =>
  registerCommandSet(editor, {
    'db:open-command-palette': (commandEditor) => openCommandPalette(commandEditor),
    'db:open-shortcut-help': (commandEditor) => openShortcutHelp(commandEditor),
    'db:add-page': (commandEditor) => addNewSitePage(commandEditor),
  });

export default registerShellCommands;
