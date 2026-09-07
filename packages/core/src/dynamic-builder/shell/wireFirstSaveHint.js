import readShellPreference from './readShellPreference.js';
import showActionToastNotice from '../support/showActionToastNotice.js';
import writeShellPreference from './writeShellPreference.js';

const wireFirstSaveHint = (editor, pluginOptions) => {
  const hintKey = 'autosave-hint';
  if (readShellPreference(editor, pluginOptions, hintKey) === 'seen') return;
  let hintShown = false;
  editor.on('db:save-status', (statusPayload) => {
    if (hintShown || !statusPayload || statusPayload.state !== 'saved') return;
    const containerElement = editor.getContainer && editor.getContainer();
    const noticeShowing = containerElement && containerElement.querySelector('.gjs-db-toast');
    const ownerDocument = containerElement && containerElement.ownerDocument;
    const tourShowing = ownerDocument && ownerDocument.querySelector('[data-db-tour-popover], [data-db-tour-running]');
    if (noticeShowing || tourShowing) return;
    hintShown = true;
    writeShellPreference(editor, pluginOptions, hintKey, 'seen');
    showActionToastNotice(editor, 'Your work autosaves in this browser. Download it to keep a copy anywhere else.', {
      kind: 'success',
      duration: 10000,
      actionLabel: 'Download',
      onAction: () => editor.runCommand('db:download-site'),
    });
  });
};

export default wireFirstSaveHint;
