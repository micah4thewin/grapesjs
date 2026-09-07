const watchGalleryCaptionUpdates = (editor) => {
  editor.on('component:update:attributes:data-db-captions', (component) => {
    if (!component || !component.is || !component.is('db-gallery')) return;
    const showCaptions = String(component.getAttributes()['data-db-captions']) !== 'false';
    component.components().forEach((itemComponent) => {
      if (!itemComponent.is || !itemComponent.is('db-gallery-item')) return;
      itemComponent.addAttributes({ 'data-db-show-caption': showCaptions ? 'true' : 'false' });
    });
  });
};

export default watchGalleryCaptionUpdates;
