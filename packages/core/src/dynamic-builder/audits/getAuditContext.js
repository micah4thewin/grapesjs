import getPageMetaRecord from '../support/getPageMetaRecord.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';

const getAuditContext = (editor, moduleOptions) => {
  const canvasModule = editor.Canvas;
  const canvasDocument = (canvasModule && canvasModule.getDocument && canvasModule.getDocument()) || null;
  const canvasWindow = (canvasModule && canvasModule.getWindow && canvasModule.getWindow()) || null;
  return {
    editor,
    moduleOptions: moduleOptions || {},
    canvasDocument,
    canvasWindow,
    canvasBody: (canvasDocument && canvasDocument.body) || null,
    wrapperComponent: (editor.getWrapper && editor.getWrapper()) || null,
    siteMeta: getSiteMetaRecord(editor),
    pageMeta: getPageMetaRecord(editor),
  };
};

export default getAuditContext;
