import findOwningRepeaterComponent from './findOwningRepeaterComponent.js';
import hasOnlyTransientChanges from './hasOnlyTransientChanges.js';
import isRepeaterRelatedComponent from './isRepeaterRelatedComponent.js';
import refreshRepeaterSourceOptions from './refreshRepeaterSourceOptions.js';
import scheduleRepeaterPreviewRender from './scheduleRepeaterPreviewRender.js';

const watchRepeaterComponents = (editor) => {
  const isRenderBusy = () => Boolean(editor.getModel().get('dbRepeaterRenderBusy'));
  const scheduleAll = () => !isRenderBusy() && scheduleRepeaterPreviewRender(editor, null);
  const scheduleOwner = (changedComponent) => {
    if (isRenderBusy()) return;
    const owningRepeater = findOwningRepeaterComponent(changedComponent);
    if (owningRepeater) scheduleRepeaterPreviewRender(editor, owningRepeater);
  };
  editor.on('component:add', scheduleOwner);
  editor.on('component:remove', (removedComponent) => {
    if (isRenderBusy()) return;
    const owningRepeater = findOwningRepeaterComponent(removedComponent);
    if (owningRepeater) scheduleRepeaterPreviewRender(editor, owningRepeater);
    else if (isRepeaterRelatedComponent(removedComponent)) scheduleAll();
  });
  editor.on('component:update', (changedComponent) => {
    if (!hasOnlyTransientChanges(changedComponent)) scheduleOwner(changedComponent);
  });
  editor.on('component:input', scheduleOwner);
  editor.on('component:styleUpdate', scheduleOwner);
  editor.on('styleable:change', scheduleAll);
  editor.on('component:update:attributes', scheduleOwner);
  editor.on('db:data-sources:update', () => {
    refreshRepeaterSourceOptions(editor);
    scheduleAll();
  });
  editor.on('page:select', scheduleAll);
  if (editor.onReady) editor.onReady(scheduleAll);
};

export default watchRepeaterComponents;
