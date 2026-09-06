import getPersistenceEditorCss from './getPersistenceEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import loadStoredProjectOnReady from './loadStoredProjectOnReady.js';
import openHistoryModal from './openHistoryModal.js';
import openRevisionsModal from './openRevisionsModal.js';
import openSaveRevisionModal from './openSaveRevisionModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import resolvePersistenceOptions from './resolvePersistenceOptions.js';
import watchAutosaveUpdates from './watchAutosaveUpdates.js';

const applyPersistence = (editor, pluginOptions) => {
  const moduleOptions = resolvePersistenceOptions(pluginOptions, editor);
  registerCommandSet(editor, {
    'db:save-revision': (commandEditor) => openSaveRevisionModal(commandEditor, moduleOptions),
    'db:open-revisions': (commandEditor) => openRevisionsModal(commandEditor, moduleOptions),
    'db:open-history': (commandEditor) => openHistoryModal(commandEditor),
  });
  watchAutosaveUpdates(editor, moduleOptions);
  loadStoredProjectOnReady(editor, moduleOptions);
  const injectEditorSideStyles = () =>
    injectEditorStylesOnce(editor, 'db-css-persistence-editor', getPersistenceEditorCss());
  injectEditorSideStyles();
  if (editor.onReady) editor.onReady(() => injectEditorSideStyles());
};

export default applyPersistence;
