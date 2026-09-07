import lockDecorativeComponent from '../support/lockDecorativeComponent.js';

const decorativeParentClasses = ['db-carousel-control', 'db-facade-button', 'db-map-pin', 'db-icon'];

const watchDecorativeSvgChildren = (editor) => {
  editor.on('component:add', (component) => {
    if (!component || !component.get || component.get('type') !== 'svg') return;
    const parentComponent = component.parent ? component.parent() : null;
    if (!parentComponent || !parentComponent.getClasses) return;
    const parentClasses = parentComponent.getClasses();
    const hasDecorativeParent = decorativeParentClasses.some((className) => parentClasses.indexOf(className) >= 0);
    if (hasDecorativeParent) lockDecorativeComponent(component);
  });
};

export default watchDecorativeSvgChildren;
