import addNewSitePage from './addNewSitePage.js';
import openCommandPalette from './openCommandPalette.js';
import openShortcutHelp from './openShortcutHelp.js';
import openSiteWizardModal from './openSiteWizardModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import runSelectedPageAction from './runSelectedPageAction.js';

const registerShellCommands = (editor, pluginOptions) =>
  registerCommandSet(editor, {
    'db:open-site-wizard': (commandEditor) => openSiteWizardModal(commandEditor, pluginOptions),
    'db:open-command-palette': (commandEditor) => openCommandPalette(commandEditor),
    'db:open-shortcut-help': (commandEditor) => openShortcutHelp(commandEditor),
    'db:add-page': (commandEditor) => addNewSitePage(commandEditor),
    'db:rename-page': (commandEditor) => runSelectedPageAction(commandEditor, 'rename'),
    'db:duplicate-page': (commandEditor) => runSelectedPageAction(commandEditor, 'duplicate'),
    'db:delete-page': (commandEditor) => runSelectedPageAction(commandEditor, 'delete'),
    'db:open-page-settings': (commandEditor) => runSelectedPageAction(commandEditor, 'settings'),
  });

export default registerShellCommands;
