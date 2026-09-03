import walkComponentTree from '../support/walkComponentTree.js';

const setSymbolSubtreeLocked = (instanceComponent, isLocked) => {
  const childComponents = instanceComponent && instanceComponent.components ? instanceComponent.components() : null;
  if (!childComponents) return;
  childComponents.forEach((childComponent) =>
    walkComponentTree(childComponent, (currentComponent) => {
      if (!currentComponent || typeof currentComponent.set !== 'function') return;
      currentComponent.set(
        {
          selectable: !isLocked,
          hoverable: !isLocked,
          editable: !isLocked,
          draggable: !isLocked,
          removable: !isLocked,
          copyable: !isLocked,
          layerable: !isLocked,
        },
        { avoidStore: true },
      );
    }),
  );
};

export default setSymbolSubtreeLocked;
