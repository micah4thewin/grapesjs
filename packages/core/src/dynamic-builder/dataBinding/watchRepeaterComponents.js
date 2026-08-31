import renderAllRepeaterPreviews from './renderAllRepeaterPreviews.js';
import renderRepeaterPreview from './renderRepeaterPreview.js';

const watchRepeaterComponents = (editor) => {
  const renderAllPreviews = () => renderAllRepeaterPreviews(editor);
  const handleComponentChange = (changedComponent) => {
    if (!changedComponent || typeof changedComponent.get !== 'function') return;
    if (changedComponent.get('type') !== 'db-repeater') return;
    renderRepeaterPreview(editor, changedComponent);
  };
  editor.on('component:add', handleComponentChange);
  editor.on('component:update:attributes', handleComponentChange);
  editor.on('db:data-sources:update', renderAllPreviews);
  editor.on('page:select', renderAllPreviews);
  editor.onReady(renderAllPreviews);
};

export default watchRepeaterComponents;
