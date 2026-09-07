import restoreRevisionRecord from './restoreRevisionRecord.js';
import saveSafetyRevision from './saveSafetyRevision.js';
import showToastNotice from '../support/showToastNotice.js';

const runRevisionRestoreFlow = (editor, moduleOptions, revisionRecord) => {
  if (!revisionRecord || revisionRecord.isRestorable === false) {
    editor.trigger('db:revision:error', {
      message: 'This revision cannot be restored because its data is incomplete.',
    });
    return false;
  }
  const safetyResult = saveSafetyRevision(editor, moduleOptions, revisionRecord);
  if (!safetyResult.proceed) return false;
  if (!restoreRevisionRecord(editor, revisionRecord)) return false;
  const labelText = String(revisionRecord.label || revisionRecord.id);
  const suffixText = safetyResult.savedRecord ? ' and kept a safety copy' : '';
  showToastNotice(editor, 'Restored "' + labelText + '"' + suffixText, { kind: 'success', duration: 4500 });
  return true;
};

export default runRevisionRestoreFlow;
