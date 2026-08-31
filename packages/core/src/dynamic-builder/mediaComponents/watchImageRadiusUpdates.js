const watchImageRadiusUpdates = (editor) => {
  editor.on('component:update:attributes:data-db-radius', (component) => {
    if (!component || !component.is || !component.is('db-image')) return;
    const radiusValue = String(component.getAttributes()['data-db-radius'] || 'none');
    component.removeClass(['db-radius-md', 'db-radius-pill', 'db-radius-circle']);
    if (['md', 'pill', 'circle'].indexOf(radiusValue) >= 0) component.addClass('db-radius-' + radiusValue);
  });
};

export default watchImageRadiusUpdates;
