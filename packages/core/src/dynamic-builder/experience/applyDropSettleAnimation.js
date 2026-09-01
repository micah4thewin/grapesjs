const applyDropSettleAnimation = (editor) => {
  editor.on('block:drag:stop', (droppedComponent) => {
    if (!droppedComponent || !droppedComponent.getEl) return;
    const droppedElement = droppedComponent.getEl();
    if (!droppedElement || !droppedElement.classList) return;
    droppedElement.classList.add('db-drop-settle');
    setTimeout(() => droppedElement.classList.remove('db-drop-settle'), 520);
  });
};

export default applyDropSettleAnimation;
