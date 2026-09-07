import walkComponentTree from '../support/walkComponentTree.js';
import ensureFieldControlId from './ensureFieldControlId.js';
import ensureFormStatusChild from './ensureFormStatusChild.js';
import ensureFormStepsNav from './ensureFormStepsNav.js';
import syncSubmitButtonClasses from './syncSubmitButtonClasses.js';
import wrapOrphanFormChild from './wrapOrphanFormChild.js';

const settleFormTree = (rootComponent) => {
  walkComponentTree(rootComponent, (visitedComponent) => {
    if (!visitedComponent || !visitedComponent.is) return;
    if (visitedComponent.is('db-form')) {
      ensureFormStatusChild(visitedComponent);
      ensureFormStepsNav(visitedComponent);
    }
    if (visitedComponent.is('db-form-field')) ensureFieldControlId(visitedComponent);
    if (visitedComponent.is('db-submit-button')) syncSubmitButtonClasses(visitedComponent);
  });
};

const watchFormStructureUpdates = (editor) => {
  editor.on('component:add', (addedComponent) => {
    if (!addedComponent || !addedComponent.is) return;
    if (addedComponent.is('db-form')) settleFormTree(addedComponent);
    if (addedComponent.is('db-form-field')) ensureFieldControlId(addedComponent);
    if (addedComponent.is('db-submit-button')) syncSubmitButtonClasses(addedComponent);
    if (!addedComponent.is('db-form-step')) return;
    const formComponent = addedComponent.closestType('db-form');
    if (formComponent) ensureFormStepsNav(formComponent);
  });
  editor.on('component:remove', (removedComponent) => {
    if (!removedComponent || !removedComponent.is || !removedComponent.is('db-form-step')) return;
    editor
      .getWrapper()
      .findType('db-form')
      .forEach((formComponent) => ensureFormStepsNav(formComponent));
  });
  const wrapDroppedComponent = (droppedComponent) => setTimeout(() => wrapOrphanFormChild(editor, droppedComponent), 0);
  editor.on('block:drag:stop', wrapDroppedComponent);
  editor.on('component:drag:end', (dragRecord) => wrapDroppedComponent(dragRecord && dragRecord.target));
  editor.on('load', () => editor.Pages.getAll().forEach((sitePage) => settleFormTree(sitePage.getMainComponent())));
};

export default watchFormStructureUpdates;
