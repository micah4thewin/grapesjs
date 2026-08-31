const watchStackMobileClassUpdates = (editor) => {
  editor.on('component:update:attributes:data-db-stack-mobile', (component) => {
    if (!component || !component.is || !component.is('db-columns')) return;
    const stackValue = component.getAttributes()['data-db-stack-mobile'];
    if (String(stackValue) === 'false') component.removeClass('db-stack-mobile');
    else component.addClass('db-stack-mobile');
  });
};

export default watchStackMobileClassUpdates;
