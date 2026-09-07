import migrateLegacyColumnsAttributes from './migrateLegacyColumnsAttributes.js';

const watchLayoutMigrations = (editor) => {
  editor.on('component:add', (component, options) => {
    if (options && options.temporary) return;
    migrateLegacyColumnsAttributes(component);
  });
};

export default watchLayoutMigrations;
