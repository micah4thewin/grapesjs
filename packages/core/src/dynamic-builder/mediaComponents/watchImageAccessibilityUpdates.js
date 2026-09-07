const isImageComponent = (component) => Boolean(component && component.is && component.is('db-image'));

const watchImageAccessibilityUpdates = (editor) => {
  editor.on('component:update:attributes:data-db-decorative', (component) => {
    if (!isImageComponent(component)) return;
    const componentAttributes = component.getAttributes();
    if (String(componentAttributes['data-db-decorative']) === 'true') {
      component.addAttributes({ alt: '', role: 'presentation' });
    } else if (componentAttributes.role === 'presentation') {
      component.removeAttributes(['role']);
    }
  });
  editor.on('component:update:attributes:alt', (component) => {
    if (!isImageComponent(component)) return;
    const componentAttributes = component.getAttributes();
    const hasAltText = String(componentAttributes.alt || '').trim().length > 0;
    if (hasAltText && String(componentAttributes['data-db-decorative']) === 'true') {
      component.addAttributes({ 'data-db-decorative': 'false' });
    }
  });
};

export default watchImageAccessibilityUpdates;
