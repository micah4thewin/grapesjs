const copySchemaPreviewText = (rootElement) => {
  const previewElement = rootElement.querySelector('[data-db-schema-preview]');
  const statusElement = rootElement.querySelector('[data-db-schema-status="preview"]');
  const setStatusText = (statusText) => {
    if (statusElement) statusElement.textContent = statusText;
  };
  const previewText = previewElement ? String(previewElement.value || '') : '';
  if (!previewText) {
    setStatusText('Nothing to copy yet');
    return false;
  }
  const windowObject = rootElement.ownerDocument && rootElement.ownerDocument.defaultView;
  const clipboard = windowObject && windowObject.navigator && windowObject.navigator.clipboard;
  if (clipboard && clipboard.writeText) {
    clipboard.writeText(previewText).then(
      () => setStatusText('Copied'),
      () => setStatusText('Copy failed; select the text and copy it manually'),
    );
    return true;
  }
  previewElement.focus();
  previewElement.select();
  const ownerDocument = rootElement.ownerDocument;
  const didCopy = Boolean(ownerDocument && ownerDocument.execCommand && ownerDocument.execCommand('copy'));
  setStatusText(didCopy ? 'Copied' : 'Select the text and copy it manually');
  return didCopy;
};

export default copySchemaPreviewText;
