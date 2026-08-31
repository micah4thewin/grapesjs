import rebuildIconComponentMarkup from './rebuildIconComponentMarkup.js';

const registerIconUpdateListener = (editor) => {
  const handleIconComponentChange = (changedComponent) => {
    if (!changedComponent || typeof changedComponent.get !== 'function') return;
    if (changedComponent.get('type') !== 'db-icon') return;
    rebuildIconComponentMarkup(editor, changedComponent);
  };
  editor.on('component:update:attributes', handleIconComponentChange);
  editor.on('component:add', handleIconComponentChange);
};

export default registerIconUpdateListener;
