import walkComponentTree from './walkComponentTree.js';

const lockComponentSubtree = (rootComponent, overrides = {}) => {
  const lockedProps = {
    selectable: false,
    hoverable: false,
    layerable: false,
    draggable: false,
    droppable: false,
    removable: false,
    copyable: false,
    ...overrides,
  };
  walkComponentTree(rootComponent, (currentComponent) => currentComponent.set && currentComponent.set(lockedProps));
};

export default lockComponentSubtree;
