const restoreCanvasAfterPageUndo = (editor) => {
  editor.on('page:add', (addedPage) => {
    setTimeout(() => {
      const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
      if (canvasDocument && canvasDocument.body) return;
      const selectedPage = editor.Pages.getSelected() || addedPage;
      const otherPage = editor.Pages.getAll().filter((pageModel) => pageModel !== selectedPage)[0];
      if (otherPage) editor.Pages.select(otherPage);
      editor.Pages.select(selectedPage);
    }, 0);
  });
};

export default restoreCanvasAfterPageUndo;
