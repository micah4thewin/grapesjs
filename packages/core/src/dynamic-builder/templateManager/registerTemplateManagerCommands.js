import openSaveTemplateModal from './openSaveTemplateModal.js';
import openTemplateManagerModal from './openTemplateManagerModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import runDeleteTemplateCommand from './runDeleteTemplateCommand.js';

const registerTemplateManagerCommands = (editor, moduleOptions) =>
  registerCommandSet(editor, {
    'db:open-template-manager': (commandEditor, sender, commandOptions) =>
      openTemplateManagerModal(commandEditor, moduleOptions, commandOptions && commandOptions.tabId),
    'db:save-page-as-template': (commandEditor) => openSaveTemplateModal(commandEditor, moduleOptions, 'page'),
    'db:save-selection-as-template': (commandEditor) => openSaveTemplateModal(commandEditor, moduleOptions, 'section'),
    'db:delete-template': (commandEditor, sender, commandOptions) =>
      runDeleteTemplateCommand(commandEditor, moduleOptions, commandOptions && commandOptions.templateId),
  });

export default registerTemplateManagerCommands;
