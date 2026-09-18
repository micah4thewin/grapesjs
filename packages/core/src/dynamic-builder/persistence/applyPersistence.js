import getPersistenceEditorCss from './getPersistenceEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import loadStoredProjectOnReady from './loadStoredProjectOnReady.js';
import openHistoryModal from './openHistoryModal.js';
import openRevisionsModal from './openRevisionsModal.js';
import openSaveRevisionModal from './openSaveRevisionModal.js';
import preparePersistenceStorage from './storage/preparePersistenceStorage.js';
import registerCommandSet from '../support/registerCommandSet.js';
import resolvePersistenceOptions from './resolvePersistenceOptions.js';
import runPersistNowCommand from './runPersistNowCommand.js';
import watchAutosaveUpdates from './watchAutosaveUpdates.js';
import wirePersistenceNotices from './wirePersistenceNotices.js';
import wireStorageWriteErrors from './wireStorageWriteErrors.js';

const applyPersistence = (editor, pluginOptions) => {
  const moduleOptions = resolvePersistenceOptions(pluginOptions, editor);
  const whenStorageReady = preparePersistenceStorage(editor, moduleOptions);
  editor.getModel().set('dbStorageReady', whenStorageReady);
  registerCommandSet(editor, {
    'db:save-revision': (commandEditor) => openSaveRevisionModal(commandEditor, moduleOptions),
    'db:open-revisions': (commandEditor) => openRevisionsModal(commandEditor, moduleOptions),
    'db:open-history': (commandEditor) => openHistoryModal(commandEditor),
    'db:persist-now': (commandEditor) => runPersistNowCommand(commandEditor, moduleOptions),
  });
  wireStorageWriteErrors(editor);
  wirePersistenceNotices(editor);
  watchAutosaveUpdates(editor, moduleOptions);
  loadStoredProjectOnReady(editor, moduleOptions, whenStorageReady);
  const injectEditorSideStyles = () =>
    injectEditorStylesOnce(editor, 'db-css-persistence-editor', getPersistenceEditorCss());
  injectEditorSideStyles();
  if (editor.onReady) editor.onReady(() => injectEditorSideStyles());
};

export default applyPersistence;
