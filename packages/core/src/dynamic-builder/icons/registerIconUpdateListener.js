import applyIconColorStyle from './applyIconColorStyle.js';
import readIconTraitValues from './readIconTraitValues.js';
import rebuildIconComponentMarkup from './rebuildIconComponentMarkup.js';

const registerIconUpdateListener = (editor) => {
  const handleIconComponentChange = (changedComponent) => {
    if (!changedComponent || typeof changedComponent.get !== 'function') return;
    if (changedComponent.get('type') !== 'db-icon') return;
    rebuildIconComponentMarkup(editor, changedComponent);
    applyIconColorStyle(changedComponent, readIconTraitValues(changedComponent).color);
  };
  editor.on('component:update:attributes', handleIconComponentChange);
  editor.on('component:add', handleIconComponentChange);
};

export default registerIconUpdateListener;
