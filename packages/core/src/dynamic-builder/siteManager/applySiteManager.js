import getSiteManagerEditorCss from './getSiteManagerEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openSiteManagerModal from './openSiteManagerModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import resolveSiteManagerOptions from './resolveSiteManagerOptions.js';
import runCreateSiteCommand from './runCreateSiteCommand.js';
import runDeleteSiteCommand from './runDeleteSiteCommand.js';
import runRenameSiteCommand from './runRenameSiteCommand.js';
import runSwitchSiteCommand from './runSwitchSiteCommand.js';
import startSiteManagerSession from './startSiteManagerSession.js';

const applySiteManager = (editor, pluginOptions) => {
  const editorModel = editor.getModel && editor.getModel();
  if (editorModel && editorModel.get('dbSiteManagerReady')) return;
  if (editorModel) editorModel.set('dbSiteManagerReady', true);
  const managerOptions = resolveSiteManagerOptions(pluginOptions);
  if (!managerOptions.enabled) return;
  registerCommandSet(editor, {
    'db:open-site-manager': (commandEditor) => openSiteManagerModal(commandEditor, managerOptions),
    'db:create-site': (commandEditor, commandSender, commandOptions) =>
      runCreateSiteCommand(commandEditor, managerOptions, commandOptions || {}),
    'db:switch-site': (commandEditor, commandSender, commandOptions) =>
      runSwitchSiteCommand(commandEditor, managerOptions, commandOptions || {}),
    'db:delete-site': (commandEditor, commandSender, commandOptions) =>
      runDeleteSiteCommand(commandEditor, managerOptions, commandOptions || {}),
    'db:rename-site': (commandEditor, commandSender, commandOptions) =>
      runRenameSiteCommand(commandEditor, managerOptions, commandOptions || {}),
  });
  const injectEditorSideStyles = () => injectEditorStylesOnce(editor, 'db-css-site-manager', getSiteManagerEditorCss());
  injectEditorSideStyles();
  if (editor.onReady) editor.onReady(() => injectEditorSideStyles());
  startSiteManagerSession(editor, managerOptions);
};

export default applySiteManager;
