import formatLocalDateTimeText from './formatLocalDateTimeText.js';
import showToastNotice from '../support/showToastNotice.js';

const wirePersistenceNotices = (editor) => {
  editor.on('db:revision:error', (errorPayload) => {
    const messageText = (errorPayload && errorPayload.message) || 'The revision could not be saved';
    showToastNotice(editor, messageText, { kind: 'error', duration: 6000 });
  });
  editor.on('db:revision:evicted', (evictedPayload) => {
    const labelText = String((evictedPayload && evictedPayload.label) || 'oldest');
    showToastNotice(editor, 'Storage full: removed revision "' + labelText + '" to keep autosave working', {
      kind: 'warning',
      duration: 6000,
    });
  });
  editor.on('db:project:draft-available', (draftPayload) => {
    const savedText = formatLocalDateTimeText((draftPayload && draftPayload.savedAt) || '');
    const whenText = savedText ? ' from ' + savedText : '';
    showToastNotice(editor, 'Found a local draft' + whenText + '. Restore it from Project revisions.', {
      duration: 7000,
    });
  });
};

export default wirePersistenceNotices;
