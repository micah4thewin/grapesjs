const watchImageAccessibilityUpdates = (editor) => {
  const enforceDecorativeAlt = (component) => {
    if (!component || !component.is || !component.is('db-image')) return;
    const componentAttributes = component.getAttributes();
    const isDecorative = String(componentAttributes['data-db-decorative']) === 'true';
    if (isDecorative && componentAttributes.alt !== '') component.addAttributes({ alt: '' });
    if (isDecorative && componentAttributes.role !== 'presentation') component.addAttributes({ role: 'presentation' });
    if (!isDecorative && componentAttributes.role === 'presentation') component.removeAttributes(['role']);
  };
  editor.on('component:update:attributes:data-db-decorative', enforceDecorativeAlt);
  editor.on('component:update:attributes:alt', enforceDecorativeAlt);
};

export default watchImageAccessibilityUpdates;
