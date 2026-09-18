import emitSaveStatus from './emitSaveStatus.js';
import getErrorMessageText from './getErrorMessageText.js';
import { onAssetPoolError } from './storage/getAssetPoolStore.js';
import { onRecordStorageError } from './storage/getRecordStorageArea.js';

// Writes settle behind the save now, so a failure arrives after the save path
// has already returned. It still has to reach the save strip rather than be
// swallowed, or the editor would claim work was saved that never landed.
const wireStorageWriteErrors = (editor) => {
  const reportWriteError = (writeError) =>
    emitSaveStatus(editor, 'error', getErrorMessageText(writeError, 'Unable to write to browser storage'));
  const stopRecordListener = onRecordStorageError(reportWriteError);
  const stopAssetListener = onAssetPoolError(reportWriteError);
  editor.on('destroy', () => {
    stopRecordListener();
    stopAssetListener();
  });
};

export default wireStorageWriteErrors;
