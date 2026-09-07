const revealSymbolInstance = (editor, instanceComponent) => {
  if (!instanceComponent) return;
  editor.select(instanceComponent);
  const canvasModule = editor.Canvas;
  if (!canvasModule || typeof canvasModule.scrollTo !== 'function') return;
  setTimeout(() => {
    try {
      canvasModule.scrollTo(instanceComponent, { behavior: 'smooth', block: 'center', force: true });
    } catch (scrollError) {
      return;
    }
  }, 0);
};

export default revealSymbolInstance;
