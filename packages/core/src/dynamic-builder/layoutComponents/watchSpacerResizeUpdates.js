const isSpacer = (component) => Boolean(component && component.is && component.is('db-spacer'));

const clearSpacerHeightStyle = (component) => {
  const currentStyle = { ...(component.getStyle ? component.getStyle() : {}) };
  if (!('--db-spacer-height' in currentStyle) && !('height' in currentStyle)) return;
  delete currentStyle['--db-spacer-height'];
  delete currentStyle.height;
  component.setStyle(currentStyle);
};

const watchSpacerResizeUpdates = (editor) => {
  editor.on('component:resize:update', (resizePayload) => {
    const { component, style, updateStyle } = resizePayload || {};
    if (!isSpacer(component) || !style || !style.height || !updateStyle) return;
    updateStyle({ '--db-spacer-height': style.height });
  });
  editor.on('component:resize:end', (resizePayload) => {
    const component = resizePayload && resizePayload.component;
    if (!isSpacer(component)) return;
    if (component.getAttributes()['data-db-spacer'] !== 'custom')
      component.addAttributes({ 'data-db-spacer': 'custom' });
  });
  editor.on('component:update:attributes:data-db-spacer', (component) => {
    if (!isSpacer(component) || component.getAttributes()['data-db-spacer'] === 'custom') return;
    clearSpacerHeightStyle(component);
  });
};

export default watchSpacerResizeUpdates;
