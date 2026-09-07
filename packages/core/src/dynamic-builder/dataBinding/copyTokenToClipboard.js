import showToastNotice from '../support/showToastNotice.js';

const copyTokenToClipboard = (editor, tokenText) => {
  const clipboardApi = typeof navigator !== 'undefined' && navigator.clipboard ? navigator.clipboard : null;
  if (!clipboardApi || typeof clipboardApi.writeText !== 'function') {
    showToastNotice(editor, `Copy this token: ${tokenText}`, { duration: 6000 });
    return;
  }
  clipboardApi
    .writeText(tokenText)
    .then(() => showToastNotice(editor, `Copied ${tokenText}`, { kind: 'success' }))
    .catch(() => showToastNotice(editor, `Copy this token: ${tokenText}`, { duration: 6000 }));
};

export default copyTokenToClipboard;
