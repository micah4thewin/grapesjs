import isStructuralBlock from './isStructuralBlock.js';

const wireStructuralDragFeedback = (editor) => {
  const setCanvasFlag = (isActive) => {
    const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
    if (!canvasDocument || !canvasDocument.body) return;
    canvasDocument.body.classList.toggle('db-drag-structural', isActive);
  };
  editor.on('block:drag:start', (blockModel) => setCanvasFlag(isStructuralBlock(blockModel)));
  editor.on('block:drag:stop', () => setCanvasFlag(false));
  editor.on('component:drag:start', ({ target }) => {
    const targetType = target && target.get ? String(target.get('type') || '') : '';
    setCanvasFlag(isStructuralBlock({ get: (key) => (key === 'content' ? { type: targetType } : '') }));
  });
  editor.on('component:drag:end', () => setCanvasFlag(false));
};

export default wireStructuralDragFeedback;
