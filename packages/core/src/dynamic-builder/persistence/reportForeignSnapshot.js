import emitSaveStatus from './emitSaveStatus.js';

const reportForeignSnapshot = (editor, ownerRecord) => {
  const editorModel = editor.getModel();
  const alreadyReported = editorModel.get('dbForeignSnapshotSavedAt') === ownerRecord.savedAt;
  editorModel.set('dbForeignSnapshotSavedAt', ownerRecord.savedAt);
  const messageText = 'This site was edited in another tab. Autosave is paused here; reload to see the newest version.';
  emitSaveStatus(editor, 'error', messageText, { repeated: alreadyReported });
  if (!alreadyReported) editor.trigger('db:project:foreign-save', ownerRecord);
  return false;
};

export default reportForeignSnapshot;
