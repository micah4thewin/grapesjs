import syncCoverMediaFromAttributes from './syncCoverMediaFromAttributes.js';

const watchCoverAttributeUpdates = (editor) => {
  const isCover = (component) =>
    component && component.get && String(component.get('type') || '').indexOf('db-cover-') === 0;
  editor.on('component:update:attributes', (component) => {
    if (isCover(component)) syncCoverMediaFromAttributes(component);
  });
  editor.on('component:add', (component) => {
    if (isCover(component)) syncCoverMediaFromAttributes(component);
  });
};

export default watchCoverAttributeUpdates;
