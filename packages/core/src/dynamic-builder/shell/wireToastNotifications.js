import showActionToastNotice from '../support/showActionToastNotice.js';
import showToastNotice from '../support/showToastNotice.js';

const wireToastNotifications = (editor) => {
  editor.on('db:revision:saved', () => showToastNotice(editor, 'Snapshot saved', { kind: 'success' }));
  editor.on('db:project:restored', () => showToastNotice(editor, 'Restored your last session'));
  editor.on('db:export:complete', (exportPayload) => {
    const payloadRecord = exportPayload || {};
    const fallbackText = payloadRecord.kind === 'zip' ? 'site.zip downloaded' : 'Export ready';
    const messageText = String(payloadRecord.message || '').trim() || fallbackText;
    showToastNotice(editor, messageText, { kind: 'success' });
  });
  editor.on('db:save-status', (statusPayload) => {
    const payloadRecord = statusPayload || {};
    if (payloadRecord.state !== 'error' || payloadRecord.repeated === true) return;
    showActionToastNotice(editor, payloadRecord.message || 'Saving failed', {
      kind: 'error',
      duration: 8000,
      actionLabel: 'Download site',
      onAction: () => editor.runCommand('db:download-site'),
    });
  });
};

export default wireToastNotifications;
