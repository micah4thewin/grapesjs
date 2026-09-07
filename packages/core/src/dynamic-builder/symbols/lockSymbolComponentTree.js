import getOverridableLeafKind from './getOverridableLeafKind.js';

const buildAbilityRecord = (isLocked, isOverridableLeaf) => ({
  selectable: !isLocked || isOverridableLeaf,
  hoverable: !isLocked || isOverridableLeaf,
  editable: !isLocked || isOverridableLeaf,
  draggable: !isLocked,
  removable: !isLocked,
  copyable: !isLocked,
  layerable: !isLocked,
});

const lockSymbolComponentTree = (component, isLocked, insideLeaf) => {
  if (!component || typeof component.set !== 'function') return;
  const isOverridableLeaf = isLocked && !insideLeaf && Boolean(getOverridableLeafKind(component));
  component.set(buildAbilityRecord(isLocked, isOverridableLeaf), { avoidStore: true });
  const childComponents = component.components ? component.components() : null;
  childComponents &&
    childComponents.forEach((childComponent) =>
      lockSymbolComponentTree(childComponent, isLocked, insideLeaf || isOverridableLeaf),
    );
};

export default lockSymbolComponentTree;
