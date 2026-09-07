import walkComponentTree from '../support/walkComponentTree.js';
import ensureFieldControlId from './ensureFieldControlId.js';
import ensureFormStatusChild from './ensureFormStatusChild.js';
import ensureFormStepsNav from './ensureFormStepsNav.js';
import wrapOrphanFormChild from './wrapOrphanFormChild.js';

const settleFormTree = (rootComponent) => {
  walkComponentTree(rootComponent, (visitedComponent) => {
    if (!visitedComponent || !visitedComponent.is) return;
    if (visitedComponent.is('db-form')) {
      ensureFormStatusChild(visitedComponent);
      ensureFormStepsNav(visitedComponent);
    }
    if (visitedComponent.is('db-form-field')) ensureFieldControlId(visitedComponent);
  });
};

const watchFormStructureUpdates = (editor) => {
  editor.on('component:add', (addedComponent) => {
    if (!addedComponent || !addedComponent.is) return;
    if (addedComponent.is('db-form')) settleFormTree(addedComponent);
    if (addedComponent.is('db-form-field')) ensureFieldControlId(addedComponent);
    if (!addedComponent.is('db-form-step')) return;
    const formComponent = addedComponent.closestType('db-form');
    if (formComponent) ensureFormStepsNav(formComponent);
  });
  editor.on('component:remove', (removedComponent) => {
    if (!removedComponent || !removedComponent.is || !removedComponent.is('db-form-step')) return;
    const formComponent = removedComponent.closestType && removedComponent.closestType('db-form');
    if (formComponent && formComponent.findType('db-form-step').length === 0) ensureFormStepsNav(formComponent);
  });
  const wrapDroppedComponent = (droppedComponent) => setTimeout(() => wrapOrphanFormChild(editor, droppedComponent), 0);
  editor.on('block:drag:stop', wrapDroppedComponent);
  editor.on('component:drag:end', (dragRecord) => wrapDroppedComponent(dragRecord && dragRecord.target));
  editor.on('load', () => editor.Pages.getAll().forEach((sitePage) => settleFormTree(sitePage.getMainComponent())));
};

export default watchFormStructureUpdates;
