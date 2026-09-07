import hasOnlyTransientChanges from './hasOnlyTransientChanges.js';
import restoreBindingPreviewInElement from './restoreBindingPreviewInElement.js';
import scheduleBindingPreviewRefresh from './scheduleBindingPreviewRefresh.js';

const watchBindingPreviews = (editor) => {
  const scheduleRefresh = () => scheduleBindingPreviewRefresh(editor);
  editor.on('component:selected', (selectedComponent) => {
    const selectedElement = selectedComponent && selectedComponent.getEl ? selectedComponent.getEl() : null;
    if (selectedElement) restoreBindingPreviewInElement(selectedElement);
  });
  editor.on('component:deselected', scheduleRefresh);
  editor.on('component:mount', scheduleRefresh);
  editor.on('component:update:attributes', scheduleRefresh);
  editor.on('component:update', (changedComponent) => {
    if (!hasOnlyTransientChanges(changedComponent)) scheduleRefresh();
  });
  editor.on('db:data-sources:update', scheduleRefresh);
  editor.on('page:select', scheduleRefresh);
  editor.on('canvas:frame:load:body', scheduleRefresh);
  if (editor.onReady) editor.onReady(scheduleRefresh);
};

export default watchBindingPreviews;
