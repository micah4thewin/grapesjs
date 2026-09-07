const lockDecorativeComponent = (targetComponent) => {
  if (!targetComponent || typeof targetComponent.set !== 'function') return;
  targetComponent.set(
    {
      selectable: false,
      hoverable: false,
      layerable: false,
      draggable: false,
      removable: false,
      copyable: false,
      highlightable: false,
    },
    { avoidStore: true },
  );
};

export default lockDecorativeComponent;
