import lockDecorativeComponent from '../support/lockDecorativeComponent.js';

const lockIconChildren = (iconComponent) => {
  if (!iconComponent || typeof iconComponent.components !== 'function') return;
  iconComponent.components().forEach((childComponent) => {
    if (childComponent.get && childComponent.get('selectable') === false) return;
    lockDecorativeComponent(childComponent);
  });
};

export default lockIconChildren;
