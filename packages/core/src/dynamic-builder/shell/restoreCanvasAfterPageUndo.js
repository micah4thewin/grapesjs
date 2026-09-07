import isEditorLive from '../support/isEditorLive.js';

const restoreCanvasAfterPageUndo = (editor) => {
  editor.on('page:add', (addedPage) => {
    setTimeout(() => {
      if (!isEditorLive(editor)) return;
      const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
      if (canvasDocument && canvasDocument.body) return;
      const pageManager = editor.Pages;
      if (!pageManager || !pageManager.getSelected) return;
      const selectedPage = pageManager.getSelected() || addedPage;
      const otherPage = pageManager.getAll().filter((pageModel) => pageModel !== selectedPage)[0];
      if (otherPage) pageManager.select(otherPage);
      pageManager.select(selectedPage);
    }, 0);
  });
};

export default restoreCanvasAfterPageUndo;
