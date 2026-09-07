import buildPageFileRecords from './buildPageFileRecords.js';
import buildPreviewShellDocument from './buildPreviewShellDocument.js';
import getPreviewBridgeScriptText from './getPreviewBridgeScriptText.js';
import getSiteSeoMetaRecord from './getSiteSeoMetaRecord.js';
import showToastNotice from '../support/showToastNotice.js';

const openExportPreview = (editor, buildOptions) => {
  const previewOptions = {
    resolveBindings: true,
    ...(buildOptions || {}),
    separateAssets: false,
    siteScriptText: undefined,
    extraBodyEndMarkup: '<script>' + getPreviewBridgeScriptText() + '</script>',
  };
  const pageRecords = buildPageFileRecords(editor, previewOptions);
  if (!pageRecords.length) {
    showToastNotice(editor, 'Add a page before previewing the site', { kind: 'warning' });
    return false;
  }
  const containerElement = editor.getContainer && editor.getContainer();
  const containerWindow =
    (containerElement && containerElement.ownerDocument && containerElement.ownerDocument.defaultView) || window;
  const shellDocument = buildPreviewShellDocument(getSiteSeoMetaRecord(editor).siteName, pageRecords);
  const previewUrl = URL.createObjectURL(new Blob([shellDocument], { type: 'text/html' }));
  const previewWindow = containerWindow.open(previewUrl, '_blank');
  if (!previewWindow) {
    URL.revokeObjectURL(previewUrl);
    showToastNotice(editor, 'The preview was blocked. Allow pop-ups for this page and try again.', {
      kind: 'warning',
      duration: 6000,
    });
    return false;
  }
  setTimeout(() => URL.revokeObjectURL(previewUrl), 60000);
  editor.trigger('db:export:preview', { pageCount: pageRecords.length });
  return true;
};

export default openExportPreview;
