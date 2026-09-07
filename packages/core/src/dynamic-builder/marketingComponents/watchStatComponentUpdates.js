import syncStatValueFromAttributes from './syncStatValueFromAttributes.js';

const watchStatComponentUpdates = (editor) => {
  ['data-db-stat-target', 'data-db-stat-prefix', 'data-db-stat-suffix'].forEach((attributeName) => {
    editor.on('component:update:attributes:' + attributeName, (component) => syncStatValueFromAttributes(component));
  });
};

export default watchStatComponentUpdates;
